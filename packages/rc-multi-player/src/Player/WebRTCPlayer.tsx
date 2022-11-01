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
import React, { useEffect, useRef } from 'react';
import { SrsRtcPlayerAsync } from '../assets/sdk';
import { Property } from "csstype";
import { WebRtcPlayerProps } from "./PlayerTyping";

const RcWebRTCPlayer: React.FC<WebRtcPlayerProps> = (props) => {
    const { mediaDataSource, height, width, objectFit, events, extraParams } = props;
    const videoRef = useRef<HTMLVideoElement>();
    useEffect(() => {
        let sdk: any = null;
        const video = videoRef.current;
        /**
         * 异常事件监听
         * @param e
         */
        let onmute = (e: any) => {
            if (events?.onReload) {
                events.onReload({ extraParams, });
            }
        }

        if (mediaDataSource?.url) {
            // @ts-ignore
            sdk = new SrsRtcPlayerAsync({ onmute: onmute });

            video.srcObject = sdk.stream;

            sdk.play(mediaDataSource?.url)
                .then(function (session: any) {
                    console.info(session);
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
                sdk.close();
                sdk = null;
                onmute = null;
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
