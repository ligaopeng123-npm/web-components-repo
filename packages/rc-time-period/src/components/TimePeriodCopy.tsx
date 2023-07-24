/**********************************************************************
 *
 * @模块名称: CopyPeriod
 *
 * @模块作用: 复制天数
 *
 * @创建人: pgli
 *
 * @date: 2023/7/17 7:12 下午
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import React, { useState, useEffect, useImperativeHandle, forwardRef, useRef } from 'react';
import { CopyPeriodDataInterface, EnumWeekState, WeekPanelPropsInterface } from "../interface";
import { PositioningModal } from "./PositioningModal";
import Checkbox, { CheckboxGroup } from "./CheckBox";
import '../index.less';


const defaultCheckedList: any = [];
type PositionPanelRef = {
    getCheckList: () => Array<any>
}
export const PositionPanel = forwardRef<PositionPanelRef, WeekPanelPropsInterface>((props, ref) => {
    const {store} = props;
    const plainOptions = store[EnumWeekState.panelOptions].scale.y.data;
    const [boxList, setBoxList] = useState(plainOptions);
    /**
     * 选中的集合
     */
    const [checkedList, setCheckedList] = useState(defaultCheckedList);
    /**
     * 全选的样式控制
     */
    const [indeterminate, setIndeterminate] = useState(false);
    /**
     * 全选状态
     */
    const [checkAll, setCheckAll] = useState(false);
    /**
     * 全选触发事件
     * @param e
     */
    const onCheckAllChange = (e: any) => {
        setCheckedList(e.target.checked ? plainOptions : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
    };
    /**
     * 单选触发事件
     * @param list
     */
    const onChange = (list: any[]) => {
        setCheckedList(list);
        setIndeterminate(!!list.length && list.length < plainOptions.length);
        setCheckAll(list.length === plainOptions.length);
    };
    /**
     * 暴露出的接口
     */
    useImperativeHandle(ref, () => ({
        getCheckList: () => {
            return checkedList;
        }
    }));
    /**
     * 根据数据 去掉一天
     */
    useEffect(() => {
        const monitor = store[EnumWeekState.copyClick];
        if (monitor) {
            setBoxList(plainOptions.filter((item: number, index: number) => {
                return index !== monitor.index;
            }));
            setCheckedList([]);
            setIndeterminate(false);
            setCheckAll(false);
        }
    }, [store[EnumWeekState.copyClick]]);

    return (
        <>
            <p>复制到</p>
            <label
                className={'time-period-copy-label'}>
                <Checkbox
                    indeterminate={indeterminate}
                    onChange={onCheckAllChange}
                    checked={checkAll}/>
                全选
            </label>
            <br></br>
            <CheckboxGroup
                options={boxList}
                value={checkedList}
                onChange={onChange}
                style={{width: 250}}/>
        </>
    )
});

const TimePeriodCopy: React.FC<WeekPanelPropsInterface> = (props) => {
    const {
        store,
        dispatch
    } = props;

    const plainOptions = store[EnumWeekState.panelOptions].scale.y.data;

    /**
     * 监控数据
     */
    const monitor = store[EnumWeekState.copyClick];
    /**
     * copy实例
     */
    const copyRef = useRef<PositionPanelRef>(null);
    /**
     * 复制操作
     */
    const onConfirm = () => {
        const checkList = copyRef.current.getCheckList();
        if (checkList.length) {
            const targetIndexs: any[] = [];
            checkList.forEach((item: any) => {
                const targetIndex = plainOptions.findIndex((_item: string) => _item === item);
                if (targetIndex !== monitor.index) targetIndexs.push(targetIndex)
            });
            /**
             * 发送复制对象 让weekpanel去复制
             */
            dispatch({
                type: EnumWeekState.copyObject,
                value: {
                    targetIndexs,
                    sourceIndex: monitor.index
                } as CopyPeriodDataInterface
            });
        }
    };
    /**
     * 取消操作
     */
    const onCancel = () => {

    };
    return (
        <PositioningModal
            modalKey={'time-period-copy'}
            monitor={monitor}
            onConfirm={onConfirm}
            onCancel={onCancel}
            okText={`复制`}
            cancelText={`取消`}
            title={
                <PositionPanel
                    ref={copyRef}
                    store={store}/>}
        />
    )
};

export default TimePeriodCopy;
