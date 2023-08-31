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
import React, { FC, useState, useEffect } from 'react';
import styles from './styles.module.less';
import { RcLoadingProps } from "./typing";
import LoadingBody from "./LoadingBody";

const RcLoading: FC<RcLoadingProps> = (props) => {
    return (
        <div className={styles.loading}>
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
