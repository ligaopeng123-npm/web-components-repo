import './xy-ui/components/xy-input.js';
import './xy-ui/components/xy-checkbox.js';
import './xy-ui/components/xy-form.js';
import XyDialog from './xy-ui/components/xy-dialog.js';
import {get, post} from '@gaopeng123/fetch';
import {isBoolean} from '@gaopeng123/utils.types';
import {removeUrlParams} from '@gaopeng123/utils.file';

export interface LoginModuleProps {
    'my-title'?: string, // 标题
    id?: string, // 标识 可不传
    'main-style'?: string, // 主样式 用于更改背景图等
    'body-style'?: string, // form表单样式
    'item-style'?: string, // form表单每个item的样式
    method?: string, // 请求方式
    url?: string, // 请求地址
    user?: string, // 用户字段key
    password?: string, // 密码字段key
    publickey?: string, // 密码字段key
    captcha?: string, // 验证码能力
    captchasrc?: string, // 验证码能力
    captchaurl?: string, // 验证码地址
    captchamethod?: string, // 验证码请求类型
    keeplogged?: boolean, // 是否支持记住密码
    'agreement-proprietary'?: string, // 用户协议解释权
}


export type SubmitData = {
    data: User,
}

export type User = {
    username?: string,
    password?: string,
    [propName: string]: any,
}

export type AfterSubmitDetail = {
    response: { status?: number, message?: string, result?: any, [propName: string]: any },
    session: User,
    token: string | null,
} & SubmitData

export type SubmitError = {
    detail: { error: Error } & SubmitData,
    [propName: string]: any,
}

export type Submit = {
    detail: SubmitData,
    [propName: string]: any,
}

