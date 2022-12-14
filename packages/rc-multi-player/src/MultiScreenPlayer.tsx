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
import React, { forwardRef, useEffect, useImperativeHandle, useReducer } from 'react';
import { reducer, ScreenConfig, ScreenConfigHelper, State } from "./MultiStore";
import LayoutContent from "./Layout/LayoutContent";
import { MultiScreenPlayerProps, MultiScreenPlayerRef, MultiStoreEnum } from "./MultiTyping";
import { LayoutJson } from "./assets";
import MultiScreenPlayerAction from "./Action/MultiScreenPlayerAction";
import { ThemeProvider } from "@mui/material";
import { DefaultTheme } from "./Theme";
import MultiScreenDrawer from "./Action/MultiScreenDrawer";
import styles from './styles.module.less';
import { isEmptyObject } from "@gaopeng123/utils";

const RcMultiScreenPlayer: React.ForwardRefExoticComponent<React.PropsWithoutRef<MultiScreenPlayerProps> & React.RefAttributes<MultiScreenPlayerRef>> = forwardRef<MultiScreenPlayerRef, MultiScreenPlayerProps>((props, ref) => {
    /**
     * 默认参数 selectedScreen
     */
    const {defaultSelectedScreen, defaultPlayerConfig, currentConfig, id, events} = props;
    /**
     * 唯一标识
     */
    const _id = id || 'multi-screen-player';
    /**
     * 配置参数
     */
    const screenConfig = ScreenConfig(_id);
    /**
     * 根据配置 初始化参数
     */
    const [state, dispatch] = useReducer(reducer, State, (currentState) => {
        const currentDefaultSelectedScreen = defaultSelectedScreen || 1;
        const currentSelectedLayout = LayoutJson?.data?.filter((item) => item.key === `${currentDefaultSelectedScreen}`);
        return Object.assign({}, currentState, {
            [MultiStoreEnum.selectedScreen]: currentDefaultSelectedScreen,
            [MultiStoreEnum.layout]: currentSelectedLayout[0] || {},
            [MultiStoreEnum.playerList]: new Array(currentDefaultSelectedScreen)?.fill(0)?.map(() => {
                return {}
            }),
            [MultiStoreEnum.actionConfig]: screenConfig.getActionConfig(defaultPlayerConfig),
            [MultiStoreEnum.screenConfig]: screenConfig.getDefaultConfig(defaultPlayerConfig),
        });
    });
    /**
     * 发送单个视频的配置
     */
    useEffect(() => {
        if (currentConfig) {
            const {playerConfig, mediaDataSource} = currentConfig;
            if (playerConfig && mediaDataSource) {
                const layoutIndex = state[MultiStoreEnum.selectedPlayer];
                const playerList = state[MultiStoreEnum.playerList]
                dispatch({
                    type: MultiStoreEnum.playerList,
                    value: {
                        index: playerConfig?.layoutIndex || layoutIndex,
                        data: {
                            mediaDataSource,
                            playerConfig,
                        }
                    }
                });
                /**
                 * 处理动态划分layoutIndex
                 */
                if (!playerConfig?.layoutIndex) {
                    const searchPlayer = (index: number) => {
                        for (let i = index; i < playerList.length; i++) {
                            if (!playerList[i] || isEmptyObject(playerList[i])) {
                                dispatch({
                                    type: MultiStoreEnum.selectedPlayer,
                                    value: `${i}`
                                });
                                return `${i}`
                            }
                        }
                    }
                    // 先从前往后排 如果排到最后 前面的还有空格 则排前面的空格
                    const searchIndex = searchPlayer(+(playerConfig?.layoutIndex || layoutIndex) + 1);
                    if (!searchIndex) {
                        searchPlayer(0);
                    }
                }
            }
        }
    }, [currentConfig]);

    // 暴露数据
    useImperativeHandle(ref, () => ({
        getScreenConfig: () => {
            return Object.assign({
                screenConfig: Object.assign(
                    {},
                    state[MultiStoreEnum.screenConfig],
                    ScreenConfigHelper.getConfig(),
                    {
                        selectedScreen: state[MultiStoreEnum.selectedScreen],
                        selectedPlayer: state[MultiStoreEnum.selectedPlayer],
                    }),
            })
        }
    }));

    return (
        <ThemeProvider theme={DefaultTheme}>
            <div className={styles.main} id={_id}>
                <MultiScreenPlayerAction state={state} dispatch={dispatch}/>
                <LayoutContent layoutKey={_id} events={events} state={state} dispatch={dispatch}/>
                <MultiScreenDrawer screenKey={_id} state={state} dispatch={dispatch}/>
            </div>
        </ThemeProvider>
    )
});

export default RcMultiScreenPlayer;