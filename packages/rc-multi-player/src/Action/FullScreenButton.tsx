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
import { useResize } from "@gaopeng123/hooks";
import IconButton from "@mui/material/IconButton";
import Tooltip from '@mui/material/Tooltip';
import { MultiScreenPlayerDomConfig } from "../MultiTyping";

type FullScreenButtonProps = {
    onChange?: (v: boolean) => void;
    el?: HTMLElement;
    type?: 'icon' | 'auto';
    style?: React.CSSProperties;
    fullScreenId?: string;
};

const FullScreenButton: React.FC<FullScreenButtonProps> = (props) => {
        const {
            el,
            onChange,
            type,
            style,
            fullScreenId
        } = props;
        const [fullType, setFullType] = useState<boolean>(isFullscreen());
        const onClick = (e: any) => {
            e?.stopPropagation();
            const autoEl: any = el || document.querySelector(`#${fullScreenId || 'multi-screen-player'}`);
            autoFullscreen(autoEl, {}, ({type}: any) => {
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
            <Tooltip
                title={fullType ? '退出全屏' : '全屏'}>
                {
                    type === 'icon'
                        ?
                        <IconButton
                            onClick={onClick}
                            // @ts-ignore
                            color="iconButton"
                            size={'small'}
                            style={style}
                        >
                            {fullType ?
                                <FullscreenExitIcon/> :
                                <FullscreenIcon/>}
                        </IconButton>
                        :
                        <Button
                            onClick={onClick}
                            startIcon={fullType ?
                                <FullscreenExitIcon/> :
                                <FullscreenIcon/>}
                            size="small"
                            className={styles.bottom}
                            style={style}
                        >
                            {fullType ? '退出全屏' : '全屏'}
                        </Button>

                }
            </Tooltip>
        )
    }
;

export default FullScreenButton;
