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
import { isArray, isString, isUndefined } from "@gaopeng123/utils";
import { PlayerActionConfig, PlayerConfig, PlayerConfigOptions } from "./Player/PlayerTyping";

export const DEFAULT_SCREEN_CONFIG: PlayerActionConfig = {
    // 协议控制
    protocol: {
        defaultValue: 'FLV',
        options: [
            {label: 'HTTP-FLV', value: 'FLV'},
            {label: 'WebRTC', value: 'WebRTC'}
        ]
    },
    // 铺满全屏
    objectFit: {
        defaultValue: 'fill',
        options: [
            {label: '铺满', value: 'fill'},
            // {label: '裁剪铺满', value: 'cover'},
            {label: '原始尺寸', value: 'contain'},
        ]
    },
    // 倒计时播放// 展示播放倒计时时差
    maxPlayerTime: {
        defaultValue: "forever",
        options: [
            {label: '3分钟', value: "3min"},
            {label: '5分钟', value: "5min"},
            {label: '长期', value: 'forever'}
        ]
    },
    // 分辨率
    resolution: {
        defaultValue: "720P",
        options: [
            {label: '720P', value: "720P"},
            {label: '超清', value: "4K"},
        ]
    },
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

export const ScreenConfigHelper = {
    id: '',
    getConfig: () => {
        return getLocalStorage(ScreenConfigHelper.id);
    },
    setConfig: (val: any) => {
        setLocalStorage(ScreenConfigHelper.id, JSON.stringify(val));
    },
    getDefaultConfig: (defaultConfigProps: PlayerConfig) => {
        const currentConfig: PlayerActionConfig = {};
        const defaultConfigStorage = ScreenConfigHelper.getConfig();
        const actionConfig = ScreenConfigHelper.getActionConfig(defaultConfigProps);
        for (const key in DEFAULT_SCREEN_CONFIG) {
            // @ts-ignore
            if (defaultConfigProps[key] === false) {
                // @ts-ignore
                currentConfig[key] = false;
            } else {
                // @ts-ignore
                const currentOptions = actionConfig[key]?.options;
                // @ts-ignore
                const currentValue = defaultConfigStorage[key] || DEFAULT_SCREEN_CONFIG[key].defaultValue;
                // @ts-ignore
                currentConfig[key] = currentOptions.filter((item: PlayerConfigOptions) => item.value === currentValue)?.length ? currentValue : currentOptions[0]?.value;
            }
        }
        return Object.assign({}, defaultConfigStorage, currentConfig);
    },
    // 设置默认参数
    getActionConfig: (defaultConfigProps: PlayerConfig) => {
        if (defaultConfigProps) {
            const currentConfig: PlayerActionConfig = {};
            const defaultConfigStorage = ScreenConfigHelper.getConfig();
            for (const key in DEFAULT_SCREEN_CONFIG) {
                // @ts-ignore
                if (!isUndefined(defaultConfigProps[key])) {
                    // @ts-ignore 当前值配置为false时 则不支持该配置
                    if (defaultConfigProps[key] === false) {
                        // @ts-ignore
                        currentConfig[key] = {
                            // @ts-ignore
                            defaultValue: DEFAULT_SCREEN_CONFIG[key].defaultValue,
                            options: [],
                        }
                    } else {
                        // @ts-ignore  如果本地存储的是字符串或者配置的字符串 则初始化优先使用本地存储的值
                        // 如果配置的有options 则使用配置的options
                        if (isString(defaultConfigStorage[key]) || isString(defaultConfigProps[key])) {
                            // @ts-ignore
                            currentConfig[key] = {
                                // @ts-ignore
                                defaultValue: defaultConfigStorage[key] || defaultConfigProps[key],
                                // @ts-ignore
                                options: defaultConfigProps[key]?.options || DEFAULT_SCREEN_CONFIG[key].options,
                            }
                        } else {
                            // @ts-ignore
                            currentConfig[key] = defaultConfigProps[key];
                        }
                    }
                } else {
                    // @ts-ignore
                    currentConfig[key] = DEFAULT_SCREEN_CONFIG[key];
                }
            }
            return Object.assign({}, defaultConfigProps, currentConfig)
        } else {
            return DEFAULT_SCREEN_CONFIG;
        }
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
            return Object.assign({}, state, {[MultiStoreEnum.layout]: action.value});
        case MultiStoreEnum.selectedScreen:
            return Object.assign({}, state, {[MultiStoreEnum.selectedScreen]: action.value});
        case MultiStoreEnum.selectedPlayer:
            return Object.assign({}, state, {[MultiStoreEnum.selectedPlayer]: action.value});
        case MultiStoreEnum.playerList:
            if (isArray(action.value)) {
                return Object.assign({}, state, {[MultiStoreEnum.playerList]: action.value});
            }
            const playerList = state[MultiStoreEnum.playerList];
            const {index, data} = action.value;
            if (JSON.stringify(playerList[index]) !== JSON.stringify(data)) {
                playerList[index] = data;
                return Object.assign({}, state, {[MultiStoreEnum.playerList]: playerList});
            }
            return state;
        case MultiStoreEnum.drawer:
            return Object.assign({}, state, {[MultiStoreEnum.drawer]: action.value});
        case MultiStoreEnum.actionConfig:
            return Object.assign({}, state, {[MultiStoreEnum.actionConfig]: action.value});
        case MultiStoreEnum.screenConfig:
            const {type, value} = action.value;
            const screenConfig = state[MultiStoreEnum.screenConfig];
            const newScreenConfig = Object.assign({}, screenConfig, {[type]: value});
            ScreenConfigHelper.setConfig(newScreenConfig);
            return Object.assign({}, state, {[MultiStoreEnum.screenConfig]: newScreenConfig});
        default:
            return state;
    }
};
