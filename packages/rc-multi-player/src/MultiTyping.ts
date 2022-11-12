/**********************************************************************
 *
 * @模块名称: MultiTyping
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
import { PlayerConfig, PlayerEvents, RcFlvPlayerProps } from "./Player/PlayerTyping";
import { MediaDataSource } from "@gaopeng123/multi-player";

export enum MultiStoreEnum {
    // 布局数据
    layout = 'layout',
    // 选中的分屏
    selectedScreen = 'selectedScreen',
    // 选中的播放器
    selectedPlayer = 'selectedPlayer',
    // 播放器集合
    playerList = 'playerList',
    // 打开配置drawer
    drawer = 'drawer',
    // 流媒体协议
    screenConfig = 'screenConfig',
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

// 分屏视频类型
export type ScreenConfigProps = {
    selectedScreen: any,
    selectedPlayer: string,
} & PlayerConfig;

export type MultiScreenPlayerProps = {
    id?: string;
    proxy?: string; // 代理地址
    actionPlacement?: 'top' | 'bottom';
    defaultSelectedScreen?: 1 | 4 | 6 | 8 | 9 | 12 | 13 | 16; // 默认的分屏路数
    defaultPlayerConfig?: PlayerConfig,
    events?: PlayerEvents,
    currentConfig?: {
        playerConfig: PlayerConfig & { layoutIndex: number },
        mediaDataSource?: MediaDataSource
    }
} & RcFlvPlayerProps;


export type MultiScreenPlayerRef = {
    // 获取协议类型
    getScreenConfig: () => ScreenConfigProps;
};
