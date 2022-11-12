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

type MultiScreenDrawerProps = {} & Props;

const MultiScreenDrawer: React.FC<MultiScreenDrawerProps> = (props) => {
    const { state, dispatch, screenKey } = props;
    const toggleDrawer = (open: boolean) => {
        dispatch({
            type: MultiStoreEnum.drawer,
            value: false
        });
    };

    const onProtocolSelectChange = (v: any) => {
        dispatch({
            type: MultiStoreEnum.screenConfig,
            value: {
                type: 'protocol',
                value: v
            }
        });
    }
    /**
     * 改变样式处理
     * @param val
     */
    const changeObjectFit = (val: ObjectFit) => {
        const videoList = document.querySelectorAll(`#${screenKey}`);
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
    const onObjectFitSelectChange = (v: any) => {
        changeObjectFit(v);
    }
    /**
     * 时间变化处理
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
                classes={{ root: styles2.drawer }}
                sx={{ position: 'absolute' }}
                variant="persistent"
                anchor={'right'}
                open={state[MultiStoreEnum.drawer]}
            >
                <ActionColumn
                    className={styles2.header}
                    left={<>播放器配置</>}
                    right={<IconCloseButton onClick={toggleDrawer}/>}/>
                <div style={{ padding: 16 }}>
                    <FormItem
                        defaultValue={state[MultiStoreEnum.screenConfig]?.protocol}
                        onChange={onProtocolSelectChange}
                        label={'流媒体协议'}
                        options={[
                            { label: 'HTTP-FLV', value: 'FLV' },
                            { label: 'WebRTC', value: 'WebRTC' }
                        ]}/>
                    <FormItem
                        defaultValue={state[MultiStoreEnum.screenConfig]?.objectFit}
                        onChange={onObjectFitSelectChange}
                        label={'视频比例'}
                        options={[
                            { label: '拉伸铺满', value: 'fill' },
                            { label: '裁剪铺满', value: 'cover' },
                            { label: '原始尺寸', value: 'contain' },
                        ]}/>
                    <FormItem
                        defaultValue={state[MultiStoreEnum.screenConfig]?.maxPlayerTime}
                        onChange={onCountdownSelectChange}
                        label={'倒计时'}
                        options={[
                            { label: '3分钟', value: "3min" },
                            { label: '5分钟', value: "5min" },
                            { label: '长期', value: 'forever' },
                        ]}/>
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