export declare type AfterSubmit = {
    detail: AfterSubmitDetail,
    [propName: string]: any,
}


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
        return `${this.getConfig().id || `login-module`}`;
    }

    get form() {
        return this.shadow.querySelector(`xy-form`);
    }

    get checkbox() {
        return this.shadow.querySelector(`#checked`);
    }

    get sessionId() {
        return `${this.formId}-login-user`;
    }

    /**
     * 用户协议解释权
     */
    get agreementProprietary() {
        return this.shadow.querySelector(`#agreement-proprietary`);
    }

    get session() {
        const data = sessionStorage.getItem(`${this.sessionId}`);
        return data ? JSON.parse(data) : {};
    }

    set session(val) {
        sessionStorage.setItem(`${this.sessionId}`, JSON.stringify(val));
    }

    get captchaImg() {
        return this.shadow.querySelector(`#captchaImg`);
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
        const {url, user, password, method, publickey, captcha, captchasrc} = config;
        const title = this.title;
        /**
         * 项目title赋值
         */
        this.checkChange(this.shadow.querySelector('#title').innerText, title, () => {
            this.shadow.querySelector('#title').innerText = title;
            const agreementText = this.shadow.querySelector('#agreement-proprietary-text');
            if (agreementText) {
                agreementText.innerText = `${title}服务协议`;
            }
        });

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
        this.checkChange(this.shadow.querySelector(`#user`).getAttribute('name'), user, () => {
            this.shadow.querySelector(`#user`).setAttribute('name', user);
        });

        /**
         * 密码绑定
         */
        this.checkChange(this.shadow.querySelector(`#password`).getAttribute('name'), password, () => {
            this.shadow.querySelector(`#password`).setAttribute('name', password);
        });

        /**
         * 密码加密绑定
         */
        this.checkChange(this.shadow.querySelector(`#password`).getAttribute('publickey'), publickey, () => {
            this.shadow.querySelector(`#password`).setAttribute('publickey', publickey);
        });

        /**
         * 验证码绑定
         */
        captcha && this.checkChange(this.shadow.querySelector(`#captcha`).getAttribute('name'), captcha, () => {
            this.shadow.querySelector(`#captcha`).setAttribute('name', captcha);
        });
        /**
         * 设置验证码地址
         */
        captcha && captchasrc && this.checkChange(this.captchaImg.getAttribute('src'), captchasrc, () => {
            this.captchaImg.setAttribute('src', captchasrc);
        });
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
        'agreement-proprietary': '' // 用户协议
    };
    __config: any = {};
    getConfig = (): any => {
        return Object.assign({}, this.defaultConfig, this.__config);
    };

    /**
     * 生命周期钩子函数 处理挂载
     */
    connectedCallback() {
        this.shadow.innerHTML = this.getTemplate();
        this.addEvents();
        this.setCaptcha();
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
                const {user, password} = this.getConfig();
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
        this.shadow.querySelector(`#bth-login`).removeEventListener('click', this.onSubmit);
        if (this.getConfig().captcha) {
            this.captchaImg?.removeEventListener('click', this.setCaptcha);
        }
        this.agreementProprietary?.removeEventListener('change', this.agreementChange);
        this.shadow.querySelector('#agreement-proprietary-text')
            ?.removeEventListener('click', this.agreementClick);
    }

    addEvents() {
        this.form.addEventListener('submit', this.watchSubmit);
        this.form.addEventListener('submitError', this.submitError);
        this.shadow.querySelector(`#bth-login`).addEventListener('click', this.onSubmit);
        this.addCaptchaEvent();
        this.agreementProprietary?.addEventListener('change', this.agreementChange);
        this.shadow.querySelector('#agreement-proprietary-text')
            ?.addEventListener('click', this.agreementClick);
        this.addKeyWordEvents();
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
            if (loginBth && loginBth.getAttribute('loading') !== '') {
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

    addCaptchaEvent() {
        if (this.getConfig().captcha) {
            this.captchaImg?.addEventListener('click', this.setCaptcha);
        }
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
        if (ev?.target.checked) {
            loginBth.disabled = false;
        } else {
            loginBth.disabled = true;
        }
    };

    /**
     * 注册点击事件
     */
    agreementClick = () => {
        this.openUserAgreement();
    };

    /**
     * 用户协议
     */
    openUserAgreement() {
        const config = this.getConfig();
        const title = this.title;
        const agreementProprietary = config['agreement-proprietary'];
        XyDialog.alert({
            title: '用户协议',//标题
            oktext: '已阅读',//确定键文本
            canceltext: null,//取消键文本
            ok: function () {
                //按确定键的操作
            },
            content: `
			<div style="color: #000">
                <h2>一、总则</h2>
                <p>
                    1.1
                    ${title}的所有权和运营权归${agreementProprietary}所有。
                </p>
                <p>
                    1.2
                    用户在注册之前，应当仔细阅读本协议，并同意遵守本协议后方可成为注册用户。一旦注册成功，则用户与${title}之间自动形成协议关系，用户应当受本协议的约束。用户在使用特殊的服务或产品时，应当同意接受相关协议后方能使用。
                </p>
                <p>
                    1.3
                    本协议则可由${title}随时更新，用户应当及时关注并同意，本系统不承担通知义务。本系统的通知、公告、声明或其它类似内容是本协议的一部分。
                </p>

                <h2>二、服务内容</h2>
                <p>2.1 ${title}的具体内容由本系统根据实际情况提供。</p>
                <p>
                    2.2
                    本系统仅提供相关的网络服务，除此之外与相关网络服务有关的设备(如个人电脑、手机、及其他与接入互联网或移动网有关的装置)及所需的费用(如为接入互联网而支付的电话费及上网费、为使用移动网而支付的手机费)均应由用户自行负担。
                </p>

                <h2>三、用户账号</h2>
                <p>
                    3.1
                    经本系统注册系统完成注册程序并通过身份认证的用户即成为正式用户，可以获得本系统规定用户所应享有的一切权限；未经认证仅享有本系统规定的部分会员权限。${title}有权对会员的权限设计进行变更。
                </p>
                <p>
                    3.2
                    用户只能按照注册要求使用账号和密码注册。用户有义务保证密码和账号的安全，用户利用该密码和账号所进行的一切活动引起的任何损失或损害，由用户自行承担全部责任，本系统不承担任何责任。如用户发现账号遭到未授权的使用或发生其他任何安全问题，应立即修改账号密码并妥善保管，如有必要，请通知本系统。因黑客行为或用户的保管疏忽导致账号非法使用，本系统不承担任何责任。
                </p>

                <h2>四、使用规则</h2>
                <p>
                    4.1
                    遵守中华人民共和国相关法律法规，包括但不限于《中华人民共和国计算机信息系统安全保护条例》、《计算机软件保护条例》、《最高人民法院关于审理涉及计算机网络著作权纠纷案件适用法律若干问题的解释(法释[2004]1号)》、《全国人大常委会关于维护互联网安全的决定》、《互联网电子公告服务管理规定》、《互联网新闻信息服务管理规定》、《互联网著作权行政保护办法》和《信息网络传播权保护条例》等有关计算机互联网规定和知识产权的法律和法规、实施办法。
                </p>
                <p>
                    4.2
                    用户对其自行发表、上传或传送的内容负全部责任，所有用户不得在本系统任何页面发布、转载、传送含有下列内容之一的信息，否则本系统有权自行处理并不通知用户：<br />
                    (1)违反宪法确定的基本原则的；<br />
                    (2)危害国家安全，泄漏国家机密，颠覆国家政权，破坏国家统一的；<br />
                    (3)损害国家荣誉和利益的；<br />
                    (4)煽动民族仇恨、民族歧视，破坏民族团结的；<br />
                    (5)破坏国家宗教政策，宣扬邪教和封建迷信的；<br />
                    (6)散布谣言，扰乱社会秩序，破坏社会稳定的；<br />
                    (7)散布淫秽、色情、赌博、暴力、恐怖或者教唆犯罪的；<br />
                    (8)侮辱或者诽谤他人，侵害他人合法权益的；<br />
                    (9)煽动非法集会、结社、游行、示威、聚众扰乱社会秩序的；<br />
                    (10)以非法民间组织名义活动的；<br />
                    (11)含有法律、行政法规禁止的其他内容的。
                </p>
                <p>
                    4.3
                    用户承诺对其发表或者上传于本系统的所有信息(即属于《中华人民共和国著作权法》规定的作品，包括但不限于文字、图片、音乐、电影、表演和录音录像制品和电脑程序等)均享有完整的知识产权，或者已经得到相关权利人的合法授权；如用户违反本条规定造成本系统被第三人索赔的，用户应全额补偿本系统一切费用(包括但不限于各种赔偿费、诉讼代理费及为此支出的其它合理费用)；
                </p>
                <p>
                    4.4
                    当第三方认为用户发表或者上传于本系统的信息侵犯其权利，并根据《信息网络传播权保护条例》或者相关法律规定向本系统发送权利通知书时，用户同意本系统可以自行判断决定删除涉嫌侵权信息，除非用户提交书面证据材料排除侵权的可能性，本系统将不会自动恢复上述删除的信息；<br />
                    (1)不得为任何非法目的而使用网络服务系统；<br />
                    (2)遵守所有与网络服务有关的网络协议、规定和程序；<br />
                    (3)不得利用本系统进行任何可能对互联网的正常运转造成不利影响的行为；<br />
                    (4)不得利用本系统进行任何不利于本系统的行为。
                </p>
                <p>
                    4.5
                    如用户在使用网络服务时违反上述任何规定，本系统有权要求用户改正或直接采取一切必要的措施(包括但不限于删除用户张贴的内容、暂停或终止用户使用网络服务的权利)以减轻用户不当行为而造成的影响。
                </p>

                <h2>五、隐私保护</h2>
                <p>
                    5.1
                    本系统不对外公开或向第三方提供单个用户的注册资料及用户在使用网络服务时存储在本系统的非公开内容，但下列情况除外：<br />
                    (1)事先获得用户的明确授权；<br />
                    (2)根据有关的法律法规要求；<br />
                    (3)按照相关政府主管部门的要求；<br />
                    (4)为维护社会公众的利益。
                </p>
                <p>
                    5.2
                    本系统可能会与第三方合作向用户提供相关的网络服务，在此情况下，如该第三方同意承担与本系统同等的保护用户隐私的责任，则本系统有权将用户的注册资料等提供给该第三方。
                </p>
                <p>
                    5.3
                    在不透露单个用户隐私资料的前提下，本系统有权对整个用户数据库进行分析并对用户数据库进行商业上的利用。
                </p>

                <h2>六、版权声明</h2>
                <p>
                    6.1
                    本系统的文字、图片、音频、视频等版权均归${agreementProprietary}享有或与作者共同享有，未经本系统许可，不得任意转载。
                </p>
                <p>
                    6.2
                    本系统特有的标识、版面设计、编排方式等版权均属${agreementProprietary}享有，未经本系统许可，不得任意复制或转载。
                </p>
                <p>
                    6.3
                    使用本系统的任何内容均应注明“来源于${title}”及署上作者姓名，按法律规定需要支付稿酬的，应当通知本系统及作者及支付稿酬，并独立承担一切法律责任。
                </p>
                <p>
                    6.4
                    本系统享有所有作品用于其它用途的优先权，包括但不限于网站、电子杂志、平面出版等，但在使用前会通知作者，并按同行业的标准支付稿酬。
                </p>
                <p>
                    6.5
                    本系统所有内容仅代表作者自己的立场和观点，与本系统无关，由作者本人承担一切法律责任。
                </p>
                <p>6.6 恶意转载本系统内容的，本系统保留将其诉诸法律的权利。</p>

                <h2>七、责任声明</h2>
                <p>
                    7.1
                    用户明确同意其使用本系统网络服务所存在的风险及一切后果将完全由用户本人承担，${title}对此不承担任何责任。
                </p>
                <p>
                    7.2
                    本系统无法保证网络服务一定能满足用户的要求，也不保证网络服务的及时性、安全性、准确性。
                </p>
                <p>
                    7.3
                    本系统不保证为方便用户而设置的外部链接的准确性和完整性，同时，对于该等外部链接指向的不由本系统实际控制的任何网页上的内容，本系统不承担任何责任。
                </p>
                <p>
                    7.4
                    对于因不可抗力或本系统不能控制的原因造成的网络服务中断或其它缺陷，本系统不承担任何责任，但将尽力减少因此而给用户造成的损失和影响。
                </p>
                <p>
                    7.5
                    对于站向用户提供的下列产品或者服务的质量缺陷本身及其引发的任何损失，本系统无需承担任何责任：<br />
                    (1)本系统向用户免费提供的各项网络服务；<br />
                    (2)本系统向用户赠送的任何产品或者服务。
                </p>
                <p>
                    7.6
                    本系统有权于任何时间暂时或永久修改或终止本服务(或其任何部分)，而无论其通知与否，本系统对用户和任何第三人均无需承担任何责任。
                </p>

                <h2>八、附则</h2>
                <p>
                    8.1
                    本协议的订立、执行和解释及争议的解决均应适用中华人民共和国法律。
                </p>
                <p>
                    8.2
                    如本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，本协议的其余条款仍应有效并且有约束力。
                </p>
                <p>8.3 本协议解释权及修订权归${agreementProprietary}所有。</p>
            </div>
			`//内容
        });
    }

    /**
     * 提交回调 给外部提供的接口
     */
    currentSubmitTimmer: any = null;
    onSubmit = () => {
        if (this.currentSubmitTimmer) {
            if (Date.now() - this.currentSubmitTimmer < 200) {
                this.currentSubmitTimmer = Date.now();
                return;
            }
        }
        this.currentSubmitTimmer = Date.now();
        if (this.form.checkValidity()) {
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
                detail: this.getDetail({data: this.form.formdata?.json})
            }));
        }
    };

    /**
     * 监听提交事件
     * @param data
     */
    watchSubmit = (res: any) => {
        const {data, token} = res?.detail;
        this.dispatchEvent(new CustomEvent('afterSubmit', {
            detail: this.getDetail({data: this.form.formdata?.json, token, response: data})
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
            'agreement-proprietary'
        ];
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

    /**
     * 是否是true
     * @param val
     */
    isTrue(val: any) {
        return isBoolean(val) ? val : val === 'true';
    }

    // 是否支持记住密码
    keeplogged: boolean = false;
    /**
     * 模板获取
     */
    getTemplate = () => {
        const config = this.getConfig();
        const {url, user, password, method, publickey, captcha} = config;
        const title = this.title;

        const keeplogged = this.isTrue(config.keeplogged);
        /**
         * 明文 密文显示
         */
        const passwordText = config['password-text'];

        this.keeplogged = keeplogged;
        /**
         * 所有权
         */
        const agreementProprietary = config['agreement-proprietary'];

        return `
			<style>
				xy-form {
					min-width: 300px;
					border: 1px solid #f6f2f2;
    				padding: 24px;
    				color: #999;
    				background-color: #fff;
    				position: absolute;
				}
				xy-form > .item {
					margin: 24px 24px;
					display: block;
				}
				xy-input, xy-button{
					width: 100%;
				}
				xy-input {
					height: 38px;
				}
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
				#captchaImg {
					cursor: pointer;
				}
                #agreement-proprietary-text::after{
                    content: "";
                    height: 2px;
                    overflow: hidden;
                    display: block;
                    left: 0px;
                    position: absolute;
                    width: 100%;
                    background: var(--login-module-agreement-proprietary-color, #42b983);
                    transform: scaleX(0);
                    transition: all 0.5s;
                }
				#agreement-proprietary-text {
					cursor: pointer;
					user-select: none;
					color: var(--login-module-agreement-proprietary-color, #42b983);
					/*vertical-align: 1px;*/
				}
				#agreement-proprietary-text:hover::after {
					transform: scaleX(1);
				}
			</style>
			<div class="login-module ${config[`main-style`] ? '' : 'login-module-bg'}" id="login" style="${config[`main-style`]}">
				<xy-form autocomplete="on" id="login-module" action="${url}" method="${method}"
					style="${config['body-style']}" form-style="display:block;">
					<xy-form-item class="login-title" style="${config['item-style']}">
						<span id="title">${title}</span>
					</xy-form-item>
					<xy-form-item style="${config['item-style']}" class="item">
						<xy-input errortips="请输入用户名" id="user" icon="user" color="#999" required name="${user}" placeholder="请输入用户名"></xy-input>
					</xy-form-item style="${config['item-style']}">
					<xy-form-item style="${config['item-style']}" class="item">
						<xy-input autocomplete="new-password" password-text="${passwordText}" id="password" icon="lock" publickey="${publickey}" name="${password}"
							required type="password" errortips="请输入密码" placeholder="请输入密码">
						</xy-input>
					</xy-form-item>
					` + (captcha ? `
	                    <xy-form-item id="captchaItem" style="${config['item-style']}" class="item">
	                        <xy-input errortips="请输入验证码" style="width: calc(100% - 80px);" id="captcha" icon="message" name="${captcha}" required type="captcha" placeholder="请输入验证码"></xy-input>
	                        <img id="captchaImg" width="24" height="24" alt="验证码"
	                        style="width: 80px;height: 37px;float: right;border-radius: 4px;" />
	                    </xy-form-item>
	                ` : '')
            + (keeplogged
                ? `<xy-form-item style="${config['item-style']}">
						<div style="${config['item-style']}" class="login-manipulate">
							<xy-checkbox id="checked">记住我</xy-checkbox>
						</div>
					</xy-form-item>` : '') + `
                    <xy-form-item style="${config['item-style']}" class="item">
                        <xy-button id="bth-login" type="primary" htmltype="submit">登录</xy-button>
                    </xy-form-item>
                   
                     ` +
            (agreementProprietary
                ? `<xy-form-item style="${config['item-style']}" class="item">
                       <xy-checkbox checked id="agreement-proprietary">已阅读并同意</xy-checkbox>
                       <span style="position: relative;bottom: 1px;">
                           <span id="agreement-proprietary-text">${title}服务协议</span>
                       </span>
                    </xy-form-item>` : '') +
            `
                </xy-form>
            </div>
			`;
    };
}

if (!customElements.get('login-module')) {
    customElements.define('login-module', LogInModule);
}
