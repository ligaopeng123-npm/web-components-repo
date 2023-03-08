import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {RcLoginModule} from "../src";
import {useEffect, useState} from "react";

const App = () => {
    const [captchaSrc, setCaptchaSrc] = useState('');

    useEffect(()=> {
        setTimeout(()=> {
            setCaptchaSrc(`12121`)
        }, 2000);
    }, [])
    return (
        <div>
            {/*@ts-ignore*/}
            <RcLoginModule
                captcha={'captcha'}
                captchaSrc={captchaSrc}
                onSubmit={(e) => {
                    console.log(e);
                }}
                onAfterSubmit={(e) => {
                    console.log(e);
                }}
                onSubmitError={(e) => {
                    console.log(e);
                }}
                onCaptchaClick={(e) => {
                    console.log(e);
                }}
                id={`test`}
                user="userId"
                password="password"
                publicKey=""
                method="GET"
                url="/assets/login.json"
                mainStyle={{backgroundImage: 'url(./assets/background.jpg)'}}
                bodyStyle={{right: '200px;'}}
                keeplogged={true}
                title="食堂管理系统"
            >
                <div slot="tabs">
                    tabs1
                </div>
                <div slot="username-helper">
                    username-helper2
                </div>
            </RcLoginModule>
        </div>
    );
};

ReactDOM.render(<App/>, document.getElementById('root'));
