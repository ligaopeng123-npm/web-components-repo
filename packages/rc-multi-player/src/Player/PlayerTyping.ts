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

import { ReactNode } from "react";
import { Config, MediaDataSource, MultiPlayerRobustness, ObjectFit } from "@gaopeng123/multi-player";
import { DomStyle } from "../MultiTyping";

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

type RobustnessProps = {
    // 健壮性配置
    robustness?: MultiPlayerRobustness & { retryDuration?: DOMHighResTimeStamp };
}

export type RcFlvPlayerProps =
    {
        extraParams?: any;
        width?: string | number;
        height?: string | number;
        // 视频填充方式
        objectFit?: ObjectFit;
        mediaDataSource?: MediaDataSource;
        // 播放器配置
        config?: Config,
        // 事件集合
        events?: PlayerEvents,
    }
    & DomStyle
    & RobustnessProps;


export type PlayerEvents = {
    // 视频播放开始
    onLoadStart?: (playerConfig?: PlayerConfig) => void;
    // 点击视频重新加载
    onReload?: (playerConfig?: PlayerConfig) => void;
    // 加载错误
    onLoadError?: (playerConfig?: PlayerConfig) => void;
    // 流加载结束
    onLoadEnd?: (playerConfig?: PlayerConfig) => void;
    // 最大重试次数
    onMaxReload?: (playerConfig?: PlayerConfig) => void;
    // 视频结束
    onClose?: (playerConfig?: PlayerConfig) => void;
    // 时间变更参数
    onTimeChange?: (playerConfig?: PlayerConfig) => void;
}

export type Protocol =
    'FLV'
    | 'WebRTC'; // 协议 默认为flv
export type MaxPlayerTime =
    "3min"
    | '5min'
    | 'forever';
export type Resolution =
    "4K"
    | "720P";
// 视频配置
export type PlayerConfigOptions = {
    label: string;
    value: string;
}

export type PlayerActionConfig = {
    // 协议类型
    protocol?: Protocol | false | {
        defaultValue: Protocol,
        options: Array<PlayerConfigOptions>
    };
    // 视频拉伸方式
    objectFit?: ObjectFit | false | {
        defaultValue: ObjectFit,
        options: Array<PlayerConfigOptions>
    };
    // 是否播放时长
    maxPlayerTime?: MaxPlayerTime | false | {
        defaultValue: MaxPlayerTime,
        options: Array<PlayerConfigOptions>
    };
    // 视频分辨率
    resolution?: Resolution | false | {
        defaultValue: Resolution,
        options: Array<PlayerConfigOptions>
    };
    // 视频工具栏
    videoToolbar?: {
        close?: boolean; // 是否可关闭
        screenshot?: boolean; // 是否可截图
        fullScreen?: boolean; // 是否支持全屏
    }
}

export type  PlayerConfig =
    {
        title?: string,
        // 额外参数
        extraParams?: any;
        // 有流的数据
        periods?: Array<{ startTime: string, endTime: string }>;
        // 初始播放时间
        currentTime?: string;
        // 倍速
        'speed-value' ?: string | number;
        // 快进秒数
        'forward-value' ?: string | number;
        // flv视频配置
        config?: Config;
    }
    & PlayerActionConfig
    & RobustnessProps;

// 多屏播放器
export type LayoutPlayerProps =
    {
        playerConfig?: PlayerConfig;
        selected?: boolean; // 是否是当前选中颜色
        layoutIndex?: string; // 当前是多屏中的第几个视频
        events?: PlayerEvents;
    }
    & RcMultiPlayerProps
    & PlayerProps;

export type RcMultiPlayerProps =
    {
        title?: string | ReactNode;
    }
    & DomStyle
    & RcFlvPlayerProps
    & PlayerConfig;

export type WebRtcPlayerProps =
    {}
    & RcFlvPlayerProps;

export type RcPlayerRef = {
    close: () => void;
    reload: () => void;
    getVideo: () => HTMLVideoElement;
    __timer?: any;
    playerConfig?: PlayerConfig
}