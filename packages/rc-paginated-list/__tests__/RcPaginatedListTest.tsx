/**********************************************************************
 *
 * @模块名称: RcPaginatedListTest
 *
 * @模块作用: RcPaginatedListTest
 *
 * @创建人: pgli
 *
 * @date: 2023/9/22 3:29 下午
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import * as React from 'react';
import { RcPaginatedList, PaginatedListProps } from "../src";

const RcPaginatedListTest: React.FC<PaginatedListProps> = (props) => {
    const request = (params: any, abortController: AbortController) => {
        return new Promise<any>((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    data: new Array(100).fill({}).map((item: any, index) => {
                        return {
                            name: `第-${index * params.current}-条数据`
                        }
                    }),
                    total: 100
                })
            }, 1000);
        })
    }

    return (
        <>
            {/*@ts-ignore*/}
            <RcPaginatedList
                primaryColor={'#1a3217'}
                {...props}
                request={request}
                render={(record: any, style: React.CSSProperties) => {
                    return <div style={style}>{record.name}</div>
                }}
            ></RcPaginatedList>
        </>
    );
}

export default RcPaginatedListTest;