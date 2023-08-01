/**********************************************************************
 *
 * @模块名称: RcScrollNav
 *
 * @模块用途: RcScrollNav
 *
 * @创建人: wangxiangyu
 *
 * @date: 2023-08-01 15:54:24
 *
 **********************************************************************/
import React, { FC, useEffect, useState } from 'react';
import "@gaopeng123/scroll-nav";
import { ScrollNavProps, ScrollNavItem } from "@gaopeng123/scroll-nav";

export type RcScrollNavProps = {
    textColor?: string; // 字体颜色
    items: Array<ScrollNavItem>; // {label: string, value: string} value为dom的id
    scrollDom?: string, // 滚动的dom 默认为body
    primaryColor?: string, // 选中的颜色
    backgroundColor?: string, // 背景色 默认为#fff
    onChange?: (v: any)=> void; // 事件
};

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'scroll-nav': ScrollNavProps
        }
    }
}

const RcScrollNav: FC<RcScrollNavProps> = (props) => {
    const [id,] = useState(`RcScrollNav-${Date.now()}`);
    const {
        scrollDom,
        primaryColor,
        backgroundColor,
        textColor,
        items,
        onChange
    } = props;
    useEffect(() => {
        const nav = document.querySelector(`#${id}`);
        const _onChange = ({detail}: any)=> {
            if (onChange) {
                onChange!(detail);
            }
        }
        if (nav) {
            nav.addEventListener('onChange', _onChange);
        }
        return ()=> {
            nav?.removeEventListener('onChange', _onChange);
        }
    }, []);

    useEffect(()=> {
        const nav = document.querySelector(`#${id}`);
        nav.setAttribute('items', JSON.stringify(items))
    }, [items]);

    return (
        <scroll-nav
            id={id}
            scroll-dom={scrollDom}
            primary-color={primaryColor}
            background-color={backgroundColor}
            text-color={textColor}>
            <div
                slot="content">{props.children}</div>
        </scroll-nav>
    )
};

export default RcScrollNav;
