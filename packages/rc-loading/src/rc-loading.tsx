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
import LoadingBody, { RcLoadingProps } from "./LoadingBody";

const RcLoading: FC<RcLoadingProps> = (props) => {
    return (
        <div className={props.className ? `${styles.loading} ${props.className}` : styles.loading} style={props.style}>
            {
                props.loading
                    ? <LoadingBody {...props}/>
                    : null
            }
            <div className={props.loading ? styles.container : ''}>
                {props.children}
            </div>
        </div>
    )
};

export default RcLoading;
