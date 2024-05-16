/**********************************************************************
 *
 * @模块名称: RcHlsPlayer
 *
 * @模块用途: RcHlsPlayer
 *
 * @创建人: pgli
 *
 * @date: 2024/5/16
 *
 **********************************************************************/
import React,{ forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import "@gaopeng123/hls-player";
import { RcFlvPlayerProps, RcPlayerRef } from "./PlayerTyping";
import { HlsPlayerConfig, HlsPlayerEventType } from "@gaopeng123/hls-player";
/**
 * 处理react tsx中直接使用web components报错问题
 */
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'hls-player': HlsPlayerConfig & {id: string}
        }
    }
}

const RcHlsPlayer: React.ForwardRefExoticComponent<React.PropsWithoutRef<RcFlvPlayerProps> & React.RefAttributes<RcPlayerRef>> = forwardRef<RcPlayerRef, RcFlvPlayerProps>((props, ref) => {
    const {
        width,
        height,
        mediaDataSource,
        config,
        robustness,
        objectFit,
        style,
        events,
        extraParams
    } = props;
    const media_data_source: any = JSON.stringify(mediaDataSource || {});
    const [id,] = useState(`hls-player-${Date.now()}`);
    const getVideo = (): any => {
        return document.querySelector(`#${id}`);
    }
    useEffect(() => {
        const video = getVideo();
        const eventsInfo = {
            mediaDataSource,
            extraParams,
            objectFit,
            config,
            robustness
        }

        const _onLoad = (ev: any, info?: any) => {
            if (events?.onLoadStart) {
                events?.onLoadStart(eventsInfo);
            }
        }

        const _onError = (ev: any, info?: any) => {
            console.log('flv play _onError');
            if (events?.onReload) {
                events?.onReload(eventsInfo);
            }
        }

        const _onLoading = () => {
            console.log('flv play _onLoading');
            if (events?.onReload) {
                events?.onReload(eventsInfo);
            }
        }


        if (video) {
            video.addEventListener(HlsPlayerEventType.LOAD_START, _onLoad);
            video.addEventListener(HlsPlayerEventType.ERROR, _onError);
            video.addEventListener(HlsPlayerEventType.LOADING_COMPLETE, _onLoading);
        }

        return () => {
            video.removeEventListener(HlsPlayerEventType.LOAD_START, _onLoad);
            video.removeEventListener(HlsPlayerEventType.ERROR, _onError);
            video.removeEventListener(HlsPlayerEventType.LOADING_COMPLETE, _onLoading);
        }
    }, []);
    // 暴露数据
    useImperativeHandle(ref, () => ({
        close: () => {
            const video: any = getVideo();
            if (video) {
                video?.destroy();
            }
        },
        reload: () => {
            const video: any = getVideo();
            if (video) {
                video?.createPlayer();
            }
        },
        getVideo: () => {
            // @ts-ignore
            const video: HTMLVideoElement = document.querySelector(`#${id}`)?.video;
            return video;
        }
    }));

    console.log('hls', media_data_source)
    return (
        <hls-player
            id={id}
            object-fit={objectFit}
            width={width}
            height={height}
            media-data-source={media_data_source}
            // config={JSON.stringify(config || {}) as any}
            // robustness={JSON.stringify(robustness || {}) as any}
        />
    )
});

export default RcHlsPlayer;
