/**********************************************************************
 *
 * @模块名称: ReplayLoad
 *
 * @模块用途: ReplayLoad
 *
 * @创建人: pgli
 *
 * @date: 2022/10/27 19:26
 *
 **********************************************************************/
import React, { forwardRef, useImperativeHandle } from 'react';
import ReplayIcon from '@mui/icons-material/Replay';
import IconButton from "@mui/material/IconButton";
import CircularProgress from '@mui/material/CircularProgress';
import styles from "./styles.modules.less";
import { useBoolean } from "@gaopeng123/hooks";
import Hidden from "./Hidden";

type ReplayLoadProps = {
    error?: boolean;
    ref?: any;
    onClick: () => void;
};

type ReplayLoadRef = {
    hide: () => void;
    show: () => void;
}
const ReplayLoad: React.FC<ReplayLoadProps> = forwardRef<ReplayLoadRef, ReplayLoadProps>((props, ref) => {
    const { children, onClick } = props;
    const [hideBool, { setFalse, setTrue }] = useBoolean(true);
    const onLoadClick = (e: any) => {
        e?.stopPropagation();
        onClick();
    }
    // 暴露数据
    useImperativeHandle(ref, () => ({
        hide: () => {
            setTrue();
        },
        show: () => {
            setFalse();
        }
    }));

    return (
        <>
            {
                <>
                    <Hidden hide={hideBool}>
                        <div className={styles.replay}>
                            <IconButton
                                onClick={onLoadClick}
                                // @ts-ignore
                                color="iconButton"
                                size={'small'}>
                                <div>
                                    <CircularProgress
                                        style={{ height: 20, width: 20 }}
                                        color="inherit"/>
                                    <div>重新加载</div>
                                </div>
                            </IconButton>
                        </div>
                    </Hidden>
                    {
                        children
                    }
                </>
            }
        </>
    )
});

export default ReplayLoad;
