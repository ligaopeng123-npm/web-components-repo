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
import styles from './styles.modules.less';

type TitleProps = {
    children?: any;
};
const Title: React.FC<TitleProps> = (props) => {
    const { children } = props;
    return (
        <Box component={'span'} className={styles.title}>
            {children}
        </Box>
    )
};

export default Title;
