/**********************************************************************
 *
 * @模块名称: LayoutPlayer
 *
 * @模块用途: LayoutPlayer  多屏播放器
 *
 * @创建人: pgli
 *
 * @date: 2022/10/27 14:43
 *
 **********************************************************************/
import React, { useRef } from 'react';
import MultiPlayer from "./RcMultiPlayer";
import styles from '../styles.module.less';
import { LayoutPlayerProps, PlayerConfig, RcPlayerRef, } from "./PlayerTyping";
import { MultiStoreEnum } from "../MultiTyping";
import { ScreenConfigHelper } from "../MultiStore";

const LayoutPlayer: React.FC<LayoutPlayerProps> = (props) => {
    const {
        layoutIndex,
        playerConfig,
        selected,
        mediaDataSource,
        dispatch,
        events,
        state,
        playerList
    } = props;
    const onClose = () => {
        dispatch({
            index: layoutIndex,
            value: null
        })
    }

    // 获取当前选中的播放器
    const videoRef = useRef<RcPlayerRef>();

    // useEffect(() => {
    //     videoRef.current.playerConfig = playerConfig;
    // }, [playerConfig]);

    // 获取当前选中的播放器
    const currentPlayerConfig = playerList[+layoutIndex];


    const playerEvents = Object.assign({}, events, {
        onLoadStart: (e: PlayerConfig) => {
            if (events?.onLoadStart) {
                events?.onLoadStart(Object.assign({}, currentPlayerConfig.playerConfig, { layoutIndex }));
            }
        },
        onClose: (playerConfig: PlayerConfig) => {
            onClose();
            if (events?.onClose) {
                events?.onClose(Object.assign({}, currentPlayerConfig.playerConfig, { layoutIndex }));
            }
        },
        onReload: (playerConfig: PlayerConfig) => {
            if (events?.onReload) {
                if (playerConfig.resolution) {
                    // 当重来没有播放过的时候 此时改变状态的时候，将状态先填充上
                    if (!mediaDataSource) {
                        dispatch({
                            type: MultiStoreEnum.playerList,
                            value: {
                                index: layoutIndex,
                                data: {
                                    mediaDataSource: mediaDataSource,
                                    playerConfig: Object.assign({ resolution: playerConfig.resolution }, currentPlayerConfig.playerConfig),
                                }
                            }
                        });
                        return;
                    }
                }
                events?.onReload(Object.assign({}, currentPlayerConfig.playerConfig, { layoutIndex }, playerConfig.resolution ? { resolution: playerConfig.resolution } : {}));
            }
        },
        onMaxReload: (playerConfig: PlayerConfig) => {
            if (events?.onMaxReload) {
                events?.onMaxReload(Object.assign({}, currentPlayerConfig.playerConfig, { layoutIndex }));
            }
        }
    });

    const screenConfig = state[MultiStoreEnum.screenConfig];

    const { maxPlayerTime } = screenConfig;

    return (
        <MultiPlayer
            ref={videoRef}
            objectFit={ScreenConfigHelper.getSingleConfig('objectFit')}
            maxPlayerTime={maxPlayerTime}
            events={playerEvents}
            mediaDataSource={mediaDataSource}
            robustness={playerConfig?.robustness}
            protocol={playerConfig?.protocol}
            extraParams={playerConfig?.extraParams}
            config={playerConfig?.config}
            title={playerConfig?.title}
            className={selected ? styles.selected : styles.player}
            resolution={playerConfig?.resolution}
            videoToolbar={Object.assign({}, screenConfig.videoToolbar, state[MultiStoreEnum.actionConfig])}
        />
    )
};

export default LayoutPlayer;