/**********************************************************************
 *
 * @模块名称: WebRTCPalyerTest
 *
 * @模块用途: WebRTCPalyerTest
 *
 * @创建人: pgli
 *
 * @date: 2022/10/28 9:17
 *
 **********************************************************************/
import * as React from 'react';
import { Button, FormControl, TextField } from "@mui/material";
import { RcWebRTCPlayer } from "../src";
import Snackbar from "@mui/material/Snackbar";

type WebRTCPlayerTestProps = {};
const WebRTCPlayerTest: React.FC<WebRTCPlayerTestProps> = (props) => {
    const [open, setOpen] = React.useState(false);
    const [mediaDataSource, setMediaDataSource] = React.useState<any>();

    const onClick = () => {
        // @ts-ignore
        const url = document.querySelector('#outlined-basic')?.value;
        if (url) {
            setMediaDataSource({ url: url, type: 'flv', });
        } else {
            setOpen(true)
        }
    }

    return (
        <div style={{ height: 600 }}>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1 }}>
                    <div style={{ width: '90%' }} className={'form'}>
                        <FormControl fullWidth className={'form-item'}>
                            <TextField defaultValue={'webrtc://xingtu.ubsense.cn/live/40491879758-1-30002'}
                                       id="outlined-basic" label="url地址"
                                       variant="outlined"/>
                        </FormControl>
                        <FormControl fullWidth className={'form-item'}>
                            <Button onClick={onClick} type={'submit'} id="form-submit"
                                    variant="outlined">
                                提交
                            </Button>
                        </FormControl>
                    </div>
                </div>
                <div style={{ flex: 3, height: 600 }}>
                    <RcWebRTCPlayer
                        mediaDataSource={mediaDataSource}
                    />
                </div>
            </div>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                open={open}
                autoHideDuration={6000}
                onClose={() => setOpen(false)}
                message="请输入播放地址"
            />
        </div>
    );
};

export default WebRTCPlayerTest;
