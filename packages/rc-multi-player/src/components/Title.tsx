/**********************************************************************
 *
 * @模块名称: Title
 *
 * @模块用途: Title
 *
 * @创建人: pgli
 *
 * @date: 2022/10/31 11:28
 *
 **********************************************************************/
import React from 'react';
import { Box } from "@mui/material";
import comStyles from "./styles.module.less";

type TitleProps = {
    children?: any;
    ellipsis?: boolean;
    style?: React.CSSProperties;
}
const Title: React.FC<TitleProps> = (props) => {
    const { children, ellipsis, style } = props;
    return (
        <Box title={ellipsis ? children : ''} component={'span'}
             style={style}
             className={`${comStyles.title} ${ellipsis ? comStyles.ellipsis : ''}`}>
            {children}
        </Box>
    )
};

export default Title;
