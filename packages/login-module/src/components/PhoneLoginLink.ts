/** ********************************************************************
 *
 * @模块名称: PhoneLoginLink
 *
 * @模块用途: PhoneLoginLink
 *
 * @date: 2022/6/13 16:15
 *
 * @版权所有: pgli
 *
 ********************************************************************* */

export const LOGIN_TYPE_TEXT: any = {
    phone: '短信登录',
    account: '账号登录',
    '短信登录': 'phone',
    '账号登录': 'account',
}

class PhoneLoginLink extends HTMLElement {
    shadow: any = null;
    __config: any = {};

    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
    }

    connectedCallback() {
        this.shadow.innerHTML = this.getTemplate();
        this.link?.addEventListener('click', this.onChange);
    }

    /**
     * 移除文档流
     */
    disconnectedCallback() {
        this.link?.removeEventListener('click', this.onChange);
    }

    get link() {
        return this.shadow.querySelector('#phoneLoginLink')
    }

    __loginType = {
        text: LOGIN_TYPE_TEXT.account,
        value: LOGIN_TYPE_TEXT['账号登录'],
    };

    get loginType() {
        return this.__loginType;
    }

    set loginType(v) {
        this.__loginType = v;
    }

    /**
     * 设置模式切换
     */
    setLinkText = () => {
        const value: any = {type: LOGIN_TYPE_TEXT[this.link.innerText], text: this.link.innerText};
        // 账号登录切换为短信登录
        if (this.link.innerText === LOGIN_TYPE_TEXT.phone) {
            value.text = this.link.innerText;
            value.type = LOGIN_TYPE_TEXT[this.link.innerText];
            this.link.innerText = LOGIN_TYPE_TEXT.account;
        }
        // 短信登录切换为账号登录
        else {
            value.text = this.link.innerText;
            value.type = LOGIN_TYPE_TEXT[this.link.innerText];
            this.link.innerText = LOGIN_TYPE_TEXT.phone;
        }
        this.dispatchEvent(new CustomEvent('change', {
            detail: value
        }));
        this.loginType = value;
    }

    onChange = () => {
        this.setLinkText();
    }

    /**
     * 暴露哪些属性可以被监听
     * @returns {string[]}
     */
    static get observedAttributes() {
        // 参数请参考文档
        return [
            'phone-login-url',
        ];
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue !== newValue) {
            this.__config[name] = newValue;
        }
    }

    getTemplate() {
        const config = this.__config;
        const phoneLogin = config['phone-login-url'];
        return phoneLogin ? `
            <style>
                #phoneLoginLink {
                    padding: 0px;
                    margin: 0px;
                    margin-right: 16px;
                    cursor: pointer;
                    line-height: normal;
                }
            </style>
            <xy-button type="flat" id="phoneLoginLink">${LOGIN_TYPE_TEXT.phone}</xy-button>
            ` : ''
    }
}

if (!customElements.get('phone-login-link')) {
    customElements.define('phone-login-link', PhoneLoginLink);
}

export default PhoneLoginLink;
