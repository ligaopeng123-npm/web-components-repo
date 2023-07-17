/**********************************************************************
 *
 * @模块名称: state
 *
 * @模块作用: state
 *
 * @创建人: pgli
 *
 * @date: 2023/7/17 2:25 下午
 *
 * @版权所有: pgli
 *
 **********************************************************************/

/**
 * 枚举定义类型
 */
import {EnumWeekState} from "./interface";

export const state = {};

/**
 * 公共数据共享
 * @param state
 * @param action
 */
export const reducer = (state: any, action: any) => {
    switch (action.type) {
        case EnumWeekState.periodClick:
            return Object.assign({}, state, {[EnumWeekState.periodClick]: action.value});
        case EnumWeekState.copyClick:
            return Object.assign({}, state, {[EnumWeekState.copyClick]: action.value});
        case EnumWeekState.periodDelete:
            return Object.assign({}, state, {[EnumWeekState.periodDelete]: action.value});
        case EnumWeekState.periodEdit:
            return Object.assign({}, state, {[EnumWeekState.periodEdit]: action.value});
        case EnumWeekState.clearClick:
            return Object.assign({}, state, {[EnumWeekState.clearClick]: action.value});
        case EnumWeekState.periodTip:
            return Object.assign({}, state, {[EnumWeekState.periodTip]: action.value});
        case EnumWeekState.copyObject:
            return Object.assign({}, state, {[EnumWeekState.copyObject]: action.value});
        default:
            return state;
    }
};

export const initState = (state: any) => {
    return state;
};