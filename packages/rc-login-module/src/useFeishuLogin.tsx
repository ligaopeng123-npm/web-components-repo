/**********************************************************************
 *
 * @模块名称: useFeishuLogin
 *
 * @模块用途: useFeishuLogin  飞书免登陆
 *
 * @创建人: pgli
 *
 * @date: 2022/4/28 19:47
 *
 **********************************************************************/
import * as React from 'react';
import {useEffect, useState} from "react";
import {queryParamsFromUrl, urlJoinParmas} from "@gaopeng123/utils";

/**
 * 飞书登录
 * @param url
 * @param app_id
 * @param redirect_uri
 */
export const feishuLgoin = (url: string, app_id: string, redirect_uri: string) => {
    window.location.href = url + urlJoinParmas({app_id, redirect_uri: encodeURIComponent(redirect_uri)});
}

type useFeishuLoginProps = {
    id: string,
    url: string,
    app_id: string,
    redirect_uri: string,
    isFeishuLogin?: boolean, // 是否默认支持飞书登录
};
const useFeishuLogin = (props: useFeishuLoginProps) => {
    const [code, setCode] = useState();
    const {id, url, app_id, redirect_uri, isFeishuLogin} = props;
    // 设置当前跳转的状态
    const setCurrentFeiShuLogin = (value?: any) => {
        if (value) {
            localStorage.setItem(`${id}-FeiShuLogin`, value);
        } else {
            localStorage.removeItem(`${id}-FeiShuLogin`);
        }
    };

    /**
     * 获取当前设置的状态
     * @param value
     */
    const getCurrentFeiShuLogin = () => {
        return localStorage.getItem(`${id}-FeiShuLogin`);
    };
    /**
     * 开始发起免登录
     */
    const toFeishu = () => {
        setCurrentFeiShuLogin('begin');
        feishuLgoin(url, app_id, redirect_uri);
    }

    useEffect(() => {
        setTimeout(() => {
            if (!getCurrentFeiShuLogin() && isFeishuLogin !== false) {
                toFeishu();
                return;
            }
            const params: any = queryParamsFromUrl(location.href);
            if (params.code) {
                setCode(params.code);
            }
        })
    }, []);

    /**
     * code返回后将状态调整下
     */
    useEffect(() => {
        const params: any = queryParamsFromUrl(location.href);
        // 登录成功 将状态初始化 防止下次不触发免登录
        if (params?.code) {
            setCurrentFeiShuLogin();
        }
    }, []);

    /**
     * 暴露钩子 成功后调用下
     */
    const handleLogin = () => {
        setCurrentFeiShuLogin();
    }
    return [code, handleLogin];
};

export default useFeishuLogin;
