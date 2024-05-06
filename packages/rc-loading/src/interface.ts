import React, { ReactNode } from "react";

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

export type SingleLoadingStep = {
    label: string;
    step?: number;
}
export type RcLoadingProps = {
    stepList?: Array<SingleLoadingStep>, // 进度自定义
    title?: string | ReactNode; // 正在查询
    subTitle?: string | ReactNode; // 查询进度
    onStepChange?: (v: SingleLoadingStep)=> void; // 是否开启
    loading?: boolean; // 是否开启
    duration?: number; // 默认 60000ms
    style?: React.CSSProperties;
    className?: string | undefined;
    wrapperClassName?: string;
}


export type LoadingType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;