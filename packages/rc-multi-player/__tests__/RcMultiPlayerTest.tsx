/**********************************************************************
 *
 * @模块名称: RcMultiPlayerTest
 *
 * @模块用途: RcMultiPlayerTest
 *
 * @创建人: pgli
 *
 * @date: 2022/10/28 9:18
 *
 **********************************************************************/
import * as React from 'react';
import { RcMultiPlayer } from "../src";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import "./index.less";
import { useRef } from "react";

type RcMultiPlayerTestProps = {};
const RcMultiPlayerTest: React.FC<RcMultiPlayerTestProps> = (props) => {
    const [open, setOpen] = React.useState(false);
    const [mediaDataSource, setMediaDataSource] = React.useState<any>();

    const [protocol, setProtocol] = React.useState<any>('FLV');

    const handleChange = (v: any) => {
        setProtocol(v?.target?.value);
    }

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
                        <FormControl
                            fullWidth
                            className={'form-item'}>
                            <InputLabel
                                id="demo-simple-select-label">协议类型</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={protocol}
                                label="Age"
                                onChange={handleChange}
                            >
                                <MenuItem
                                    value={'FLV'}>FLV</MenuItem>
                                <MenuItem
                                    value={'WebRTC'}>WebRTC</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth className={'form-item'}>
                            <TextField
                                defaultValue={'https://sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-360p.flv'}
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
                    <RcMultiPlayer
                        events={{
                            onFullChange: (v) => {
                                console.log(v);
                            },
                            onActionChange: (allValue) => {
                                console.log(allValue);
                            }
                        }}
                        defaultPlayerConfig={{
                            protocol: {
                                defaultValue: 'WebRTC', options: [
                                    {
                                        label: 'WebRTC',
                                        value: 'WebRTC'
                                    },
                                    {
                                        label: 'HTTP-FLV',
                                        value: 'FLV'
                                    },
                                ]
                            },
                            maxPlayerTime: false,
                            resolution: {
                                defaultValue: "1",
                                options: [
                                    {
                                        label: '子码流',
                                        value: "1"
                                    },
                                    {
                                        label: '主码流',
                                        value: "2"
                                    }
                                ]
                            },
                            objectFit: 'cover',
                        }}
                        protocol={protocol}
                        hideToolbarInFullScreen={false}
                        videoToolbar={{ close: false, fullScreen: true, screenshot: false, back: true }}
                        className={'RcMultiPlayerTest'}
                        mediaDataSource={mediaDataSource}/>
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

export default RcMultiPlayerTest;
