/**********************************************************************
 *
 * @模块名称: RcMultiScreenPlayerTest
 *
 * @模块用途: RcMultiScreenPlayerTest
 *
 * @创建人: pgli
 *
 * @date: 2022/10/28 9:19
 *
 **********************************************************************/
import * as React from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { RcMultiScreenPlayer } from "../src";
import Snackbar from "@mui/material/Snackbar";
import { useRef } from "react";

type RcMultiScreenPlayerTestProps = {};
const RcMultiScreenPlayerTest: React.FC<RcMultiScreenPlayerTestProps> = (props) => {
    const [protocol, setProtocol] = React.useState<any>('FLV');
    const [open, setOpen] = React.useState(false);
    const [mediaDataSource, setMediaDataSource] = React.useState<any>();
    const [currentConfig, setCurrentConfig] = React.useState<any>();
    const screenRef = useRef(null);
    const handleChange = (v: any) => {
        setProtocol(v?.target?.value);
    }
    const onClick = () => {
        console.log(222, screenRef.current.getScreenConfig())
        // @ts-ignore
        const url = document.querySelector('#outlined-basic')?.value;
        if (url) {
            setCurrentConfig({
                mediaDataSource: { url: url, type: 'flv', },
                playerConfig: { protocol: protocol, title: '你好色彩', extraParams: { test: 1 } }
            });
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
                            <InputLabel id="demo-simple-select-label">协议类型</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={protocol}
                                label="Age"
                                onChange={handleChange}
                            >
                                <MenuItem value={'FLV'}>FLV</MenuItem>
                                <MenuItem value={'WebRTC'}>WebRTC</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth className={'form-item'}>
                            <TextField defaultValue={'/live/40491879758-1-30002.flv'} id="outlined-basic" label="url地址"
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
                    <RcMultiScreenPlayer
                        events={{
                            onReload: (e) => {
                                console.log(111, e);
                                setMediaDataSource({
                                    // @ts-ignore
                                    url: document.querySelector('#outlined-basic')?.value,
                                    type: 'flv',
                                });
                                // @ts-ignore
                                setPlayerConfig({ protocol: protocol, title: '你好色彩', layoutIndex: e?.layoutIndex });
                            },
                            onClose: (e) => {
                                console.log(222, e);
                            }
                        }}
                        ref={screenRef}
                        currentConfig={currentConfig}
                        defaultSelectedScreen={4}/>
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
    )
};

export default RcMultiScreenPlayerTest;
