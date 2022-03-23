# `multi-player`

> 播放器

## [media-data-source](https://github.com/xqq/mpegts.js/blob/master/docs/api.md#mediadatasource)

| 属性                                                         | 说明                                                         | 类型                                                         | 默认值 |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------ |
| type                                                         | [流媒体类型](https://github.com/xqq/mpegts.js/blob/master/docs/api.md#mediadatasource) | mse: MPEG2-TS/FLV over WebSocket<br />mpegts: MPEG2-TS over HTTP <br />m2ts: <br />flv: HTTPHTTP FLV<br />mp4 | flv    |
| isLive                                                       | 是否为直播流                                                 | boolean                                                      | true   |
| cors                                                         | 是否启用 CORS                                                | boolean                                                      | true   |
| withCredentials                                              | 是否使用cookie                                               | boolean                                                      | false  |
| hasAudio                                                     | 是否有音轨                                                   | boolean                                                      | false  |
| hasVideo                                                     | 是否有视频轨道                                               | boolean                                                      | true   |
| duration                                                     | 总媒体持续时间，以毫秒为单位                                 | number                                                       |        |
| filesize                                                     | 媒体文件的总文件大小，以字节为单位                           | number                                                       |        |
| url                                                          | 媒体 URL，可以以`'http(s)'`或者 `'ws(s)'`(WebSocket)开头     | string                                                       |        |
| [segments](https://github.com/xqq/mpegts.js/blob/master/docs/multipart.md) |                                                              | Array<MediaSegment>                                          |        |

## config

https://github.com/xqq/mpegts.js/blob/master/docs/api.md#config

## robustness

```js
type MultiPlayerRobustness = {
    bufferTime: DOMTimeStamp;     //    播放过程中缓冲器最小矫正的时间 默认为1000ms
    loopBufferTime: DOMTimeStamp; // 多场时间探测一次 默认5000ms
    maxResetTimes: number;        // 最大断线重连次数 默认为 5 次
};
```

## Events

https://github.com/xqq/mpegts.js/blob/master/docs/api.md#mpegtsevents

```typescript
import {MultiPlayerEvent} from "@gaopeng123/multi-player"

const player = document.querySelector('#player');
player.addEventListener(MultiPlayerEvent.STATISTICS_INFO, ({detail}) => {
    console.log(detail);
});
```

## Error

https://github.com/xqq/mpegts.js/blob/master/docs/api.md#mpegtserrortypes

```typescript
import {MultiPlayerError} from "@gaopeng123/multi-player"

const player = document.querySelector('#player');
player.addEventListener(MultiPlayerError.NETWORK_ERROR, ({detail}) => {
    console.log(detail);
});
```

## Usage

```ts
<multi-player
        id="player"
        media-data-source='{"url": "https://xxx/flv/xxx"}'>
</multi-player>

const player = document.querySelector('#player');
player.addEventListener(MultiPlayerError.NETWORK_ERROR, ({detail}) => {
    console.log(detail);
});
```
