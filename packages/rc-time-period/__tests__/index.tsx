import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { TimePeriodCharts } from "../src";

const App = () => {
        return (
            <div style={{height: 400}}><TimePeriodCharts /></div>
        );
};

ReactDOM.render(<App/>, document.getElementById('root'));
