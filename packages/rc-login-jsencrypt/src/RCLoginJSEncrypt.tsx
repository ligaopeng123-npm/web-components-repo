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
import * as React from 'react';
import {useEffect, useState} from "react";
import JSEncrypt from "jsencrypt";
import {RcLoginModule, RcLoginModuleProps} from "@gaopeng123/rc-login-module";
import {SubmitData} from '@gaopeng123/login-module';

type HandleSubmitProps = {
    header: any;
    body: any
}

export type RCLoginCaptchaProps = {
    image: string;
    imageId: string
}
export type RCLoginJSEncryptProps = {
    encryptPublicKey: string;
    clientId: string;
    secret: string;
    forgotPasswordUrl: boolean;
    phoneLoginUrl: boolean;
    getCaptcha?: () => Promise<RCLoginCaptchaProps>;
    handleSubmit?: (HandleSubmitProps: any) => Promise<any>;
    onResetPasswordSubmit?: (data: SubmitData) => Promise<boolean>;
} & RcLoginModuleProps;

const RCLoginJSEncrypt: React.FC<RCLoginJSEncryptProps> = (props: any) => {
    const {
        encryptPublicKey, clientId, secret, getCaptcha, handleSubmit,
        forgotPasswordUrl, phoneLoginUrl, onResetPasswordSubmit
    } = props;

    const [encryptor, setEncryptor] = useState<any>();
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

    const _onResetPasswordSubmit = async (data: SubmitData) => {
        onResetPasswordSubmit && onResetPasswordSubmit(data).then((res: boolean) => {
            if (res) {
                // @ts-ignore
                document.getElementById('#RcLoginModule-form')?.success();
            }
        })
    }

    /**
     * 菜单的第一项 默认为初始页面
     */
    useEffect(() => {
        if (params && captcha && encryptor) {
            handleSubmit({
                headers: {
                    clientId,
                    secret,
                    'Content-Type': 'application/json',
                },
                body: Object.assign({imageId: captcha?.imageId}, params, {password: encryptor.encrypt(params.password)})
            });
            getCurrentCaptcha();
        }
    }, [params]);

    /**
     * @param data
     */
    const submit = (data: any) => {
        setParams(data?.detail?.data);
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
            user="username"
            password="password"
            captcha="inputCode"
            captchaSrc={captcha?.image}
            id="RcLoginModule-form"
            forgotPasswordUrl={forgotPasswordUrl || true}
            phoneLoginUrl={phoneLoginUrl || true}
            onResetPasswordSubmit={(data: SubmitData) => {
                _onResetPasswordSubmit(data);
            }}
        >
        </RcLoginModule>
    )
};

export default RCLoginJSEncrypt;
