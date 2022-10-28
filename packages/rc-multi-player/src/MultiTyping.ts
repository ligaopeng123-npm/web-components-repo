/**********************************************************************
 *
 * @模块名称: typing
 *
 * @模块用途: Multi 类型系统
 *
 * @创建人: pgli
 *
 * @date: 2022-10-20 13:48:15
 *
 **********************************************************************/

/**
 * store类型系统定义
 */
import * as React from "react";
import { Protocol } from "./Player/PlayerTyping";
import { RcMultiPlayerProps } from "./RcMultiPlayer";

export enum MultiStoreEnum {
    // 布局数据
    layout = 'layout',
    // 选中的分屏
    selectedScreen = 'selectedScreen',
    // 选中的播放器
    selectedPlayer = 'selectedPlayer',
    // 刷新控制
    refresh = 'refresh',
    // 播放器集合
    playerList = 'playerList',
}

export type Action = {
    value: any;
    type: MultiStoreEnum
}

/**
 * StoreProps参数
 */
export type Fn = (...args: any) => any;
export type Props = {
    state: any;
    dispatch: Fn;
    [propName: string]: any;
}

export type LayoutJsonItemRows = {
    height?: string;
    type?: 'row' | 'col';
    width?: number;
    key?: string;
    children?: Array<LayoutJsonItemRows>
}
export type LayoutJsonItem = { name: string; key: string; icon: string; stream: string, children: Array<any> }

export type LayoutButtonProps = {
    className?: string;
    style?: React.CSSProperties;
} & Props;


export type MultiScreenPlayerProps = {
    proxy?: string; // 代理地址
    actionPlacement?: 'top' | 'bottom';
    defaultSelectedScreen?: 1 | 4 | 6 | 8 | 9 | 12 | 13 | 16; // 默认的分屏路数
    extraParams?: any;
    onReLoad?: (index: string, extraParams?: any) => {};
    playerConfig: { protocol?: Protocol, title?: string }
} & RcMultiPlayerProps;
