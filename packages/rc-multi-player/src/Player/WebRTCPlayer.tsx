/**********************************************************************
 *
 * @模块名称: WebRtcPlayer
 *
 * @模块用途: WebRtcPlayer
 *
 * @创建人: pgli
 *
 * @date: 2022/10/27 14:43
 *
 **********************************************************************/
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { SrsRtcPlayerAsync } from '../assets/sdk';
import { RcPlayerRef, WebRtcPlayerProps } from "./PlayerTyping";
import { DEFAULT_ROBUSTNESS, ObjectFit } from "@gaopeng123/multi-player";

const RcWebRTCPlayer: React.ForwardRefExoticComponent<React.PropsWithoutRef<WebRtcPlayerProps> & React.RefAttributes<RcPlayerRef>> = forwardRef<RcPlayerRef, WebRtcPlayerProps>((props, ref) => {
    const { mediaDataSource, robustness, height, width, objectFit, events, extraParams } = props;
    const videoRef = useRef<any>({});
    const [sdk, setSdk] = useState<any>(null);
    /**
     * 最多重试次数
     */
    const [currentMaxResetTimes, setCurrentMaxResetTimes] = useState<number>(0);
    const [errorTime, setErrorTime] = useState<number>();
    const { maxResetTimes, retryDuration } = Object.assign({ retryDuration: 10000 }, DEFAULT_ROBUSTNESS, robustness);
    /**
     * 拉流处理
     */
    const startPull = (type = 'onmute') => {
        // 最大次数监听
        if (currentMaxResetTimes >= maxResetTimes) {
            if (events?.onMaxReload) {
                events.onMaxReload({ extraParams });
            }
        } else {
            if (events?.onReload) {
                events.onReload({ extraParams, ...{ __type: 'reload' } });
            }
        }
        if (type === 'onmute') {
            setErrorTime(Date.now());
        }
        // 最多重试次数
        setCurrentMaxResetTimes(currentMaxResetTimes + 1);
    }
    /**
     * 批量重试
     */
    const batchStartPull = (time = 0) => {
        if (time < 5) {
            if (videoRef.current) {
                console.log(`${new Date()} 第 ${time + 1} 次重试`);
                videoRef.current.__batchTimer = setTimeout(() => {
                    startPull('batch');
                    batchStartPull(time + 1);
                }, 3000);
            }
        }
    }

    /**
     * 事件处理
     */
    const initSdk = () => {
        let sdk: any = null;
        const video: any = videoRef.current;
        /**
         * 异常事件监听  流中断
         * @param e
         */
        let onmute = (e: any) => {
            /**
             * 先拉一次 如果拉成功就不管了 如果不成功 则每3s拉一次
             */
            startPull('onmute');
            batchStartPull(0);
        }
        /**
         * 流重连
         */
        let onunmute = () => {
            clearTimeoutAll();
            setCurrentMaxResetTimes(0);
            // 加载成功后 重新播放
            if (events?.onLoadStart) {
                events.onLoadStart({ extraParams, });
            }
        }

        /**
         * 流加载错误
         */
        let onerror = () => {
            if (events?.onLoadError) {
                events.onLoadError({ extraParams });
                closeSdk(sdk);
            }
        }

        // 流播放结束
        let onended = () => {
            if (events?.onLoadEnd) {
                // events.onLoadEnd({extraParams,});
            }
        }

        if (mediaDataSource?.url) {
            // @ts-ignore
            sdk = new SrsRtcPlayerAsync({ onmute: onmute, onunmute: onunmute, onerror: onerror, onended: onended });

            video.srcObject = sdk.stream;
            sdk.play(mediaDataSource?.url)
                .then(function (session: any) {
                    // video.muted = false;
                    console.log('sdk play session', session)
                    if (events?.onLoadStart) {
                        events?.onLoadStart();
                    }
                })
                .catch(function (error: Error) {
                    console.log('error', error)
                    sdk.close();
                });
            // video?.play();
            // 数据保存
            setSdk(sdk);
        }
        return sdk;
    }
    /**
     * 关闭sdk
     * @param sdk
     */
    const closeSdk = (sdk: any) => {
        clearTimeoutAll();
        if (sdk) {
            if (sdk?.close) {
                sdk?.close();
            }
            sdk = null;
        }
    }

    /**
     * 获取当前视频
     */
    const getVideo = () => {
        return videoRef.current;
    }

    /**
     *  缓存sdk
     */
    useEffect(() => {
        // weixin环境下处理自动播放
        const onWeixinJSBridgeReady = ()=> {
            getVideo()?.play();
        };
        document.addEventListener("WeixinJSBridgeReady", onWeixinJSBridgeReady, false);
        let sdk = initSdk();
        return () => {
            document.removeEventListener("WeixinJSBridgeReady", onWeixinJSBridgeReady, false)
            closeSdk(sdk);
        }
    }, [mediaDataSource]);

    const clearTimeoutAll = () => {
        if (videoRef.current) {
            clearTimeout(videoRef.current.__batchTimer);
            clearTimeout(videoRef.current.__timer);
        }
    }

    /**
     * 5秒无法拉起 就直接报错
     */
    useEffect(() => {
        if (errorTime) {
            clearTimeoutAll();
            videoRef.current.__timer = setTimeout(() => {
                console.log(`${new Date()} ${retryDuration / 1000}秒后未拉起,阻断视频`);
                if (events?.onLoadError) {
                    events.onLoadError({ extraParams, });
                    closeSdk(sdk);
                }
            }, retryDuration);
        }
        return () => {
            clearTimeoutAll();
        }
    }, [errorTime]);

    // 暴露数据
    useImperativeHandle(ref, () => ({
        close: () => {
            sdk?.close();
        },
        reload: () => {
            initSdk();
        },
        __timer: null,
        /**
         * 获取当前视频模块
         */
        getVideo: getVideo
    }));

    return (
        <video
            id='WebRTC-player'
            ref={videoRef}
            poster="noposter"
            autoPlay={true}
            playsInline={true}
            webkit-playsinline={true}
            x5-playsinline={true}
            x5-video-player-type='h5'
            muted={true}
            style={{
                height: height || '100%',
                width: width || '100%',
                // @ts-ignore
                objectFit: (objectFit || 'fill') as ObjectFit
            }}>
        </video>
    )
});

export default RcWebRTCPlayer;