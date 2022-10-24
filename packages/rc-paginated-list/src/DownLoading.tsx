/**********************************************************************
 *
 * @模块名称: Loading
 *
 * @模块用途: Loading
 *
 * @创建人: pgli
 *
 * @date: 2022/10/9 15:11
 *
 **********************************************************************/
import React from "react";
import styles from "./styles.module.less";

type DownLoadingProps = {
    itemStyle?: any;
    style?: any;
};

const DownLoading: React.FC<DownLoadingProps> = (props) => {
    const { style, itemStyle } = props;
    return (
        <div className={styles.loading}>
            <div className={styles.downLoading} style={style}>
                <div style={itemStyle}></div>
                <div style={itemStyle}></div>
                <div style={itemStyle}></div>
                <div style={itemStyle}></div>
            </div>
        </div>
    )
};

export default DownLoading;
