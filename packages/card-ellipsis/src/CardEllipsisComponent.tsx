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
import { template, Config, ConfigName } from "./CardEllipsisTemplate";
import { addBoxSizeUnit } from "@gaopeng123/utils";


class CardEllipsis extends HTMLElement {
    shadow: ShadowRoot = null;
    observer: MutationObserver;
    /*
    * 保存配置信息
    */
    __config: Config = {
        'min-height': 100,
        'mode': 'complex' // complex simple
    }

    get config() {
        return this.__config;
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
        return ['min-height', 'mode'];
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
        this._slot.addEventListener('slotchange', this.onslotchange);
        this.addObserver();
    }
    /**
     * 事件销毁
     */
    destroy = () => {
        this.bodyMore.removeEventListener('click', this.moreClick);
        this.bodyMore.removeEventListener('mouseenter', this.onmouseenter);
        this.bodyMore.removeEventListener('mouseleave', this.onmouseleave);
        this._slot.removeEventListener('slotchange', this.onslotchange);
        this.observer.disconnect();
    }

    get bodyMore(): HTMLElement {
        return this.shadow.querySelector('.body-more');
    }

    get _slot() {
        return this.shadow.querySelector('slot')
    }

    get body(): HTMLElement {
        return this.shadow.querySelector('.body');
    }

    addObserver = () => {
        // 某个需要被监控的 dom 元素。
        const targetNode = this.querySelector('[slot="content"]');
        //配置 dom 的哪些改变会触发回调函数，详细见下文表格。
        const mutationObserverInitConfig = { attributes: false, childList: true, subtree: false };
        // dom 变化时触发的回调函数，传入 mutationsList：记录 dom 变化的对象数组。
        const callback = (mutationsList: any) => {
            console.log('dom 变化啦！');
            this.domChange();
        };

        // 创建一个 MutationObserver 示例，传入回调函数
        this.observer = new MutationObserver(callback);

        // 注册监控的节点、监控的事件
        this.observer.observe(targetNode, mutationObserverInitConfig);
    }

    moreClick = () => {
        const body = this.body;
        const bodyStyle = body.style;
        if (body.classList.contains('body-expand')) {
            body.classList.remove('body-expand');
            body.classList.add('body-collapse');
            bodyStyle.setProperty('height', addBoxSizeUnit(this.config["min-height"]));
        } else {
            body.classList.remove('body-collapse');
            body.classList.add('body-expand');
            this.setBodyMaxHeight();
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

    onslotchange = (e: any) => {
        console.log('onslotchange');
    }

    get maxHeight() {
        return this.querySelector('[slot="content"]').scrollHeight + this.bodyMore.scrollHeight;
    }

    setBodyMaxHeight() {
        const bodyStyle = this.body.style;
        if (this.config.mode === 'complex') {
            bodyStyle.setProperty('height', 'auto');
            const { height } = this.body.getBoundingClientRect();
            bodyStyle.setProperty('height', '0px');
            bodyStyle.setProperty('height', addBoxSizeUnit(this.config["min-height"]));
            this.body.offsetHeight;
            bodyStyle.setProperty('height', `${height}px`);
        } else {
            bodyStyle.setProperty('height', addBoxSizeUnit(this.maxHeight));
        }

    }

    /**
     * domChange 变更后 通知组件做出高度改变
     */
    domChange = () => {
        if (this.body.classList.contains('body-expand')) {
            this.setBodyMaxHeight();
        }
    }

}

export default CardEllipsis;

if (!customElements.get("card-ellipsis")) {
    customElements.define("card-ellipsis", CardEllipsis);
}
