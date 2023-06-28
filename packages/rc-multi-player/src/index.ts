export type { MultiPlayerComProps, MediaDataSource, Config, MultiPlayerRobustness } from "@gaopeng123/multi-player";
// 混合播放器
export { default as RcMultiPlayer } from './Player/MultiPlayer';
// 多屏播放器
export { default as RcMultiScreenPlayer } from './MultiScreenPlayer';
// WebRTC播放器
export { default as RcWebRTCPlayer } from './Player/WebRTCPlayer';
// flv播放器 后续支持h265解码
export { default as RcFlvPlayer } from './Player/FlvPlayer';
