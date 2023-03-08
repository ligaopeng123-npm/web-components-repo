/** ********************************************************************
 *
 * @模块名称: typing
 *
 * @模块用途: typing
 *
 * @date: 2022/6/10 16:11
 *
 * @版权所有: pgli
 *
 ********************************************************************* */
export type LoginType = 'phone' | 'account';

export interface LoginModuleProps {
    'my-title'?: string, // 标题
    children?: any;
    id?: string, // 标识 可不传
    'main-style'?: string, // 主样式 用于更改背景图等
    'title-style'?: string, // title样式
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
    'forgot-password-url'?: string | boolean, // 忘記密碼功能
    'phone-login-url'?: string | boolean, // 短信登录功能
}

export type SubmitData = {
    data: User,
    loginType: {
        type: LoginType;
        [proName: string]: string;
    }
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

export type SendSMSVerificationCodeDetail = {
    phone: string,
    type: 'reset' | 'login'
}

export type SendSMSVerificationCodeProps = {
    detail: SendSMSVerificationCodeDetail,
    [propName: string]: any,

}

export type ResetPasswordSubmitDetail = {
    data: {
        phone: string,
        password: string,
        code: string
    }
}

export type ResetPasswordSubmitProps = {
    detail: ResetPasswordSubmitDetail,
    [propName: string]: any,
}
