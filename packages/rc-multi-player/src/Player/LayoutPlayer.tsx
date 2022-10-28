/**********************************************************************
 *
 * @模块名称: MainPlayer
 *
 * @模块用途: MainPlayer  基础播放器
 *
 * @创建人: pgli
 *
 * @date: 2022/10/27 14:43
 *
 **********************************************************************/
import React from 'react';
import { RcMultiPlayerProps } from "../RcMultiPlayer";
import MainPlayer from "./MainPlayer";
import styles from '../styles.module.less';
import { LayoutPlayerProps } from "./PlayerTyping";

// type: 'flv',
// url: '/live/40491879758-1-30002.flv',
// cors: true
const LayoutPlayer: React.FC<LayoutPlayerProps> = (props) => {
    const { playerConfig, selected, mediaDataSource } = props;
    console.log(111, mediaDataSource, playerConfig, playerConfig?.title);
    return (
        <MainPlayer
            mediaDataSource={mediaDataSource}
            protocol={playerConfig?.protocol}
            title={playerConfig?.title}
            className={selected ? styles.selected : styles.player}
        />
    )
};

export default LayoutPlayer;
