/**********************************************************************
 *
 * @模块名称: MatrixBgComponent
 *
 * @模块用途: MatrixBgComponent
 *
 * @创建人: wangxiangyu
 *
 * @date: 2024-08-09 18:41:32
 *
 **********************************************************************/

import { Config, template } from "./MatrixBgTemplate";
import { addOpacity, hyphen2hump } from "@gaopeng123/utils";

interface Window {
    requestIdleCallback: (callback: any, options?: any) => number;
    cancelIdleCallback: (handle: number) => void;
}


class MatrixBg extends HTMLElement {
    shadow: ShadowRoot = null;
    /*
    * 保存配置信息
    */
    __config: Config = {
        backgroundColor: '#000000',
        textColor: '#00ff00',
    }

    get config() {
        return this.__config;
    }

    get matrix(): HTMLCanvasElement {
        return this.shadow.querySelector('#matrix');
    }

    get ctx() {
        return this.matrix.getContext('2d');
    }

    get font_size() {
        return 16;
    }

    drops: Array<number> = [];

    //转为数组
    txts = "0123456789abcdefghigklmgopqrstuvwxyz".split("");

    resizeTimmer: ReturnType<typeof setTimeout>;
    requestAnimationFrameTimmer: ReturnType<typeof setTimeout>;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.shadow.innerHTML = template(this.config);
    }

    /**
     * 生命周期钩子函数 处理挂载
     */
    connectedCallback() {
        this.init();
        this.begin();
    }

    /**
     * 移除文档流
     */
    disconnectedCallback() {
        this.destroy();
    }
    /**
     * 暴露哪些属性可以被监听
     * @returns {string[]}
     */
    // @ts-ignore
    static get observedAttributes() {
        return ['background-color', 'text-color'];
    }

    /**
     * 当自定义元素的一个属性被增加、移除或更改时被调用。
     * 需要setAttribute 才能被触发
     */
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue !== newValue) {
            this.__config[hyphen2hump(name) as keyof Config] = newValue;
        }
    }

    /**
     * 事件销毁
     */
    destroy = () => {
        clearTimeout(this.resizeTimmer);
        clearTimeout(this.requestAnimationFrameTimmer);
        window.removeEventListener('resize', this.onResize)
    }
    /**
     * 初始化
     */
    init = () => {
        const container: HTMLDivElement = this.shadow.querySelector('.container');
        //全屏
        this.matrix.height = container.offsetHeight;
        this.matrix.width = container.offsetWidth;

        const columns = this.matrix.width / this.font_size;
        //用于计算输出文字时坐标，所以长度即为列数
        //初始值
        const begin = this.drops.length;
        if (begin < columns) {
            for (let x = begin; x < columns; x++) {
                this.drops[x] = Math.floor(Math.random() * 10);
            }
        } else {
            this.drops.splice(columns, begin - columns);
        }
        if (begin) {
            this.ctx.beginPath();
            this.ctx.fillStyle = addOpacity(this.config.backgroundColor, 0.7);;
            this.ctx.fillRect(0, 0, this.matrix.width, this.matrix.height);
            this.ctx.stroke();
        }
    }

    draw = () => {
        const ctx = this.ctx;
        const c = this.matrix;
        const drops = this.drops;
        const font_size = this.font_size;
        const txts = this.txts;
        ctx.beginPath();
        //让背景逐渐由透明到不透明
        ctx.fillStyle = addOpacity(this.config.backgroundColor, 0.1);
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.stroke();
        ctx.beginPath();
        ctx.fillStyle = this.config.textColor; //文字颜色
        ctx.font = font_size + "px arial";
        //逐行输出文字
        for (let i = 0; i < drops.length; i++) {
            //随机取要输出的文字
            const text = txts[Math.floor(Math.random() * txts.length)];
            //输出文字，注意坐标的计算
            ctx.fillText(text, i * font_size, drops[i] * font_size);
            //如果绘满一屏或随机数大于0.95（此数可自行调整，效果会不同）
            if (drops[i] * font_size > c.height || Math.random() > 0.95) {
                drops[i] = 0;
            }
            //用于Y轴坐标增加
            drops[i]++;
        }
        ctx.stroke();
        this.loop();
    }


    begin = () => {
        requestAnimationFrame(() => this.draw())
        window.addEventListener('resize', this.onResize)
    }

    loop = () => {
        clearTimeout(this.requestAnimationFrameTimmer);
        this.requestAnimationFrameTimmer = setTimeout(() => {
            requestAnimationFrame(() => {
                // @ts-ignore
                window.requestIdleCallback(() => {
                    this.draw();
                });
            });
        }, 16.6 * 3);
    }

    onResize = () => {
        clearTimeout(this.resizeTimmer);
        clearTimeout(this.requestAnimationFrameTimmer);
        this.resizeTimmer = setTimeout(() => {
            this.init();
            this.loop();
        }, 100)
    }
}

export default MatrixBg;

if (!customElements.get("matrix-bg")) {
    customElements.define("matrix-bg", MatrixBg);
}
