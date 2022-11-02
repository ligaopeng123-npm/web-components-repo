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
import ActionColumn from "../Action/ActionColumn";
import FullScreenButton from "../Action/FullScreenButton";
import Paper from "@mui/material/Paper";
import ReplayLoad from "../Action/ReplayLoad";
import { useBoolean } from "@gaopeng123/hooks";
import HideFullScreen from "../Action/HideFullScreen";
import IconCloseButton from "../Action/IconCloseButton";
import RcFlvPlayer from "./FlvPlayer";
import Title from "../components/Title";
import { RcMultiPlayerProps } from "./PlayerTyping";
import RcWebRTCPlayer from "./WebRTCPlayer";

const RcMultiPlayer: React.FC<RcMultiPlayerProps> = (props) => {
    const { protocol, title, mediaDataSource, robustness, className, events, extraParams } = props;
    const [divCurrent, setDivCurrent] = useState<HTMLDivElement>();
    const loadRef = useRef(null);
    const [loadType, { setTrue: setLoadTypeTrue, setFalse: setLoadTypeFalse }] = useBoolean(true);
    /**
     * 事件监听  关闭视频处理
     */
    const onCloseClick = (e: any) => {
        e?.stopPropagation();
        if (mediaDataSource) {
            loadRef.current.show();
        }
        setLoadTypeFalse();
        if (events?.onClose) {
            events.onClose({ extraParams, protocol });
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
    const playerEvents = Object.assign({}, events, {
        onLoadStart: () => {
            loadRef.current.hide();
            if (events?.onLoadStart) {
                events?.onLoadStart({ extraParams, protocol });
            }
        },
        onMaxReload: () => {
            loadRef.current.show();
            if (events?.onMaxReload) {
                events?.onMaxReload({ extraParams, protocol });
            }
        },
        onLoadError: ()=> {
            loadRef.current.show();
            if (events?.onError) {
                events?.onError({ extraParams, protocol });
            }
        }
    });

    return (
        <Paper
            elevation={0}
            variant="outlined"
            ref={(el) => {
                setDivCurrent(el);
            }}
            classes={{ root: `${styles.mainPlayer} ${className}` }}>
            <ActionColumn
                className={styles.hoverShow}
                left={<Title>{title}</Title>}
                right={<HideFullScreen>
                    <IconCloseButton onClick={onCloseClick}/>
                </HideFullScreen>}/>
            <div className={styles.playerContent}>
                <ReplayLoad
                    ref={loadRef}
                    onClick={() => {
                        if (playerEvents?.onReload) {
                            playerEvents.onReload({ extraParams, protocol });
                        }
                        if (mediaDataSource) {
                            setLoadTypeTrue();
                        }
                    }}>
                    {
                        mediaDataSource && loadType
                            ? <>
                                {
                                    protocol === 'WebRTC'
                                        ? <RcWebRTCPlayer
                                            extraParams={extraParams}
                                            events={playerEvents}
                                            objectFit={'fill'}
                                            robustness={robustness}
                                            mediaDataSource={mediaDataSource}
                                        />
                                        : <RcFlvPlayer
                                            extraParams={extraParams}
                                            events={playerEvents}
                                            objectFit={'fill'}
                                            robustness={robustness}
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
                    <HideFullScreen>
                        <FullScreenButton el={divCurrent} type={'icon'}/>
                    </HideFullScreen>
                }
            />
        </Paper>
    )
};

export default RcMultiPlayer;
