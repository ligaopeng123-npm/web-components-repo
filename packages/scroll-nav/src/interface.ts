/**********************************************************************
 *
 * @模块名称: typings
 *
 * @模块用途: typings
 *
 * @date: 2022/2/10 16:59
 *
 * @版权所有: pgli
 *
 **********************************************************************/
/**
 * 处理react tsx中直接使用web components报错问题
 */
export type ScrollNavItem = {
    label: string,
    value: string,
}
export type ScrollNavProps = {
    items: Array<ScrollNavItem>;
    'scroll-dom'?: string; // 滚动的父级节点
    'primary-color'?: string;
    'text-color'?: string;
    'background-color'?: string;
}
