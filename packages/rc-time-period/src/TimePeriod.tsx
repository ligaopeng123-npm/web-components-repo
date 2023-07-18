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
import React, { useReducer } from 'react';
import { initState, reducer, state } from "./state";
import TimePeriodCharts from "./components/TimePeriodCharts";
import PeriodTip from "./components/PeriodTip";
import SinglePeriod from "./components/TimeEdit";
import TimePeriodCopy from "./components/TimePeriodCopy";

type TimePeriodProps = {};
const TimePeriod: React.FC<TimePeriodProps> = (props) => {
    /**
     * 内部数据管理
     */
    const [store, dispatch] = useReducer(reducer, state, initState);
    return (
        <>
            <PeriodTip store={store} dispatch={dispatch}/>
            <TimePeriodCharts store={store} dispatch={dispatch}/>
            <SinglePeriod store={store} dispatch={dispatch}/>
            <TimePeriodCopy store={store} dispatch={dispatch}/>
        </>
    )
}

export default TimePeriod;