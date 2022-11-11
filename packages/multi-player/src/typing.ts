/** ********************************************************************
 *
 * @模块名称: typing
 *
 * @模块用途: typing
 *
 * @date: 2022/3/21 16:15
 *
 * @版权所有: pgli
 *
 ********************************************************************* */
import mpegts from 'mpegts.js';

export type MultiPlayerRobustness = {
    bufferTime: DOMHighResTimeStamp;     //    播放过程中缓冲器最小矫正的时间 默认为1000ms
    loopBufferTime: DOMHighResTimeStamp; // 多场时间探测一次 默认5000ms
    maxResetTimes: number;        // 最大断线重连次数 默认为 5 次
};

export type MediaDataSource = mpegts.MediaDataSource;
export type Config = mpegts.Config;

export type ObjectFit = 'fill' | 'contain ' | 'cover ' | 'scale-down' | 'none ' | 'initial ' | 'inherit';
export type MultiPlayerComProps = {
    style?: any;
    id?: string;
    // 视频填充方式
    'object-fit'?: ObjectFit;
    width?: string | number;
    height?: string | number;
    // 视频播放配置
    'media-data-source': mpegts.MediaDataSource;
    // 播放器配置
    config: mpegts.Config,
    // 健壮性配置
    robustness: MultiPlayerRobustness;
}

// @ts-ignore
export type MultiPlayerEventType = mpegts.Events.ERROR |
    // @ts-ignore
    mpegts.Events.LOADING_COMPLETE |
    // @ts-ignore
    mpegts.Events.RECOVERED_EARLY_EOF |
    // @ts-ignore
    mpegts.Events.MEDIA_INFO |
    // @ts-ignore
    mpegts.Events.METADATA_ARRIVED |
    // @ts-ignore
    mpegts.Events.SCRIPTDATA_ARRIVED |
    // @ts-ignore
    mpegts.Events.TIMED_ID3_METADATA_ARRIVED |
    // @ts-ignore
    mpegts.Events.PES_PRIVATE_DATA_DESCRIPTOR |
    // @ts-ignore
    mpegts.Events.PES_PRIVATE_DATA_ARRIVED |
    // @ts-ignore
    mpegts.Events.STATISTICS_INFO


// @ts-ignore
export type MultiPlayerErrorType = mpegts.ErrorTypes.NETWORK_ERROR |
    // @ts-ignore
    mpegts.ErrorTypes.MEDIA_ERROR |
    // @ts-ignore
    mpegts.ErrorTypes.OTHER_ERROR

export enum MultiPlayerError {
    // @ts-ignore
    NETWORK_ERROR = mpegts.ErrorTypes.NETWORK_ERROR,
    // @ts-ignore
    MEDIA_ERROR = mpegts.ErrorTypes.NETWORK_ERROR,
    // @ts-ignore
    OTHER_ERROR = mpegts.ErrorTypes.NETWORK_ERROR,
}

export enum MultiPlayerEvent {
    // @ts-ignore
    ERROR = mpegts.Events.ERROR,
    // @ts-ignore
    LOADING_COMPLETE = mpegts.Events.LOADING_COMPLETE,
    // @ts-ignore
    RECOVERED_EARLY_EOF = mpegts.Events.RECOVERED_EARLY_EOF,
    // @ts-ignore
    MEDIA_INFO = mpegts.Events.MEDIA_INFO,
    // @ts-ignore
    METADATA_ARRIVED = mpegts.Events.METADATA_ARRIVED,
    // @ts-ignore
    SCRIPTDATA_ARRIVED = mpegts.Events.SCRIPTDATA_ARRIVED,
    // @ts-ignore
    TIMED_ID3_METADATA_ARRIVED = mpegts.Events.TIMED_ID3_METADATA_ARRIVED,
    // @ts-ignore
    PES_PRIVATE_DATA_DESCRIPTOR = mpegts.Events.PES_PRIVATE_DATA_DESCRIPTOR,
    // @ts-ignore
    PES_PRIVATE_DATA_ARRIVED = mpegts.Events.PES_PRIVATE_DATA_ARRIVED,
    // @ts-ignore
    STATISTICS_INFO = mpegts.Events.STATISTICS_INFO,
    // 缓冲区数据过少，开始
    LOADING_COMPLETE_IMG = 'loading_complete_img',
    // 开始加载数据
    LOAD_START = 'load_start',
}
