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
import React, { useEffect, useState } from 'react';
import "@gaopeng123/multi-player";
import {
    MultiPlayerComProps,
    MediaDataSource,
    Config,
    MultiPlayerRobustness,
    ObjectFit, MultiPlayerEvent,
} from "@gaopeng123/multi-player";
import { uuid } from "@gaopeng123/utils";
import { PlayerEvents } from "./Player/PlayerTyping";

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

export type RcMultiPlayerProps = {
    style?: React.CSSProperties;
    width?: string | number;
    height?: string | number;
    // 视频填充方式
    objectFit?: ObjectFit;
    mediaDataSource?: MediaDataSource;
    // 播放器配置
    config?: Config,
    // 健壮性配置
    robustness?: MultiPlayerRobustness;
    // 事件集合
    events?: PlayerEvents,
};
const RcMultiPlayer: React.FC<RcMultiPlayerProps | any> = (props) => {
    const { width, height, mediaDataSource, config, robustness, objectFit, style, events } = props;
    const media_data_source: any = JSON.stringify(mediaDataSource || {});
    const [id, setId] = useState(uuid());
    useEffect(() => {
        const video = document.querySelector(`#${id}`);
        const _onLoad = () => {
            if (events?.onLoadStart) {
                events?.onLoadStart();
            }
        }
        if (video) {
            video.addEventListener(MultiPlayerEvent.LOAD_START, _onLoad);
        }

        return () => {
            video.removeEventListener(MultiPlayerEvent.LOAD_START, _onLoad);
        }
    }, []);
    return (
        <multi-player
            // @ts-ignore
            style={Object.assign({ width: '100%', height: '100%' }, style)}
            id={id}
            objectFit={objectFit}
            width={width}
            height={height}
            media-data-source={media_data_source}
            config={JSON.stringify(config || {}) as any}
            robustness={JSON.stringify(robustness || {}) as any}
        />
    )
};

export default RcMultiPlayer;
