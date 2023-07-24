/**********************************************************************
 *
 * @模块名称: interface
 *
 * @模块作用: interface
 *
 * @创建人: pgli
 *
 * @date: 2023/7/15 10:16 上午
 *
 * @版权所有: pgli
 *
 **********************************************************************/

/**
 * 支持的参数
 */
export enum EnumWeekState {
    panelOptions = 'panelOptions', // 配置参数
    fieldNames = 'fieldNames', // fieldNames配置
    periodClick = 'periodClick', // 时间段点击
    periodDelete = 'periodDelete', // 时间段删除
    periodEdit = 'periodEdit', // 时间段根据时间选择框 进行修改
    periodTip = 'periodTip', // tip信息处理
    copyClick = 'copyClick', // 点击复制按钮
    copyObject = 'copyObject', // 复制的对象 主要 sourceIndex  targetIndexs
    clearClick = 'clearClick', // 点击清空按钮
}


import { ReactNode } from "react";


/**
 * 模板数据结构
 *  name?: string
 timeTemplateId?: number
 data?: any
 weeks?: any // 后期删除
 */
export interface TemplateInterface {
    // 名称
    __name__?: string;
    /**
     * templateId 类型
     */
    __templateId__?: string;
    /**
     * 保存的数据
     */
    __data__?: any[];

    /**
     * 多余元素
     */
    [propName: string]: any;
}

export interface PeriodItemDate {
    /**
     * 多余元素
     */
    [propName: string]: any;
}

/**
 * 数据映射
 */
export interface TemplateMapInterface {
    startKey: string;
    endKey: string;
    indexKey: string;
    /**
     * 时间段的key
     */
    periodsKey: string;
    /**
     * 时间段index的key
     */
    periodsIndexKey: string;
}

/**
 * 模板数据格式
 */
export interface WeekDataInterface extends TemplateInterface, TemplateMapInterface {
    /**
     * 保存的数据
     */
    __data__: any[];
}

/**
 * 刻度接口
 */
export interface scaleXInterface {
    height?: number,
    data?: any[]
}

export interface scaleYInterface {
    width?: number,
    data?: any[]
}

export interface scaleInterface {
    y?: scaleYInterface,
    x?: scaleXInterface
}

/**
 * 操作列接口
 */
export interface operateInterface {
    width?: number
}


/**
 * canvas 宽高样式
 */
export interface CanvasInterface {
    // 宽高
    height?: string | number;
    width?: string | number;
    // 上下左右
    left?: string | number;
    right?: string | number;
    top?: string | number;
    bottom?: string | number;
    // 刻度信息
    scale?: scaleInterface;
    // 操作列信息
    operate?: operateInterface;
    // 清空按钮 同时控制着 是否可操作
    cleared?: boolean;
    legend?: LegendInterface;
}

/**
 * WeekPanel的参数
 */
export interface WeekPanelPropsInterface {
    store?: any;
    dispatch?: any;
    panelOptions?: CanvasInterface, //canvas画布参数
    data?: Array<PeriodItemDate>, // 时间模板参数
    ref?: any // 实例对象
}


/**
 * 鼠标移动过程中需要的参数
 */
export interface ItemsRows {
    rect: any,
    image: any,
}

/**
 *
 */
export interface MouseEvent {
    index: null, // 当前出发的row
    rows: any[], // 保持的riws值 主要是image和rect
    data: any[], // 存储的绘制数据
    position: {
        zrX: number,
        zrY: number
    }, // 当前移动的位置
}

/**
 * zrender事件
 */
export interface ZrenderEvent {
    event?: Event | any, // 事件属性
}

/**
 * 时间段包含内容
 */
export interface PeriodInterface {
    period: any,
    left?: any,
    right?: any,
}

/**
 * tip 信息数据接口
 */
export interface PeriodTipInterface extends PeriodInterface {
    state: 'show' | 'hide' // 显示和隐藏
}

/**
 * 发送事件
 */
export interface MonitorEventsInterface {
    e?: ZrenderEvent,
    index?: number, // 数组下标
    period?: any, // 时间段render对象 用于删除等操作
    timeRange?: any, // 时间段 字符串 用户联动
}

/**
 * 开始时间 接收时间
 */
export interface TimeRangeInterface {
    start: null | string | any,
    end: null | string | any,
}

/**
 * 容器属性
 */
export interface PositionModalInterface {
    top?: number;
    left?: number;
}

