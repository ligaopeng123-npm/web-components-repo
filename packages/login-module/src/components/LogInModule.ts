/**********************************************************************
 *
 * @模块名称: LogInModule
 *
 * @模块用途: LogInModule
 *
 * @创建人: pgli
 *
 * @date: 2022/6/13 22:06
 *
 **********************************************************************/
import '../xy-ui/components/xy-input.js';
import '../xy-ui/components/xy-checkbox.js';
import '../xy-ui/components/xy-form.js';
import "./AgreementProprietary";
import "./ForgotPassword";
import "./VerificationCode";
import "./Keeplogged";
import "./PhoneLogin";
import "./PhoneLoginLink";
import { removeUrlParams } from '@gaopeng123/utils.file';
import { isTrue } from "../utils";
import {
    LoginType,
    SendSMSVerificationCodeProps
} from "../typing";
import {
    afterSubmit,
    catchError,
    getFormByType,
    submit
} from "../xy-ui/utils/formHelper";

export default class LogInModule extends HTMLElement {
    shadow: any = null;

    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
    }

    /**
     * form id 动态绑定一些属性
     */
    get formId() {
        return `${this.getConfig().id || `login-module-form`}`;
    }

    get form() {
        return this.shadow.querySelector(`#${this.formId}`);
    }

    get checkbox() {
        return this.shadow.querySelector(`keep-logged`);
    }

    get sessionId() {
        return `${this.formId}-login-user`;
    }

    /**
     * 用户协议解释权
     */
    get agreementProprietary() {
        return this.shadow.querySelector(`agreement-proprietary`);
    }

    get session() {
        const data = sessionStorage.getItem(`${this.sessionId}`);
        return data ? JSON.parse(data) : {};
    }

    set session(val) {
        sessionStorage.setItem(`${this.sessionId}`, JSON.stringify(val));
    }

    /**
     * 是否支持记住密码
     */
    get keeplogged() {
        return isTrue(this.getConfig()['keeplogged']);
    }

    /**
     * 验证码
     */
    get captchaShadow() {
        return this.shadow.querySelector('verification-code')?.captchaRef;
    }

    get captchaImg() {
        return this.shadow.querySelector('verification-code')?.captchaImg;
    }

    /**
     * 不再使用title 照成tip污染
     */
    get title() {
        const title = this.getConfig()['my-title'];
        // 兼容以前的处理
        return title || this.getAttribute('title');
    }

    create = () => {
        const config = this.getConfig();
        const {
            url,
            user,
            password,
            method,
            publickey,
            captcha,
            captchasrc
        } = config;
        const title = this.title;
        /**
         * 项目title赋值
         */
        this.checkChange(this.shadow.querySelector('#title').innerText, title, () => {
            this.shadow.querySelector('#title').innerText = title;
            this.agreementProprietary?.setAttribute('my-title', title);
        });

        if (this.form) {
            /**
             * 服务端请求
             */
            this.checkChange(this.form.getAttribute('action'), url, () => {
                this.form.setAttribute('action', url);
            });

            /**
             * 请求类型
             */
            this.checkChange(this.form.getAttribute('method'), method, () => {
                this.form.setAttribute('method', method);
            });

            /**
             * 用户绑定
             */
            this.checkChange(this.shadow.querySelector(`#user`)?.getAttribute('name'), user, () => {
                this.shadow.querySelector(`#user`)?.setAttribute('name', user);
            });

            /**
             * 密码绑定
             */
            this.checkChange(this.shadow.querySelector(`#password`)?.getAttribute('name'), password, () => {
                this.shadow.querySelector(`#password`)?.setAttribute('name', password);
            });

            /**
             * 密码加密绑定
             */
            this.checkChange(this.shadow.querySelector(`#password`)?.getAttribute('publickey'), publickey, () => {
                this.shadow.querySelector(`#password`)?.setAttribute('publickey', publickey);
            });

            /**
             * 验证码绑定
             */
            captcha && this.checkChange(this.captchaShadow?.getAttribute('name'), captcha, () => {
                this.captchaShadow?.setAttribute('name', captcha);
            });
            /**
             * 设置验证码地址
             */
            captcha && captchasrc && this.checkChange(this.captchaImg?.getAttribute('src'), captchasrc, () => {
                this.captchaImg?.setAttribute('src', captchasrc);
            });
        }
    };
    /**
     * 新老数据比对后再赋值
     * @param oldValue
     * @param newValue
     * @param handle
     */
    checkChange = (oldValue: string, newValue: string, handle: any) => {
        if (oldValue !== newValue && handle) handle();
    };

    readonly defaultConfig: any = {
        'my-title': '某某系统',
        id: 'login-module',
        'title-style': '',
        'body-style': '',
        'main-style': '',
        'item-style': '',
        method: 'POST', // POST GET
        url: null, // 默认不支持传参
        user: 'user',
        password: 'password',
        'password-text': 'plain',
        captcha: '',
        captchasrc: null,
        captchaurl: null,
        captchamethod: 'POST',
        publickey: null, // 加密公钥
        keeplogged: false, // 记住密码
        'agreement-proprietary': '', // 用户协议
        'forgot-password-url': '', // 忘记密码
        'phone-login-url': '', // 手机号登录
        'browser-remembers-password': false, // 手机号登录
    };
    __config: any = {};
    getConfig = (): any => {
        return Object.assign({}, this.defaultConfig, this.__config);
    };

    /**
     * 生命周期钩子函数 处理挂载
     */
    connectedCallback() {
        this.shadow.innerHTML = this.getTemplate('account');
        this.addEvents();
        this.setFormValue();
    }

    /**
     * 设置form表单数据
     */
    setFormValue() {
        // 如果是记住密码
        if (this.keeplogged) {
            const storageValue = this.getLocalStorageValue();
            const {keepLogged} = storageValue;
            if (keepLogged) {
                const {
                    user,
                    password
                } = this.getConfig();
                const userValue = storageValue[user];
                const passwordValue = storageValue[password];
                this.shadow.querySelector('#user').value = userValue;
                this.shadow.querySelector('#password').value = passwordValue;
                this.shadow.querySelector('#password').keeplogged = passwordValue;
                this.checkbox.checked = true;
            } else {
                this.checkbox.checked = false;
            }
        }
    }

    /**
     * 移除文档流
     */
    disconnectedCallback() {
        this.removeEvents();
    }

    removeEvents() {
        this.form.removeEventListener('submit', this.watchSubmit);
        this.form.removeEventListener('submitError', this.submitError);
        this.form.removeEventListener('sendSMSVerificationCode', this.sendSMSVerificationCode);
        this.shadow.querySelector(`#bth-login`).removeEventListener('click', this.onSubmit);
        this.agreementProprietary?.removeEventListener('change', this.agreementChange);
        this.removeKeyWordEvents();
        this.shadow.querySelector('phone-login-link').removeEventListener('change', this.linkChange);
        this.shadow.querySelector('forgot-password')?.removeEventListener('resetPasswordSubmit', this.onResetPasswordSubmit);
        this.shadow.querySelector('forgot-password')?.removeEventListener('sendSMSVerificationCode', this.sendSMSVerificationCode);
        this.shadow.querySelector('verification-code')?.removeEventListener('captchaClick', this.onCaptchaClick);
    }

    addEvents() {
        this.addLoginEvent();
        this.agreementProprietary?.addEventListener('change', this.agreementChange);
        this.addKeyWordEvents();
        this.shadow.querySelector('phone-login-link').addEventListener('change', this.linkChange);
        this.shadow.querySelector('forgot-password')?.addEventListener('resetPasswordSubmit', this.onResetPasswordSubmit)
        this.shadow.querySelector('forgot-password')?.addEventListener('sendSMSVerificationCode', this.sendSMSVerificationCode);
    }

    addLoginEvent = () => {
        this.shadow.querySelector(`#bth-login`)?.addEventListener('click', this.onSubmit);
        this.shadow.querySelector('verification-code')?.addEventListener('captchaClick', this.onCaptchaClick);
        if (this.form) {
            this.form.addEventListener('submit', this.watchSubmit);
            this.form.addEventListener('submitError', this.submitError);
            this.form.addEventListener('sendSMSVerificationCode', this.sendSMSVerificationCode);
            this.initRememberPasswordForm();
        }
    }

    onkeydown = (event: any) => {
        // @ts-ignore
        const activeTagName = document.activeElement.tagName;
        if (activeTagName === 'LOGIN-MODULE') {
            // @ts-ignore
            const e = event || window.event || arguments.callee.caller.arguments[0];

            if (e && e.keyCode == 27) { // 按 Esc

            }

            if (e && e.keyCode == 113) { // 按 F2

            }

            if (e && e.keyCode == 13) { // enter 键
                this.onEnter();
            }
        }
    };

    /**
     * 点击enter键触发事件 解决react中事件拦截bug
     */
    onEnter() {
        setTimeout(() => {
            const loginBth = this.shadow && this.shadow.querySelector
                ? this.shadow.querySelector(`#bth-login`)
                : null;
            if (loginBth && loginBth.getAttribute('loading') !== '' && loginBth.disabled !== true) {
                loginBth.click();
            }
        }, 10);
    }

    /**
     * 监听键盘事件
     */
    addKeyWordEvents() {
        document.addEventListener('keydown', this.onkeydown);
    };

    removeKeyWordEvents() {
        document.removeEventListener('keydown', this.onkeydown);
    }

    /**
     * 对外传递消息数据结构
     * @param data
     */
    getDetail(data: any) {
        return Object.assign({}, data, {
            session: this.session
        });
    }

    href: string = null;

    /**
     * 获取地址
     */
    getLocationHref() {
        if (!this.href) {
            const href = window.location.href;
            this.href = removeUrlParams(href);
        }
        return this.href;
    }

    /**
     * 获取LocalStorageValue的值
     */
    getLocalStorageValue() {
        const val = localStorage.getItem(this.getLocationHref());
        return val ? JSON.parse(val) : {};
    }

    /**
     * 设置缓存
     * @param val
     */
    setLocalStorageValue(val: any) {
        localStorage.setItem(this.getLocationHref(), JSON.stringify(val));
    }

    clearLocalStorageValue() {
        localStorage.clear();
    }

    /**
     * 切换事件
     */
    agreementChange = (ev?: any) => {
        const loginBth = this.shadow.querySelector(`#bth-login`);
        if (ev?.detail.checked) {
            loginBth.disabled = false;
        } else {
            loginBth.disabled = true;
        }
    };
    /**
     * 改变登录方式
     * @param ev
     */
    loginType: LoginType = 'account';

    linkChange = (ev?: any) => {
        this.loginType = ev?.detail?.type;
        this.shadow.querySelector('.login-form').innerHTML = this.getFormByType(ev?.detail?.type);
        setTimeout(() => {
            this.addLoginEvent();
            /**
             * 相互切换时 获取新的验证码
             */
            this.shadow.querySelector('verification-code')?.setCaptcha();
        })
    }
    /**
     * 密码修改功能
     * @param ev
     */
    onResetPasswordSubmit = (ev: any) => {
        this.dispatchEvent(new CustomEvent('resetPasswordSubmit', {
            detail: ev?.detail
        }));
    }
    /**
     * 验证码点击事件
     * @param ev
     */
    onCaptchaClick = (ev: any) => {
        this.dispatchEvent(new CustomEvent('captchaClick', {
            detail: ev?.detail
        }));
    }
    /**
     * 验证码发送
     * @param ev
     */
    sendSMSVerificationCode = (ev: SendSMSVerificationCodeProps) => {
        this.dispatchEvent(new CustomEvent('sendSMSVerificationCode', {
            detail: ev?.detail
        }));
    }

    /**
     * 提交回调 给外部提供的接口
     */
    getFormdata(jsondata: any) {
        const formdata: any = new FormData();
        for (const formdataKey in jsondata) {
            formdata.set(formdataKey, jsondata[formdataKey]);
        }
        formdata.json = jsondata;
        return formdata;
    }


    checkValidity = () => {
        if (this.canRemember) {
            const items = this.form.querySelectorAll('.form-item');
            let invalid = true;
            const json: any = {};
            for (let i = 0; i < items.length; i++) {
                const formItem = items[i];
                const input = formItem.querySelector('input');
                const value = (input?.value || formItem.value)?.trim();
                if (!value) {
                    formItem.setAttribute('type', "error");
                    formItem.setAttribute('show', 'show');
                    invalid = false
                } else {
                    json[formItem.getAttribute('name') || input.getAttribute('name')] = value;
                }
            }
            if (invalid) {
                this.form.formdata = this.getFormdata(json);
                submit(this.form);
            }
            return invalid;
        } else {
            return this.form?.checkValidity();
        }
    }
    currentSubmitTimmer: any = null;
    onSubmit = () => {
        if (this.currentSubmitTimmer) {
            if (Date.now() - this.currentSubmitTimmer < 200) {
                this.currentSubmitTimmer = Date.now();
                return;
            }
        }
        this.currentSubmitTimmer = Date.now();
        /**
         * 检验数据
         */
        if (this.checkValidity()) {
            /**
             * 如果是记住密码状态 则将密码缓存起来
             */
            if (this.keeplogged && this.checkbox && this.checkbox.checked) {
                this.session = Object.assign({
                    keepLogged: this.checkbox.checked
                }, this.form.formdata?.json);
                this.setLocalStorageValue(this.session);
            } else {
                this.session = Object.assign({}, this.form.formdata?.json);
                // 清理缓存
                this.setLocalStorageValue({});
            }
            /**
             * 将消息发送出去
             */
            this.dispatchEvent(new CustomEvent('submit', {
                detail: this.getDetail({
                    data: Object.assign({}, this.form.formdata?.json),
                    loginType: this.shadow.querySelector('phone-login-link')?.loginType
                })
            }));
        }
    };
    /**
     * 成功的回调
     */
    success = () => {
        this.shadow.querySelector('forgot-password')?.destroy();
    }
    /**
     * 失败处理
     */
    fail = () => {
        this.shadow.querySelector('forgot-password')?.fail();
    }
    /**
     * 监听提交事件
     * @param data
     */
    watchSubmit = (res: any) => {
        const {
            data,
            token
        } = res?.detail;
        this.dispatchEvent(new CustomEvent('afterSubmit', {
            detail: this.getDetail({
                data: this.form.formdata?.json,
                token,
                response: data
            })
        }));
    };

    /**
     * 提交出错
     * @param data
     */
    submitError = (data: any) => {
        this.dispatchEvent(new CustomEvent('submitError', {
            // 避免数据重复
            detail: data?.detail
        }));
    };

    /**
     * 当自定义元素的一个属性被增加、移除或更改时被调用。
     * 需要setAttribute 才能被触发
     */
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue !== newValue) {
            this.__config[name] = newValue;
            setTimeout(() => {
                this.create();
            });
        }
    }

    /**
     * 暴露哪些属性可以被监听
     * @returns {string[]}
     */
    static get observedAttributes() {
        // 参数请参考文档
        return [
            'my-title',
            'id',
            'title-style',
            'body-style',
            'main-style',
            'item-style',
            'url',
            'method',
            'user',
            'password',
            'password-text', // 是否支持明文显示
            'captcha',
            'captchasrc',
            'captchaurl',
            'captchamethod',
            'publickey',
            'keeplogged',
            'agreement-proprietary',
            'forgot-password-url',
            'phone-login-url',
            'browser-remembers-password',
        ];
    }

    /**
     * 初始化记住密码表单
     */
    initRememberPasswordForm = () => {
        const passwordInput = this.shadow.querySelector('#password');
        if (this.canRemember && passwordInput) {
            const btnPass = this.shadow.getElementById('btn-pass');
            btnPass.addEventListener('click', () => {
                const showPassword = passwordInput.getAttribute('type') === 'password';
                if (showPassword) {
                    passwordInput.setAttribute('type', 'text');
                    btnPass.setAttribute('icon', 'eye');
                } else {
                    passwordInput.setAttribute('type', 'password');
                    btnPass.setAttribute('icon', 'eye-close');
                }
                passwordInput.focus();
            });
            const config = this.getConfig();
            const {
                url,
                method
            } = config;
            this.form.action = url;
            this.form.method = method;
            this.form.getAction = ()=> {
                return url;
            }
            this.form.afterSubmit = (data: any) => {
                afterSubmit(this.form, data)
            }
            this.form.catchError = (data: any) => {
                catchError(this.form, data)
            }
            this.onInputChange('user');
            this.onInputChange('password');
        }
    }

    onInputChange(key: 'user' | 'password') {
        const inputUser = this.form.querySelector(`#${key}`);
        inputUser.addEventListener('input', ()=> {
            const item = this.form.querySelector(`.form-item-${key}`)
            const value = inputUser?.value?.trim();
            if (!value) {
                item.setAttribute('type', "error");
                item.setAttribute('show', 'show');
            } else {
                item.setAttribute('type', "success");
                item.setAttribute('show', false);
            }
        });
    }

    /**
     * 是否允许浏览器记住密码
     */
    get canRemember() {
        return isTrue(this.getConfig()['browser-remembers-password']) && this.loginType === 'account'
    }

    /**
     * 获取表单类型
     * @param loginType
     */
    getFormByType = (loginType: LoginType) => {
        return getFormByType(loginType, this);
    }
    /**
     * 模板获取
     */
    getTemplate = (loginType: LoginType) => {
        const config = this.getConfig();
        const title = this.title;
        return `
			<style>
				.login-module {
					height: 100%;
				    width: 100%;
				    position: absolute;
					display: flex;
				    justify-content: center;
				    align-items: center;
				    background-repeat:no-repeat;
                    background-attachment:fixed;
                    background-position:center;
                    background-size: cover;
                    background-color:black;
                    background-image:radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 40px),
					radial-gradient(white, rgba(255,255,255,.15) 1px, transparent 30px),
					radial-gradient(white, rgba(255,255,255,.1) 2px, transparent 40px),
					radial-gradient(rgba(255,255,255,.4), rgba(255,255,255,.1) 2px, transparent 30px);
				}
				
				.login-module-bg {
					background-size: 550px 550px, 350px 350px, 250px 250px, 150px 150px;
					background-position: 0 0, 40px 60px, 130px 270px, 70px 100px;
				}
				.login-module-body {
				    position: absolute;
				    background-color: #fff;
				    border: 1px solid #f6f2f2;
    				padding: 24px;
				}
				
				xy-form {
					min-width: 300px;
    				color: #999;
    				padding: 0px;
				}
				.item {
					margin: 16px 0px;
					display: block;
					width: 100%;
				}
				.login-module-body > .item,
				.phone-login > .item,
				 xy-form > .item {
					margin: 16px 0px;
					display: block;
				}
				xy-input, xy-button{
					width: 100%;
				}
				xy-input {
					height: 38px;
				}
				.login-title {
					color: var(--login-module-login-title-color, #333);
					text-align: center;
					font-size: var(--login-module-login-title-fontSize, 28px);
					font-family: var(--login-module-login-title-fontFamily, PingFangSC-Semibold, PingFang SC);
					font-weight: var(--login-module-login-title-fontSize, 600);
				}
				.login-manipulate {
					color: #666;
					margin-left: 24px;
				}
				.login-helper {
				    display: flex !important;
                    margin-bottom: 0px !important;
				}
				.login-helper-item: {
				    
				}
				.login-helper-item:last-child {
				    margin-left: auto;
				}
				
				.remember-form-item {
				    height: 32px;
                    width: 100%;
                    min-width: 300px;
                    display: flex;
                    height: 32px;
                    justify-content: center;
                    align-items: center;
                    border-radius: 4px;
                    border: 1px solid var(--borderColor,rgba(0,0,0,.2));
                    background-color: #ffffff;
				}
				
				.remember-form-item:hover {
                    border: 1px solid var(--themeColor,#42b983);
                }
				
				.remember-form-item-input {
				    height: 28px;
                    width: calc(100% - 32px);
                    outline: none;
                    color: #000000;
                    background-color: #ffffff;
                    border: 0px solid var(--borderColor,rgba(0,0,0,.2));
                }
                
                .remember-form-item-icon-pre {
                    display:flex;
                    margin-right:0.25em;
                    color:#999;
                }
                
                .remember-form-item-password {
                    width: calc(100% - 64px);
                }
                
                .remember-form-item-input::placeholder {
                    color: #999;
                }
                
                xy-tips[type=error] {
                    border: 1px solid var(--errorColor,#f4615c) !important;
                }
                
                xy-tips[type=error] xy-icon{
                    color:var(--errorColor,#f4615c);
                }
                
                #btn-pass {
                    width: 32px;
                }
			</style>
			<div class="login-module ${config[`main-style`] ? '' : 'login-module-bg'}" id="login-module" style="${config[`main-style`]}">
				<div class="login-module-body" style="${config['body-style']}">
                    <div class="login-title" style="${config['title-style']}">
                        <span id="title">${title}</span>
                    </div>
                    <slot name="tabs"></slot>
                    <div class="login-form">
                        ${this.getFormByType(loginType)} 
                    </div>
                    <!--用户协议功能-->
                    <agreement-proprietary style="${config['item-style']}" class="item" 
                        my-title="${title}" agreement-proprietary="${config['agreement-proprietary']}" 
                        item-style="${config['item-style']}"></agreement-proprietary>
                    <!--短信登录以及忘记密码-->  
                    <div style="${config['item-style']}" class="item login-helper">
                        <phone-login-link class="login-helper-item" item-style="${config['item-style']}" phone-login-url="${config['phone-login-url']}"></phone-login-link>
                        <forgot-password class="login-helper-item" item-style="${config['item-style']}" forgot-password-url="${config['forgot-password-url']}"></forgot-password>
                    </div>
                    <slot name="footer"></slot> 
                </div>
            </div>
         `;
    };
}

if (!customElements.get('login-module')) {
    customElements.define('login-module', LogInModule);
}
