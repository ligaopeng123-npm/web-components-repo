/**********************************************************************
 *
 * @模块名称: WordComponent
 *
 * @模块用途: WordComponent
 *
 * @创建人: wangxiangyu
 *
 * @date: 2024-10-17 17:56:28
 *
 **********************************************************************/
import { template } from "./WordTemplate";
import { createWord } from "./WordBase";

class WordComponent extends HTMLElement {
    shadow: ShadowRoot = null;
    /*
    * 保存配置信息
    */
    __config = {}

    get config() {
        return this.__config;
    }

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.shadow.innerHTML = template();
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
        return [];
    }

    /**
     * 当自定义元素的一个属性被增加、移除或更改时被调用。
     * 需要setAttribute 才能被触发
     */
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue !== newValue) {
        }
    }

    /**
     * 初始化
     */
    init = () => {
        createWord(this.shadow.querySelector('.container'))
    }
    /**
     * 事件销毁
     */
    destroy = () => {

    }
}

export default WordComponent;

if (!customElements.get("word-canvas")) {
    customElements.define("word-canvas", WordComponent);
}
