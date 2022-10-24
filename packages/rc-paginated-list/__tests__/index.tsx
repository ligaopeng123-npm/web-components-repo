import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PaginatedList } from "../src";
import { useEffect, useState } from "react";
import DownLoading from "../src/DownLoading";
import TopLoading from "../src/TopLoading";


const App = () => {
    useEffect(() => {
        setTimeout(() => {
        }, 2000);
    }, [])
    return (
        <>
            <DownLoading/>
            <TopLoading/>
        </>
    );
};

ReactDOM.render(<App/>, document.getElementById('root'));
