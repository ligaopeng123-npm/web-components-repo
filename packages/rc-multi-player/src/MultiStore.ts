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

export type PlayerActionKey = 'protocol' | 'objectFit' | 'maxPlayerTime' | 'resolution';

export const DEFAULT_SCREEN_CONFIG = {
    // 协议控制
    protocol: {
        defaultValue: 'FLV',
        options: [
            {
                label: 'HTTP-FLV',
                value: 'FLV'
            },
            {
                label: 'WebRTC',
                value: 'WebRTC'
            }
        ]
    },
    // 铺满全屏
    objectFit: {
        defaultValue: 'fill',
        options: [
            {
                label: '铺满',
                value: 'fill'
            },
            // {label: '裁剪铺满', value: 'cover'},
            {
                label: '原始尺寸',
                value: 'contain'
            },
        ]
    },
    // 倒计时播放// 展示播放倒计时时差
    maxPlayerTime: {
        defaultValue: "forever",
        options: [
            {
                label: '3分钟',
                value: "3min"
            },
            {
                label: '5分钟',
                value: "5min"
            },
            {
                label: '长期',
                value: 'forever'
            }
        ]
    },
    // 分辨率
    resolution: {
        defaultValue: "720P",
        options: [
            {
                label: '720P',
                value: "720P"
            },
            {
                label: '超清',
                value: "4K"
            },
        ]
    },
};

export const State = {
    [MultiStoreEnum.selectedPlayer]: '0',
    [MultiStoreEnum.playerList]: [] as any[],
    [MultiStoreEnum.screenConfig]: DEFAULT_SCREEN_CONFIG
};

export const getLocalStorage = (_id: string) => {
    const val = localStorage.getItem(_id);
    if (val) {
        return Object.assign({}, JSON.parse(localStorage.getItem(_id) as any));
    }
    return {};
}

export const setLocalStorage = (_id: string, val: any) => {
    return localStorage.setItem(_id, val);
}

export const getCurrentStorage = (id: string, valKey: string) => {
    const storage = getLocalStorage(id);
    return storage[valKey]
}

