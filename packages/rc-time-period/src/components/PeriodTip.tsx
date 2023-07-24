/**********************************************************************
 *
 * @模块名称: PeriodTip
 *
 * @模块作用: PeriodTip
 *
 * @创建人: pgli
 *
 * @date: 2023/7/17 2:25 下午
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import React, { useState, useEffect } from 'react';
import { getWeekTimeChangePosition } from "../utils";
import { EnumWeekState, PositionModalInterface } from "../interface";
import { Tooltip as RcTimeTooltip } from 'react-tooltip';
import '../index.less';

export const PeriodTip: React.FC<any> = (props: any) => {
    /**
     * 控制显示和隐藏
     */
    const [visible, setVisible] = useState<boolean>(false);
    /**
     * 设置tip内容
     */
    const [title, setTitle] = useState<string | null>(null);

    /**
     * 位置信息
     */
    const [position, setPosition] = useState<PositionModalInterface>();
    const {store} = props;
    const monitor = store[EnumWeekState.periodTip];
    /**
     *  当接收到periodClick时间 将弹出框弹出
     */
    useEffect(() => {
        if (monitor) {
            if (monitor.state === 'show') {
                const {
                    left,
                    top
                } = getWeekTimeChangePosition(monitor?.e);
                // tip信息上移动 防止遮罩 导致的鼠标事件频繁触发
                setPosition({
                    left,
                    top: top - 20
                });
                const {
                    start,
                    end
                } = monitor?.timeRange;
                setTitle(`${start}-${end}`);
                setVisible(true);
            } else if (monitor.state === 'hide') {
                setVisible(false);
            }
        }
    }, [monitor]);

    return (
        <>
            <RcTimeTooltip
                isOpen={visible}
                id="period-tip"
                style={Object.assign({zIndex: 99999}, position)}
                content={title}/>
            <div
                data-tooltip-id="period-tip"
                className={`time-change-item`}
                style={position}>
            </div>
        </>
    );
};