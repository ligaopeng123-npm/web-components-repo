# RcScrollNav

`吸顶导航`[在线demo](https://ligaopeng123-npm.github.io/web-components-repo/?path=/docs/example-rcscrollnav--docs)  

```tsx
export type RcScrollNavProps = {
    textColor?: string; // 字体颜色
    items: Array<ScrollNavItem>; // {label: string, value: string} value为dom的id
    scrollDom?: string, // 滚动的dom 默认为body
    primaryColor?: string, // 选中的颜色
    backgroundColor?: string, // 背景色 默认为#fff
    onChange?: (v: any)=> void; // 事件
};
```

## Usage

```tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RcScrollNav } from "../src";

const App = () => {
    return (
        <RcScrollNav
            items={[{
                label: 'label1',
                value: 'value1'
            }, {
                label: 'label2',
                value: 'value2'
            }, {
                label: 'label3',
                value: 'value3'
            }, {
                label: 'label4',
                value: 'value4'
            }, {
                label: 'label5',
                value: 'value5'
            }]}>
            <div
                id={'value1'}
                style={{height: 300}}>
                label1
            </div>
            <div
                id={'value2'}
                style={{height: 300}}>
                label2
            </div>
            <div
                id={'value3'}
                style={{height: 300}}>
                label3
            </div>
            <div
                id={'value4'}
                style={{height: 300}}>
                label4
            </div>
            <div
                id={'value5'}
                style={{height: 300}}>
                label5
            </div>
        </RcScrollNav>
    );
};

ReactDOM.render(<App/>, document.getElementById('root'));
```



