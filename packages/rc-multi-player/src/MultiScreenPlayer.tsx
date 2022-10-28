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
import React, { useEffect, useReducer } from 'react';
import styles from './styles.module.less';
import { reducer, State } from "./MultiStore";
import LayoutContent from "./Layout/LayoutContent";
import { MultiScreenPlayerProps, MultiStoreEnum } from "./MultiTyping";
import { LayoutJson } from "./assets";
import MultiScreenPlayerAction from "./Action/MultiScreenPlayerAction";
import { ThemeProvider } from "@mui/material";
import { DefaultTheme } from "./Theme";

const RcMultiScreenPlayer: React.FC<MultiScreenPlayerProps> = (props) => {
    const { defaultSelectedScreen, mediaDataSource, playerConfig } = props; //selectedScreen
    /**
     * 根据配置 初始化参数
     */
    const [state, dispatch] = useReducer(reducer, State, (currentState) => {
        const currentDefaultSelectedScreen = defaultSelectedScreen || 1;
        const currentSelectedLayout = LayoutJson?.data?.filter((item) => item.key === `${currentDefaultSelectedScreen}`);
        return Object.assign({}, currentState, {
            [MultiStoreEnum.selectedScreen]: currentDefaultSelectedScreen,
            [MultiStoreEnum.layout]: currentSelectedLayout[0] || {},
            [MultiStoreEnum.playerList]: new Array(currentDefaultSelectedScreen),
        });
    });
    /**
     *
     */
    useEffect(() => {
        console.log(state[MultiStoreEnum.selectedPlayer])
        if (playerConfig && mediaDataSource) {
            dispatch({
                type: MultiStoreEnum.playerList,
                value: {
                    index: state[MultiStoreEnum.selectedPlayer],
                    data: {
                        mediaDataSource,
                        playerConfig
                    }
                }
            })
        }
    }, [playerConfig, mediaDataSource]);

    return (
        <ThemeProvider theme={DefaultTheme}>
            <div className={styles.main} id="multi-screen-player">
                <MultiScreenPlayerAction state={state} dispatch={dispatch}/>
                <LayoutContent state={state} dispatch={dispatch}/>
            </div>
        </ThemeProvider>
    )
};

export default RcMultiScreenPlayer;
