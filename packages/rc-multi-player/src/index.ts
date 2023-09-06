export type { MultiScreenPlayerProps } from "./MultiTyping";
export type { MultiPlayerComProps, MediaDataSource, Config, MultiPlayerRobustness } from "@gaopeng123/multi-player";
// 混合播放器
export { default as RcMultiPlayer } from './Player/RcMultiPlayer';
// 参数
export type { RcMultiPlayerProps, RcPlayerRef, PlayerActionConfig } from "./Player/PlayerTyping";
// 多屏播放器
export { default as RcMultiScreenPlayer } from './RcMultiScreenPlayer';
// WebRTC播放器
export { default as RcWebRTCPlayer } from './Player/WebRTCPlayer';
// flv播放器 已支持h265解码
export { default as RcFlvPlayer } from './Player/RcFlvPlayer';
// 降低时间段干扰
export { reduceTimeSlotInterference } from "@gaopeng123/video-progress-bar"
