/**********************************************************************
 *
 * @模块名称: feishu-share-sdk
 *
 * @模块用途: 飞书h5消息分享
 *
 * @date: 2022/2/15 8:55
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import { isFunction, urlJoinParams } from "@gaopeng123/utils";
import sha1 from "sha1";

export type FeishuShareSdkConfig = {
    proxy_prefix?: string; // 代理 解决跨域
    app_id: string; // 飞书应用id
    app_secret: string; // 飞书secret
}

export type FeishuShareConfig = {
    url: string,
    title: string,
    image: string,
    content: string,
    onSuccess?: (result: any) => void;
}

type FeishuShareCache = {
    latestTime?: any;
}
const feishuShareSdk = (config: FeishuShareSdkConfig) => {
    const {proxy_prefix, app_id, app_secret} = Object.assign({proxy_prefix: '/feishuAPI'}, config);
    const cache: FeishuShareCache = {};
    /**
     * 初始化
     */
    const init = () => {
        return new Promise((resolve, reject) => {
            // @ts-ignore 例如:
            if (window.h5sdk) {
                if (cache.latestTime) {
                    if (Date.now() - cache.latestTime < 30 * 60 * 1000) {
                        resolve(true);
                    } else {
                        const get_tenant_access_token = async () => {
                            const res = await fetch(
                                `${proxy_prefix}/open-apis/auth/v3/tenant_access_token/internal
                            ${urlJoinParams({
                                    "app_id": app_id,
                                    "app_secret": app_secret
                                })}`,
                                {
                                    headers: {
                                        "Content-Type": 'application/json; charset=utf-8',
                                    },
                                    method: 'POST'
                                })
                            return res.clone().json();
                        }
                        /**
                         * ticket 获取
                         * @param access_token
                         */
                        const get_ticket = async (access_token: string) => {
                            const res = await fetch(
                                `${proxy_prefix}/open-apis/jssdk/ticket/get
                            ${urlJoinParams({"app_id": app_id, "app_secret": app_secret})}`,
                                {
                                    method: 'POST',
                                    headers: {
                                        "Content-Type": 'application/json; charset=utf-8',
                                        "Authorization": `Bearer ${access_token}`
                                    }
                                });
                            return res.clone()?.json();
                        }

                        /**
                         * 计算 h5sdk.config 的签名参数
                         *
                         * @param jsTicket  之前获取的 jsTicket
                         * @param nonceStr  随机字符串
                         * @param timeStamp 当前时间戳
                         * @param url       调用 h5sdk.config 的当前页面 URL
                         * @return
                         */
                        const genSignature = (jsTicket: string, nonceStr: string, timeStamp: number, url: string) => {
                            const verifyStr = `jsapi_ticket=${jsTicket}&noncestr=${nonceStr}&timestamp=${timeStamp}&url=${url}`;
                            return sha1(verifyStr);
                        }
                        get_tenant_access_token().then((data1) => {
                            cache.latestTime = Date.now();
                            const {tenant_access_token, expire} = data1;
                            get_ticket(tenant_access_token).then(({data: {expire_in, ticket}}) => {
                                const nonceStr = 'Y7a8KkqX041bsSwT';
                                const timeStamp = Date.now();
                                const signature = genSignature(ticket, nonceStr, timeStamp, location.href.split('#')[0]);
                                // @ts-ignore
                                window.h5sdk.config({
                                    appId: process.env.REACT_APP_FEISHU_APP_ID,         // 必填，应用ID
                                    timestamp: timeStamp,     // 必填，生成签名的时间戳，毫秒级
                                    nonceStr: nonceStr,      // 必填，生成签名的随机串
                                    signature: signature,     // 必填，签名
                                    jsApiList: [
                                        // 当前开发文档中的网页应用API 均无需填写该字段
                                    ],
                                    onSuccess: function (result: any) {
                                        resolve(result);
                                    },
                                    onFail: function (err: any) {
                                        // 失败回调
                                    }
                                });
                            });
                        })
                    }
                } else {
                    const get_tenant_access_token = async () => {
                        const res = await fetch(
                            `${proxy_prefix}/open-apis/auth/v3/tenant_access_token/internal
                            ${urlJoinParams({
                                "app_id": app_id,
                                "app_secret": app_secret
                            })}`,
                            {
                                headers: {
                                    "Content-Type": 'application/json; charset=utf-8',
                                },
                                method: 'POST'
                            })
                        return res.clone().json();
                    }
                    /**
                     * ticket 获取
                     * @param access_token
                     */
                    const get_ticket = async (access_token: string) => {
                        const res = await fetch(
                            `${proxy_prefix}/open-apis/jssdk/ticket/get
                            ${urlJoinParams({"app_id": app_id, "app_secret": app_secret})}`,
                            {
                                method: 'POST',
                                headers: {
                                    "Content-Type": 'application/json; charset=utf-8',
                                    "Authorization": `Bearer ${access_token}`
                                }
                            });
                        return res.clone()?.json();
                    }

                    /**
                     * 计算 h5sdk.config 的签名参数
                     *
                     * @param jsTicket  之前获取的 jsTicket
                     * @param nonceStr  随机字符串
                     * @param timeStamp 当前时间戳
                     * @param url       调用 h5sdk.config 的当前页面 URL
                     * @return
                     */
                    const genSignature = (jsTicket: string, nonceStr: string, timeStamp: number, url: string) => {
                        const verifyStr = `jsapi_ticket=${jsTicket}&noncestr=${nonceStr}&timestamp=${timeStamp}&url=${url}`;
                        return sha1(verifyStr);
                    }
                    get_tenant_access_token().then((data1) => {
                        cache.latestTime = Date.now();
                        const {tenant_access_token, expire} = data1;
                        get_ticket(tenant_access_token).then(({data: {expire_in, ticket}}) => {
                            const nonceStr = 'Y7a8KkqX041bsSwT';
                            const timeStamp = Date.now();
                            const signature = genSignature(ticket, nonceStr, timeStamp, location.href.split('#')[0]);
                            // @ts-ignore
                            window.h5sdk.config({
                                appId: process.env.REACT_APP_FEISHU_APP_ID,         // 必填，应用ID
                                timestamp: timeStamp,     // 必填，生成签名的时间戳，毫秒级
                                nonceStr: nonceStr,      // 必填，生成签名的随机串
                                signature: signature,     // 必填，签名
                                jsApiList: [
                                    // 当前开发文档中的网页应用API 均无需填写该字段
                                ],
                                onSuccess: function (result: any) {
                                    resolve(result);
                                },
                                onFail: function (err: any) {
                                    // 失败回调
                                }
                            });
                        });
                    })
                }
                // h5sdk.ready(function () {
                //
                //
                // })
            }
        });
    }
    /**
     * 暴露函数
     */
    const action = {
        share: ({url, title, image, content, onSuccess}: FeishuShareConfig) => {
            init().then(() => {
                //@ts-ignore 成功回调，可以在成功之后使用 tt.xx jsapi
                window.h5sdk.biz.util.share({
                    url: url,
                    title: title,
                    image: image,
                    content: content,
                    onSuccess: (result: any) => {
                        if (onSuccess && isFunction(onSuccess)) {
                            onSuccess(result)
                        }
                    }
                });
            })
        }
    }
    return action;
}

export default feishuShareSdk;