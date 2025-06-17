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
import ThreeRing from "./ThreeRing.js";

class ThreeDemo extends HTMLElement {
    shadow: ShadowRoot = null;
    /*
    * 保存配置信息
    */
    __config = {
    }

    get config() {
        return this.__config;
    }

    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.shadow.innerHTML = template(false);
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
    init = ()=> {
        let cakeChart = new ThreeRing();
        cakeChart.initThree(this.shadow.querySelector('div'));
        cakeChart.createChart({
            //颜色
            colors:['#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B'],
            //数据
            data: [
                { name: '红', value: 100 },
                { name: '绿', value: 200 },
                { name: '黄', value: 300 },
                { name: '橘', value: 300 },
            ],
            //是否显示标签
            isLabel: true,
            //最大高度
            maxHeight: 20,
            //基础高度
            baseHeight: 10,
            //半径
            radius: 30,
            //单位后缀
            suffix: '',
            //字体大小
            fontSize: 10,
            //字体颜色
            fontColor: 'rgba(255,255,255,1)',
            //开启动画
            isAnimate: false,
            //视角控制
            viewControl: {
                autoCamera: true,
                width: 1,
                height: 1.6,
                depth: 1,
                centerX: 1,
                centerY: 1,
                centerZ: 1
            }
        });
    }
    /**
     * 事件销毁
     */
    destroy = ()=> {

    }
}

export default ThreeDemo;

if (!customElements.get("three-demo")) {
    customElements.define("three-demo", ThreeDemo);
}
