# `rc-paginated-list`

> TODO: 滚动分页表格

## 参数

| 参数         | 说明                      | 类型                                                         | 默认值                   |
| ------------ | ------------------------- | ------------------------------------------------------------ | ------------------------ |
| request      | 数据请求函数              | (params: PaginationProps, abortController: AbortController) => Promise<DataSource> |                          |
| render       | 渲染行数据                | (record: any, style: React.CSSProperties) => ReactNode;      |                          |
| params       | 传递的参数                | {}                                                           | {}                       |
| pagination   | 分页数据                  | PaginationProps = {     pageSize?: number;     current?: number; }; | {current:1, pageSize:20} |
| height       | 表格高度                  | number                                                       | 600                      |
| itemSize     | 每一行数据高度            | number                                                       | 40                       |
| primaryColor | 主要颜色，用户loading加载 | string                                                       | #31CD70                  |

## Usage

```tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RcPaginatedList, RcDownLoading, RcTopLoading } from "../src";
import "@gaopeng123/rc-paginated-list/rc-paginated-list.cjs.development.css"

const App = () => {
    const request = (params: any, abortController)=> {
        // @ts-ignore
        return new Promise<any>((resolve, reject)=> {
            setTimeout(() => {
                resolve({
                // @ts-ignore
                    data: new Array(20).fill({}).map((item:any, index)=> {
                        return {
                            name: `name-${index * params.current}`
                        }
                    }),
                    total: 100
                })
            }, 1000);
        })
    }
    return (
        <>
            <RcPaginatedList
                request={request}
                render={(record, style)=> {
                    return <div style={style}>{record.name}</div>
                }}
            />
        </>
    );
};

ReactDOM.render(<App/>, document.getElementById('root'));
```
