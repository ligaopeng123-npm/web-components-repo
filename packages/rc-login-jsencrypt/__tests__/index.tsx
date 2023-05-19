import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {RCLoginCaptchaProps, RCLoginJSEncrypt} from "../src";
import {get, post} from "@gaopeng123/fetch";
import {useFeishuLogin} from "@gaopeng123/rc-login-module";
import {useEffect} from "react";

const encryptPublicKey = 'xxx';

const headers = {
    clientId: 'xxx',
    secret: 'xxx',
};

const App = () => {
    const [code, setCode] = useFeishuLogin({
        id: 'testapp',
        url: 'https://xxx',
        app_id: 'xxx',
        redirect_uri: 'https://xxx'
    });

    useEffect(() => {
        if (code) {
            // 调用服务端接口去交换token 交换完成后最好在调用下setCode();
            // 登录成功或者失败后 code就不能用了 所以要调用下
            setCode();
        }
    }, [code]);
    return (
        <RCLoginJSEncrypt
            encryptPublicKey={encryptPublicKey}
            clientId={headers.clientId}
            secret={headers.secret}
            browserRemembersPassword={true}
            getCaptcha={async () => {
                return new Promise<RCLoginCaptchaProps>((resolve, reject) => {
                    get(`/testAuth/auth/api/nebula/auth/token/v1/captcha`, {
                        params: {
                            width: 80,
                            height: 30
                        },
                        headers: headers
                    }).then((res: any) => {
                        console.log(res)
                        resolve(res)
                    })
                })
            }}
            phoneLoginUrl={true}
            handleSubmit={({headers, body, loginType, data, encryptor}) => {
                return new Promise((resolve, reject) => {
                    post(`/testAuth/auth/api/nebula/auth/token/v1/shrLogin`, {
                        headers: headers,
                        body: body
                    }).then((res: any) => {
                        console.log(res);
                        window.open('www.baidu.com')
                    });
                    resolve(true)
                })
            }}
            forgotPasswordUrl={true}
            onResetPasswordSubmit={(data) => {
                console.log(data);
                return new Promise((resolve, reject)=> {
                    setTimeout(()=> {
                        // 范围true关闭窗口 false不关闭
                        resolve(true);
                    }, 2000);
                }).catch(()=> {

                });
            }}
            mainStyle={{backgroundImage: 'url(./assets/background.jpg)'}}
            bodyStyle={{right: '200px;'}}
            keeplogged={false}
            title="食堂管理系统"
            agreementProprietary={`协议`}
        />
    );
};

ReactDOM.render(<App/>, document.getElementById('root'));
