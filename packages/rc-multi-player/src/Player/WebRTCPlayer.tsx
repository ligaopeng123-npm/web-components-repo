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
import { RcMultiPlayerProps } from "../RcMultiPlayer";
import { SrsRtcPlayerAsync } from '../assets/sdk';
import { Property } from "csstype";
import { PlayerEvents } from "./PlayerTyping";

type WebRtcPlayerProps = {
    events?: PlayerEvents;
} & RcMultiPlayerProps;
const WebRTCPlayer: React.FC<WebRtcPlayerProps> = (props) => {
    const { mediaDataSource, height, width, objectFit, events } = props;
    const videoRef = useRef<HTMLVideoElement>();
    useEffect(() => {
        let sdk: any = null;
        const video = videoRef.current;
        /**
         * 异常事件监听
         * @param e
         */
        let onmute = (e: any) => {
            console.log('onError', e);
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

export default WebRTCPlayer;
