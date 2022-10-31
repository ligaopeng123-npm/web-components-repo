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
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

type IconCloseButtonProps = {
    onClick?: (e: any) => void;
    style?: React.CSSProperties;
};
const IconCloseButton: React.FC<IconCloseButtonProps> = (props) => {
    return (
        <IconButton
            style={props.style}
            onClick={props.onClick}
            size={'small'}
            // @ts-ignore
            color="iconButton"
            aria-label="close video"
            component="label">
            <CloseIcon/>
        </IconButton>
    )
};

export default IconCloseButton;
