import * as React from 'react';
import * as ReactDOM from 'react-dom';
import RcLoginModule from "../src";

const App = () => {
    return (
        <div>
            {/*@ts-ignore*/}
            <RcLoginModule
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
            />
        </div>
    );
};

ReactDOM.render(<App/>, document.getElementById('root'));
