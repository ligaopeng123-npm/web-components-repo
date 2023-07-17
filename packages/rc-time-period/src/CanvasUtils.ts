/**********************************************************************
 *
 * @模块名称: CanvasUtils
 *
 * @模块作用: CanvasUtils
 *
 * @创建人: pgli
 *
 * @date: 2023/7/15 10:09 上午
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import * as zrender from 'zrender';

export interface CanvasInterface {
    ctx?: any;// ctx对象
    text?: string; // 文字绘制
    align?: 'left' | 'center' | 'right';// 文字属性
    image?: string | HTMLImageElement | HTMLCanvasElement, // 图片
    opacity?: number, // 透明度
    zIndex?: number, // 层级
    draggable?: boolean, // 是否可拖拽
    cursor?: string, // 是否可拖拽
    lineWidth?: number, // 线宽
    cx?: number;  // 圆心 x
    cy?: number; // 圆心 y
    x?: number; // 第一个点 x y
    y?: number; // 第二个点x y
    x1?: number; // 第二个点
    y1?: number;  // 第二个点
    w?: number;// 宽度
    h?: number; // 高度
    fl?: string; // fillStyle
    sl?: string;  // strokeStyle
}

export default class CanvasUtils {
    static readonly defaultOptions = {
        fl: '#5fbbff',
        sl: ''
    };

    /**
     * 绘制矩形
     */
    static drawRect({ctx, x, y, w, h, fl, sl}: CanvasInterface) {
        ctx.save();
        ctx.fillStyle = this.getFl(fl);
        ctx.strokeStyle = sl;
        ctx.fillStyle(x, y, w, h);
        ctx.restore();
    };

    /**
     * 绘制矩形
     */
    static Rect({x, y, w, h, fl, sl, draggable, cursor, zIndex}: CanvasInterface) {
        return new zrender.Rect({
            shape: {
                x: x,
                y: y,
                width: w,
                height: h
            },
            style: {
                fill: this.getFl(fl),
                stroke: this.getSl(sl),
            },
            draggable: !!draggable,
            cursor: cursor || 'pointer',
        });
    }

    static drawLine() {

    }


    static drawText() {

    }

    /**
     * 绘制线
     */
    static Line({x, y, x1, y1, fl, sl, cursor, lineWidth}: CanvasInterface) {
        return new zrender.Line({
            shape: {
                x1: x,
                y1: y,
                x2: x1,
                y2: y1,
            },
            style: {
                fill: this.getFl(fl),
                stroke: this.getSl(sl),
                lineWidth: lineWidth || 1
            },
            cursor: cursor || 'pointer',
        });
    }

    /**
     * 绘制文本
     */
    static Text({x, y, text, align, w, fl, sl}: CanvasInterface) {
        return new zrender.Text({
            style: {
                x: x,
                y: y,
                text: text,
                align: align || 'left',
                fill: this.getFl(fl),
                stroke: this.getSl(sl),
                width: w
            }
        });
    }

    /**
     * 绘制image
     */
    static Image({image, x, y, w, h, fl, sl}: CanvasInterface) {
        return new zrender.Image({
            style: {
                image: image,
                x: x,
                y: y,
                width: w,
                height: h,
                opacity: 0
            }
        });
    }

    /**
     * 获取fillStyle
     * @param fl
     */
    static getFl(fl: string | undefined) {
        return fl || this.defaultOptions.fl;
    }

    /**
     * 获取strokeStyle
     * @param sl
     */
    static getSl(sl: string | undefined) {
        return sl || this.defaultOptions.sl;
    }
}