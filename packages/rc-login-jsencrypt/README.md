#  rc-login-jsencrypt

> 基于jsencrypt加密的登录组件

## Usage

```react
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {RCLoginJSEncrypt} from "@gaopeng123/rc-login-jsencrypt";

const encryptPublicKey = 'xxx';

const headers = {
    clientId: 'xxx',
    secret: 'xxx',
};

const App = () => {
    return (
        <RCLoginJSEncrypt
            encryptPublicKey={encryptPublicKey}
            clientId={headers.clientId}
            secret={headers.secret}
            getCaptcha={async () => {
                return new Promise<RCLoginCaptchaProps>((resolve, reject) => {
                    get(`/testAuth/api/nebula/auth/token/v1/captcha`, {
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
                console.log(headers, body, loginType, data, encryptor);
                return new Promise((resolve, reject) => {
                    post(`/testAuth/api/nebula/auth/token/v1/shrLogin`, {
                        headers: headers,
                        body: body
                    }).then((res) => {
                        console.log(res);
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
                        resolve(false);
                    }, 2000);
                }).catch(()=> {

                });
            }}
            mainStyle={{backgroundImage: 'url(./assets/background.jpg)'}}
            bodyStyle={{right: '200px;'}}
            keeplogged={true}
            title="食堂管理系统"
        />
    );
};

ReactDOM.render(<App/>, document.getElementById('root'));
```

## useFeishuLogin

`飞书免登录`

```tsx
const [code, setCode] = useFeishuLogin({
        id: 'testapp', // 应用标识 字符串即可
        url: 'https://xxx', // 飞书登录地址
        app_id: '', // 申请的飞书应用id
        redirect_uri: 'https://xxx' // 配置的重定向地址
    });

    useEffect(() => {
        if (code) {
            // 调用服务端接口去交换token 交换完成后最好在调用下setCode();
            // 登录成功或者失败后 code就不能用了 所以要调用下
            setCode();
        }
    }, [code]);
```
