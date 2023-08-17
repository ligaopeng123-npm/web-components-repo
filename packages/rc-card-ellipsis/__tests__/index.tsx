import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RcCardEllipsis } from "../src";

const App = () => {
    return (
        <RcCardEllipsis onChange={(e)=> {
            console.log(e);
        }} minHeight={100}>
            12<br/>
            12<br/>
            12<br/>
            12<br/>
            12<br/>
            12<br/>
            12<br/>
        </RcCardEllipsis>
    );
};

ReactDOM.render(<App/>, document.getElementById('root'));
