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
import styles from "../styles.module.less";
import styles2 from "./styles.module.less";
import Button from "@mui/material/Button";
import { MultiStoreEnum, Props } from "../MultiTyping";
import ActionColumn from "./ActionColumn";
import IconCloseButton from "./IconCloseButton";
import FormItem from "../components/FormItem";
import { max } from "@gaopeng123/utils";
import { ObjectFit } from "@gaopeng123/multi-player";
import { ScreenConfigHelper } from "../MultiStore";

type MultiScreenDrawerProps = {} & Props;

const MultiScreenDrawer: React.FC<MultiScreenDrawerProps> = (props) => {
    const {state, dispatch, screenKey} = props;
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
        ScreenConfigHelper.setSingleConfig({protocol: v});
    }
    /**
     * 改变样式处理
     * @param val
     */
    const changeObjectFit = (val: ObjectFit) => {
        const videoList: any = document.querySelector(`#${screenKey}`)?.querySelectorAll('video') || [];
        const multiPlayer = document.querySelectorAll('multi-player');
        for (let i = 0; i < max(videoList.length, multiPlayer.length); i++) {
            if (videoList[i]) {
                // @ts-ignore
                videoList[i].style['object-fit'] = val;
            }
            if (multiPlayer[i]) {
                // @ts-ignore
                multiPlayer[i].objectFit = val;
            }
        }
    }
    /**
     * 视频尺寸处理
     * @param v
     */
    const onObjectFitSelectChange = (v: any) => {
        changeObjectFit(v);
        ScreenConfigHelper.setSingleConfig({objectFit: v});
    }
    /**
     * 视频分辨率
     */
    const onResolutionSelectChange = (v: string) => {
        ScreenConfigHelper.setSingleConfig({resolution: v});
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

    return (
        <>
            <Drawer
                classes={{root: styles2.drawer}}
                sx={{position: 'absolute'}}
                variant="persistent"
                anchor={'right'}
                open={state[MultiStoreEnum.drawer]}
            >
                <ActionColumn
                    className={styles2.header}
                    left={<>播放器配置</>}
                    right={<IconCloseButton onClick={toggleDrawer}/>}/>
                <div style={{padding: 16}}>
                    {
                        state[MultiStoreEnum.screenConfig]?.protocol === false
                            ? null
                            : <FormItem
                                defaultValue={state[MultiStoreEnum.screenConfig]?.protocol}
                                onChange={onProtocolSelectChange}
                                label={'播放策略'}
                                options={state[MultiStoreEnum.actionConfig]?.protocol.options}/>
                    }

                    {
                        state[MultiStoreEnum.screenConfig]?.objectFit === false
                            ? null
                            : <FormItem
                                defaultValue={state[MultiStoreEnum.screenConfig]?.objectFit}
                                onChange={onObjectFitSelectChange}
                                label={'视频比例'}
                                options={state[MultiStoreEnum.actionConfig]?.objectFit.options}/>
                    }

                    {
                        state[MultiStoreEnum.screenConfig]?.maxPlayerTime === false
                            ? null
                            : <FormItem
                                defaultValue={state[MultiStoreEnum.screenConfig]?.maxPlayerTime}
                                onChange={onCountdownSelectChange}
                                label={'播放方式'}
                                options={state[MultiStoreEnum.actionConfig]?.maxPlayerTime.options}/>
                    }

                    {
                        state[MultiStoreEnum.screenConfig]?.resolution === false
                            ? null
                            : <FormItem
                                defaultValue={state[MultiStoreEnum.screenConfig]?.resolution}
                                onChange={onResolutionSelectChange}
                                label={'分辨率'}
                                options={state[MultiStoreEnum.actionConfig]?.resolution.options}/>
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
    const {dispatch, style} = props;
    const onClick = () => {
        dispatch({
            type: MultiStoreEnum.drawer,
            value: true
        })
    }
    return (
        <Button
            onClick={onClick}
            startIcon={<BrightnessHighIcon/>}
            size="small"
            className={styles.bottom}
            style={props.style}
        >
            配置
        </Button>
    )
}

export default MultiScreenDrawer;