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
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import styles from '../styles.module.less';
import FlvPlayer from "./FlvPlayer";
import WebRTCPlayer from "./WebRTCPlayer";
import ActionColumn from "../Action/ActionColumn";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
import FullScreenButton from "../Action/FullScreenButton";
import Paper from "@mui/material/Paper";
import ReplayLoad from "../Action/ReplayLoad";
import { RcMultiPlayerProps } from "../RcMultiPlayer";
import { useBoolean } from "@gaopeng123/hooks";

type MainPlayerProps = {
    protocol?: 'FLV' | 'WebRTC'; // 协议 默认为flv
    className?: string;
    title?: string | ReactNode;
    onClose?: () => void;
} & RcMultiPlayerProps;

const MainPlayer: React.FC<MainPlayerProps> = (props) => {
    const { protocol, title, mediaDataSource, className, onClose } = props;
    const divRef = useRef<HTMLDivElement>();
    const loadRef = useRef(null);
    const [loadType, { setTrue: setLoadTypeTrue, setFalse: setLoadTypeFalse }] = useBoolean(true);
    const onCloseClick = (e: any) => {
        e?.stopPropagation();
        if (mediaDataSource) {
            loadRef.current.show();
        }
        setLoadTypeFalse();
        if (onClose) {
            onClose();
        }
    }
    /**
     * 重新加载时的处理
     */
    useEffect(() => {
        if (!loadType) {
            setLoadTypeTrue();
        }
        loadRef.current.hide();
    }, [mediaDataSource]);

    /**
     * 事件监听
     */
    const playerEvents = {
        onLoadStart: () => {
            loadRef.current.hide();
        }
    }

    return (
        <Paper
            elevation={0} variant="outlined" ref={divRef}
            classes={{ root: `${styles.mainPlayer} ${className}` }}>
            <ActionColumn
                className={styles.hoverShow}
                left={title}
                right={<>
                    <IconButton
                        onClick={onCloseClick}
                        size={'small'}
                        // @ts-ignore
                        color="iconButton"
                        aria-label="close video"
                        component="label">
                        <CloseIcon/>
                    </IconButton>
                </>}/>
            <div className={styles.playerContent}>
                <ReplayLoad
                    ref={loadRef}
                    onClick={() => {
                        if (mediaDataSource) {
                            setLoadTypeTrue();
                        }
                    }}>
                    {
                        mediaDataSource && loadType
                            ? <>
                                {
                                    protocol === 'WebRTC'
                                        ? <WebRTCPlayer
                                            events={playerEvents}
                                            objectFit={'fill'}
                                            mediaDataSource={mediaDataSource}
                                        />
                                        : <FlvPlayer
                                            events={playerEvents}
                                            objectFit={'fill'}
                                            mediaDataSource={mediaDataSource}
                                        />
                                }
                            </>
                            : <div></div>
                    }
                </ReplayLoad>
            </div>
            <ActionColumn
                className={`${styles.hoverShow} ${styles.bottom}`}
                right={
                    <FullScreenButton el={divRef.current} type={'icon'}/>
                }
            />
        </Paper>
    )
};

export default MainPlayer;
