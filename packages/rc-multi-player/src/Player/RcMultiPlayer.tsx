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
import * as React from 'react';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import styles from './player.module.less';
import ActionColumn from "../Action/ActionColumn";
import FullScreenButton from "../Action/FullScreenButton";
import Paper from "@mui/material/Paper";
import ReplayLoad from "../Action/ReplayLoad";
import { useBoolean } from "@gaopeng123/hooks";
import HideFullScreen from "../Action/HideFullScreen";
import IconCloseButton from "../Action/IconCloseButton";
import RcFlvPlayer from "./RcFlvPlayer";
import Title from "../components/Title";
import { PlayerConfig, RcMultiPlayerProps, RcPlayerRef } from "./PlayerTyping";
import RcWebRTCPlayer from "./WebRTCPlayer";
import Countdown, { countdownRef } from "../Action/Countdown";
import ScreenshotPicture from "../Action/ScreenshotPicture";
import { DefaultTheme } from "../Theme";
import { ThemeProvider } from "@mui/material";
import ResolutionSelect from "../Action/ResolutionSelect";
import IconBackButton from "../Action/IconBackButton";
import { classnames, isFullscreen, isFunction, isMobile } from "@gaopeng123/utils";

const RcMultiPlayer: React.ForwardRefExoticComponent<RcMultiPlayerProps & React.RefAttributes<RcPlayerRef>> = forwardRef<RcPlayerRef, RcMultiPlayerProps>((props, ref) => {
    const {
        protocol,
        title,
        objectFit,
        resolution,
        mediaDataSource,
        robustness,
        className,
        events,
        extraParams,
        maxPlayerTime,
        config,
        videoToolbar,
        hideToolbarInFullScreen,
        timeDrag
    } = props;
    const [divCurrent, setDivCurrent] = useState<HTMLDivElement>();
    const loadRef = useRef<any>(null);
    const playerRef = useRef<any>(null);
    const fullRef = useRef<any>(null);
    const countRef = useRef<countdownRef>(null);
    const [loadType, {
        setTrue: setLoadTypeTrue,
        setFalse: setLoadTypeFalse
    }] = useBoolean(true);

    const [_isFullscreen, setIsFullscreen] = useState(isFullscreen());

    /**
     * 重置倒计时参数
     */
    const resetCountConfig = () => {
        if (countRef.current) {
            countRef.current.reset();
        }
    }
    /**
     * 重置播放加载一些参数逻辑
     */
    const resetLoadConfig = () => {
        if (loadRef.current) {
            loadRef.current.hide();
        }
    }

    /**
     * 重新加载播放器
     */
    const reloadPlayer = () => {
        playerRef.current?.reload();
        if (playerEvents?.onReload) {
            playerEvents.onReload({
                extraParams,
                protocol
            });
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
            loadRef.current?.show();
            playerRef?.current?.close();
        }
        setLoadTypeFalse();
        if (events?.onClose) {
            events.onClose({
                extraParams,
                protocol
            });
        }
    }
    /**
     * 重新加载时的处理
     */
    useEffect(() => {
        if (!loadType) {
            /**
             * 避免关闭后 异步拉起 重新播放视频
             */
            if (extraParams?.__type === 'reload') {
            } else {
                setLoadTypeTrue();
            }
        }
    }, [mediaDataSource]);

    /**
     * 只有url变更时去处理倒计时重置
     */
    useEffect(() => {
        if (mediaDataSource?.url) {
            resetLoadConfig();
            resetCountConfig();
        }
    }, [mediaDataSource?.url]);

    /**
     * 事件监听
     */
    const playerEvents = Object.assign({}, events, {
            onLoadStart: (e: PlayerConfig) => {
                resetLoadConfig();
                if (events?.onLoadStart) {
                    events?.onLoadStart({
                        extraParams,
                        protocol
                    });
                }
            },
            onReload: (e: PlayerConfig) => {
                if (events?.onReload) {
                    events?.onReload({
                        extraParams,
                        protocol
                    });
                }
            },
            onMaxReload: (e: PlayerConfig) => {
                if (events?.onMaxReload) {
                    events?.onMaxReload({
                        extraParams,
                        protocol
                    });
                }
            },
            onLoadError: () => {
                loadRef.current?.show();
                countRef?.current?.setEnd();
                if (events?.onLoadError) {
                    events?.onLoadError({
                        extraParams,
                        protocol
                    });
                }
            },
            onLoadEnd: () => {
                loadRef.current?.show();
                countRef?.current?.setEnd();
                if (events?.onLoadEnd) {
                    events?.onLoadEnd({
                        extraParams,
                        protocol
                    });
                }
            },
            // 分辨率切换
            onResolutionChange: (v: string) => {
                events?.onReload({
                    extraParams,
                    protocol,
                    resolution: v
                });
            },
            // 返回处理
            onBack: () => {
                fullRef?.current?.click();
                if (events?.onBack) {
                    events?.onBack();
                }
            },
            // 最大化最小化
            onFullChange: (val: boolean) => {
                if (videoToolbar?.back) {
                    setIsFullscreen(val);
                }
                if (isFunction(events?.onFullChange)) {
                    events?.onFullChange(val);
                }
            }
        }
    );
    /**
     * 是否可加载数据
     */
    const canLoad = mediaDataSource && loadType;

    /**
     * 报漏钩子函数
     */
    useImperativeHandle(ref, () => ({
        close: () => {
            playerRef.current?.close();
            loadRef.current?.show();
        },
        reload: () => {

        },
        getVideo: () => {
            return playerRef.current?.getVideo();
        }
    }));

    const _isMobile = isMobile();

    const bthStyle = _isMobile ? { width: 56 } : {};

    return (
        <ThemeProvider
            theme={DefaultTheme}>
            <Paper
                elevation={0}
                variant="outlined"
                ref={(el: any) => {
                    setDivCurrent(el);
                }}
                classes={{ root: `${styles.mainPlayer} ${className}` }}>
                <ActionColumn
                    className={classnames(styles.hoverShow, _isMobile ? styles.mobileSafe : '')}
                    left={<>
                        {
                            videoToolbar?.back === true && _isFullscreen
                                ? <IconBackButton onClick={playerEvents.onBack} style={bthStyle}/>
                                : <></>
                        }
                        <Title ellipsis={true}>{title}</Title>
                    </>}
                    right={
                        <HideFullScreen>
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
                                    : <></>
                            }
                            {
                                videoToolbar?.close !== false
                                    ? <IconCloseButton onClick={onCloseClick}/>
                                    : <></>
                            }
                        </HideFullScreen>}/>
                <div
                    className={styles.playerContent}>
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
                                                config={config}
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
                        <HideFullScreen hide={hideToolbarInFullScreen}>
                            {
                                videoToolbar?.resolution === true
                                    // @ts-ignore
                                    ? <ResolutionSelect
                                        el={divCurrent}
                                        // @ts-ignore
                                        value={resolution || videoToolbar?.resolution?.defaultValue}
                                        // @ts-ignore
                                        options={videoToolbar?.resolution?.options}
                                        onChange={playerEvents.onResolutionChange}/>
                                    : <></>
                            }
                            {
                                videoToolbar?.screenshot !== false
                                    ? <ScreenshotPicture title={title} el={divCurrent} type={'icon'}/>
                                    : <></>
                            }
                            {
                                videoToolbar?.fullScreen !== false
                                    ? <FullScreenButton
                                        bthStyle={bthStyle}
                                        onChange={playerEvents.onFullChange}
                                        ref={fullRef}
                                        el={divCurrent}
                                        type={'icon'}/>
                                    : <></>
                            }
                        </HideFullScreen>
                    }
                />
            </Paper>
        </ThemeProvider>
    )
});

export default RcMultiPlayer;
