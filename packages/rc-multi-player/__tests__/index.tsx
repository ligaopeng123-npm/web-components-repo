import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {RcMultiPlayer} from "../src";
import {useEffect, useState} from "react";


const App = () => {
    const [mediaDataSource, setMediaDataSource] = useState<any>({});

    useEffect(() => {
        setTimeout(() => {
            setMediaDataSource({url: '/flv/5956007-1-31882'})
        }, 2000);
    }, [])
    return (
        <RcMultiPlayer
            mediaDataSource={mediaDataSource}
        />
    );
};

ReactDOM.render(<App/>, document.getElementById('root'));
