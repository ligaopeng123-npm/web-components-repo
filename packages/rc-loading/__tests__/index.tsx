import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RcSuperLoading } from "../src";
import { useState } from "react";

const App = () => {
    const [loading, setLoading] = useState(false);
    return (
        <div>
            <button onClick={()=> setLoading(!loading)}>loading</button>
            <RcSuperLoading loading={loading} duration={20000} wrapperClassName={'test'}>
                <div style={{width: 500, height: 700}}>
                    <div>1212</div>
                    <div>1212</div>
                    <div>1212</div>
                    <div>1212</div>
                    <div>1212</div>
                    <div>1212</div>
                    <div>1212</div>
                    <div>1212</div>
                    <div>1212</div>
                </div>
            </RcSuperLoading>
        </div>
    );
};

ReactDOM.render(<App/>, document.getElementById('root'));
