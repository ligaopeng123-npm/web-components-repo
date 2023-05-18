/** ********************************************************************
 *
 * @模块名称: verificationCode
 *
 * @模块用途: verificationCode
 *
 * @date: 2022/6/10 17:13
 *
 * @版权所有: pgli
 *
 ********************************************************************* */
import {get, post} from "@gaopeng123/fetch";
import { isTrue } from "../utils";

class VerificationCode extends HTMLElement {
    shadow: any = null;
    __config: any = {};

    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
    }

    connectedCallback() {
        this.shadow.innerHTML = this.getTemplate();
        this.addEvents();
        this.setCaptcha();
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
            'captcha',
            'captchasrc',
            'captchaurl',
            'captchamethod',
            'item-style',
            'show'
        ];
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue !== newValue) {
            this.__config[name] = newValue;
            if(name === 'show') {
                this.captchaRef.setShow(newValue === 'show' ? 'show' : false)
            }
        }
    }

    addEvents() {
        this.addCaptchaEvent();
    }

    removeEvent() {
        if (this.getConfig().captcha) {
            this.captchaImg?.removeEventListener('click', this.setCaptcha);
        }
    }

    get captchaImg() {
        return this.shadow.querySelector(`#captchaImg`);
    }

    getConfig() {
        return this.__config;
    }

    addCaptchaEvent() {
        if (this.getConfig().captcha) {
            this.captchaImg?.addEventListener('click', this.setCaptcha);
        }
    }

    /**
     * 获取验证码
     */
    getCaptcha = async (): Promise<Blob> => {
        const {captchaurl, captchamethod} = this.getConfig();
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        };
        const data = captchamethod === 'POST' ? post(captchaurl, {
            headers: headers,
            responseType: 'blob'
        }) : get(captchaurl, {
            headers: headers,
            responseType: 'blob'
        });
        return await data;
    };

    /**
     * 设置验证码
     */
    setCaptcha = async () => {
        const {captcha, captchaurl} = this.getConfig();
        if (captcha) {
            if (captchaurl) {
                const captcha = await this.getCaptcha();
                this.captchaImg.setAttribute('src', window.URL?.createObjectURL(captcha));
            } else {
                this.dispatchEvent(new CustomEvent('captchaClick', {
                    detail: {time: Date.now()}
                }));
            }
        }
    };

    get captchaRef() {
        return this.shadow.querySelector('#captcha');
    }

    get name() {
        return this.shadow.querySelector('captcha')?.getAttribute('name') || this.getConfig().captcha;
    }

    get value() {
        return this.shadow.querySelector('#captcha')?.value;
    }

    checkValidity() {
        return this.captchaRef.checkValidity();
    }

    getTemplate() {
        const config = this.getConfig();
        const captcha = config.captcha;
        return captcha ? `
            <style>
                #captchaImg {
					cursor: pointer;
				}
            </style>
            <xy-form-item id="captchaItem" style="${config['item-style']}" class="item">
                <xy-input errortips="请输入验证码" style="width: calc(100% - 80px);" id="captcha" icon="message" name="${captcha}" required type="captcha" placeholder="请输入验证码"></xy-input>
                <img id="captchaImg" width="24" height="24" alt="验证码"
                style="width: 80px;height: 37px;float: right;border-radius: 4px;" />
            </xy-form-item>
        ` : ''
    }
}


if (!customElements.get('verification-code')) {
    customElements.define('verification-code', VerificationCode);
}

export default VerificationCode;
