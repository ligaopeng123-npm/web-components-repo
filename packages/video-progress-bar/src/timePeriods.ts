/**********************************************************************
 *
 * @模块名称: timePeriods
 *
 * @模块作用: timePeriods 时间段去噪
 *
 * @创建人: pgli
 *
 * @date: 2023/7/5 3:20 下午
 *
 * @版权所有: pgli
 *
 **********************************************************************/

import { getTime } from "@gaopeng123/utils";

/**
 * 获取时间戳
 * @param str
 * @returns {number}
 */
export const getTimeByString = (str: string) => {
    return getTime(str)
}

/**
 * 添加上时间戳 方便计算
 * @param current
 * @returns {{[p: string]: number}}
 */
const addTimestamp = (current: any, config: { startKey: string, endKey: string }) => {
    const {
        startKey,
        endKey
    } = config;
    return {
        [`__start`]: getTimeByString(current[startKey]),
        [`__end`]: getTimeByString(current[endKey])
    }
}

/**
 * 时间段去噪
 */
export const reduceTimeSlotInterference = (periods: Array<any>, config: { startKey: string, endKey: string }) => {
    /**
     * 时间的key属性
     */
    const {
        startKey,
        endKey,
        noiseInterval
    } = Object.assign({
        startKey: 'startTime',
        endKey: 'endTime',
        noiseInterval: 5000
    }, config);

    /**
     * 存储新的时间段
     * @type {*[]}
     */
    const newPeriods = [];
    /**
     * 当前时间段 作为临时字段进行
     * @type {{}}
     */
    let currentPeriods: any;
    periods.concat([{
        [startKey]: Number.MIN_SAFE_INTEGER
    }]).forEach((currentValue: any, index: number, arr: Array<any>) => {
        if (index > 0) {
            if (getTimeByString(currentValue[startKey]) - getTimeByString(currentPeriods[endKey]) <= noiseInterval) {
                currentPeriods[endKey] = currentValue[endKey];
            } else {
                newPeriods.push(Object.assign(addTimestamp(currentPeriods, {
                    startKey,
                    endKey
                }), currentPeriods));
                currentPeriods = currentValue;
            }
        } else {
            currentPeriods = currentValue;
        }
    });
    if (!newPeriods?.length) {
        newPeriods.push(Object.assign(addTimestamp(currentPeriods, {
            startKey,
            endKey
        }), currentPeriods));
    }
    return newPeriods;
}