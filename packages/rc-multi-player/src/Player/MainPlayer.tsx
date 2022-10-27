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
import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles.module.less';
import FlvPlayer from "./FlvPlayer";
import WebRtcPlayer from "./WebRtcPlayer";
import ActionColumn from "../Action/ActionColumn";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
import FullScreenButton from "../Action/FullScreenButton";

type MainPlayerProps = {
    type?: 'flv' | 'WebRTC'
};
const MainPlayer: React.FC<MainPlayerProps> = (props) => {
    const divRef = useRef<HTMLDivElement>();
    return (
        <div ref={divRef} className={styles.player}>
            <ActionColumn
                left={<>
                    这个是title
                </>}
                right={<>
                    <IconButton size={'small'} color="primary" aria-label="close video" component="label">
                        <CloseIcon/>
                    </IconButton>
                    <FullScreenButton el={divRef.current} type={'icon'}/>
                </>}/>
            <div className={styles.playerContent}>
                {
                    props?.type === 'WebRTC'
                        ? <WebRtcPlayer/>
                        : <FlvPlayer
                            objectFit={'fill'}
                            mediaDataSource={{
                                type: 'flv',
                                url: '/live/40491879758-1-30002.flv',
                                cors: true
                            }}/>
                }
            </div>
        </div>
    )
};

export default MainPlayer;
