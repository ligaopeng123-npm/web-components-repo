# `rc-br`

> 将textArea数据换行展示

## Usage

```tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {RcBr} from "../src";

const App = () => {
    return (
        <RcBr
            text={'aaaaaa\nbbbbbbbbb\ncccccc'}
            render={(row) => {
                return <span>{row}</span>
            }}
        />
    );
};

ReactDOM.render(<App/>, document.getElementById('root'));
```

