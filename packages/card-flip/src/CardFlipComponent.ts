/**********************************************************************
 *
 * @模块名称: CardFlipComponent
 *
 * @模块用途: CardFlipComponent
 *
 * @创建人: wangxiangyu
 *
 * @date: 2024-08-08 21:17:32
 *
 **********************************************************************/

import { template } from "./CardFlipTemplate";
import type { CardFlipConfig } from "./CardFlipTemplate";
import { addBoxSizeUnit, debounce } from "@gaopeng123/utils";

class CardFlip extends HTMLElement {
    shadow: ShadowRoot = null;
    /*
    * 保存配置信息
    */
    oldConfig:CardFlipConfig = {
        width: 200,
        height: 200,
        type: 'x',
    }
    __config: CardFlipConfig = {
        width: 200,
        height: 200,
        type: 'x',
    }

    get config() : CardFlipConfig{
        return this.__config;
    }

    get dom(): HTMLDivElement {
        return this.shadow.querySelector('.container');
    }

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
        return ['height', 'width', 'type'];
    }

    /**
     * 当自定义元素的一个属性被增加、移除或更改时被调用。
     * 需要setAttribute 才能被触发
     */
    attributeChangedCallback(name: keyof CardFlipConfig, oldValue: string, newValue: CardFlipConfig[keyof CardFlipConfig]) { 
        if (oldValue !== newValue) {
            this.__config[name] = newValue as any;
            this.render();
        }
    }
    /**
     * 初始化
     */
    init = () => {

    }
    /**
     * 事件销毁
     */
    destroy = () => {

    }

    render = debounce(()=> {
        for (const name in this.config) {
            const _key = name as keyof CardFlipConfig;
            console.log(_key, this.config[_key], this.oldConfig[_key])
            if (this.config[_key] === this.oldConfig[_key]) {
                continue;
            }
            
            if (['height', 'width'].includes(name)) {
                this.dom.style[name as 'height' | 'width'] = addBoxSizeUnit(this.config[name as keyof Pick<CardFlipConfig, 'height' | 'width'>]);
            } else if (_key === 'type') {
                const items = this.dom.querySelectorAll('.item');
                const oldType = this.oldConfig.type;
                const type = this.config.type;
                for (let index = 0; index < items.length; index++) {
                    const element = items[index];
                    if (element.classList.contains('front')) {
                        element.classList.remove(`front-${oldType}`);
                        element.classList.add(`front-${type}`);
                    } else {
                        element.classList.remove(`back-${oldType}`);
                        element.classList.add(`back-${type}`);
                    }
                }
            }
        }
        this.oldConfig = JSON.parse(JSON.stringify(this.config));
    }, 10)
}

export default CardFlip;

if (!customElements.get("card-flip")) {
    customElements.define("card-flip", CardFlip);
}
