/**********************************************************************
 *
 * @模块名称: typing
 *
 * @模块用途: Player 类型系统
 *
 * @创建人: pgli
 *
 * @date: 2022-10-20 13:48:15
 *
 **********************************************************************/

import React, { ReactNode } from "react";
import { Config, MediaDataSource, MultiPlayerRobustness, ObjectFit } from "@gaopeng123/multi-player";

export enum PlayerStoreEnum {
    // 报错信息
    error = 'error',
}

export type Action = {
    value: any;
    type: PlayerStoreEnum
}


/**
 * StoreProps参数
 */
export type Fn = (...args: any) => any;
export type PlayerProps = {
    state: any;
    dispatch: Fn;
    [propName: string]: any;
}

export type RcFlvPlayerProps = {
    extraParams?: any;
    style?: React.CSSProperties;
    width?: string | number;
    height?: string | number;
    // 视频填充方式
    objectFit?: ObjectFit;
    mediaDataSource?: MediaDataSource;
    // 播放器配置
    config?: Config,
    // 健壮性配置
    robustness?: MultiPlayerRobustness;
    // 事件集合
    events?: PlayerEvents,
};


export type PlayerEvents = {
    onLoadStart?: (playerConfig?: PlayerConfig) => void;
    onReload?: (playerConfig?: PlayerConfig) => void;
    // 加载错误
    onLoadError?: (playerConfig?: PlayerConfig) => void;
    // 流加载结束
    onLoadEnd?: (playerConfig?: PlayerConfig)=> void;
    // 最大重试次数
    onMaxReload?: (playerConfig?: PlayerConfig) => void;
    onClose?: (playerConfig?: PlayerConfig) => void;
}

export type Protocol = 'FLV' | 'WebRTC'; // 协议 默认为flv
export type MaxPlayerTime = "3min" | '5min' | 'forever';
export type Resolution = "4K" | "720P";
// 视频配置
export type PlayerConfigOptions = {
    label: string;
    value: string;
}

export type PlayerActionConfig = {
    protocol?: Protocol | false | {
        defaultValue: Protocol,
        options: Array<PlayerConfigOptions>
    },
    // 视频拉伸方式
    objectFit?: ObjectFit | false | {
        defaultValue: ObjectFit,
        options: Array<PlayerConfigOptions>
    };
    // 是否播放时长
    maxPlayerTime?: MaxPlayerTime | false | {
        defaultValue: MaxPlayerTime,
        options: Array<PlayerConfigOptions>
    },
    resolution?: Resolution | false | {
        defaultValue: Resolution,
        options: Array<PlayerConfigOptions>
    }
}

export type  PlayerConfig = {
    title?: string,
    // 额外参数
    extraParams?: any;
} & PlayerActionConfig;
// 多屏播放器
export type LayoutPlayerProps = {
    playerConfig?: PlayerConfig;
    selected?: boolean; // 是否是当前选中颜色
    layoutIndex?: string; // 当前是多屏中的第几个视频
    events?: PlayerEvents;
} & RcMultiPlayerProps & PlayerProps;

export type RcMultiPlayerProps = {
    className?: string;
    title?: string | ReactNode;
} & RcFlvPlayerProps & PlayerConfig;

export type WebRtcPlayerProps = {} & RcFlvPlayerProps;

export type RcPlayerRef = {
    close: () => void;
    reload: () => void;
    __timer?: any;
}
