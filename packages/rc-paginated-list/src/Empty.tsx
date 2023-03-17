/**********************************************************************
 *
 * @模块名称: Empty
 *
 * @模块用途: Empty
 *
 * @创建人: pgli
 *
 * @date: 2022/10/9 15:11
 *
 **********************************************************************/
import React from "react";
import styles from "./styles.module.less";
import emptySvg from "./assets/empty.svg";

type EmptyProps = {
    style?: React.CSSProperties;
    textStyle?: React.CSSProperties;
    loaded?: boolean;
};

const EmptyList: React.FC<EmptyProps> = (props) => {
    return (
        <div className={styles.empty}>
            {
                !props.loaded
                    ? <>
                        <div className={styles.circle} style={props.style}></div>
                        <div className={styles.circle} style={props.style}></div>
                        <div className={styles.circle} style={props.style}></div>
                        <div className={styles.shadow}></div>
                        <div className={styles.shadow}></div>
                        <div className={styles.shadow}></div>
                    </> : <img src={emptySvg}/>
            }
            <span
                style={Object.assign(props.loaded ? {left: '20%'} : {}, props.textStyle)}>
                {props.loaded ? '暂无数据' : 'Loading'}
            </span>
        </div>
    )
};

export default EmptyList;
