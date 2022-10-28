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
import { RcMultiPlayerProps } from "../RcMultiPlayer";

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

export type Protocol = 'FLV' | 'WebRTC'; // 协议 默认为flv

export type  PlayerConfig = { protocol?: Protocol, title?: string };
export type LayoutPlayerProps = {
    playerConfig: PlayerConfig;
    selected?: boolean; // 是否是当前选中颜色
    layoutIndex?: string; // 当前是多屏中的第几个视频
} & RcMultiPlayerProps & PlayerProps;


export type PlayerEvents = {
    onLoadStart?: ()=> void ;
}