export type PositionModalProps=  {
    title?: string | ReactNode,
    monitor?: MonitorEventsInterface,
    cancelText?: string,
    okText?: string,
    onConfirm?: (e: MouseEvent)=> void,
    onCancel?: ()=> void,
    modalKey?: string,
}

/**
 * 复制数据
 */
export interface CopyPeriodDataInterface {
    sourceIndex: number,
    targetIndexs: any[]
}

/**
 * 图例配置
 */
export interface LegendInterface {
    name?: string,
    color?: string,
}

/**
 * 菜单点击接口
 */
interface MenuClickHandle {
    (template: TemplateInterface): Promise<TemplateInterface> | void;
}

/**
 * 提交类型
 */
export declare type SubmitHandleType =
    'add'
    | 'edit';
/**
 * 记录类型
 */
export declare type LastAction =
    'first'
    | 'last'
    | string;

/**
 * 提交钩子函数
 */
interface SubmitHandle {
    (template: TemplateInterface, type: SubmitHandleType): Promise<boolean> | void;
}

/**
 * 提交钩子函数
 */
interface DeleteHandle {
    (template: TemplateInterface): Promise<boolean> | void;
}

/**
 * 菜单点击接口
 */
interface MenuRender {
    (template: TemplateInterface): ReactNode;
}

/**
 * 映射参数类型
 */
export interface DataMappingInterface extends TemplateMapInterface {
    nameKey: string
    templateIdKey: string
    dataKey: string
}

/**
 * 数据格式要求
 */
interface DataInterface {
    [index: number]: TemplateInterface
}

/**
 * 定义Panel的参数类型
 */
export interface TimePeriodModuleProps {
    /**
     * zrender路径
     */
    zrender?: string;
    /**
     * 时间面板参数
     */
    panelOptions?: CanvasInterface
    /**
     * 图例
     */
    legend?: LegendInterface
    /**
     * 预留钩子
     */
    periodRef?: any
    /**
     * 模板数据
     */
    template?: TemplateInterface
    /**
     * tree数据
     */
    data: Array<PeriodItemDate>
    /**
     * 操作列
     */
    toolbars?: any
    /**
     * 数据映射
     */
    fieldNames?: DataMappingInterface
    /**
     * 是否可编辑
     */
    editable?: boolean
    /**
     * loading状态
     */
    loading?: boolean
    /**
     * 帮助信息
     */
    helpInfo?: string | ReactNode
    /**
     * 渲染菜单
     */
    menuRender?: MenuRender
    /**
     * 点击menus时的回调处理
     */
    menuClickHandle?: MenuClickHandle
    /**
     * 提交任务
     */
    submitHandle?: SubmitHandle
    /**
     * 提交任务
     */
    deleteHandle?: DeleteHandle
}

/**
 * TimePeriod组件参数
 */
export interface TimePeriodProps {
    zrender?: string;
    periodRef?: any
    template?: any
    panelOptions?: CanvasInterface
    mapping?: DataMappingInterface
}

/**
 * 默认参数
 */
export const TimePeriodModuleDefaultProps: TimePeriodModuleProps = {
    panelOptions: {
        width: 850,
        height: 330,
        left: 30,
        right: 30,
        top: 50,
        bottom: 30,
        scale: {
            y: {
                width: 80,
                data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
            },
            x: {
                height: 28,
                data: ['00', '02', '04', '06', '08', '10', '12', '14', '16', '18', '20', '22', '24']
            }
        },
        operate: {
            width: 50
        },
        cleared: false, // 清空按钮
        legend: {
            name: '布放时间',
            color: `#80a5ff`
        }
    },
    toolbars: [],
    // helpInfo: '全天候模板、工作日模板及周末模板为默认模板，不允许被修改。',
    helpInfo: '帮助信息',
    menuClickHandle: () => {
    },
    /**
     * 映射数据
     */
    fieldNames: {
        nameKey: 'name',
        templateIdKey: 'timeTemplateId',
        dataKey: 'weeks',
        startKey: 'startAt', // 开始时间
        endKey: 'endAt', // 结束时间
        indexKey: 'period', // 第几段数据
        periodsKey: 'periods', // 时间段存储的数据
        periodsIndexKey: 'week' // 时间段的key  例如 周一 周二
    },
    editable: false,
    loading: false,
    submitHandle: () => {
    },
    data: []
};