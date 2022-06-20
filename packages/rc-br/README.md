# `rc-br`

> 换行插件，将textArea数据换行展示

## 参数

| 参数   | 属性                       | 默认值 |
| ------ | -------------------------- | ------ |
| text   | string\|Array<any>         | ''     |
| render | （）=> ReactNode \| string | null   |



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