// @ts-ignore
export const ScreenConfigHelper: any = {
    id: '',
    getConfig: () => {
        return getLocalStorage(ScreenConfigHelper.id);
    },
    setConfig: (val: any) => {
        setLocalStorage(ScreenConfigHelper.id, JSON.stringify(val));
    },
    setSingleConfig: (val: any) => {
        ScreenConfigHelper.setConfig(Object.assign({}, ScreenConfigHelper.getConfig(), val))
    },
    getSingleConfig: (valKey: string): any => {
        return ScreenConfigHelper.getConfig()[valKey];
    },
    /**
     * 设置默认参数
     * @param defaultConfigProps
     */
    getDefaultConfig: (defaultConfigProps?: PlayerConfig) => {
        const currentConfig: PlayerActionConfig = {};
        const defaultConfigStorage = ScreenConfigHelper.getConfig();
        const actionConfig = ScreenConfigHelper.getActionConfig(defaultConfigProps);
        for (const i in DEFAULT_SCREEN_CONFIG) {
            const key: PlayerActionKey = i as PlayerActionKey;
            if (defaultConfigProps && defaultConfigProps[key] === false) {
                currentConfig[key] = false;
            } else {
                // @ts-ignore
                const currentOptions = actionConfig[key]?.options;
                const currentValue = ScreenConfigHelper.getDefaultValueByKey(key, defaultConfigStorage, defaultConfigProps) || DEFAULT_SCREEN_CONFIG[key].defaultValue;
                currentConfig[key] = currentOptions
                    .filter((item: PlayerConfigOptions) => item.value === currentValue)?.length
                    ? currentValue
                    : currentOptions[0]?.value;
            }
        }
        const currentDefaultConfig = Object.assign({}, defaultConfigStorage, currentConfig);
        ScreenConfigHelper.setConfig(currentDefaultConfig)
        return currentDefaultConfig;
    },
    /**
     * 匹配当前默认值
     * @param key
     * @param defaultConfigStorage
     * @param defaultConfigProps
     */
    getDefaultValueByKey: (key: PlayerActionKey, defaultConfigStorage: PlayerActionConfig, defaultConfigProps: PlayerActionConfig) => {
        if (defaultConfigStorage[key]) return defaultConfigStorage[key];
        if (defaultConfigProps && defaultConfigProps[key]) {
            // @ts-ignore
            return defaultConfigProps[key].defaultValue ? defaultConfigProps[key].defaultValue : defaultConfigProps[key];
        }
    },
    /**
     * 获取操作后用户定制的参数
     * @param defaultConfigProps
     */
    getActionConfig: (defaultConfigProps?: PlayerConfig) => {
        if (defaultConfigProps) {
            const currentConfig: PlayerActionConfig = {};
            const defaultConfigStorage = ScreenConfigHelper.getConfig();
            for (const i in DEFAULT_SCREEN_CONFIG) {
                const key: PlayerActionKey = i as PlayerActionKey;
                let currentItemConfig: any;
                if (!isUndefined(defaultConfigProps[key])) {
                    // 当前值配置为false时 则不支持该配置
                    if (defaultConfigProps[key] === false) {
                        currentItemConfig = {
                            defaultValue: DEFAULT_SCREEN_CONFIG[key].defaultValue,
                            options: [],
                        } as PlayerActionConfig[keyof PlayerActionConfig]
                    } else {
                        // 如果本地存储的是字符串或者配置的字符串 则初始化优先使用本地存储的值
                        // 如果配置的有options 则使用配置的options
                        const currentDefaultValue = ScreenConfigHelper.getDefaultValueByKey(key, defaultConfigStorage, defaultConfigProps);
                        if (isString(currentDefaultValue)) {
                            currentItemConfig = {
                                defaultValue: currentDefaultValue,
                                // @ts-ignore
                                options: defaultConfigProps[key]?.options || DEFAULT_SCREEN_CONFIG[key].options,
                            }
                        } else {
                            currentItemConfig = defaultConfigProps[key];
                        }
                    }
                } else {
                    currentItemConfig = DEFAULT_SCREEN_CONFIG[key];
                }
                currentConfig[key] = currentItemConfig;
            }
            return Object.assign({}, defaultConfigProps, currentConfig)
        } else {
            return DEFAULT_SCREEN_CONFIG;
        }
    },
    /**
     * 获取当前选中的分屏
     */
    getSelectedScreen: () => {
        return ScreenConfigHelper.getConfig()?.defaultSelectedScreen;
    }
}

// @ts-ignore
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
            const newConfig = Object.assign({}, ScreenConfigHelper.getConfig(), {'defaultSelectedScreen': action.value});
            ScreenConfigHelper.setConfig(newConfig);
            return Object.assign({}, state, {[MultiStoreEnum.selectedScreen]: action.value});
        case MultiStoreEnum.selectedPlayer:
            return Object.assign({}, state, {[MultiStoreEnum.selectedPlayer]: action.value});
        case MultiStoreEnum.playerList:
            if (isArray(action.value)) {
                return Object.assign({}, state, {[MultiStoreEnum.playerList]: action.value});
            }
            const playerList = state[MultiStoreEnum.playerList];
            const {
                index,
                data
            } = action.value;
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
            const {
                type,
                value
            } = action.value;
            const screenConfig = state[MultiStoreEnum.screenConfig];
            const newScreenConfig = Object.assign({},
                screenConfig, ScreenConfigHelper.getConfig(), {[type]: value});
            ScreenConfigHelper.setConfig(newScreenConfig);
            return Object.assign({}, state, {[MultiStoreEnum.screenConfig]: newScreenConfig});
        default:
            return state;
    }
};
