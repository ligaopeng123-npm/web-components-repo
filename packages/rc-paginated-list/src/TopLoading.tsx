/**********************************************************************
 *
 * @模块名称: TopLoading
 *
 * @模块用途: TopLoading
 *
 * @创建人: pgli
 *
 * @date: 2022/10/9 15:34
 *
 **********************************************************************/
import React from 'react';
import styles from "./styles.module.less";

type TopLoadingProps = {
    itemStyle?: any;
    style?: any;
};

const TopLoading: React.FC<TopLoadingProps> = (props) => {
    const { style, itemStyle } = props;
    return (
        <div className={styles.loading}>
            <div className={styles.topLoading} style={style}>
                <div style={itemStyle}></div>
                <div style={itemStyle}></div>
                <div style={itemStyle}></div>
            </div>
        </div>
    )
};

export default TopLoading;
