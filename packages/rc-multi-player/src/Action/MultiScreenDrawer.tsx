/**********************************************************************
 *
 * @模块名称: MultiScreenDrawer
 *
 * @模块用途: MultiScreenDrawer
 *
 * @创建人: pgli
 *
 * @date: 2022/10/31 9:42
 *
 **********************************************************************/
import * as React from 'react';
import Drawer from "@mui/material/Drawer";
import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import styles from "../styles.module.less";
import styles2 from "./styles.module.less";
import Button from "@mui/material/Button";
import { MultiStoreEnum, Props } from "../MultiTyping";
import ActionColumn from "./ActionColumn";
import IconCloseButton from "./IconCloseButton";
import FormItem from "../components/FormItem";
import { classnames, isMobile, max } from "@gaopeng123/utils";
import { ObjectFit } from "@gaopeng123/multi-player";
import { ScreenConfigHelper } from "../MultiStore";


const isMob = isMobile();
type MultiScreenDrawerProps = {} & Props;

const MultiScreenDrawer: React.FC<MultiScreenDrawerProps> = (props) => {
    const { state, dispatch, screenKey, anchor } = props;
    const toggleDrawer = (open: boolean) => {
        dispatch({
            type: MultiStoreEnum.drawer,
            value: false
        });
    };
    /**
     * 协议切换处理
     * @param v
     */
    const onProtocolSelectChange = (v: any) => {
        ScreenConfigHelper.setSingleConfig({ protocol: v });
    }
    /**
     * 改变样式处理
     * @param val
     */
    const changeObjectFit = (val: ObjectFit) => {
        const videoList: any = document.querySelector(`#${screenKey}`)?.querySelectorAll('video') || [];
        const multiPlayer = document.querySelectorAll('multi-player');
        const hlsPlayer = document.querySelectorAll('hls-player');
        for (let i = 0; i < max(videoList.length, multiPlayer.length, hlsPlayer.length); i++) {
            if (videoList[i]) {
                // @ts-ignore
                videoList[i].style['object-fit'] = val;
            }
            if (multiPlayer[i]) {
                // @ts-ignore
                multiPlayer[i].objectFit = val;
            }
            if (hlsPlayer[i]) {
                // @ts-ignore
                hlsPlayer[i].objectFit = val;
            }
        }
    }
    /**
     * 视频尺寸处理
     * @param v
     */
    const onObjectFitSelectChange = (v: any) => {
        changeObjectFit(v);
        ScreenConfigHelper.setSingleConfig({ objectFit: v });
    }
    /**
     * 视频分辨率
     */
    const onResolutionSelectChange = (v: string) => {
        ScreenConfigHelper.setSingleConfig({ resolution: v });
    }
    /**
     * 视频播放方式
     * @param v
     */
    const onCountdownSelectChange = (v: string) => {
        dispatch({
            type: MultiStoreEnum.screenConfig,
            value: {
                type: 'maxPlayerTime',
                value: v
            }
        });
    }

    const actionConfig = state[MultiStoreEnum.actionConfig];
    const screenConfig = state[MultiStoreEnum.screenConfig]

    return (
        <>
            <Drawer
                classes={{
                    root: classnames({
                        [styles2.drawer]: true,
                        [styles2.mobDrawer]: isMob,
                        [styles2.pcDrawer]: !isMob,
                    }),
                    paper: classnames({
                        [styles2.paper]: true,
                        [styles2.drawerSafe]: isMob && anchor === 'right',
                    })
                }}
                sx={{ position: 'absolute' }}
                variant="persistent"
                anchor={anchor || 'right'}
                open={state[MultiStoreEnum.drawer]}
            >
                <ActionColumn
                    className={classnames({
                        [styles2.header]: true,
                    })}
                    left={<span style={{ marginLeft: 16 }}>播放器配置</span>}
                    right={<IconCloseButton style={{ marginRight: 16 }} onClick={toggleDrawer}/>}/>
                <div style={{ padding: 16 }}>
                    {
                        screenConfig?.protocol === false
                            ? null
                            : <FormItem
                                defaultValue={screenConfig?.protocol}
                                onChange={onProtocolSelectChange}
                                label={'播放策略'}
                                helpText={actionConfig?.protocol.helpText}
                                options={actionConfig?.protocol.options}/>
                    }

                    {
                        screenConfig?.objectFit === false
                            ? null
                            : <FormItem
                                defaultValue={screenConfig?.objectFit}
                                onChange={onObjectFitSelectChange}
                                label={'视频比例'}
                                helpText={actionConfig?.objectFit.helpText}
                                options={actionConfig?.objectFit.options}/>
                    }

                    {
                        screenConfig?.maxPlayerTime === false
                            ? null
                            : <FormItem
                                defaultValue={screenConfig?.maxPlayerTime}
                                onChange={onCountdownSelectChange}
                                label={'播放方式'}
                                helpText={actionConfig?.maxPlayerTime.helpText}
                                options={actionConfig?.maxPlayerTime.options}/>
                    }

                    {
                        screenConfig?.resolution === false
                            ? null
                            : <FormItem
                                defaultValue={screenConfig?.resolution}
                                onChange={onResolutionSelectChange}
                                label={'分辨率'}
                                helpText={actionConfig?.resolution.helpText}
                                options={actionConfig?.resolution.options}/>
                    }
                </div>
            </Drawer>
        </>
    )
};

type MultiScreenDrawerButtonProps = {
    style?: React.CSSProperties;
} & Props;

export const MultiScreenDrawerButton = (props: MultiScreenDrawerButtonProps) => {
    const { dispatch, style } = props;
    const onClick = () => {
        dispatch({
            type: MultiStoreEnum.drawer,
            value: true
        })
    }
    return (
        <Button
            onClick={onClick}
            startIcon={isMob ? <MoreVertIcon/> : <BrightnessHighIcon/>}
            size="small"
            className={styles.bottom}
            style={props.style}
        >
            {!isMob ? '配置' : ''}
        </Button>
    )
}

export default MultiScreenDrawer;