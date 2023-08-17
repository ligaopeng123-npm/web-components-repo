# RcCardEllipsis

`卡片展开和收起 ` [在线demo](https://ligaopeng123-npm.github.io/web-components-repo/?path=/docs/example-rccardellipsis--props)  

## Usage

```tsx
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
```

