/**********************************************************************
 *
 * @模块名称: FullScreenButton
 *
 * @模块用途: FullScreenButton  全屏按钮
 *
 * @创建人: pgli
 *
 * @date: 2022/10/24 9:20
 *
 **********************************************************************/
import React, { useEffect, useState } from 'react';
import Button from "@mui/material/Button";
import styles from "../styles.module.less";
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { autoFullscreen, isFullscreen } from "@gaopeng123/utils";
import { useResize } from "@gaopeng123/hooks.use-resize";
import IconButton from "@mui/material/IconButton";

type FullScreenButtonProps = {
    onChange?: (v: boolean) => void;
    el?: HTMLElement;
    type?: 'icon' | 'auto';
};

const FullScreenButton: React.FC<FullScreenButtonProps> = (props) => {
    const { el, onChange, type } = props;
    const [fullType, setFullType] = useState<boolean>(isFullscreen());
    const onClick = () => {
        autoFullscreen(el || document.querySelector('#multi-screen-player'), null, ({ type }) => {
            //fullscreen 进入全屏
            //noFullscreen 退出全屏
            setFullType(type === 'fullscreen');
        });
    }

    const windowResize = useResize();

    useEffect(() => {
        const fullType = isFullscreen() ? true : false;
        if (onChange) {
            onChange(fullType);
        }
        setFullType(fullType)
    }, [windowResize]);

    return (
        <>
            {
                type === 'icon'
                    ? <IconButton onClick={onClick} color="primary" size={'small'}>
                        {fullType ? <FullscreenExitIcon/> : <FullscreenIcon/>}
                    </IconButton>
                    : <Button
                        onClick={onClick}
                        startIcon={fullType ? <FullscreenExitIcon/> : <FullscreenIcon/>}
                        size="small" className={styles.bottom}>
                        {fullType ? '退出全屏' : '全屏'}
                    </Button>
            }
        </>

    )
};

export default FullScreenButton;
