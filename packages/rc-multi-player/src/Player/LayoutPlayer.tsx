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
import MainPlayer from "./MainPlayer";
import styles from '../styles.module.less';
import { LayoutPlayerProps } from "./PlayerTyping";

const LayoutPlayer: React.FC<LayoutPlayerProps> = (props) => {
    const { layoutIndex, playerConfig, selected, mediaDataSource, dispatch } = props;
    const onClose = () => {
        dispatch({
            index: layoutIndex,
            value: null
        })
    }
    return (
        <MainPlayer
            onClose={onClose}
            mediaDataSource={mediaDataSource}
            protocol={playerConfig?.protocol}
            title={playerConfig?.title}
            className={selected ? styles.selected : styles.player}
        />
    )
};

export default LayoutPlayer;
