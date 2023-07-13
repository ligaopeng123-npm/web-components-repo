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
import { useEffect, useRef, useState } from "react";
import { PlayerConfig } from "../src/Player/PlayerTyping";
import { formatTimestamp } from "@gaopeng123/utils";

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
                    url: "https://sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-360p.flv",
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

    const [timeParams, setTimeParams] = useState<any>();


    useEffect(()=> {
        if (timeParams) {
            setTimeout(()=> {
                console.log('timeParams', timeParams);
                const currentConfig = {
                    id: Date.now(),
                    mediaDataSource: {
                        url: `https://sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/flv/xgplayer-demo-360p.flv?a=${Date.now()}`,
                        // url: `https://ai-api-test.sany.com.cn/live/back_58_5_7330b1b3a9405bbe4a1e0352c7cdeabb.flv?a=${Date.now()}`,
                        type: 'flv',
                    },
                    playerConfig: {
                        protocol: protocol,
                        title: 'test',
                        extraParams: {test: 1},
                        robustness: {
                            maxResetTimes: 1,
                            retryDuration: 15000 // 15秒加载
                        },
                        periods: reduceTimeSlotInterference(timeParams.date !== "2023-07-11 00:00:00" ?  [
                            {
                                "recordBeginTime": "2023-07-11 06:00:04",
                                "recordEndTime": "2023-07-11 06:55:06",
                                "fileName": "ch0037_02010015055075000",
                                "fileSize": 1073741824
                            },
                            {
                                "recordBeginTime": "2023-07-11 06:55:06",
                                "recordEndTime": "2023-07-11 08:06:04",
                                "fileName": "ch0037_02010015114189600",
                                "fileSize": 1073741824
                            },
                            {
                                "recordBeginTime": "2023-07-11 08:06:04",
                                "recordEndTime": "2023-07-11 09:17:04",
                                "fileName": "ch0037_02010015174090700",
                                "fileSize": 1073741824
                            },
                            {
                                "recordBeginTime": "2023-07-11 09:17:04",
                                "recordEndTime": "2023-07-11 10:27:52",
                                "fileName": "ch0037_02010015234200000",
                                "fileSize": 1073741824
                            },
                            {
                                "recordBeginTime": "2023-07-11 10:27:52",
                                "recordEndTime": "2023-07-11 11:39:00",
                                "fileName": "ch0037_02010015295101400",
                                "fileSize": 1073741824
                            },
                            {
                                "recordBeginTime": "2023-07-11 11:39:00",
                                "recordEndTime": "2023-07-11 12:49:48",
                                "fileName": "ch0037_02010015357007400",
                                "fileSize": 1073741824
                            },
                            {
                                "recordBeginTime": "2023-07-11 12:49:48",
                                "recordEndTime": "2023-07-11 14:00:48",
                                "fileName": "ch0037_02010015415112800",
                                "fileSize": 1073741824
                            },
                            {
                                "recordBeginTime": "2023-07-11 14:00:48",
                                "recordEndTime": "2023-07-11 14:06:06",
                                "fileName": "ch0037_03000000020018200",
                                "fileSize": 79691776
                            }
                        ] : [
                            {
                                "recordBeginTime": "2023-07-11 00:00:00",
                                "recordEndTime": "2023-07-11 01:00:19",
                                "fileName": "ch0037_02010014751181200",
                                "fileSize": 1073741824
                            },
                            {
                                "recordBeginTime": "2023-07-11 01:00:19",
                                "recordEndTime": "2023-07-11 02:11:17",
                                "fileName": "ch0037_02010014815079400",
                                "fileSize": 1073741824
                            },
                            {
                                "recordBeginTime": "2023-07-11 02:11:17",
                                "recordEndTime": "2023-07-11 03:22:15",
                                "fileName": "ch0037_02010014873179000",
                                "fileSize": 1073741824
                            },
                            {
                                "recordBeginTime": "2023-07-11 03:22:15",
                                "recordEndTime": "2023-07-11 04:33:12",
                                "fileName": "ch0037_02010014933076200",
                                "fileSize": 1073741824
                            },
                            {
                                "recordBeginTime": "2023-07-11 04:33:12",
                                "recordEndTime": "2023-07-11 05:44:04",
                                "fileName": "ch0037_02010014995174200",
                                "fileSize": 1073741824
                            },
                            {
                                "recordBeginTime": "2023-07-11 05:44:04",
                                "recordEndTime": "2023-07-11 06:55:06",
                                "fileName": "ch0037_02010015055075000",
                                "fileSize": 1073741824
                            },
                            {
                                "recordBeginTime": "2023-07-11 06:55:06",
                                "recordEndTime": "2023-07-11 08:06:04",
                                "fileName": "ch0037_02010015114189600",
                                "fileSize": 1073741824
                            },
                            {
                                "recordBeginTime": "2023-07-11 08:06:04",
                                "recordEndTime": "2023-07-11 09:17:04",
                                "fileName": "ch0037_02010015174090700",
                                "fileSize": 1073741824
                            },
                            {
                                "recordBeginTime": "2023-07-11 09:17:04",
                                "recordEndTime": "2023-07-11 10:27:52",
                                "fileName": "ch0037_02010015234200000",
                                "fileSize": 1073741824
                            },
                            {
                                "recordBeginTime": "2023-07-11 10:27:52",
                                "recordEndTime": "2023-07-11 11:39:00",
                                "fileName": "ch0037_02010015295101400",
                                "fileSize": 1073741824
                            },
                            {
                                "recordBeginTime": "2023-07-11 11:39:00",
                                "recordEndTime": "2023-07-11 12:00:00",
                                "fileName": "ch0037_02010015357007400",
                                "fileSize": 1073741824
                            }
                        ], {
                            startKey: 'recordBeginTime',
                            endKey: 'recordEndTime'
                        }),
                        currentTime: formatTimestamp(Date.now()),
                        'speed-value': timeParams['speed-value'],
                        'forward-value': timeParams['forward-value']
                    }
                };
                setCurrentConfig(currentConfig);
            }, 200)
        }
    }, [timeParams]);

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
                        height: 600,
                    }}>
                    <RcMultiScreenPlayer
                        playType={'replay'}
                        defaultSelectedScreen={4}
                        events={{
                            onTimeChange: (e: any) => {
                                setTimeParams(e);
                                // onClick(e);
                                // setTimeout(()=> {
                                //     if (e.currentType === 'speed-value') {
                                //         screenRef.current.changeSpeed({'speed-value': 2});
                                //     } else if (e.currentType === 'forward-value') {
                                //         console.log(2222)
                                //         screenRef.current.fastForward({'forward-value': 60});
                                //     }
                                // }, 50)
                            },
                            onReload: (e: PlayerConfig) => {
                                console.log(111, e, screenRef.current.getCurrentTime());
                                setTimeParams({'speed-value': 1})
                            },
                            onClose: (e: PlayerConfig) => {

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