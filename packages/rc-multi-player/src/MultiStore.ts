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
    [MultiStoreEnum.selectedPlayer]: '0',
    [MultiStoreEnum.playerList]: [] as any[],
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
        case MultiStoreEnum.playerList:
            const playerList = state[MultiStoreEnum.playerList];
            const { index, data } = action.value;
            if (playerList[index] !== data) {
                playerList[index] = data;
                return Object.assign({}, state, { [MultiStoreEnum.playerList]: playerList });
            }
            return state;
        default:
            return state;
    }
};

