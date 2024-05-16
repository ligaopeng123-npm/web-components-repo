/**********************************************************************
 *
 * @模块名称: HlsPlayerTemplate
 *
 * @模块用途: HlsPlayerTemplate
 *
 * @创建人: wangxiangyu
 *
 * @date: 2024-05-15 14:50:29
 *
 **********************************************************************/
import { addBoxSizeUnit } from "@gaopeng123/utils";


export type ObjectFit = 'fill' | 'contain ' | 'cover' | 'scale-down' | 'none ' | 'initial ' | 'inherit';

export interface HlsPlayerConfig {
    'object-fit'?: ObjectFit;
    width?: number | string;
    height?: number | string;
    'media-data-source'?: {
        url: string;
        type: string;
    }
}

export enum HlsPlayerEventType {
    LOAD_START = 'load_start',
    ERROR = 'error',
    LOADING_COMPLETE = 'loading_complete',
}

export const template = (config: HlsPlayerConfig) => {
    return `
        <style>.container {
  height: 100%;
  width: 100%;
}</style>
        <video poster="noposter" id="hls-player" class="hls-player container" muted="muted" autoplay="autoplay">
    `
}