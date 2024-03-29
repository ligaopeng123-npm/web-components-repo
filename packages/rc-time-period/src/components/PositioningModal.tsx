/**********************************************************************
 *
 * @模块名称: PositioningModal
 *
 * @模块作用: PositioningModal
 *
 * @创建人: pgli
 *
 * @date: 2023/7/17 4:35 下午
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import React, { useState, useEffect, Fragment } from 'react';
import { getWeekTimeChangePosition } from "../utils";
import { PositionModalInterface, PositionModalProps } from "../interface";
import { Tooltip as ReactTooltip } from '../react-tooltip';
import '../index.less';

/**
 * 容器组件 不承载业务
 * @param props
 * @constructor
 */
export const PositioningModal: React.FC<PositionModalProps> = (props) => {
    /**
     * hook共享数据
     */
    const {
        title,
        monitor,
        cancelText,
        okText,
        onConfirm,
        onCancel,
        modalKey
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
        } else {
            setVisible(false);
        }
    }, [monitor]);

    return (
        <Fragment>
            <ReactTooltip
                isOpen={visible}
                clickable={true}
                anchorSelect={`#${modalKey || 'position-modal'}`}
                style={Object.assign({zIndex: 99999}, position)}
            >
                <div>{title}</div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginTop: 12
                    }}>
                    <button
                        type={'reset'}
                        style={{
                            color: 'red',
                            cursor: 'pointer'
                        }}
                        onClick={() => {
                            setVisible(false);
                            onCancel();
                        }}>{cancelText || `删除`}</button>
                    <button
                        type={'submit'}
                        style={{
                            marginLeft: 12,
                            color: '#80a5ff',
                            cursor: 'pointer'
                        }}
                        onClick={(e: any) => {
                            setVisible(false);
                            onConfirm(e);
                        }}>{okText || `保存`}</button>
                </div>
            </ReactTooltip>
            <div
                id={modalKey || "position-modal"}
                data-tooltip-id={modalKey || "position-modal"}
                className={`time-change-item`}
                style={position}></div>
        </Fragment>
    );
};