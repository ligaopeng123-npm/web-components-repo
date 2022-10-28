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

type WebRtcPlayerProps = {} & RcMultiPlayerProps;
const WebRTCPlayer: React.FC<WebRtcPlayerProps> = (props) => {
    const { mediaDataSource, height, width, objectFit } = props;
    const videoRef = useRef<HTMLVideoElement>();
    useEffect(() => {
        let sdk: any = null;
        if (mediaDataSource?.url) {
            // @ts-ignore
            sdk = new SrsRtcPlayerAsync();
            console.log('sdk', sdk.stream)
            // @ts-ignore
            // videoRef.current.setAttribute('srcObject', sdk.stream);
            videoRef.current.srcObject = sdk.stream;
            sdk.play(mediaDataSource?.url).then(function (session: any) {
                console.log(session)
            }).catch(function (error: Error) {
                sdk.close();
                console.error(error);
            });

            console.log(sdk)
        }
        return () => {
            if (sdk) {
                sdk.close();
                sdk = null;
            }
        }
    }, [mediaDataSource]);
    return (
        <video
            id="rtc_media_player"
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
