/**********************************************************************
 *
 * @模块名称: RcMultiPlayer
 *
 * @模块用途: RcMultiPlayer
 *
 * @创建人: pgli
 *
 * @date: 2022/3/23 16:54
 *
 **********************************************************************/
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import "@gaopeng123/multi-player";
import {
    MultiPlayerComProps,
    MultiPlayerEvent,
} from "@gaopeng123/multi-player";
import { RcFlvPlayerProps, RcPlayerRef } from "./PlayerTyping";

/**
 * 处理react tsx中直接使用web components报错问题
 */
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'multi-player': MultiPlayerComProps
        }
    }
}

const RcFlvPlayer: React.ForwardRefExoticComponent<React.PropsWithoutRef<RcFlvPlayerProps> & React.RefAttributes<RcPlayerRef>> = forwardRef<RcPlayerRef, RcFlvPlayerProps>((props, ref) => {
    const { width, height, mediaDataSource, config, robustness, objectFit, style, events, extraParams } = props;
    const media_data_source: any = JSON.stringify(mediaDataSource || {});
    const [id,] = useState(`multi-player-${Date.now()}`);
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
            if (events?.onReload) {
                events?.onReload(eventsInfo);
            }
        }
        if (video) {
            video.addEventListener(MultiPlayerEvent.LOAD_START, _onLoad);
            // @ts-ignore
            video.addEventListener(MultiPlayerEvent.ERROR, _onError);
        }

        return () => {
            video.removeEventListener(MultiPlayerEvent.LOAD_START, _onLoad);
            // @ts-ignore
            video.removeEventListener(MultiPlayerEvent.ERROR, _onError);
        }
    }, []);
    // 暴露数据
    useImperativeHandle(ref, () => ({
        close: () => {
            const video: any = getVideo();
            if (video) {
                video?.destroyPlayer();
            }
        },
        reload: () => {
            const video: any = getVideo();
            if (video) {
                video?.createPlayer();
            }
        }
    }));
    return (
        <multi-player
            style={Object.assign({ width: '100%', height: '100%' }, style)}
            id={id}
            object-fit={objectFit}
            width={width}
            height={height}
            media-data-source={media_data_source}
            config={JSON.stringify(config || {}) as any}
            robustness={JSON.stringify(robustness || {}) as any}
        />
    )
});

export default RcFlvPlayer;
