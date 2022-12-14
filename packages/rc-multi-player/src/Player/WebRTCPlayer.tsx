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
    const {mediaDataSource, robustness, height, width, objectFit, events, extraParams} = props;
    const videoRef = useRef<HTMLVideoElement>();
    const [sdk, setSdk] = useState(null);
    /**
     * 最多重试次数
     */
    const [currentMaxResetTimes, setCurrentMaxResetTimes] = useState<number>(0);
    const [errorTime, setErrorTime] = useState<number>();
    const {maxResetTimes, retryDuration} = Object.assign({retryDuration: 5000}, DEFAULT_ROBUSTNESS, robustness);

    /**
     * 事件处理
     */
    const initSdk = () => {
        let sdk: any = null;
        const video = videoRef.current;
        /**
         * 异常事件监听  流中断
         * @param e
         */
        let onmute = (e: any) => {
            // 最大次数监听
            if (currentMaxResetTimes >= maxResetTimes) {
                if (events?.onMaxReload) {
                    events.onMaxReload({extraParams});
                }
            } else {
                if (events?.onReload) {
                    events.onReload({extraParams,});
                }
            }
            setErrorTime(Date.now());
            // 最多重试次数
            setCurrentMaxResetTimes(currentMaxResetTimes + 1);
        }
        /**
         * 流重连
         */
        let onunmute = () => {
            // @ts-ignore
            clearTimeout(videoRef.current.__timer);
            setCurrentMaxResetTimes(0);
            // 加载成功后 重新播放
            events.onLoadStart({extraParams,});
        }
        /**
         * 流加载错误
         */
        let onerror = () => {
            if (events?.onLoadError) {
                events.onLoadError({extraParams,});
            }
        }

        // 流播放结束
        let onended = () => {
            if (events?.onLoadEnd) {
                events.onLoadEnd({extraParams,});
            }
        }

        if (mediaDataSource?.url) {
            // @ts-ignore
            sdk = new SrsRtcPlayerAsync({onmute: onmute, onunmute: onunmute, onerror: onerror, onended: onended});

            video.srcObject = sdk.stream;

            sdk.play(mediaDataSource?.url)
                .then(function (session: any) {
                    console.log('sdk play session', session)
                    if (events?.onLoadStart) {
                        events?.onLoadStart();
                    }
                })
                .catch(function (error: Error) {
                    console.log('error', error)
                    sdk.close();
                });
            // 数据保存
            setSdk(sdk);
        }
        return sdk;
    }

    /**
     *  缓存sdk
     */
    useEffect(() => {
        let sdk = initSdk()
        return () => {
            if (sdk) {
                if (sdk?.close) {
                    sdk?.close();
                }
                sdk = null;
            }
        }
    }, [mediaDataSource]);

    /**
     * 5秒无法拉起 就直接报错
     */
    useEffect(() => {
        if (errorTime) {
            // @ts-ignore
            videoRef.current.__timer = setTimeout(() => {
                console.log(`${new Date()} ${retryDuration/1000}秒后未拉起,阻断视频`);
                if (events?.onLoadError) {
                    events.onLoadError({extraParams,});
                }
            }, retryDuration);
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
        __timer: null
    }));

    return (
        <video
            ref={videoRef}
            autoPlay={true}
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