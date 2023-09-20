/**********************************************************************
 *
 * @模块名称: RcLoading1
 *
 * @模块作用: RcLoading1
 *
 * @创建人: pgli
 *
 * @date: 2023/9/20 3:06 下午
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import React, { FC } from 'react';
import stylesBase from "../styles.module.less";
import styles from "./styles.module.less";
import { LoadingType, RcLoadingProps } from "../interface";
import RcBaseLoading from "../RcBaseLoading";
import { classnames } from "@gaopeng123/utils";

const RcLoading: FC<RcLoadingProps & { type: LoadingType }> = (props) => {
    return (
        <div className={stylesBase.loadingEl}>
            <div className={classnames(styles.loadingSize, styles[`loading${props.type}`])}></div>
        </div>
    )
}


export const RcLoading1: FC<RcLoadingProps> = (props) => {
    return (
        <RcBaseLoading type={1} loadingComponent={RcLoading} {...props}/>
    )
}

export const RcLoading2: FC<RcLoadingProps> = (props) => {
    return (
        <RcBaseLoading type={2} loadingComponent={RcLoading} {...props}/>
    )
}

export const RcLoading3: FC<RcLoadingProps> = (props) => {
    return (
        <RcBaseLoading type={3} loadingComponent={RcLoading} {...props}/>
    )
}

export const RcLoading4: FC<RcLoadingProps> = (props) => {
    return (
        <RcBaseLoading type={4} loadingComponent={RcLoading} {...props}/>
    )
}

export const RcLoading5: FC<RcLoadingProps> = (props) => {
    return (
        <RcBaseLoading type={5} loadingComponent={RcLoading} {...props}/>
    )
}

export const RcLoading6: FC<RcLoadingProps> = (props) => {
    return (
        <RcBaseLoading type={6} loadingComponent={RcLoading} {...props}/>
    )
}

export const RcLoading7: FC<RcLoadingProps> = (props) => {
    return (
        <RcBaseLoading type={7} loadingComponent={RcLoading} {...props}/>
    )
}

export const RcLoading8: FC<RcLoadingProps> = (props) => {
    return (
        <RcBaseLoading type={8} loadingComponent={RcLoading} {...props}/>
    )
}

export const RcLoading9: FC<RcLoadingProps> = (props) => {
    return (
        <RcBaseLoading type={9} loadingComponent={RcLoading} {...props}/>
    )
}

export const RcLoading10: FC<RcLoadingProps> = (props) => {
    return (
        <RcBaseLoading type={10} loadingComponent={RcLoading} {...props}/>
    )
}


export default RcLoading;