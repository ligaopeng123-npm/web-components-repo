/**********************************************************************
 *
 * @模块名称: PositionModal
 *
 * @模块作用: PositionModal
 *
 * @创建人: pgli
 *
 * @date: 2023/7/17 4:35 下午
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import React, { useState, useEffect, useRef } from 'react';
import { getWeekTimeChangePosition } from "../utils";
import { PositionModalInterface } from "../interface";
import { Tooltip } from "react-tooltip";
import '../index.less';

/**
 * 容器组件 不承载业务
 * @param props
 * @constructor
 */
const PositionModal: React.FC<any> = (props: any) => {
    /**
     * hook共享数据
     */
    const {
        title,
        monitor,
        cancelText,
        okText,
        onConfirm,
        onCancel
    } = props;
    /**
     * 位置信息
     */
    const [position, setPosition] = useState<PositionModalInterface>();
    /**
     * 控制显示和隐藏
     */
    const [visible, setVisible] = useState<boolean>(false);

    /**
     *  当接收到periodClick时间 将弹出框弹出
     */
    useEffect(() => {
        if (monitor) {
            setPosition(getWeekTimeChangePosition(monitor.e));
            setVisible(true);
        }
    }, [monitor]);

    return (
        <>
            <Tooltip
                isOpen={visible}
                clickable
                anchorSelect="#position-modal"
                style={Object.assign({zIndex: 99999}, position)}
            >
                <div>
                    {title}
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginTop: 12
                    }}>
                    <button
                        type={'reset'}
                        style={{color: 'red'}}
                        onClick={()=> {
                            setVisible(false);
                            onCancel();
                        }}>{cancelText || `删除`}</button>
                    <button
                        type={'submit'}
                        style={{
                            marginLeft: 12,
                            color: '#80a5ff'
                        }}
                        onClick={(e)=> {
                            setVisible(false);
                            onConfirm(e);
                        }}>{okText || `保存`}</button>
                </div>
            </Tooltip>
            <div
                id="position-modal"
                className={`time-change-item`}
                style={position}></div>
        </>
    )
};

export default PositionModal;