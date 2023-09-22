# `rc-time-period`

> TODO: 时间段展示与配置
>
> [在线demo](https://ligaopeng123-npm.github.io/web-components-repo/?path=/docs/example-rctimeperiod--docs)


## 参数

```tsx

export type RcTimePeriodProps = {
    panelOptions: CanvasInterface,
    fieldNames?: DataMappingInterface,
    data: Array<PeriodItemDate>
};

export interface DataMappingInterface extends TemplateMapInterface {
    nameKey: string
    templateIdKey: string
    dataKey: string
}

export interface CanvasInterface {
    // 宽高
    height?: string | number;
    width?: string | number;
    // 上下左右
    left?: string | number;
    right?: string | number;
    top?: string | number;
    bottom?: string | number;
    // 刻度信息
    scale?: scaleInterface;
    // 操作列信息
    operate?: operateInterface;
    // 清空按钮 同时控制着 是否可操作
    disabled?: boolean;
    legend?: LegendInterface;
}
```



## Usage

```tsx
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
                    <button onClick={()=> setDisabled(!disabled)}>{disabled ? 'disabled' : 'not disabled'}</button>
                    <RcTimePeriod data={data} panelOptions={{top: 16, bottom: 16, left: 16, height: 300, disabled: disabled}} ref={ref}/>
            </>
        );
};

ReactDOM.render(<App/>, document.getElementById('root'));
```
