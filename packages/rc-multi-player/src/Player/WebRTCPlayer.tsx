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
import { Property } from "csstype";
import { RcPlayerRef, WebRtcPlayerProps } from "./PlayerTyping";
import { DEFAULT_ROBUSTNESS } from "@gaopeng123/multi-player";

const RcWebRTCPlayer = forwardRef<RcPlayerRef, WebRtcPlayerProps>((props, ref) => {
    const { mediaDataSource, robustness, height, width, objectFit, events, extraParams } = props;
    const videoRef = useRef<HTMLVideoElement>();
    const [sdk, setSdk] = useState(null);
    /**
     * 最多重试次数
     */
    const [currentMaxResetTimes, setCurrentMaxResetTimes] = useState<number>(0);
    /**
     * 事件处理
     */
    const initSdk = () => {
        const { maxResetTimes } = Object.assign({}, DEFAULT_ROBUSTNESS, robustness);
        let sdk: any = null;
        const video = videoRef.current;
        /**
         * 异常事件监听
         * @param e
         */
        let onmute = (e: any) => {
            // 最大次数监听
            if (currentMaxResetTimes >= maxResetTimes) {
                if (events?.onMaxReload) {
                    events.onMaxReload({ extraParams });
                }
            } else {
                if (events?.onReload) {
                    events.onReload({ extraParams, });
                }
            }
            // 最多重试次数
            setCurrentMaxResetTimes(currentMaxResetTimes + 1);
        }

        let onunmute = () => {
            setCurrentMaxResetTimes(0);
            // 加载成功后 重新播放
            events.onLoadStart({ extraParams, });
        }

        let onerror = () => {
            if (events?.onError) {
                events.onError({ extraParams, });
            }
        }

        let onended = () => {
            if (events?.onError) {
                events.onError({ extraParams, });
            }
        }

        if (mediaDataSource?.url) {
            // @ts-ignore
            sdk = new SrsRtcPlayerAsync({ onmute: onmute, onunmute: onunmute, onerror: onerror, onended: onended });

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

    // 暴露数据
    useImperativeHandle(ref, () => ({
        close: () => {
            sdk?.close();
        },
        reload: () => {
            initSdk();
        }

    }));
    return (
        <video
            ref={videoRef}
            autoPlay={true}
            style={{
                height: height || '100%',
                width: width || '100%',
                objectFit: (objectFit || 'fill') as Property.ObjectFit
            }}>
        </video>
    )
});

export default RcWebRTCPlayer;
