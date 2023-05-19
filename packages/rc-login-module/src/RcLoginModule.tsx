/**********************************************************************
 *
 * @模块名称: rc-login-module
 *
 * @模块用途: rc-login-module
 *
 * @创建人: pgli
 *
 * @date: 2022/2/8 12:17
 *
 **********************************************************************/
import "@gaopeng123/login-module";
import * as React
    from 'react';
import { useEffect } from 'react';
import type {
    LoginModuleProps,
    AfterSubmit,
    Submit,
    SubmitError,
    ResetPasswordSubmitProps,
    SendSMSVerificationCodeProps,
} from "@gaopeng123/login-module";
import { obj2css } from "@gaopeng123/utils";

export type RcLoginModuleProps = {
    id?: string, // 标识 可不传
    children?: React.ReactNode;
    title?: string, // 标题
    titleStyle?: React.CSSProperties, // 主样式 用于更改title样式
    mainStyle?: React.CSSProperties, // 主样式 用于更改背景图等
    bodyStyle?: React.CSSProperties, // form表单样式
    itemStyle?: React.CSSProperties, // form表单每个item的样式
    method?: string, // 请求方式
    url?: string, // 请求地址
    user?: string, // 用户字段key
    password?: string, // 密码字段key
    publicKey?: string, // 加密密钥
    captcha?: string, // 验证码能力
    captchaSrc?: string, // 验证码能力
    captchaUrl?: string, // 验证码地址
    captchaMethod?: string, // 验证码请求类型
    keeplogged?: boolean, // 是否支持记住密码
    browserRemembersPassword?: boolean, // 是否允许浏览器记住密码
    agreementProprietary?: string, // 用户协议解释权
    onSubmit?: (data: Submit) => void, // 提交按钮
    onAfterSubmit?: (data: AfterSubmit) => void, // 提交后回调
    onSubmitError?: (data: Submit) => void, // 提交错误回调
    onCaptchaClick?: (data: any) => void, // 点击验证码回调
    forgotPasswordUrl?: string | boolean; // 短信登录功能
    phoneLoginUrl?: string | boolean; // 短信登录功能
    onResetPasswordSubmit?: (data: ResetPasswordSubmitProps) => void, // 密码修改功能
    onSendSMSVerificationCode?: (data: SendSMSVerificationCodeProps) => void, // 密码修改功能
};

/**
 * 处理react tsx中直接使用web components报错问题
 */
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'login-module': LoginModuleProps
        }
    }
}

const RcLoginModule: React.FC<RcLoginModuleProps> = (props) => {
    const {
        id,
        title,
        mainStyle,
        titleStyle,
        bodyStyle,
        itemStyle,
        method,
        url,
        user,
        password,
        publicKey,
        captcha,
        captchaSrc,
        captchaUrl,
        captchaMethod,
        keeplogged,
        agreementProprietary,
        onSubmit,
        onAfterSubmit,
        onSubmitError,
        onCaptchaClick,
        onResetPasswordSubmit,
        phoneLoginUrl,
        forgotPasswordUrl,
        onSendSMSVerificationCode,
        browserRemembersPassword
    } = props;
    const _id = id || 'rc-login-module';
    useEffect(() => {
        const form: any = document.querySelector(`#${id}`);

        const _onSubmit = (e: Submit) => onSubmit && onSubmit(e);
        const _onAfterSubmit = (e: AfterSubmit) => onAfterSubmit && onAfterSubmit(e);
        const _onSubmitError = (e: SubmitError) => onSubmitError && onSubmitError(e);
        const _onCaptchaClick = (e: any) => onCaptchaClick && onCaptchaClick(e);
        const _onResetPasswordSubmit = (e: any) => onResetPasswordSubmit && onResetPasswordSubmit(e);
        const _onSendSMSVerificationCode = (e: any) => onSendSMSVerificationCode && onSendSMSVerificationCode(e);

        if (form) {
            form.addEventListener('submit', _onSubmit);
            form.addEventListener('afterSubmit', _onAfterSubmit);
            form.addEventListener('submitError', _onSubmitError);
            form.addEventListener('captchaClick', _onCaptchaClick);
            form.addEventListener('resetPasswordSubmit', _onResetPasswordSubmit);
            form.addEventListener('sendSMSVerificationCode', _onSendSMSVerificationCode);
        }
        return () => {
            if (form) {
                form.removeEventListener('submit', _onSubmit);
                form.removeEventListener('afterSubmit', _onAfterSubmit);
                form.removeEventListener('submitError', _onSubmitError);
                form.removeEventListener('captchaClick', _onCaptchaClick);
                form.removeEventListener('resetPasswordSubmit', _onResetPasswordSubmit);
                form.removeEventListener('sendSMSVerificationCode', _onSendSMSVerificationCode);
            }
        }
    }, []);

    return (
        <>
            <login-module
                id={_id}
                my-title={title}
                main-style={obj2css(mainStyle || {})}
                title-style={obj2css(titleStyle || {})}
                body-style={obj2css(bodyStyle || {})}
                item-style={obj2css(itemStyle || {})}
                method={method}
                url={url}
                user={user}
                password={password}
                publickey={publicKey}
                captcha={captcha}
                captchasrc={captchaSrc}
                captchaurl={captchaUrl}
                captchamethod={captchaMethod}
                keeplogged={keeplogged}
                agreement-proprietary={agreementProprietary}
                phone-login-url={phoneLoginUrl}
                forgot-password-url={forgotPasswordUrl}
                browser-remembers-password={browserRemembersPassword}
            >
                {props.children}
            </login-module>
            {/*需要一个form表单触发密码的自动填充功能*/}
            {
                browserRemembersPassword ?
                    <form
                        onSubmit={() => {
                        }}
                        style={{display: 'none'}}>
                        <input
                            type="text"
                            required={true}
                            placeholder="用户名"
                            name="u"></input>
                        <input
                            type="password"
                            required={true}
                            placeholder="密码"
                            name="p"></input>
                        <button
                            className="but"
                            type="submit">
                            登录
                        </button>
                    </form> : null
            }
        </>
    )
};

export default RcLoginModule;
