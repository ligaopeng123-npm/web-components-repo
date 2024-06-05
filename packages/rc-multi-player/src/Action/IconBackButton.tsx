/**********************************************************************
 *
 * @模块名称: IconClostButton
 *
 * @模块用途: IconClostButton
 *
 * @创建人: pgli
 *
 * @date: 2022/10/31 10:36
 *
 **********************************************************************/
import React from 'react';
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Tooltip } from "@mui/material";

type IconBackButtonProps = {
    onClick?: (e: any) => void;
    style?: React.CSSProperties;
};
const IconBackButton: React.FC<IconBackButtonProps> = (props) => {
    return (
        <Tooltip title={'返回'}>
            <IconButton
                style={props.style}
                onClick={props.onClick}
                size={'small'}
                // @ts-ignore
                color="iconButton"
                aria-label="back video"
                component="label">
                <ArrowBackIosIcon/>
            </IconButton>
        </Tooltip>
    )
};

export default IconBackButton;
