import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { TimePeriod } from "../src";

const App = () => {
        return (
            <div style={{height: 400}}><TimePeriod /></div>
        );
};

ReactDOM.render(<App/>, document.getElementById('root'));
