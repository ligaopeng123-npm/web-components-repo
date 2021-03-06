import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {RcBr} from "../src";

const App = () => {
    return (
        <RcBr
            text={'aaaaaa\nbbbbbbbbb\ncccccc'}
            maxRow={2}
            render={(row) => {
                return <span>{row}</span>
            }}
        />
    );
};

ReactDOM.render(<App/>, document.getElementById('root'));
