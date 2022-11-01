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

type MultiScreenDrawerProps = {} & Props;

const MultiScreenDrawer: React.FC<MultiScreenDrawerProps> = (props) => {
    const { state, dispatch } = props;
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
