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
import LoadingBody, { LoadingBodyProps } from "./LoadingBody";
import { classnames } from "@gaopeng123/utils";

export interface RcLoadingProps extends LoadingBodyProps {
    wrapperClassName?: string
}

const RcLoading: FC<RcLoadingProps> = (props) => {
    return (
        <div className={classnames(styles.loading, props.className)} style={props.style}>
            {
                props.loading
                    ? <LoadingBody {...props}/>
                    : null
            }
            <div className={classnames({ [styles.container]: props.loading }, props.wrapperClassName)}>
                {props.children}
            </div>
        </div>
    )
};

export default RcLoading;
