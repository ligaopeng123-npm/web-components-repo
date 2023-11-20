/** ********************************************************************
 *
 * @模块名称: phoneLogin
 *
 * @模块用途: 手机号登录
 *
 * @date: 2022/6/13 14:41
 *
 * @版权所有: pgli
 *
 ********************************************************************* */
import { isNumber } from "@gaopeng123/utils.types";
import { SendSMSVerificationCodeProps } from "../typing";
import { PHONE_NUMBER_STR } from "@gaopeng123/utils.string";

class PhoneLogin extends HTMLElement {
    shadow: any = null;
    __config: any = {};

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.shadow.innerHTML = this.getTemplate();
        this.addEvents();
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
    static get observedAttributes() {
        // 参数请参考文档
        return [
            'forgot-password-url',
            'item-style',
            'has-password'
        ];
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue !== newValue) {
            this.__config[name] = newValue;
        }
    }

    addEvents() {
        this.codeDom?.addEventListener('click', this.sendSMSVerificationCode);
    }

    init() {
        this.addEvents();
    }

    removeEvent() {
        this.codeDom?.removeEventListener('click', this.sendSMSVerificationCode);
        this.setCodeDisabled(false);
    }

    checkValidity = () => {
        return this.form.checkValidity();
    }

    get formdata() {
        return this.form.formdata;
    }

    destroy() {
        this.removeEvent();
    }

    getConfig() {
        return this.__config;
    }

    get codeDom() {
        return this.shadow.querySelector('#send-verification-code');
    }

    get form() {
        return this.shadow.querySelector('#login-module-phone-form');
    }

    setCodeDisabled = (type: boolean) => {
        if (type) {
            this.codeDom?.setAttribute('disabled', 'disabled');
        } else {
            this.codeDom.removeAttribute('disabled');
        }
    }

    showTimmer = (timeer: number) => {
        setTimeout(() => {
            const _timeer = (isNumber(timeer) ? timeer : 60) - 1;
            const code: any = this.codeDom;
            if (code) {
                code.innerText = `${_timeer}秒后重发`;
                if (_timeer) {
                    this.showTimmer(_timeer);
                } else {
                    code.innerText = `获取验证码`;
                    this.setCodeDisabled(false);
                }
            }
        }, 1000);
    }

    sendSMSVerificationCode = (timeer: any) => {
        const phoneVal = this.shadow.querySelector('#phone')?.value;
        if (new RegExp(PHONE_NUMBER_STR).test(phoneVal)) {
            this.setCodeDisabled(true);
            this.showTimmer(timeer);
            this.dispatchEvent(new CustomEvent('sendSMSVerificationCode', {
                detail: {
                    phone: phoneVal,
                    type: 'login'
                }
            } as SendSMSVerificationCodeProps));
        } else {
            this.checkValidity();
        }
    }

    getTemplate() {
        const hasPassword = this.__config['has-password'];
        return `
            <style>
                .item {
                    margin: 16px 0px;
                    display: block;
                    min-width: 300px;
                    height: 38px;
                }
            </style>
            <xy-form id="login-module-phone-form" form-style="display:block;" action="/login" method="post">
                <xy-form-item class="item" errordir="bottom">
                    <xy-input errortips="请输入手机号" id="phone" icon="phone" pattern="${PHONE_NUMBER_STR}" errordir="bottom" style="width: 100%" name="phone" required placeholder="请输入手机号"></xy-input>
                </xy-form-item>
                <xy-form-item class="item">
                    <xy-input-group style="width: 100%">
                        <xy-input errortips="请输入验证码" icon="message" style="width: calc(100% - 100px)" name="code" placeholder="请输入验证码" required placeholder="请输入验证码" minlength="4"></xy-input>
                        <xy-button style="width: 100px" id="send-verification-code" type="primary">获取验证码</xy-button>
                    </xy-input-group>
                </xy-form-item>
                ${hasPassword
            ? `
                    <xy-form-item class="item">
                        <xy-input password-text="plain" style="width: 100%" pattern="(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{8,}" autocomplete="new-password" id="reset-password" icon="lock" name="password"
                            required type="password" errortips="请输入正确的密码" placeholder="请输入密码">
                        </xy-input>
                    </xy-form-item>
                    `
            : ``}
                <slot></slot>
            </xy-form>
        `
    }
}

if (!customElements.get('phone-login')) {
    customElements.define('phone-login', PhoneLogin);
}

export default PhoneLogin;
