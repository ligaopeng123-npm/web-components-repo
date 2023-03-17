# `rc-qrcode`

> TODO: 二维码生成

| 参数      | 说明                   | 类型                  | 默认值 |
| --------- | ---------------------- | --------------------- | ------ |
| text      | 要转换的文本           | string                | null   |
| width     | 二维码宽度             | number                | 200    |
| height    | 二维码高度             | number                | 200    |
| toDataURL | 转换成功后返回的base64 | (url: string) => void | null   |

## Usage

```tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RcQrcode } from "../src";
import { useRef, useState } from "react";

const App = () => {
    const [text, setText] = useState();
    const ref = useRef<any>();
    const onClick = ()=> {
        setText(ref?.current.value)
    }
    return (
        <>
            <div>
                <input ref={ref} type="text"></input>
                <input type="submit" onClick={onClick}/>
            </div>
            <RcQrcode
                text={text}
            />
        </>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'));
```
