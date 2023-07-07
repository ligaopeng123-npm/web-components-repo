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
import { RcMultiScreenPlayer, reduceTimeSlotInterference } from "../src";
import Snackbar from "@mui/material/Snackbar";
import { useRef } from "react";
import { PlayerConfig } from "../src/Player/PlayerTyping";

type RcMultiScreenPlayerTestProps = {};
const RcMultiScreenPlayerTest: React.FC<RcMultiScreenPlayerTestProps> = (props) => {
    const [protocol, setProtocol] = React.useState<any>('FLV');
    const [open, setOpen] = React.useState(false);
    const [currentConfig, setCurrentConfig] = React.useState<any>({});
    const screenRef = useRef(null);
    const handleChange = (v: any) => {
        setProtocol(v?.target?.value);
    }
    const onClick = (e: any) => {
        // @ts-ignore
        const url = document.querySelector('#outlined-basic')?.value;
        // @ts-ignore
        const title = document.querySelector('#outlined-title')?.value;
        if (url) {
            setCurrentConfig({
                mediaDataSource: {
                    url: "https://ai-api-test.sany.com.cn/live/back_8_22_c3227046619147c0efa96d56b65071f4.flv",
                    type: 'flv',
                },
                playerConfig: {
                    protocol: protocol,
                    title: title,
                    extraParams: {test: 1},
                    // layoutIndex: '0',
                    robustness: {
                        maxResetTimes: 1,
                        retryDuration: 15000 // 15秒加载
                    },
                    periods: reduceTimeSlotInterference([
                        {
                            "recordBeginTime": "2023-07-07 00:00:00",
                            "recordEndTime": "2023-07-07 10:04:10",
                            "fileName": "ch0001_01010009546000000",
                            "fileSize": 3728667292
                        }
                    ], {
                        startKey: 'recordBeginTime',
                        endKey: 'recordEndTime'
                    }),
                    currentTime: "2023-07-07 00:00:00",
                    'speed-value': 4
                }
            });
        } else {
            setOpen(true)
        }
    }
    return (
        <div
            style={{height: 600}}>
            <div
                style={{display: 'flex'}}>
                <div
                    style={{flex: 1}}>
                    <div
                        style={{width: '90%'}}
                        className={'form'}>
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
                        <FormControl
                            fullWidth
                            className={'form-item'}>
                            <TextField
                                defaultValue={'title'}
                                id="outlined-title"
                                label="视频title"
                                variant="outlined"/>
                        </FormControl>
                        <FormControl
                            fullWidth
                            className={'form-item'}>
                            <TextField
                                defaultValue={'/live/40491879758-1-30002.flv'}
                                id="outlined-basic"
                                label="url地址"
                                variant="outlined"/>
                        </FormControl>
                        <FormControl
                            fullWidth
                            className={'form-item'}>
                            <Button
                                onClick={onClick}
                                type={'submit'}
                                id="form-submit"
                                variant="outlined">
                                提交
                            </Button>
                        </FormControl>
                    </div>
                </div>
                <div
                    style={{
                        flex: 3,
                        height: 600
                    }}>
                    <RcMultiScreenPlayer
                        playType={'replay'}
                        defaultSelectedScreen={4}
                        events={{
                            onTimeChange: (e: PlayerConfig) => {
                                onClick(e);
                            },
                            onReload: (e: PlayerConfig) => {
                                // onClick(e);
                            },
                            onClose: (e: PlayerConfig) => {
                                console.log(222, e);
                            }
                        }}
                        defaultPlayerConfig={{
                            protocol: false,
                            maxPlayerTime: {
                                defaultValue: "forever",
                                options: [
                                    {
                                        label: '3分钟',
                                        value: "3min"
                                    },
                                    {
                                        label: '5分钟',
                                        value: "5min"
                                    },
                                    {
                                        label: '长期',
                                        value: 'forever'
                                    }
                                ]
                            },
                            objectFit: 'cover'
                        }}
                        ref={screenRef}
                        currentConfig={currentConfig}
                    />
                </div>
            </div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left'
                }}
                open={open}
                autoHideDuration={6000}
                onClose={() => setOpen(false)}
                message="请输入播放地址"
            />
        </div>
    )
};

export default RcMultiScreenPlayerTest;