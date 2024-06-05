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
import Box from "@mui/material/Box";
import comStyles from "./styles.module.less";
import { classnames } from "@gaopeng123/utils";

type TitleProps = {
    children?: any;
    ellipsis?: boolean;
    className?: string,
    style?: React.CSSProperties;
}
const Title: React.FC<TitleProps> = (props) => {
    const { children, ellipsis, style, className } = props;
    return (
        <Box title={ellipsis ? children : ''} component={'span'}
             style={style}
             className={classnames(comStyles.title, ellipsis ? comStyles.ellipsis : '', className)}>
            {children}
        </Box>
    )
};

export default Title;
