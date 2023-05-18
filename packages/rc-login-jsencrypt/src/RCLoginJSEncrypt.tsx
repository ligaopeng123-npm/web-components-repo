/**********************************************************************
 *
 * @模块名称: RCLoginJSEncrypt
 *
 * @模块用途: RCLoginJSEncrypt
 *
 * @创建人: pgli
 *
 * @date: 2022/4/26 13:56
 *
 **********************************************************************/
import * as React
    from 'react';
import {
    useEffect,
    useState
} from "react";
import JSEncrypt
    from "jsencrypt";
import {
    RcLoginModule,
    RcLoginModuleProps,
    ResetPasswordSubmitDetail,
    ResetPasswordSubmitProps,
    SendSMSVerificationCodeDetail,
    SendSMSVerificationCodeProps,
} from "@gaopeng123/rc-login-module";

type HandleSubmitProps = {
    headers: any;
    body: any;
    loginType?: any;
    data?: any;
    encryptor?: JSEncrypt;
}

type ResetPasswordProps = {
    body: any;
    data: any;
    encryptor: JSEncrypt;
}

export type RCLoginCaptchaProps = {
    image: string;
    imageId: string
}
export type RCLoginJSEncryptProps =
    {
        encryptPublicKey: string;
        agreementProprietary?: string;
        clientId: string;
        secret: string;
        forgotPasswordUrl?: boolean | string;
        phoneLoginUrl?: boolean | string;
        getCaptcha?: () => Promise<RCLoginCaptchaProps>;
        handleSubmit?: (handleSubmitProps: HandleSubmitProps) => Promise<any>;
        onResetPasswordSubmit?: (data: ResetPasswordProps) => Promise<any>;
        onSendSMSVerificationCode?: (data: SendSMSVerificationCodeDetail) => void;
    }
    & RcLoginModuleProps;

const RCLoginJSEncrypt: React.FC<RCLoginJSEncryptProps> = (props: any) => {
    const {
        encryptPublicKey,
        clientId,
        secret,
        getCaptcha,
        handleSubmit,
        onResetPasswordSubmit,
        onSendSMSVerificationCode,
        browserRemembersPassword
    } = props;

    const [encryptor, setEncryptor] = useState<any>();
    /**
     * 修改密码能力
     */
    const [resetPasswordData, setResetPasswordData] = useState<ResetPasswordSubmitProps>();
    /**
     * 处理加密
     */
    useEffect(() => {
        if (clientId && encryptPublicKey && secret) {
            // @ts-ignore
            const encryptor = new JSEncrypt();// 设置公钥
            encryptor.setPublicKey(encryptPublicKey); // 设置公钥
            setEncryptor(encryptor);
        }
    }, [encryptPublicKey, clientId, secret]);

    /**
     * 验证码信息
     */
    const [captcha, setCaptcha] = useState<any>(null);

    /**
     * 参数信息
     */
    const [params, setParams] = useState<any>(null);

    /**
     * 遇到错误信息更新验证码
     */
    const changeCaptcha = () => {
        const loginModule: any = document.querySelector('login-module');
        if (loginModule && loginModule.captchaImg) {
            setParams(null);
            setCaptcha(null);
            loginModule.captchaImg.click();
        }
    }
    /**
     * 获取验证码
     */
    const getCurrentCaptcha = () => {
        if (getCaptcha) {
            getCaptcha().then((res: any) => {
                setCaptcha(res);
            });
        }
    };


    useEffect(() => {
        if (encryptor && resetPasswordData) {
            const value: ResetPasswordSubmitDetail = resetPasswordData.detail;
            const unencryptedData = value.data;
            onResetPasswordSubmit && onResetPasswordSubmit(Object.assign({
                body: Object.assign({}, unencryptedData, {
                    password: encryptor.encrypt(unencryptedData.password)
                }),
                encryptor: encryptor
            }, value)).then((res: boolean) => {
                const form: any = document.querySelector('#RcLoginModule-form');
                if (res) {
                    form?.success();
                } else {
                    form?.fail();
                }
            })
        }
    }, [encryptor, resetPasswordData]);

    /**
     * 菜单的第一项 默认为初始页面
     */
    useEffect(() => {
        if (params && captcha && encryptor) {
            const {
                data,
                loginType
            } = params;
            handleSubmit({
                headers: {
                    clientId,
                    secret,
                    'Content-Type': 'application/json',
                },
                body: Object.assign({imageId: captcha?.imageId}, data, {password: encryptor.encrypt(data.password)}),
                loginType: loginType,
                data: data,
                encryptor: encryptor
            });
            getCurrentCaptcha();
        }
    }, [params]);

    /**
     * @param data
     */
    const submit = (data: any) => {
        setParams(data?.detail);
    };

    useEffect(() => {
        getCurrentCaptcha();
    }, []);

    return (
        <RcLoginModule
            {...props}
            onSubmit={submit}
            onCaptchaClick={() => {
                getCurrentCaptcha();
            }}
            onResetPasswordSubmit={(data: ResetPasswordSubmitProps) => {
                setResetPasswordData(data);
            }}
            onSendSMSVerificationCode={(data: SendSMSVerificationCodeProps) => {
                onSendSMSVerificationCode && onSendSMSVerificationCode(data?.detail);
            }}
            user="username"
            password="password"
            captcha="inputCode"
            captchaSrc={captcha?.image}
            id="RcLoginModule-form"
            browserRemembersPassword={browserRemembersPassword}
        >
            {props.children}
        </RcLoginModule>
    )
};

export default RCLoginJSEncrypt;
