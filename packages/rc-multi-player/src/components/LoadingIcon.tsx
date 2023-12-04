/**********************************************************************
 *
 * @模块名称: LoadingIcon
 *
 * @模块作用: LoadingIcon
 *
 * @创建人: pgli
 *
 * @date: 2023/12/4 2:52 下午
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import React from 'react';
import styles from "./loading.styles.module.less";

const LoadingIcon = () => {
    return (
        <span className={`MuiLoadingButton-loadingIndicator MuiLoadingButton-loadingIndicatorCenter ${styles.loading}`}>
            <span
                className={`MuiCircularProgress-root MuiCircularProgress-indeterminate MuiCircularProgress-colorInherit  ${styles.icon}`}
                role="progressbar" aria-labelledby=":rff:" style={{ width: 16, height: 16, }}>
                <svg className={`MuiCircularProgress-svg`} viewBox="22 22 44 44">
                    <circle
                        className={`MuiCircularProgress-circle MuiCircularProgress-circleIndeterminate ${styles.cl}`}
                        cx="44" cy="44" r="20.2" fill="none" stroke-width="3.6">
                    </circle>
                </svg>
            </span>
        </span>
    )
}

export default LoadingIcon;