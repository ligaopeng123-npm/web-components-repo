/**********************************************************************
 *
 * @模块名称: ThreeDemoComponent
 *
 * @模块用途: ThreeDemoComponent
 *
 * @创建人: wangxiangyu
 *
 * @date: 2024-10-17 17:56:28
 *
 **********************************************************************/
import { template } from "./ThreeDemoTemplate";
// @ts-ignore
import RingPie from "./RingBase.js";

class RingDemo extends HTMLElement {
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
        const ring = new RingPie();
        ring.init(this.shadow.querySelector("div"));
        ring.create({
            //颜色
            colors: ['#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B'],
            //数据
            data: [
                { name: '红', value: 100 },
                { name: '绿', value: 200 },
                { name: '黄', value: 300 },
                { name: '橘', value: 300 },
            ],
        })
    }
    /**
     * 事件销毁
     */
    destroy = () => {

    }
}

export default RingDemo;

if (!customElements.get("ring-demo")) {
    customElements.define("ring-demo", RingDemo);
}
