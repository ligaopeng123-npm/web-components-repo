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

type DataSource = { data: Array<any>, total: number };
type PaginationProps = {
    pageSize?: number,
    current?: number
};

type PaginatedListProps = {
    upLoading?: ReactNode,
    downLoading?: ReactNode,
    pagination?: PaginationProps,
    request?: (params: PaginationProps) => Promise<DataSource>;
};

const PaginatedList: React.FC<PaginatedListProps> = (props) => {
    const { current, pageSize } = Object.assign({}, props.pagination);
    const { upLoading, downLoading } = props;
    const ref = useRef<HTMLDivElement>();
    return (
        <div ref={ref}>

            {upLoading}
            {props.children}
            {downLoading}
        </div>
    )
};

export default PaginatedList;
