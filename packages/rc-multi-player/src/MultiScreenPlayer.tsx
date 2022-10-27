/**********************************************************************
 *
 * @模块名称: MultiScreenPlayer
 *
 * @模块用途: MultiScreenPlayer 多屏幕开发
 *
 * @创建人: pgli
 *
 * @date: 2022/10/19 11:10
 *
 **********************************************************************/
import React, { useReducer } from 'react';
import ActionColumn from "./components/ActionColumn";
import styles from './styles.module.less';
import { reducer, State } from "./MultiStore";
import LayoutContent from "./components/LayoutContent";
import { MultiStoreEnum } from "./MultiTyping";
import { LayoutJson } from "./assets";

type MultiScreenPlayerProps = {
    actionPlacement?: 'top' | 'bottom';
    defaultSelectedScreen?: 1 | 4 | 6 | 8 | 9 | 12 | 13 | 16; // 默认的分屏路数
};

const RcMultiScreenPlayer: React.FC<MultiScreenPlayerProps> = (props) => {
    const { defaultSelectedScreen } = props; //selectedScreen
    /**
     * 根据配置 初始化参数
     */
    const [state, dispatch] = useReducer(reducer, State, (currentState) => {
        const currentDefaultSelectedScreen = defaultSelectedScreen || 1;
        const currentSelectedLayout = LayoutJson?.data?.filter((item) => item.key === `${currentDefaultSelectedScreen}`);
        return Object.assign({}, currentState, {
            [MultiStoreEnum.selectedScreen]: currentDefaultSelectedScreen,
            [MultiStoreEnum.layout]: currentSelectedLayout[0] || {},
        });
    });
    return (
        <div className={styles.main} id="multi-screen-player">
            <ActionColumn state={state} dispatch={dispatch}/>
            <LayoutContent state={state} dispatch={dispatch}/>
        </div>
    )
};

export default RcMultiScreenPlayer;
