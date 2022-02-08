#  rc-login-module

> 登录组件

## Usage

```react
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import RcLoginModule from "@gaopeng123/rc-login-module";

const App = () => {
    return (
        <div>
            <RcLoginModule
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
```

