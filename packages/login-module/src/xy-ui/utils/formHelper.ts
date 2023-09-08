import {
    get,
    post
} from "@gaopeng123/fetch";
import { LoginType } from "../../typing";
import LogInModule
    from "../../components/LogInModule";

/**
 * 表单提交处理
 * @param _this
 */
export const submit = async (_this: any) => {
    const action = _this.getAction ? _this.getAction() : _this.action;
    if (action && action != 'null') {
        _this.submitBtn && (_this.submitBtn.loading = true);
        if (_this.method?.toUpperCase() == 'GET') {
            const formdata = new URLSearchParams(_this.formdata).toString();
            get(`${action}?${formdata}`).then(data => {
                _this.afterSubmit(data);
            }, {
                // @ts-ignore
                noModification: true
            }).catch(error => {
                _this.catchError(error);
            });
        } else if (_this.method?.toUpperCase() == 'POST') {
            post(action, {
                body: _this.formdata.json,
                noModification: true
            }).then((data) => {
                _this.afterSubmit(data);
            }).catch((error) => {
                _this.catchError(error);
            });
        }
    }
}

export const afterSubmit = async (_this: any, data: any) => {
    // if(data.headers.get("content-type")=='application/json'){
    // 无论对错 结果都要抛出来
    // }
    if (_this.hideLaoding) _this.hideLaoding();
    /**
     * 请求返回数据
     * @type {any}
     */
    if (data) {
        let resData = data;
        if (data?.clone) {
            resData = await data?.clone()?.json();
        }
        _this.dispatchEvent(new CustomEvent('submit', {
            detail: {
                data: resData,
                token: data?.headers?.get('token')
            }
        }));
    }
};

export const catchError = (_this: any, error: any) => {
    if (_this.hideLaoding) _this.hideLaoding();
    _this.dispatchEvent(new CustomEvent('submitError', {
        detail: {
            // 解除引用关系 防止submitError时获取不到
            data: JSON.parse(JSON.stringify(_this.formdata.json)),
            error: error
        }
    }));
};

export const getAccountForm = (_this: LogInModule) => {
    const config = _this.getConfig();
    const {
        url,
        user,
        password,
        method,
        publickey,
        captcha
    } = config;
    /**
     * 明文 密文显示
     */
    const passwordText = config['password-text'];
    return `
                <xy-form autocomplete="on" id="${_this.formId}" action="${url}" method="${method}" form-style="display:block;">
                    <xy-form-item style="${config['item-style']}" class="item">
                        <xy-input errortips="请输入用户名" id="user" icon="user" color="#999" required name="${user}" placeholder="请输入用户名"></xy-input>
                    </xy-form-item style="${config['item-style']}">
                    <slot name="username-helper"></slot>
                    <xy-form-item style="${config['item-style']}" class="item">
                        <xy-input autocomplete="new-password" password-text="${passwordText}" id="password" icon="lock" publickey="${publickey}" name="${password}"
                            required type="password" errortips="请输入密码" placeholder="请输入密码">
                        </xy-input>
                    </xy-form-item>
                     <!--验证码功能-->
                    <verification-code required ${captcha ? 'name="${captcha}"' : ''}  style="${config['item-style']}" class="item" item-style="${config['item-style']}"
                        captcha="${captcha}" captchasrc="${config.captchasrc || ''}" captchaurl="${config.captchaurl || ''}"
                        captchamethod="${config.captchamethod}"></verification-code>
                    <!--记住我-->
                    <keep-logged keeplogged="${config.keeplogged}" style="${config['item-style']}" class="item" item-style="${config['item-style']}"></keep-logged>
                    <!--登录按钮-->
                    <xy-form-item style="${config['item-style']}" class="item">
                        <xy-button id="bth-login" type="primary" htmltype="submit">登录</xy-button>
                    </xy-form-item>
                </xy-form>
            `
}

export const getPhoneForm = (_this: LogInModule) => {
    const config = _this.getConfig();
    return `<phone-login id="${_this.formId}">
                    <xy-form-item style="display: block;${config['item-style']}" class="item">
                        <xy-button id="bth-login" type="primary" htmltype="submit">登录</xy-button>
                    </xy-form-item>
                </phone-login>`
}
/**
 * 允许浏览器记住密码 原生表单
 * @param loginType
 */
const getRememberPasswordForm = (_this: LogInModule) => {
    const config = _this.getConfig();
    const {
        url,
        user,
        password,
        method,
        captcha
    } = config;
    return `
<form onsubmit="javascript:void(0)" autocomplete="on" id="${_this.formId}" action="${url}" method="${method}">
    <xy-tips tips="请输入用户名" class="item remember-form-item form-item form-item-user" style="${config['item-style']}">
        <xy-icon class="remember-form-item-icon-pre" name="user"></xy-icon>
        <input type="text"
               autocomplete="off"
               id="user"
               class="remember-form-item-input"
               required="required"
               placeholder="用户名"
               name="${user}"></input>
    </xy-tips>
   <slot name="username-helper"></slot>
   <xy-tips tips="请输入密码" class="item  remember-form-item form-item form-item-password" style="${config['item-style']}">
   <xy-icon class="remember-form-item-icon-pre" name="lock"></xy-icon>
       <input type="password"
            id="password"
            class="remember-form-item-input remember-form-item-password"
            required="required"
            placeholder="密码"
            name="${password}"></input>
            <xy-button id="btn-pass" class="btn-right" icon="eye-close" type="flat" shape="circle"></xy-button>
   </xy-tips>
   <verification-code required ${captcha ? `name=${captcha}` : ''}  style="${config['item-style']}" class="item form-item" item-style="${config['item-style']}"
                captcha="${captcha}" captchasrc="${config.captchasrc || ''}" captchaurl="${config.captchaurl || ''}"
                captchamethod="${config.captchamethod}"></verification-code>
   <!--记住我-->
   <keep-logged keeplogged="${config.keeplogged}" style="${config['item-style']}" class="item" item-style="${config['item-style']}"></keep-logged>
   <!--登录按钮-->
   <xy-form-item style="${config['item-style']}" class="item">
        <xy-button id="bth-login" type="primary" htmltype="submit">登录</xy-button>
   </xy-form-item>
</form>
            `
}

export const getFormByType = (loginType: LoginType, _this: LogInModule) => {
    return loginType === 'phone'
        ? getPhoneForm(_this)
        : _this.canRemember
            ? getRememberPasswordForm(_this)
            : getAccountForm(_this);
}