# login-module

登录模块，统一管理登录逻辑

## 属性配置

| 属性       | 说明                                                    | 类型   | 默认值       |
| ---------- | ------------------------------------------------------- | ------ | ------------ |
| title      | 项目上面的项目名称                                      | string | 某某系统     |
| id         | 拼接本地数据存储的key值                                 | string | login-module |
| main-style | 登录页样式，可替换背景图                           | string | ''           |
| body-style      | form表单的样式                                     | string | ''           |
| item-style | form表单每一项的样式 | string | '' |
| method     | 请求类型 GET POST                                       | string | POST         |
| url        | 是否需要组件去处理登录逻辑，<br />默认fetch下发数据请求 | string | null         |
| user       | form表单用户的name属性                                  | string | user         |
| password   | form表单密码的name属性                                  | string | password     |
| password-text | 密码是否支持明文显示 <br />plain支持切换明文 cipher不支持 | string | plain |
| captcha | 验证码能力，同时定义验证码字段名词 | string  | '' |
| captchasrc | 验证码src地址，手动设置 | string | null |
| captchaurl | 验证码请求地址地址 | string \| null | null |
| captchamethod | 验证码请求类型 | string | POST |
| publickey | 加密公钥 | string | null |
| keeplogged | 支持记住密码 | boolean | false |
| agreement-proprietary | 用户协议的主题<br />（主要体现的解释权）例如：干饭人集团<br />用户协议中，会将title和“干饭人集团”进行拼接 | string | '' |
| forgot-password-url | 是否支持忘记密码功能，如果传递url 插件处理密码找回逻辑<br />否则使用事件监听处理 | url \| boolean | ‘’ |
| phone-login-url | 手机号登录，如果传递url 则插件会处理验证码请求，<br />如果不传则使用监听函数处理 | url \| boolean | ‘’ |

## 事件配置 

`（注意webpace5摇树配置会导致导入不可用时，请直接使用import  ‘@gaopeng123/login-module’ 导入)`

```
submit事件 在点击登录时触发，传递的登录信息在，detail字段中
afterSubmit 在登录数据下发服务端后触发 用于处理登录后的路由跳转等逻辑
submitError 在fetch出错情况下触发
captchaClick 在点击验证码的时候触发
```

```tsx
<login-module
    url="/login"
    method="POST"
    publickey="*"
    user="userId"
    password="password"
    captcha="captcha"
    captchamethod="GET"
    captchaurl="/captcha"
    id="form"
    main-style="background-image: url(./assets/background.jpg)"
    body-style="right: 200px;"
    title="系统">
</login-module>
```

```js
// 事件订阅
<script>
        const form = document.querySelector('#form');
		// 提交事件
        form.addEventListener('submit', (data)=> {
        	console.log(data)
        });
        // fetch请求响应后
        form.addEventListener('afterSubmit', (data)=> {
	        console.log(data)
        });
        // fetch请求失败后
        form.addEventListener('submitError', (data)=> {
            console.log(data)
        });
		// 点击验证码触发事件
		form.addEventListener('captchaClick', (data) => {
			console.log(data);
			form.setAttribute('captchasrc', '/iconfont/test.svg')   
		});
		// 密码重置
 		form.addEventListener('resetPasswordSubmit', (data) => {
        	console.log('resetPasswordSubmit', data);
            // 关闭窗口
        	form.success();
    	});
    </script>
```

## CSS variables

| 变量名                                     | 含义                      | 默认值                           |
| ------------------------------------------ | ------------------------- | -------------------------------- |
| --login-module-login-title-color           | title颜色                 | #333333                          |
| --login-module-login-title-fontSize        | title字体fontSize         | 28px                             |
| --login-module-login-title-fontWeight      | title字体fontWeight       | 600                              |
| --login-module-login-title-fontFamily      | title字体fontFamily       | PingFangSC-Semibold, PingFang SC |
| --login-module-agreement-proprietary-color | agreement-proprietary颜色 | #42b983                          |

