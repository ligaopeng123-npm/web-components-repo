# 播放器组件

## 基础属性

| 属性            | 说明                                                         | 类型                                                         | 默认值 |
| --------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------ |
| objectFit       | 视频填充                                                     | 'fill' \| 'contain ' \| 'cover' \| 'scale-down' \| 'none ' \| 'initial ' \| 'inherit' | fill   |
| mediaDataSource | [视频属性](https://github.com/xqq/mpegts.js/blob/master/docs/api.md#mediadatasource) |                                                              |        |
| robustness      | 容错配置                                                     | {     <br />//  播放过程中缓冲器最小矫正的时间 默认为1000ms   <br />bufferTime: DOMHighResTimeStamp;    <br />// 多场时间探测一次 默认5000ms<br />   loopBufferTime: DOMHighResTimeStamp; <br />  // 最大断线重连次数 默认为 5 次 <br />  maxResetTimes: number;        <br />}; |        |
| extraParams     | 额外的参数配置                                               | {}                                                           | any    |
| events          | 事件订阅                                                     | {     <br />// 视频播放开始     <br />onLoadStart?: (playerConfig?: PlayerConfig) => void;     <br />// 点击视频重新加载    <br /> onReload?: (playerConfig?: PlayerConfig) => void;     <br />// 加载错误     <br />onLoadError?: (playerConfig?: PlayerConfig) => void;     <br />// 流加载结束    <br /> onLoadEnd?: (playerConfig?: PlayerConfig)=> void;     <br />// 最大重试次数    <br /> onMaxReload?: (playerConfig?: PlayerConfig) => void;    <br /> // 视频结束     <br />onClose?: (playerConfig?: PlayerConfig) => void; <br />}<br />// 回放视频变更事件     <br />onTimeChange?: (playerConfig?: PlayerConfig) => void; <br />} |        |
| width           | 视频宽度                                                     | string ｜number                                              | 100%   |
| height          | 视频高度                                                     | string ｜number                                              | 100%   |



## RcFlvPlayer

> flv播放器，依赖@gaopeng123/multi-player

### Usage

```tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {RcMultiPlayer} from "../src";
import {useEffect, useState} from "react";

const App = () => {
    const [mediaDataSource, setMediaDataSource] = useState<any>({});

    useEffect(() => {
        setTimeout(() => {
            setMediaDataSource({url: 'https://xxx/flv/xxx'})
        }, 2000);
    }, [])
    return (
        <RcMultiPlayer
            mediaDataSource={mediaDataSource}
        />
    );
};

ReactDOM.render(<App/>, document.getElementById('root'));

```

## RcWebRTCPlayer

`WebRTC 播放器`

### Usage

```tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {RcWebRTCPlayer} from "../src";
import {useEffect, useState} from "react";

const App = () => {
    const [mediaDataSource, setMediaDataSource] = useState<any>({});

    useEffect(() => {
        setTimeout(() => {
            setMediaDataSource({url: 'https://xxx/flv/xxx'})
        }, 2000);
    }, [])
    return (
        <RcWebRTCPlayer
            mediaDataSource={mediaDataSource}
        />
    );
};

ReactDOM.render(<App/>, document.getElementById('root'));
```

## RcMultiPlayer

`混合播放器，双协议`

| 属性          | 说明                         | 类型                          | 默认值  |
| ------------- | ---------------------------- | ----------------------------- | ------- |
| protocol      | 协议类型                     | 'FLV' \| 'WebRTC'             | FLV     |
| title         | 视频左上角展示内容           | string \| ReactNode           | null    |
| className     | 样式                         |                               |         |
| maxPlayerTime | 最大播放时长，超出后自动关闭 | "3min" \| '5min' \| 'forever' | forever |

### Usage

```tsx
import React from 'react';
import MultiPlayer from "./MultiPlayer";
import styles from '../styles.module.less';
import { LayoutPlayerProps, PlayerConfig, } from "./PlayerTyping";
import { MultiStoreEnum } from "../MultiTyping";

const LayoutPlayer: React.FC<LayoutPlayerProps> = (props) => {
    const { layoutIndex, playerConfig, selected, mediaDataSource, dispatch, events, state } = props;
    const onClose = () => {
        dispatch({
            index: layoutIndex,
            value: null
        })
    }

    const playerEvents = Object.assign({}, events, {
        onClose: (playerConfig: PlayerConfig) => {
            onClose();
            if (events?.onClose) {
                events?.onClose(Object.assign({}, playerConfig, { layoutIndex }));
            }
        },
        onReload: (playerConfig: PlayerConfig) => {
            if (events?.onReload) {
                events?.onReload(Object.assign({}, playerConfig, { layoutIndex }));
            }
        },
        onMaxReload: (playerConfig: PlayerConfig) => {
            if (events?.onMaxReload) {
                events?.onMaxReload(Object.assign({}, playerConfig, { layoutIndex }));
            }
        }
    });

    const screenConfig = state[MultiStoreEnum.screenConfig];

    const { maxPlayerTime } = screenConfig;

    return (
        <MultiPlayer
            maxPlayerTime={maxPlayerTime}
            events={playerEvents}
            mediaDataSource={mediaDataSource}
            protocol={playerConfig?.protocol}
            extraParams={playerConfig?.extraParams}
            title={playerConfig?.title}
            className={selected ? styles.selected : styles.player}
        />
    )
};

export default LayoutPlayer;
```



## RcMultiScreenPlayer

`多屏播放器`

| 属性                  | 说明                             | 类型                                                         | 默认值                                                       |
| --------------------- | -------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| className             | 样式                             |                                                              |                                                              |
| defaultSelectedScreen | 默认分配数量                     | 1 \| 4 \| 6 \| 8 \| 9 \| 12 \| 13 \| 16;                     | 4                                                            |
| defaultPlayerConfig   | 视频播放基础属性                 | {     <br />// 协议类型     <br />protocol?: Protocol \| false \| {         <br />defaultValue: Protocol,        <br /> options: Array<PlayerConfigOptions>    <br /> },     <br />// 视频拉伸方式     <br />objectFit?: ObjectFit \| false \| {       <br />  defaultValue: ObjectFit,         <br />options: Array<PlayerConfigOptions>    <br /> };     <br />// 是否播放时长     <br />maxPlayerTime?: MaxPlayerTime \| false \| {         <br />defaultValue: MaxPlayerTime,        <br /> options: Array<PlayerConfigOptions>     <br />},     <br />// 视频分辨率    <br /> resolution?: Resolution \| false \| {         <br />defaultValue: Resolution,         <br />options: Array<PlayerConfigOptions>   <br />  } <br />} | {<br />protocol: 'FLV',<br /><br />maxPlayerTime: 'forever'<br /><br />objectFit: 'fill'<br /><br />resolution: '720P'<br />} |
| currentConfig         | player基础属性+RcMultiPlayer属性 |                                                              |                                                              |
| id                    | 标识                             | string                                                       | multi-screen-player                                          |
| events                | 事件订阅                         | 基础属性events                                               |                                                              |

### Usage

```tsx
import * as React from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { RcMultiScreenPlayer } from "../src";
import Snackbar from "@mui/material/Snackbar";
import { useRef } from "react";

type RcMultiScreenPlayerTestProps = {};
const RcMultiScreenPlayerTest: React.FC<RcMultiScreenPlayerTestProps> = (props) => {
    const [protocol, setProtocol] = React.useState<any>('FLV');
    const [open, setOpen] = React.useState(false);
    const [currentConfig, setCurrentConfig] = React.useState<any>();
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
                mediaDataSource: { url: url, type: 'flv', },
                playerConfig: { protocol: protocol, title: title, extraParams: { test: 1 }, layoutIndex: '0' }
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
                            <TextField defaultValue={'title'} id="outlined-title" label="视频title"
                                       variant="outlined"/>
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
                                onClick(e);
                            },
                            onClose: (e) => {
                                console.log(222, e);
                            }
                        }}
                        defaultPlayerConfig={{
                            protocol: false,
                            maxPlayerTime: {
                                defaultValue: '3min',
                                options: [{
                                    label: '3分钟',
                                    value: '3min'
                                }]
                            },
                            objectFit: 'cover'
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
```

