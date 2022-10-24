/**********************************************************************
 *
 * @模块名称: Store
 *
 * @模块用途: Multi Store 状态管理
 *
 * @创建人: pgli
 *
 * @date: 2022-10-20 13:48:15
 *
 **********************************************************************/
import { Action, MultiStoreEnum } from "./MultiTyping";

export const State = {
    [MultiStoreEnum.selectedPlayer]: '0'
};

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
        case MultiStoreEnum.refresh:
            return Object.assign({}, state, { [MultiStoreEnum.refresh]: action.value });
        default:
            return state;
    }
};

