import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RcPaginatedList } from "../src";


const App = () => {
    const request = (params: any, abortController: AbortController)=> {
        // @ts-ignore
        return new Promise<any>((resolve, reject)=> {
            setTimeout(() => {
                resolve({
                // @ts-ignore
                    data: new Array(0).fill({}).map((item:any, index)=> {
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
                primaryColor={'#1a3217'}
                request={request}
                render={(record: any, style: React.CSSProperties)=> {
                    return <div style={style}>{record.name}</div>
                }}
            />
        </>
    );
};

ReactDOM.render(<App/>, document.getElementById('root'));
