import { formatTimestamp, getTime, TimestampType } from "@gaopeng123/utils";

/**********************************************************************
 *
 * @模块名称: typing
 *
 * @模块作用: typing
 *
 * @创建人: pgli
 *
 * @date: 2023/7/3 7:38 下午
 *
 * @版权所有: pgli
 *
 **********************************************************************/

export type wheelDeltaLevel =
    0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6;

export type VideoProgressBarConfig = {
    'scale-level'?: wheelDeltaLevel,
    'hide-fast'?: boolean,
    'hide-speed'?: boolean,
    'hide-time'?: boolean,
    'height'?: number,
}

export type status =
    'loading'
    | 'polling'
    | 'reset';


/**
 * 每个级别要显示的时长
 * @private
 */
export const SCALE_LEVEL = {
    '0': {
        n: '24h',
        v: 86400000
    }, // 24h 2h
    '1': {
        n: '12h',
        v: 43200000
    },// 12h 1h
    '2': {
        n: '6h',
        v: 21600000
    },// 6h 30m
    '3': {
        n: '1h',
        v: 3600000
    },// 1h 5m
    '4': {
        n: '36m',
        v: 2160000
    },// 36m 3m
    '5': {
        n: '24m',
        v: 1440000
    },// 24m 2m
    '6': {
        n: '12m',
        v: 720000
    }, // 12m 1m
};

export const DEFAULT_CURRENT_TIME = getTime(`${formatTimestamp(Date.now(), 'yyyy-MM-dd')} 00:00:00`);

export type VideoOptions = { periods: Array<{ startTime: string, endTime: string }>, currentTime: string | number | Date, 'speed-value'?: string, 'forward-value'?: string, minTime?: string, maxTime?: string };