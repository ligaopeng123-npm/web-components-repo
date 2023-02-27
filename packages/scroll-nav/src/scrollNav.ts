/**********************************************************************
 *
 * @模块名称: scrollNav
 *
 * @模块作用: scrollNav 滚动加载组件
 *
 * @创建人: pgli
 *
 * @date: 2023/1/29 6:59 下午
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import { ScrollNavProps } from "./interface";
import { template } from "./template";
import { addOpacity, isJSON } from "@gaopeng123/utils";
import { createScrollNavEvent } from "./utils";


const attributesList = [
    "items",
    "primary-color",
    "text-color",
    "background-color",
];


class ScrollNav extends HTMLElement {
    shadow: ShadowRoot = null;
    /**
     * 保存配置信息
     */
    __config: ScrollNavProps = {
        items: [],
        "primary-color": '#387af6',
        "text-color": '#000000',
        "background-color": '#ffffff',
    }

    get config() {
        return this.__config;
    }
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.init();
        this.shadow.innerHTML = template(this.config);
    }

    /**
     * 生命周期钩子函数 处理挂载
     */
    connectedCallback() {

    }

    /**
     * 移除文档流
     */
    disconnectedCallback() {
        this.removeEvent();
    }


    /**
     * 暴露哪些属性可以被监听
     * @returns {string[]}
     */
    // @ts-ignore
    static get observedAttributes() {
        return attributesList;
    }

    /**
     * 当自定义元素的一个属性被增加、移除或更改时被调用。
     * 需要setAttribute 才能被触发
     */
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue !== newValue) {
            // @ts-ignore
            this.__config[name] = isJSON(newValue) ? JSON.parse(newValue) : newValue;
            this.change(name);
        }
    }

    change = (name: string)=> {
        // @ts-ignore
        if (this[`change_${name}`]) this[`change_${name}`]();
    }

    addItemsNavEvent = ()=> {
        const nav = this.shadow.querySelector('.nav-container');
        const indicator: any = this.shadow.querySelector('.nav-indicator');
        const items = this.shadow.querySelectorAll('.nav-item');

        function handleIndicator(el: any) {
            items.forEach(item => {
                item.classList.remove('is-active');
                item.removeAttribute('style');
            });

            indicator.style.width = `${el.offsetWidth}px`;
            indicator.style.left = `${el.offsetLeft}px`;
            indicator.style.backgroundColor = el.getAttribute('active-color');

            el.classList.add('is-active');
            el.style.color = el.getAttribute('active-color');
        }

        const {navClick} = createScrollNavEvent({
            navBar: nav,
            navList: this.config.items,
            onChange: ({value}) => {
                handleIndicator(nav.querySelector(`[data-id=${value}]`));
                this.dispatchEvent(new CustomEvent('onChange', {
                    detail: { event: 'onChange', info: value }
                }));
            }
        });


        items.forEach((item, index) => {
            item.addEventListener('click', (e) => {
                navClick(e);
            });
            item.classList.contains('is-active') && handleIndicator(item);
        });

    }

    removeEvent = ()=> {

    }
    init = ()=> {
        attributesList.forEach((name)=> {
            this.change(name);
        });
    }
    /**
     * list变更
     */
    change_items = ()=> {
        if (this.config.items?.length) {
            const nav = this.shadow.querySelector('nav');
            nav.innerHTML = `
            ${this.config.items.map(item=> {
                return `<a href="#" data-id="${item.value}" class="nav-item" active-color="${this.config['primary-color']}">${item.label}</a>`
            }).join('')}
          <span class="nav-indicator"></span>
        `;
            this.addItemsNavEvent();
        }
    }

    "change_text-color" = ()=> {
        this.style.setProperty('--text-color', this.config['text-color']);
    }

    "change_background-color" = ()=> {
        this.style.setProperty('--background-color', this.config['background-color']);
    }

    "change_primary-color" = ()=> {
        this.style.setProperty('--hover-color', addOpacity(this.config['primary-color'], .9));
    }
}

export default ScrollNav;

if (!customElements.get('scroll-nav')) {
    customElements.define('scroll-nav', ScrollNav);
}