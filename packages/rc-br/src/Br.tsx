/**********************************************************************
 *
 * @模块名称: Br
 *
 * @模块用途: Br
 *
 * @创建人: pgli
 *
 * @date: 2022/7/14 8:51
 *
 **********************************************************************/
import React from "react";
import styles from "./styles.module.less";

type BrProps = {
    style?: any;
    className?: string;
};
const Br: React.FC<BrProps> = (props) => {
    return (
        <br style={props.style} className={`${styles.br} ${props.className || ''}`}/>
    )
};

export default Br;
