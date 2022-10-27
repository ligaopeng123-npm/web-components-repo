/**********************************************************************
 *
 * @模块名称: LayoutContentItem
 *
 * @模块用途: LayoutContentItem
 *
 * @创建人: pgli
 *
 * @date: 2022/10/24 16:02
 *
 **********************************************************************/
import React, { useState, useEffect } from 'react';
import styles from '../styles.module.less';

type LayoutContentItemProps = {
    className?: string;
    key?: string;
};
const LayoutContentItem: React.FC<LayoutContentItemProps> = (props) => {
    return (
        <div className={props.className}></div>
    )
};

export default LayoutContentItem;
