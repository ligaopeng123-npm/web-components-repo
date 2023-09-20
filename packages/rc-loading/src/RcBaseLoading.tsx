/**********************************************************************
 *
 * @模块名称: RcLoading
 *
 * @模块用途: RcLoading
 *
 * @创建人: wangxiangyu
 *
 * @date: 2023-08-30 17:01:57
 *
 **********************************************************************/
import React, { FC } from 'react';
import styles from './styles.module.less';
import { classnames } from "@gaopeng123/utils";
import { LoadingType, RcLoadingProps } from "./interface";

export interface RcBaseLoadingProps extends RcLoadingProps {
    loadingComponent: React.ComponentFactory<RcLoadingProps, any>
}

const RcBaseLoading: FC<RcBaseLoadingProps & { type?: LoadingType }> = (props) => {
    const LoadingComponent = props.loadingComponent;
    return (
        <div className={classnames(styles.loading, props.className)} style={props.style}>
            {
                props.loading
                    ? <LoadingComponent {...props}/>
                    : null
            }
            <div className={classnames({ [styles.container]: props.loading }, props.wrapperClassName)}>
                {props.children}
            </div>
        </div>
    )
};

export default RcBaseLoading;
