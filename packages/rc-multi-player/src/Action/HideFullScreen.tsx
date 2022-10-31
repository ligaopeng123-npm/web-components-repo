/**********************************************************************
 *
 * @模块名称: HideFullScreen
 *
 * @模块用途: HideFullScreen
 *
 * @创建人: pgli
 *
 * @date: 2022/10/31 9:01
 *
 **********************************************************************/
import React, { useEffect } from 'react';
import Hidden from "./Hidden";
import { useBoolean } from "@gaopeng123/hooks";
import { isFullscreen } from "@gaopeng123/utils";

type HideFullScreenProps = {
    children: any;
    style?: React.CSSProperties;
};
const HideFullScreen: React.FC<HideFullScreenProps> = (props) => {
    const [hide, { setTrue, setFalse }] = useBoolean(isFullscreen());
    const { children, style } = props;
    useEffect(() => {
        const onFullscreenchange = (e: any) => {
            if (isFullscreen() === false) {
                setFalse();
            } else {
                setTrue();
            }
        }
        //监听进入全屏或退出全屏
        document.addEventListener('fullscreenchange', onFullscreenchange)

        return () => {
            document.removeEventListener('fullscreenchange', onFullscreenchange)
        }
    }, [])
    return (
        <Hidden hide={hide} style={style}>
            {children}
        </Hidden>
    )
};

export default HideFullScreen;
