/**********************************************************************
 *
 * @模块名称: card-ellipsisComponent
 *
 * @模块用途: card-ellipsisComponent
 *
 * @创建人: wangxiangyu
 *
 * @date: 2023-08-16 19:31:39
 *
 **********************************************************************/
import { template } from "./CardEllipsisTemplate";
import { Config, ConfigName } from "./typing";
import { addBoxSizeUnit } from "@gaopeng123/utils";


class CardEllipsis extends HTMLElement {
    shadow: ShadowRoot = null;
    /*
    * 保存配置信息
    */
    __config: Config = {
        'min-height': 100
    }

    get config() {
        return this.__config;
    }

    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
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
        return ['min-height'];
    }

    /**
     * 当自定义元素的一个属性被增加、移除或更改时被调用。
     * 需要setAttribute 才能被触发
     */
    attributeChangedCallback(name: ConfigName, oldValue: string, newValue: string) {
        if (oldValue !== newValue) {
            this.__config[name] = newValue;
        }
        this.render();
    }

    timmer: any = null;
    render = () => {
        clearTimeout(this.timmer);
        this.timmer = setTimeout(() => {
            this.destroy();
            this.shadow.innerHTML = template(this.config);
            this.init();
        }, 10);
    }

    /**
     * 初始化
     */
    init = () => {
        this.bodyMore.addEventListener('click', this.moreClick);
        this.bodyMore.addEventListener('mouseenter', this.onmouseenter);
        this.bodyMore.addEventListener('mouseleave', this.onmouseleave);
    }
    /**
     * 事件销毁
     */
    destroy = () => {
        this.bodyMore.removeEventListener('click', this.moreClick);
        this.bodyMore.removeEventListener('mouseenter', this.onmouseenter);
        this.bodyMore.removeEventListener('mouseleave', this.onmouseleave);
    }

    get bodyMore() {
        return this.shadow.querySelector('.body-more');
    }

    get body() {
        return this.shadow.querySelector('.body');
    }

    moreClick = () => {
        const body = this.body;
        if (body.classList.contains('body-expand')) {
            body.classList.remove('body-expand');
            body.classList.add('body-collapse');
            // @ts-ignore
            body.style.setProperty('height', addBoxSizeUnit(this.config["min-height"]));
        } else {
            body.classList.remove('body-collapse');
            body.classList.add('body-expand');
            setTimeout(() => {
                // @ts-ignore  - 2 是border 去掉避免赋值高度抖动
                body.style.setProperty('height', addBoxSizeUnit(body.offsetHeight - 2), 'important');
            }, 310);
        }
        this.dispatchEvent(new CustomEvent('onChange', {
            detail: {
                expand: body.classList.contains('body-expand')
            }
        }));
    }

    onmouseenter = () => {
        const body = this.body;
        body.classList.add('hover');
    }

    onmouseleave = () => {
        const body = this.body;
        body.classList.remove('hover');
    }
}

export default CardEllipsis;

if (!customElements.get("card-ellipsis")) {
    customElements.define("card-ellipsis", CardEllipsis);
}
