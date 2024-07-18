/**********************************************************************
 *
 * @模块名称: card-ellipsisTemplate
 *
 * @模块用途: card-ellipsisTemplate
 *
 * @创建人: wangxiangyu
 *
 * @date: 2023-08-16 19:31:39
 *
 **********************************************************************/
import { addBoxSizeUnit } from "@gaopeng123/utils";

export type ConfigName = 'min-height';

// 简单模式为 slot比较简单 可以监听dam变化 添加过渡动画，复杂dom结构无法监听内部节点变化 获取不到高度
export type CardEllipsisMode = 'simple' | 'complex'

export type Config = {
    'min-height': string | number;
    mode?: CardEllipsisMode
}

export const template = (config: Config) => {
    const minHeight = addBoxSizeUnit(config["min-height"]);
    const moreHeight = parseInt(minHeight) - 60 > 30 ? 60 : parseInt(minHeight) / 2;
    return `
        <style>
        .container {
            position: relative;
            width: calc(100% - 2px);
        }

        .body {
            overflow: hidden;
            width: 100%;
            border: 1px solid transparent;
            transition: all .3s;
        }

        .body-expand {
            position: absolute;
            background: var(--background-color, #fff);
            z-index: 1;
        }

        .body-collapse {

        }
        
        .body-collapse > .body-more {
            position: absolute;
            background-image: linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, #fff 100%);
            height: ${moreHeight}px;
        }
        
        .body-expand > .body-more {
        }

        .body-more {
            bottom: 0px;
            text-align: center;
            width: 100%;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: flex-end;
            font-size: 14px;
            color: var(--text-color, #1677ff);
        }

        .hover {
            border: 1px solid var(--border-color, rgba(0, 0, 0, .09));
            box-shadow: 0 2px 8px var(--border-color, rgba(0, 0, 0, .09));
            transition: all .3s;
        }
   
   
        @keyframes fadeIn {
            0% {
                opacity: 0;
            }
            20% {
                opacity: .5;
            }
            100% {
                opacity: 1;
            }
        }

        .body-collapse > .body-more::after {
            content: var(--expand-text, '更多');
            background: var(--expand-image, '');
            background-size: cover;
            position: relative;
            top: 4px;
            min-height: 22px;
            min-width: 22px;
            animation: fadeIn .3s forwards;
        }

        .body-expand > .body-more::after {
            content: var(--collapse-text, '收起');
            background: var(--collapse-image, '');
            background-size: cover;
            position: relative;
            top: 4px;
            min-height: 22px;
            min-width: 22px;
        }
        </style>
        <div class="container" style="height: ${minHeight};">
            <div style="height: ${minHeight};"  class="body body-collapse">
                <slot name="content"></slot>
                <div class="body-more"></div>
            </div>
        </div>
    `
}
