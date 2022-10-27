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

type FullScreenButtonProps = {
    setHidden: (v:boolean)=> void;
};
const FullScreenButton: React.FC<FullScreenButtonProps> = (props) => {
    const [type, setType] = useState('noFullscreen');
    const onClick = () => {
        autoFullscreen(document.querySelector('#multi-screen-player'), null, ({ type }) => {
            //fullscreen 进入全屏
            //noFullscreen 退出全屏
            setType(type);
        });

    }

    const windowResize = useResize();

    useEffect(() => {
        props.setHidden(isFullscreen() ? true : false);
        setType(isFullscreen() ? 'fullscreen' : 'noFullscreen')
    }, [windowResize]);

    return (
        <Button
            onClick={onClick}
            startIcon={type === 'fullscreen' ? <FullscreenExitIcon/> : <FullscreenIcon/>}
            size="small" className={styles.bottom}>
            {type === 'fullscreen' ? '退出全屏' : '全屏'}
        </Button>
    )
};

export default FullScreenButton;
