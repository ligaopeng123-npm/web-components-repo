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
import { Config } from "./typing";
import { addBoxSizeUnit } from "@gaopeng123/utils";


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
            height: auto !important;
            max-height: 800px !important;
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

        .body-collapse > .body-more::after {
            content: var(--expand-text, '更多');
            position: relative;
            top: 4px;
        }

        .body-expand > .body-more::after {
            content: var(--collapse-text, '收起');
            position: relative;
            top: 4px;
        }
        </style>
        <div class="container" style="height: ${minHeight};">
            <div style="height: ${minHeight};max-height: ${minHeight};" class="body body-collapse">
                <slot name="content"></slot>
                <div class="body-more"></div>
            </div>
        </div>
    `
}
