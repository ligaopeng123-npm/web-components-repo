/**********************************************************************
 *
 * @模块名称: ScreenshotPicture
 *
 * @模块作用: ScreenshotPicture
 *
 * @创建人: pgli
 *
 * @date: 2023/6/30 6:00 下午
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import React, { useState } from 'react';
import ContentCut from "@mui/icons-material/ContentCut";
import IconButton from "@mui/material/IconButton";
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/material/Snackbar';
import { downloadScreenshotPicture, formatTimestamp } from "@gaopeng123/utils";

type ScreenshotPictureProp = {
    el?: HTMLElement;
    type?: 'icon' | 'auto';
    style?: React.CSSProperties;
    title?: string
};
const ScreenshotPicture: React.FC<ScreenshotPictureProp> = (props) => {
    const {
        el,
        style,
        title
    } = props;
    const onClick = (e: any) => {
        e?.stopPropagation();
        if (el) {
            const multiPlayer: any = el.querySelector('multi-player');
            const video = multiPlayer ? multiPlayer.video : el.querySelector('video');
            if (video) {
                downloadScreenshotPicture(video, {fileName: `${title || '截图'}_${formatTimestamp(Date.now(), 'yyyy-MM-dd HH:mm:ss')}`});
            } else {
                setOpen(true);
            }
        }
    }

    const [open, setOpen] = useState(false);


    return (
        <>
            <Tooltip
                title="截图">
                <IconButton
                    onClick={onClick}
                    // @ts-ignore
                    color="iconButton"
                    size={'small'}
                    style={Object.assign({}, style)}
                >
                    <ContentCut
                        style={{transform: 'scale(.8)'}}/>
                </IconButton>
            </Tooltip>
            <Snackbar
                autoHideDuration={1000}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
                message="当前没有视频，无法截图"
                key={'vertical_horizonta'}
            />
        </>
    )
}

export default ScreenshotPicture;