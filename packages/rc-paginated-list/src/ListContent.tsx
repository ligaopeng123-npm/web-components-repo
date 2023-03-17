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
import React from 'react';
import { FixedSizeList, FixedSizeListProps, ListChildComponentProps, ListOnScrollProps } from 'react-window';

type ListContentProps = {
    sessionKey?: string;
    data: Array<any>;
    onScroll?: (v: ListOnScrollProps) => void;
    render: any;
} & FixedSizeListProps;

const ListContent = (props: ListContentProps) => {
    const {sessionKey, data, onScroll, render} = props;
    const renderItem = ({index, style}: ListChildComponentProps): any=> {
        if (render) {
            return render(data[index], style);
        }
        return null;
    }
    return (
        <FixedSizeList
            height={100}
            itemCount={3}
            itemSize={20}
            width={'100%'}
            {...props}
            onScroll={(p) => {
                if (data?.length && sessionKey) {
                    sessionStorage.setItem(sessionKey, `${p.scrollOffset}`);
                }
                onScroll && onScroll(p);
            }}
        >{renderItem}</FixedSizeList>
    )
}

export default ListContent;