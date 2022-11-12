/**********************************************************************
 *
 * @模块名称: MultiStore
 *
 * @模块用途: Multi Store 状态管理
 *
 * @创建人: pgli
 *
 * @date: 2022-10-20 13:48:15
 *
 **********************************************************************/
import { Action, MultiStoreEnum } from "./MultiTyping";
import { isArray } from "@gaopeng123/utils";

export const DEFAULT_SCREEN_CONFIG = {
    protocol: 'FLV',
    objectFit: 'fill', // 铺满全屏
    maxPlayerTime: "forever", // 展示播放倒计时时差
};

export const State = {
    [MultiStoreEnum.selectedPlayer]: '0',
    [MultiStoreEnum.playerList]: [] as any[],
    [MultiStoreEnum.screenConfig]: DEFAULT_SCREEN_CONFIG
};

export const getLocalStorage = (_id: string) => {
    return localStorage.getItem(_id) ? Object.assign({}, JSON.parse(localStorage.getItem(_id))) : {};
}

export const setLocalStorage = (_id: string, val: any) => {
    return localStorage.setItem(_id, val);
}

const ScreenConfigHelper = {
    id: '',
    getConfig: () => {
        return getLocalStorage(ScreenConfigHelper.id);
    },
    setConfig: (val: any) => {
        setLocalStorage(ScreenConfigHelper.id, JSON.stringify(val));
    }
}

export function ScreenConfig(id: string) {
    ScreenConfigHelper.id = id;
    return ScreenConfigHelper;
}

export const init = (state: any) => {
    return state
};

export const reducer = (state: any, action: Action) => {
    switch (action.type) {
        case MultiStoreEnum.layout:
            return Object.assign({}, state, { [MultiStoreEnum.layout]: action.value });
        case MultiStoreEnum.selectedScreen:
            return Object.assign({}, state, { [MultiStoreEnum.selectedScreen]: action.value });
        case MultiStoreEnum.selectedPlayer:
            return Object.assign({}, state, { [MultiStoreEnum.selectedPlayer]: action.value });
        case MultiStoreEnum.playerList:
            if (isArray(action.value)) {
                return Object.assign({}, state, { [MultiStoreEnum.playerList]: action.value });
            }
            const playerList = state[MultiStoreEnum.playerList];
            const { index, data } = action.value;
            if (JSON.stringify(playerList[index]) !== JSON.stringify(data)) {
                playerList[index] = data;
                return Object.assign({}, state, { [MultiStoreEnum.playerList]: playerList });
            }
            return state;
        case MultiStoreEnum.drawer:
            return Object.assign({}, state, { [MultiStoreEnum.drawer]: action.value });
        case MultiStoreEnum.screenConfig:
            const { type, value } = action.value;
            const screenConfig = state[MultiStoreEnum.screenConfig];
            const newScreenConfig = Object.assign({}, screenConfig, { [type]: value });
            ScreenConfigHelper.setConfig(newScreenConfig);
            return Object.assign({}, state, { [MultiStoreEnum.screenConfig]: newScreenConfig });
        default:
            return state;
    }
};
