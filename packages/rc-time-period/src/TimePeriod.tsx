/**********************************************************************
 *
 * @模块名称: TimePeriod
 *
 * @模块作用: TimePeriod
 *
 * @创建人: pgli
 *
 * @date: 2023/7/17 2:29 下午
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import React, { forwardRef, useEffect, useImperativeHandle, useReducer, useRef } from 'react';
import { reducer, state } from "./state";
import { TimePeriodCharts, TimePeriodChartsRef } from "./components/TimePeriodCharts";
import { PeriodTip } from "./components/PeriodTip";
import { SinglePeriod } from "./components/TimeEdit";
import { TimePeriodCopy } from "./components/TimePeriodCopy";
import { CanvasInterface, DataMappingInterface, EnumWeekState, PeriodItemDate, TimePeriodModuleDefaultProps } from "./interface";
import { conversionDataToServer } from "./utils";

export type RcTimePeriodProps = {
    panelOptions: CanvasInterface,
    fieldNames?: DataMappingInterface,
    data: Array<PeriodItemDate>
};

export type RcTimePeriodRef = {
    clear: () => void,
    getDate: () => void,
};

export const RcTimePeriod = forwardRef<RcTimePeriodRef, RcTimePeriodProps>((props, ref) => {
    /**
     * 内部数据管理
     */
    const [store, dispatch] = useReducer(reducer, state, (state: any) => {
        return {
            ...state,
            [EnumWeekState.fieldNames]: Object.assign({}, TimePeriodModuleDefaultProps.fieldNames, props.fieldNames)
        };
    });

    const chartRef = useRef<TimePeriodChartsRef>();


    useEffect(() => {
        if (props.panelOptions) {
            dispatch({
                type: EnumWeekState.panelOptions,
                value: props.panelOptions
            });
        }
    }, [props.panelOptions]);

    /**
     * 钩子函数
     */
    useImperativeHandle(ref, () => ({
        clear: () => {
            dispatch({
                type: EnumWeekState.clearClick,
                value: Date.now()
            });
        },

        getDate: () => {
            return conversionDataToServer(chartRef.current.getConfig(), chartRef.current.convertedToTime, store[EnumWeekState.fieldNames], store[EnumWeekState.panelOptions].scale.y.data);
        },

        loadDate: () => {

        }
    }));


    return (
        <>
            <PeriodTip
                store={store}
                dispatch={dispatch}/>
            <TimePeriodCharts
                data={props.data}
                ref={chartRef}
                store={store}
                dispatch={dispatch}/>
            <SinglePeriod
                store={store}
                dispatch={dispatch}/>
            <TimePeriodCopy
                store={store}
                dispatch={dispatch}/>
        </>
    )
});