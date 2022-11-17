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
import styles from './player.module.less';
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
import Countdown, {countdownRef} from "../Action/Countdown";

const RcMultiPlayer: React.FC<RcMultiPlayerProps> = (props) => {
    const {
        protocol,
        title,
        objectFit,
        mediaDataSource,
        robustness,
        className,
        events,
        extraParams,
        maxPlayerTime
    } = props;
    const [divCurrent, setDivCurrent] = useState<HTMLDivElement>();
    const loadRef = useRef(null);
    const playerRef = useRef(null);
    const countRef = useRef<countdownRef>(null);
    const [loadType, { setTrue: setLoadTypeTrue, setFalse: setLoadTypeFalse }] = useBoolean(true);

    /**
     * 重置倒计时参数
     */
    const resetCountConfig = ()=> {
        if (countRef.current) {
            countRef.current.reset();
        }
    }
    /**
     * 重置播放加载一些参数逻辑
     */
    const resetLoadConfig = () => {
        loadRef.current.hide();
    }

    /**
     * 重新加载播放器
     */
    const reloadPlayer = () => {
        playerRef.current?.reload();
        if (playerEvents?.onReload) {
            playerEvents.onReload({ extraParams, protocol });
        }
        if (mediaDataSource) {
            setLoadTypeTrue();
        }
        resetLoadConfig();
        resetCountConfig();
    }
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
    // useEffect(() => {
    //     if (!loadType) {
    //         setLoadTypeTrue();
    //     }
    //     resetLoadConfig();
    // }, [mediaDataSource]);

    /**
     * 只有url变更时去处理倒计时重置
     */
    useEffect(() => {
        if (mediaDataSource?.url) {
            resetCountConfig();
        }
    }, [mediaDataSource?.url]);

    /**
     * 事件监听
     */
    const playerEvents = Object.assign({}, events, {
        onLoadStart: () => {
            resetLoadConfig();
            if (events?.onLoadStart) {
                events?.onLoadStart({ extraParams, protocol });
            }
        },
        onReload: ()=> {
            if (events?.onReload) {
                events?.onReload({ extraParams, protocol });
            }
        },
        onMaxReload: () => {
            if (events?.onMaxReload) {
                events?.onMaxReload({ extraParams, protocol });
            }
        },
        onLoadError: () => {
            loadRef.current.show();
            if (events?.onLoadError) {
                events?.onLoadError({ extraParams, protocol });
            }
        },
        onLoadEnd: ()=> {
            loadRef.current.show();
            countRef?.current?.setEnd();
            if (events?.onLoadEnd) {
                events?.onLoadEnd({ extraParams, protocol });
            }
        }
    });
    /**
     * 是否可加载数据
     */
    const canLoad = mediaDataSource && loadType;

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
                left={<Title ellipsis={true}>{title}</Title>}
                right={<HideFullScreen>
                    {
                        canLoad && !isNaN(parseInt(maxPlayerTime as string))
                            ? <Countdown
                                ref={countRef}
                                maxTime={parseInt(maxPlayerTime as string) * 60}
                                onMaxClick={() => {
                                    reloadPlayer();
                                }}
                                onMax={() => {
                                    playerRef.current?.close();
                                    loadRef?.current?.show();
                                }}/>
                            : null
                    }
                    <IconCloseButton onClick={onCloseClick}/>
                </HideFullScreen>}/>
            <div className={styles.playerContent}>
                <ReplayLoad
                    ref={loadRef}
                    onClick={() => {
                        reloadPlayer();
                    }}>
                    {
                        canLoad
                            ? <>
                                {
                                    protocol === 'WebRTC'
                                        ? <RcWebRTCPlayer
                                            ref={playerRef}
                                            extraParams={extraParams}
                                            events={playerEvents}
                                            objectFit={objectFit}
                                            robustness={robustness}
                                            mediaDataSource={mediaDataSource}
                                        />
                                        : <RcFlvPlayer
                                            ref={playerRef}
                                            extraParams={extraParams}
                                            events={playerEvents}
                                            objectFit={objectFit}
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
