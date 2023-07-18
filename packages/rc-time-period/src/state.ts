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
import { EnumWeekState } from "./interface";
import { assignDeep, isEqual } from "@gaopeng123/utils";

const defaultPanelOptions = {
    left: 30,
    right: 30,
    top: 50,
    bottom: 30,
    scale: {
        y: {
            width: 80,
            data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
        },
        x: {
            height: 28,
            data: ['00', '02', '04', '06', '08', '10', '12', '14', '16', '18', '20', '22', '24']
        }
    },
    operate: {
        width: 50
    },
    cleared: false // 清空按钮
}

export const state = {
    [EnumWeekState.panelOptions]: defaultPanelOptions
};

/**
 * 公共数据共享
 * @param state
 * @param action
 */
export const reducer = (state: any, action: any) => {
    switch (action.type) {
        case EnumWeekState.panelOptions:
            if (isEqual(action.value, state[EnumWeekState.panelOptions])) {
                return state;
            }
            return Object.assign({}, state, {[EnumWeekState.panelOptions]: assignDeep(defaultPanelOptions, action.value)});
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