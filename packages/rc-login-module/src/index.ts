/**********************************************************************
 *
 * @模块名称: index
 *
 * @模块用途: index
 *
 * @date: 2022/2/15 8:55
 *
 * @版权所有: pgli
 *
 **********************************************************************/
export type {
    LoginModuleProps,
    AfterSubmit,
    Submit,
    SubmitError,
    SubmitData,
    ResetPasswordSubmitProps,
    SendSMSVerificationCodeProps,
    ResetPasswordSubmitDetail,
    SendSMSVerificationCodeDetail
} from "@gaopeng123/login-module";
export type {RcLoginModuleProps as RcLoginModuleProps} from "./RcLoginModule";
// webpack转换exports.default有问题 使用RcLoginModule导出
export {default as RcLoginModule} from "./RcLoginModule";
export {default as useFeishuLogin} from "./useFeishuLogin";
