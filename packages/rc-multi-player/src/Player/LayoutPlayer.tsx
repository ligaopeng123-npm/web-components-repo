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
import MultiPlayer from "./MultiPlayer";
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
        state
    } = props;
    const onClose = () => {
        dispatch({
            index: layoutIndex,
            value: null
        })
    }

    const playerEvents = Object.assign({}, events, {
        onLoadStart: (e: PlayerConfig) => {
            if (events?.onLoadStart) {
                events?.onLoadStart(Object.assign({}, playerConfig, {layoutIndex}));
            }
        },
        onClose: (playerConfig: PlayerConfig) => {
            onClose();
            if (events?.onClose) {
                events?.onClose(Object.assign({}, playerConfig, {layoutIndex}));
            }
        },
        onReload: (playerConfig: PlayerConfig) => {
            if (events?.onReload) {
                events?.onReload(Object.assign({}, playerConfig, {layoutIndex}));
            }
        },
        onMaxReload: (playerConfig: PlayerConfig) => {
            if (events?.onMaxReload) {
                events?.onMaxReload(Object.assign({}, playerConfig, {layoutIndex}));
            }
        }
    });

    const screenConfig = state[MultiStoreEnum.screenConfig];

    const {maxPlayerTime} = screenConfig;

    // 获取当前选中的播放器
    const videoRef = useRef<RcPlayerRef>();


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
            title={playerConfig?.title}
            className={selected ? styles.selected : styles.player}
        />
    )
};

export default LayoutPlayer;