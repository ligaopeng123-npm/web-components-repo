import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RcTimePeriod, RcTimePeriodRef } from "../src";
import { useRef } from "react";

const App = () => {
        const ref = useRef<RcTimePeriodRef>();
        const clear = ()=> {
                ref?.current?.clear();
        }
        const getDate = ()=> {
            ref.current?.getDate();
        }
        return (
            <div style={{height: 400}}>
                    <button onClick={clear}>清理</button>
                    <button onClick={getDate}>数据</button>
                    <RcTimePeriod panelOptions={{}} ref={ref}/>
            </div>
        );
};

ReactDOM.render(<App/>, document.getElementById('root'));
