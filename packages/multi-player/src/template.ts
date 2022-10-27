/**********************************************************************
 *
 * @模块名称: css
 *
 * @模块用途: css
 *
 * @date: 2022/1/27 17:23
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import { addBoxSizeUnit } from "@gaopeng123/utils.string";
import { MultiPlayerComProps } from "./typing";


export const template = (config: MultiPlayerComProps) => {
    const { width, height, objectFit } = config;
    return `
			<style>
                .multi-player {
                   width: ${addBoxSizeUnit(width)};
                   height: ${addBoxSizeUnit(height)};
                   object-fit: ${objectFit}
                }
			</style>
			<video id="multi-player" class="multi-player" muted="muted" autoplay="autoplay">
			`;
}
