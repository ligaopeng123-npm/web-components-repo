/**********************************************************************
 *
 * @模块名称: TimePeriodCharts
 *
 * @模块作用: TimePeriodCharts
 *
 * @创建人: pgli
 *
 * @date: 2023/7/15 10:32 上午
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import weekUtils from "../utils";
import { EnumWeekState } from "../interface";
import {
    CanvasInterface,
    MonitorEventsInterface,
    PeriodTipInterface,
    WeekPanelPropsInterface
} from "../interface";
import * as zrender from 'zrender';
import { parentByExpected } from "@gaopeng123/utils";

export type TimePeriodChartsRef = {
    getConfig: () => any,
    /**
     * 获取时间转换函数
     */
    convertedToTime: any
}
export const TimePeriodCharts = forwardRef<TimePeriodChartsRef, WeekPanelPropsInterface>((props: WeekPanelPropsInterface, ref) => {
    // template模板 panelOptions 配置属性
    const {
        dispatch,
        store,
        data
    } = props;
    /**
     * 当前设置的样式 TODO 宽高是必须的
     */
    const [options, setOptions] = useState<CanvasInterface>(store[EnumWeekState.panelOptions]);
    /**
     *  zrender 对象
     */
    const [week, setWeek] = useState<any>();

    /**
     * 挂载canvas对象
     */
    const mainRef = useRef<any>();

    /**
     * 设置canvas的宽高
     */
    useEffect(() => {
        let zd: any;
        let _week: any;

        /**
         * 时间段点击事件
         * @param value
         */
        const onPeriodClick = (value: MonitorEventsInterface) => {
            dispatch({
                type: EnumWeekState.periodClick,
                value: value
            });
        };
        /**
         * 复制多天操作回调
         * @param value
         */
        const onCopyClick = (value: MonitorEventsInterface) => {
            dispatch({
                type: EnumWeekState.copyClick,
                value: value
            });
        };
        /**
         * tip信息处理
         * @param value
         */
        const onPeriodTip = (value: PeriodTipInterface) => {
            dispatch({
                type: EnumWeekState.periodTip,
                value: value
            });
        };

        let _options = options;

        if (!options.width || !options.height) {
            const {
                offsetHeight,
                offsetWidth
            } = parentByExpected(mainRef.current, (currntDom: any) => {
                return currntDom.offsetHeight;
            });

            _options = Object.assign({}, options, {
                height: offsetHeight,
                width: offsetWidth
            });
            setOptions(_options);
        }

        setTimeout(() => {
            // 设置zrender对象
            zd = zrender.init(mainRef.current);
            _week = weekUtils.init(zd, _options);
            // 绘制基础图形
            _week.drawBody().drawScale();

            // 监听事件 处理各种效果
            _week.subscribe(EnumWeekState.periodClick, onPeriodClick);
            _week.subscribe(EnumWeekState.copyClick, onCopyClick);
            _week.subscribe(EnumWeekState.periodTip, onPeriodTip);

            setWeek(_week);
        })

        return () => {
            if (_week) {
                _week.unsubscribe(EnumWeekState.periodClick, onPeriodClick);
                _week.unsubscribe(EnumWeekState.copyClick, onCopyClick);
                _week.unsubscribe(EnumWeekState.periodTip, onPeriodTip);
                _week.destory();
            }

            zd?.dispose();
        }
    }, [store[EnumWeekState.panelOptions]]);

    /**
     * 删除时间段操作处理
     */
    useEffect(() => {
        if (store[EnumWeekState.periodDelete]) {
            week.deletePeriod(store[EnumWeekState.periodDelete]);
        }
    }, [store[EnumWeekState.periodDelete]]);

    /**
     * 时间段编辑操作处理
     */
    useEffect(() => {
        if (store[EnumWeekState.periodEdit]) {
            week.editPeriod(store[EnumWeekState.periodEdit]);
        }
    }, [store[EnumWeekState.periodEdit]]);

    /**
     * 传递不同的id 渲染不同的数据
     */
    useEffect(() => {
        dispatch({
            type: EnumWeekState.periodClick,
            value: null
        });
        if (data.length) {
            week && week.loadWeekData({
                __data__: data,
               ...store[EnumWeekState.fieldNames]
            });
        } else {
            week && week.removeData();
        }
    }, [data, week]);

    /**
     * 清空处理
     */
    useEffect(() => {
        if (store[EnumWeekState.clearClick]) {
            week && week.removeData();
        }
    }, [store[EnumWeekState.clearClick]]);

    /**
     * 给week组件暴露一些接口
     */
    useImperativeHandle(ref, () => ({
        /**
         * 获取配置项
         */
        getConfig: () => {
            return week.getData();
        },
        /**
         * 获取时间转换函数
         */
        convertedToTime: week?.convertedToTime.bind(week)
    }));


    /**
     * 复制copy时的场景
     */
    useEffect(() => {
        const copyObject = store[EnumWeekState.copyObject];
        if (copyObject) {
            week.loadCopyData(copyObject);
        }
    }, [store[EnumWeekState.copyObject]]);

    return (
        // 利用pointerEvents属性 来处理是否可拖拽
        <div
            ref={mainRef}
            style={{
                height: options.height,
                width: options.width,
                pointerEvents: store[EnumWeekState.panelOptions]?.disabled ? 'none' : 'auto'
            }}></div>
    )
});