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
import React from 'react';
import "@gaopeng123/multi-player";
import {
    MultiPlayerComProps,
    MediaDataSource,
    Config,
    MultiPlayerRobustness,
    ObjectFit,
} from "@gaopeng123/multi-player";

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
    width?: string | number;
    height?: string | number;
    // 视频填充方式
    objectFit?: ObjectFit;
    mediaDataSource: MediaDataSource;
    // 播放器配置
    config?: Config,
    // 健壮性配置
    robustness?: MultiPlayerRobustness;
};
const RcMultiPlayer: React.FC<RcMultiPlayerProps | any> = (props) => {
    const { width, height, mediaDataSource, config, robustness, objectFit } = props;
    const media_data_source: any = JSON.stringify(mediaDataSource || {});
    return (
        <multi-player
            style={{width: '100%', height: '100%'}}
            id="rc-multi-player"
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
