import React from "react";

/**********************************************************************
 *
 * @模块名称: interface
 *
 * @模块作用: interface
 *
 * @创建人: pgli
 *
 * @date: 2023/9/20 2:44 下午
 *
 * @版权所有: pgli
 *
 **********************************************************************/
// --loading-main-color  css变量 定义颜色

export type RcLoadingProps = {
    loading?: boolean; // 是否开启
    duration?: number; // 默认 60000ms
    style?: React.CSSProperties;
    className?: string | undefined;
    wrapperClassName?: string;
}


export type LoadingType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;