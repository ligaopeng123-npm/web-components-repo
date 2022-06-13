/**********************************************************************
 *
 * @模块名称: forgotPassword
 *
 * @模块用途: forgotPassword
 *
 * @创建人: pgli
 *
 * @date: 2022/6/10 16:18
 *
 **********************************************************************/
import XyDialog from '../xy-ui/components/xy-dialog.js';
import {isFalse} from "../utils";
import PhoneLogin from "./PhoneLogin";
import './PhoneLogin';
import * as console from "console";

class ForgotPassword extends HTMLElement {
    shadow: any = null;
    __config: any = {};

    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
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

    destroy = () => {
        this.removeEvent();
        this.dialog.open = false;
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
        ];
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue !== newValue) {
            this.__config[name] = newValue;
        }
    }

    addEvents() {
        this.shadow.querySelector('#forgotPasswordUrl')?.addEventListener('click', this.forgotPasswordClick);
    }

    removeEvent() {
        this.shadow.querySelector('#forgotPasswordUrl')?.removeEventListener('click', this.forgotPasswordClick);
    }

    getConfig() {
        return this.__config;
    }

    /**
     * 忘记密码能力 如果为boolean类型 则模块自己处理相应的逻辑
     * 否则组件处理密码找回能力
     */
    get forgotPasswordUrl(): boolean | string | undefined {
        const forgotPasswordUrl = this.getConfig()['forgot-password-url'];
        return isFalse(forgotPasswordUrl) ? false : forgotPasswordUrl;
    }

    get codeDom(): PhoneLogin {
        return document.querySelector('phone-login');
    }

    dialog: any;

    forgotPasswordClick = () => {
        const getForm = (): any => {
            // @ts-ignore
            return document.querySelector('phone-login').form;
        }
        const dialog = XyDialog.confirm({
            title: '密码找回',//标题
            oktext: '确认',//确定键文本
            canceltext: '取消',//取消键文本
            type: null,//类型，可选择以上几类
            icon: '<div></div>',
            autoclose: false,
            ok: () => {
                dialog.autoclose = false;
                //按确定键的操作
                if (getForm()?.checkValidity()) {
                    dialog.loading = true;
                    this.dispatchEvent(new CustomEvent('resetPasswordSubmit', {
                        detail: {data: getForm()?.formdata?.json}
                    }));
                } else {

                }
            },
            concel: () => {
                // 销毁窗口
                dialog.open = false;
                this.codeDom.destroy();
            },
            content: `
                <phone-login has-password="true"></phone-login>
            `//内容
        });
        setTimeout(() => {
            this.codeDom.init();
        });
        this.dialog = dialog;
    }

    getTemplate() {
        const config = this.__config;
        const forgotPasswordUrl = config['forgot-password-url']
        return forgotPasswordUrl ? `
            <style>
                #forgotPasswordUrl {
                    padding: 0px;
                    margin: 0px;
                    cursor: pointer;
                    line-height: normal;
                }
            </style>
            <xy-button type="flat" id="forgotPasswordUrl">忘记密码</xy-button>
            ` : ''
    }
}


if (!customElements.get('forgot-password')) {
    customElements.define('forgot-password', ForgotPassword);
}

export default ForgotPassword
