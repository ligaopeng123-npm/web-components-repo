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
import React from 'react';
import MultiPlayer from "./MultiPlayer";
import styles from '../styles.module.less';
import { LayoutPlayerProps, PlayerConfig, } from "./PlayerTyping";

const LayoutPlayer: React.FC<LayoutPlayerProps> = (props) => {
    const { layoutIndex, playerConfig, selected, mediaDataSource, dispatch, events } = props;
    const onClose = () => {
        dispatch({
            index: layoutIndex,
            value: null
        })
    }

    const playerEvents = Object.assign({}, events, {
        onClose: (playerConfig: PlayerConfig) => {
            onClose();
            if (events?.onClose) {
                events?.onClose(playerConfig);
            }
        },
        onReload: (playerConfig: PlayerConfig) => {
            if (events?.onReload) {
                events?.onReload(Object.assign({}, playerConfig, { layoutIndex }));
            }
        },
        onMaxReload: (playerConfig: PlayerConfig) => {
            if (events?.onMaxReload) {
                events?.onMaxReload(Object.assign({}, playerConfig, { layoutIndex }));
            }
        }
    });

    return (
        <MultiPlayer
            events={playerEvents}
            mediaDataSource={mediaDataSource}
            protocol={playerConfig?.protocol}
            extraParams={playerConfig?.extraParams}
            title={playerConfig?.title}
            className={selected ? styles.selected : styles.player}
        />
    )
};

export default LayoutPlayer;
