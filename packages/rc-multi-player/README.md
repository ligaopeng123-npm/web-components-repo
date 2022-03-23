# `rc-multi-player`

> react 播放器，依赖@gaopeng123/multi-player

## Usage

```tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {RcMultiPlayer} from "../src";
import {useEffect, useState} from "react";

const App = () => {
    const [mediaDataSource, setMediaDataSource] = useState<any>({});

    useEffect(() => {
        setTimeout(() => {
            setMediaDataSource({url: 'https://xxx/flv/xxx'})
        }, 2000);
    }, [])
    return (
        <RcMultiPlayer
            mediaDataSource={mediaDataSource}
        />
    );
};

ReactDOM.render(<App/>, document.getElementById('root'));

```
