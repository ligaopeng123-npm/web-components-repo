/**********************************************************************
 *
 * @模块名称: PaginatedList
 *
 * @模块用途: PaginatedList 分页列表 支持下拉刷新 上拉加载
 *
 * @创建人: pgli
 *
 * @date: 2022/10/9 8:31
 *
 **********************************************************************/
import React, { useState, useEffect, ReactNode, useRef } from 'react';
import ListContent from "./ListContent";

type DataSource = { data: Array<any>, total: number };
type PaginationProps = {
    pageSize?: number;
    current?: number;
};

type PaginatedListProps = {
    upLoading?: ReactNode,
    downLoading?: ReactNode,
    pagination?: PaginationProps,
    params?: any;
    request?: (params: PaginationProps) => Promise<DataSource>;
};

const PaginatedList: React.FC<PaginatedListProps> = (props) => {
    const {pagination, request, params} = props;
    const { current, pageSize } = Object.assign({}, pagination);
    const [data, setData] = useState([]);
    const { upLoading, downLoading } = props;
    const ref = useRef<HTMLDivElement>();
    useEffect(()=> {
        if (request) {
            request(Object.assign({}, params, {current, pageSize})).then(()=> {

            })
        }
    }, [params]);
    return (
        <div ref={ref}>
            {upLoading}
            <ListContent data={data}/>
            {downLoading}
        </div>
    )
};

export default PaginatedList;
