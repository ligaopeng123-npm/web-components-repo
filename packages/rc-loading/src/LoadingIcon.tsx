/**********************************************************************
 *
 * @模块名称: LoadingIcon
 *
 * @模块作用: LoadingIcon
 *
 * @创建人: pgli
 *
 * @date: 2023/8/30 7:27 下午
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import React from 'react';
import styles from "./styles.module.less";

type LoadingIconProps = {
    size?: 'small' | 'default' | 'large';
    style?: React.CSSProperties;
}
const LoadingIcon = (props: LoadingIconProps) => {
    const sizeStyle = {
        'small': styles.iconSmall,
        'default': styles.iconDefault,
        'large': styles.iconLarge,
    }
    const sizeClass = sizeStyle[props.size || 'default'];
    return (
        <div style={props.style} className={`${styles.loadingIcon} ${sizeClass}`}></div>
    )
}

export default LoadingIcon;