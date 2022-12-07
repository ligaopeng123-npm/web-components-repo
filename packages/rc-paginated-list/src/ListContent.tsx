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
import { FixedSizeList, ListChildComponentProps, ListOnScrollProps } from 'react-window';

type ListContentProps = {
    sessionKey?: string;
    data: Array<any>;
    onScroll?: (v:ListOnScrollProps)=> void;
}
const ListContent = (props: ListContentProps)=> {
    const {sessionKey,data, onScroll} = props;
    return (
        <FixedSizeList
            onScroll={(p) => {
                if (data?.length && sessionKey) {
                    sessionStorage.setItem(sessionKey, `${p.scrollOffset}`);
                }
                // "backward" 向上  forward 向下
                // if (onForward && onBackward) {
                //     if (p.scrollDirection === 'forward') {
                //         if ((p.scrollOffset + contentHeight >= height * data.length)) {
                //             onForward();
                //         }
                //     } else if (p.scrollDirection === 'backward') {
                //         if (!p.scrollOffset) {
                //             onBackward();
                //         }
                //     }
                // }
                onScroll && onScroll(p);
            }}
         children={null} height={100} itemCount={3} itemSize={20} width={'100%'}/>
    )
}

export default ListContent;