/**********************************************************************
 *
 * @模块名称: keeplogged
 *
 * @模块用途: 记住我
 *
 * @创建人: pgli
 *
 * @date: 2022/6/13 14:23
 *
 **********************************************************************/
import {isTrue} from "../utils";

class Keeplogged extends HTMLElement {
    shadow: any = null;
    __config: any = {};

    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
    }

    connectedCallback() {
        this.shadow.innerHTML = this.getTemplate();
    }

    /**
     * 移除文档流
     */
    disconnectedCallback() {
    }

    /**
     * 暴露哪些属性可以被监听
     * @returns {string[]}
     */
    static get observedAttributes() {
        // 参数请参考文档
        return [
            'keeplogged',
            'item-style',
        ];
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue !== newValue) {
            this.__config[name] = newValue;
        }
    }

    get checkBox() {
        return this.shadow.querySelector(`#checked`);
    }

    get checked() {
        return this.checkBox.checked;
    }

    set checked(value) {
        this.checkBox.checked = value;
    }

    getTemplate() {
        const config = this.__config;
        const keeplogged = isTrue(config['keeplogged']);
        return keeplogged ? `
            <xy-form-item style="${config['item-style']}">
                <div class="login-manipulate">
                    ${keeplogged ? '<xy-checkbox id="checked">记住我</xy-checkbox>' : ''}
                </div>
            </xy-form-item>
            ` : ''
    }
}

if (!customElements.get('keep-logged')) {
    customElements.define('keep-logged', Keeplogged);
}

export default Keeplogged;
