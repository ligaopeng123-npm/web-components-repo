import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RcTimePeriod, RcTimePeriodRef } from "../src";
import { useRef, useState } from "react";

const data = [{
    "week": 2,
    "periods": [{"period": 1, "startAt": "01:05:27", "endAt": "03:29:27"}, {
        "period": 2,
        "startAt": "08:30:33",
        "endAt": "12:06:33"
    }, {"period": 3, "startAt": "13:14:11", "endAt": "15:36:00"}, {
        "period": 1,
        "startAt": "01:05:27",
        "endAt": "03:55:38"
    }, {"period": 2, "startAt": "08:30:33", "endAt": "12:06:33"}, {
        "period": 3,
        "startAt": "13:14:11",
        "endAt": "15:36:00"
    }]
}, {
    "week": 5,
    "periods": [{"period": 1, "startAt": "14:58:55", "endAt": "15:01:05"}, {
        "period": 1,
        "startAt": "14:58:55",
        "endAt": "15:01:05"
    }, {"period": 1, "startAt": "14:58:55", "endAt": "15:01:05"}, {
        "period": 2,
        "startAt": "14:58:55",
        "endAt": "15:01:05"
    }, {"period": 1, "startAt": "14:58:55", "endAt": "15:01:05"}, {
        "period": 2,
        "startAt": "14:58:55",
        "endAt": "15:01:05"
    }]
}, {
    "week": 7,
    "periods": [{"period": 1, "startAt": "00:00:00", "endAt": "23:59:59"}, {
        "period": 1,
        "startAt": "00:00:00",
        "endAt": "23:59:59"
    }, {"period": 1, "startAt": "00:00:00", "endAt": "23:59:59"}, {
        "period": 2,
        "startAt": "00:00:00",
        "endAt": "23:59:59"
    }, {"period": 1, "startAt": "00:00:00", "endAt": "23:59:59"}, {
        "period": 2,
        "startAt": "00:00:00",
        "endAt": "23:59:59"
    }]
}]

const App = () => {
        const ref = useRef<RcTimePeriodRef>();
        const [disabled, setDisabled] = useState(false);
        const [currentDate, setDate] = useState([]);
        const clear = ()=> {
                ref?.current?.clear();
        }
        const getDate = ()=> {
            console.log(ref.current?.getDate());
        }
        return (
            <>
                    <button onClick={clear}>清理</button>
                    <button onClick={getDate}>数据</button>
                    <button onClick={()=> setDate([...data])}>加载数据</button>
                    <button onClick={()=> setDisabled(!disabled)}>{disabled ? 'disabled' : 'not disabled'}</button>
                    <RcTimePeriod data={currentDate} panelOptions={{top: 16, bottom: 16, left: 16, height: 300, disabled: disabled}} ref={ref}/>
            </>
        );
};

ReactDOM.render(<App/>, document.getElementById('root'));
