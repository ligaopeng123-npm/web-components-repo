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
import React, { useEffect, useRef, useState } from 'react';
import { SrsRtcPlayerAsync } from '../assets/sdk';
import { Property } from "csstype";
import { WebRtcPlayerProps } from "./PlayerTyping";
import { DEFAULT_ROBUSTNESS } from "@gaopeng123/multi-player";

const RcWebRTCPlayer: React.FC<WebRtcPlayerProps> = (props) => {
    const { mediaDataSource, robustness, height, width, objectFit, events, extraParams } = props;
    const videoRef = useRef<HTMLVideoElement>();
    /**
     * 最多重试次数
     */
    const [currentMaxResetTimes, setCurrentMaxResetTimes] = useState<number>(0);
    useEffect(() => {
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
        }

        if (mediaDataSource?.url) {
            // @ts-ignore
            sdk = new SrsRtcPlayerAsync({ onmute: onmute, onunmute: onunmute });

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
        }
        return () => {
            if (sdk) {
                if (sdk?.close) {
                    sdk?.close();
                }
                sdk = null;
                onmute = null;
                onunmute = null;
            }
        }
    }, [mediaDataSource]);
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
};

export default RcWebRTCPlayer;
