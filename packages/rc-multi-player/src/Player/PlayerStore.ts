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
import { Action, PlayerStoreEnum } from "./PlayerTyping";

export const State = {
    [PlayerStoreEnum.error]: ''
};

export const init = (state: any) => {
    return state
};

export const reducer = (state: any, action: Action) => {
    switch (action.type) {
        case PlayerStoreEnum.error:
            return Object.assign({}, state, { [PlayerStoreEnum.error]: action.value });
        default:
            return state;
    }
};

