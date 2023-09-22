export type ConfigName = 'min-height';

// 简单模式为 slot比较简单 可以监听dam变化 添加过渡动画，复杂dom结构无法监听内部节点变化 获取不到高度
export type CardEllipsisMode = 'simple' | 'complex'

export type Config = {
    'min-height': string | number;
    mode?: CardEllipsisMode
}