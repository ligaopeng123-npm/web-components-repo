/**********************************************************************
 *
 * @模块名称: weekUtils
 *
 * @创建人: ligaoming
 *
 * @date: 2021/3/25 14:39
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import CanvasUtils from "./CanvasUtils";
import { EnumWeekState } from "./interface";
import copyImage from "./assets/copy.svg";
import {
    CopyPeriodDataInterface,
    DataMappingInterface,
    ItemsRows,
    MonitorEventsInterface,
    PeriodInterface,
    TemplateInterface,
    WeekDataInterface,
    ZrenderEvent
} from "./interface";
import { isNumber, isObject, isUndefined, throttle } from "@gaopeng123/utils";
import { initMsg } from "@gaopeng123/message";

/**
 * 一天的时间长度
 */
const oneDayTime = 86400;

const weekUtils: any = {
    __zr: null, // zrender实例
    __options: null, // 元素传递的options
    __transparentColor: 'rgba(0,0,0,0)', // 透明颜色
    __borderColor: '#e8e8e8', // boder颜色
    __textColor: '#232323', // 文字颜色
    __bg: 'rgba(0,0,0,.06)', // 背景色
    __periodColor: '#80a5ff', // 背景色
    __mouseEvent: null, // 鼠标事件集合
    __rows: [], // 保持的rows值 主要是image和rect
    __dayLen: 8, // 每天最多能添加的段数
    __dragLineX: 1, // 拖拽线离rect的距离

    msg: null,
    init(zr: any, options: any) {
        this.__zr = zr;
        this.__options = options;
        this.initOptions();
        this.initRows();
        this.initMouseEvent();
        this.initEvents();
        this.msg = initMsg(this);
        return this;
    },

    initOptions() {
        this.__gridOptions = null;
    },
    /**
     * 行格式化
     */
    initRows() {
        this.__rows = [];
    },
    /**
     * 初始化鼠标事件
     */
    initMouseEvent() {
        this.__mouseEvent = {
            index: null, // 当前出发的row
            data: new Array(7).fill([]).map(e => []), // 存储的绘制数据 并解除引用
            position: {}, // 当前移动的位置
            draggable: null, // 拖拽元素
            dragStart: {}, // 刚开始移动时 拖拽元素的位置
            dragType: '', // add 添加时拖拽  编辑时移动位置 edit 左右放大位置 left right
        };
    },

    /**
     * 事件注入
     */
    initEvents() {
        this.__zr.on('mouseup', this.drawMouseUp.bind(this));
        this.__zr.on('mousemove', this.drawMouseover.bind(this));
    },

    /**
     * 事件清理
     */
    removeEvents() {
        this.__zr.off('mouseup', this.drawMouseUp);
        this.__zr.off('mousemove', this.drawMouseover);
        this.getMousemoveRow().forEach((item: ItemsRows) => {
            item.image.off('click', this.addCopy);
            item.rect.off('mousedown', this.addPeriod);
        });
    },

    /**
     * 事管理件注册
     * @param event
     * @param collback
     */
    __enentsPool: [], // 事件池
    subscribe(event: string, subscribe: any) {
        this.__enentsPool.push({
            key: event,
            subscribe
        });
    },
    /**
     * 获取消息池
     */
    getEnentsPool() {
        return this.__enentsPool;
    },

    /**
     * 消息调度
     * @param type
     * @param events
     */
    dispatch(type: string, events: MonitorEventsInterface) {
        for (let item of this.getEnentsPool()) {
            if (item.key === type) {
                item.subscribe && item.subscribe(events);
            }
        }
    },

    /**
     * 销毁事件池
     * @param event
     * @param collback
     */
    unsubscribe(event: string, collback: any) {

    },

    /**
     * 绘制主体
     */
    drawBody() {
        // 解构参数
        const {
            left,
            right,
            top,
            bottom,
            width,
            height
        } = this.__options;
        const x = left;
        const y = top;
        const w = width - left - right;
        const h = height - top - bottom;
        const rect = CanvasUtils.Rect({
            x,
            y,
            w,
            h,
            fl: this.__transparentColor,
            sl: this.__borderColor
        });
        this.__zr.add(rect);
        return this;
    },

    /**
     * 绘制刻度
     */
    drawScale() {
        this.drawScaleX();
        this.drawScaleY();
        return this;
    },
    /**
     * 绘制y轴坐标
     */
    drawScaleY() {
        const {
            dataY,
            left,
            itemH,
            sw,
            cy,
            bw,
            cRht,
            ow,
            my,
            cTop,
            ch
        } = this.getGridOptions();


        // 绘制copy列
        this.__zr.add(CanvasUtils.Rect({
            x: cRht,
            y: cTop,
            w: ow,
            h: ch,
            fl: this.__bg,
            sl: this.__transparentColor
        }));

        dataY.forEach((item: any, index: number) => {
            this.__zr.add(CanvasUtils.Text({
                x: left + (sw - 36) / 2, // 36 文字宽度
                y: cy + itemH * index + (itemH - 12) / 2,
                text: item,
                fl: this.__textColor,
                sl: this.__borderColor,
                w: sw,
            }));
            /**
             * 绘制长方形
             */
            const rect = CanvasUtils.Rect({
                x: left,
                y: cy + itemH * index,
                w: bw,
                h: itemH,
                fl: 'none',
                sl: 'rgba(0,0,0,.02)'
            });

            // 复制image
            const image = this.drawCopyImage({
                x: cRht + ow / 2 - 12,
                y: my + itemH * index + (itemH - 24) / 2,
                opacity: 0
            });

            // 绘制线条
            this.__zr.add(rect);
            this.__zr.add(image);
            // 放到数组中去
            this.addMousemove({
                rect,
                image
            });
            // 添加点击事件
            image.on('click', this.addCopy.bind(this, index));
            rect.on('mousedown', this.addPeriod.bind(this, index));
        });
    },


    /**
     * 鼠标弹起事件
     * @param e
     */
    drawMouseUp(e: ZrenderEvent) {
        this.__mouseEvent.draggable = null;
        this.__mouseEvent.dragStart = {};
        this.__mouseEvent.dragType = '';

    },

    /**
     * 绘制copy事件
     */
    drawCopyImage({
        x,
        y,
        opacity
    }: any) {
        return CanvasUtils.Image({
            x: x, // 居中显示
            y: y,
            w: 24,
            h: 24,
            image: copyImage,
            opacity,
        });
    },

    /**
     * copy 点击函数
     * @param e
     */
    addCopy(index: number, e: ZrenderEvent) {
        this.dispatch(EnumWeekState.copyClick, {
            index: index,
            e: e
        } as MonitorEventsInterface);
    },

    /**
     * 添加时间段
     * @param index
     * @param e
     */
    addPeriod(index: number, e: ZrenderEvent) {
        if (this.checkAddPeriod(index, e)) {
            this.__mouseEvent.dragType = 'add';
            this.__mouseEvent.data[index].push(this.drawPeriod(index, e));
        }
    },

    /**
     * 根据时间选择 编辑时间段状态
     * @param value
     */
    editPeriod(value: MonitorEventsInterface) {
        const {timeRange} = value;
        const {
            period: {
                period,
                left,
                right
            }
        } = this.getCurrentOperationPeriod(value);
        const {
            x,
            width
        } = this.convertedToXY(timeRange);
        period.attr('shape', {
            x: x,
            width: width
        });
        left.attr('shape', {
            x1: x - 1,
            x2: x - 1
        });
        right.attr('shape', {
            x1: x + width + 1,
            x2: x + width + 1
        });
    },

    /**
     * 时间段删除
     * @param value
     */
    deletePeriod(value: MonitorEventsInterface) {
        // rows index
        const {
            rowIndex,
            comIndex,
            period
        } = this.getCurrentOperationPeriod(value);
        /**
         * dom删除
         */
        this.remove(period.period);
        this.remove(period.left);
        this.remove(period.right);
        /**
         * 将其从保存的数据中清除
         */
        this.__mouseEvent.data[rowIndex].splice(comIndex, 1);
    },

    /**
     * 获取当前正在操作的时间段
     * @param value
     */
    getCurrentOperationPeriod(value: MonitorEventsInterface) {
        // rows index
        const rowIndex = this.getRowIndex(value?.period?._rect?.y);
        let comIndex = 0;
        let period;
        /**
         * 遍历对应行数 扎到匹配的数据 然后将其从画布上清除
         */
        for (let item of this.__mouseEvent.data[rowIndex]) {
            if (value.period === item.period) {
                period = item;
                break;
            }
            comIndex++;
        }
        return {
            period,
            rowIndex,
            comIndex
        };
    },
    /**
     * 绘制数据
     * @param weeks
     * @param startKey
     * @param endKey
     * @param indexKey
     */
    loadWeekData({
        __data__,
        startKey,
        endKey,
        indexKey,
        periodsKey,
        periodsIndexKey
    }: WeekDataInterface) {
        // 先清理上次绘制的接口
        this.removeData();
        __data__.forEach((item: any) => {
            // addPeriod e event const {zrX, zrY} = e.event;
            const periods = item[periodsKey];
            const week = item[periodsIndexKey];

            periods.forEach((period: any) => {
                const start = period[startKey];
                const end = period[endKey];
                if (start !== end) {
                    const {
                        x,
                        width
                    } = this.convertedToXY({
                        start: period[startKey],
                        end: period[endKey]
                    });
                    this.addPeriod(week - 1, {
                        event: {
                            zrX: x,
                            zrW: width
                        }
                    });
                }
            })
        });
        this.__mouseEvent.dragType = '';
    },

    /**
     *
     * @param copyData
     */
    loadCopyData({
        sourceIndex,
        targetIndexs
    }: CopyPeriodDataInterface) {
        const data = this.getData();
        // 如果当前复制行没有数据 则不执行复制操作
        if (!data || !data[sourceIndex] && !data[sourceIndex].length) return;
        const copyPeriods = data[sourceIndex];
        targetIndexs.forEach((index: number) => {
            if (index !== sourceIndex) {
                /**
                 * 先将其他时间段清除掉
                 */
                data[index].forEach(({
                    left,
                    right,
                    period
                }: PeriodInterface) => {
                    this.remove(left);
                    this.remove(right);
                    this.remove(period);
                });
                data[index] = [];
                /**
                 * 在进行复制
                 */
                this.copyPeriod(index, copyPeriods);
            }
        })
    },

    /**
     * 复制时间段操作
     * @param index
     * @param copyPeriods
     */
    copyPeriod(index: number, copyPeriods: any[]) {
        copyPeriods.forEach(({
            left,
            right,
            period
        }: PeriodInterface) => {
            const {
                x,
                width
            } = period._rect;
            this.addPeriod(index, {
                event: {
                    zrX: x,
                    zrW: width
                }
            });
        });
        this.__mouseEvent.dragType = '';
    },

    /**
     * 画布清理
     * @param el
     */
    remove(el: any) {
        el ? this.__zr.remove(el) : this.__zr.clear()
    },

    /**
     * 清理画布
     */
    removeData() {
        this.__mouseEvent.data.forEach((item: any[]) => {
            item.forEach(({
                left,
                right,
                period
            }: PeriodInterface) => {
                this.remove(left);
                this.remove(right);
                this.remove(period);
            })
        });
        this.initMouseEvent();
    },

    /**
     * 获取数据
     */
    getData() {
        return this.__mouseEvent.data;
    },

    /**
     * 销毁
     */
    destory() {
        this.removeData();
        this.removeEvents();
    },

    /**
     * 根据index 获取当前的y和h
     * @param index
     */
    __perioditemH: 14,
    getPeriodOptByIndex(index: number) {
        const {
            cy,
            itemH
        } = this.getGridOptions();
        return {
            py: cy + itemH * index + this.__perioditemH / 2,
            ph: itemH - this.__perioditemH
        }
    },

    /**
     * 绘制时间段
     * @param index
     * @param e
     */
    drawPeriod(index: number, e: ZrenderEvent) {
        // zrW是自定义的 是传进来的宽度值
        const {
            zrX,
            zrY,
            zrW
        } = e.event;
        const {
            py,
            ph
        } = this.getPeriodOptByIndex(index);
        const period = CanvasUtils.Rect({
            x: zrX,
            y: py,
            w: zrW || 1,
            h: ph,
            fl: this.__periodColor,
            sl: this.__transparentColor,
            cursor: 'move', // move 范围太大 tip闪烁
            // zIndex: 10
        });
        const {
            left,
            right
        } = this.drawDragLine(e, {
            py,
            ph
        });
        this.__zr.add(period);

        /**
         * tip 信息处理
         */
        period.on('mouseout', this.periodMouseout.bind(this, period));
        // todo 信息及时展示 此处使用mousemove
        // period.on('mouseover', this.periodMouseover.bind(this, period));
        period.on('mousemove', throttle((e: any) => {
            this.periodMouseover(period, e);
        }, 32));
        // 添加事件 处理移动逻辑
        period.on('click', this.periodClick.bind(this, period));
        period.on('mousedown', this.changePeriod.bind(this, 'edit', period, left, right));
        left.on('mousedown', this.changePeriod.bind(this, 'left', period, left, right));
        right.on('mousedown', this.changePeriod.bind(this, 'right', period, left, right));

        // 移动过程中 需要处理的画布元素
        this.__mouseEvent.draggable = {
            period,
            left,
            right
        };
        return {
            period,
            left,
            right
        };
    },

    /**
     * 鼠标移除事件
     * @param period
     */
    periodMouseout(period: any, e: ZrenderEvent) {
        if (!this.__mouseEvent.dragType) {
            this.dispatch(EnumWeekState.periodTip, {
                period,
                state: 'hide',
                e
            } as MonitorEventsInterface);
        }
    },

    /**
     * 鼠标移入事件
     * @param period
     */
    periodMouseover(period: any, e: ZrenderEvent) {
        if (period?._rect) {
            const {
                x,
                width
            } = period._rect;
            this.dispatch(EnumWeekState.periodTip, {
                period,
                state: 'show',
                e,
                timeRange: this.convertedToTime(x, width)
            } as MonitorEventsInterface);
        }
    },

    /**
     * 时间段点击事件
     * @param period
     * @param e
     */
    periodClick(period: any, e: ZrenderEvent) {
        const {
            x,
            width
        } = period._rect;
        this.dispatch(EnumWeekState.periodClick, {
            e,
            period,
            timeRange: this.convertedToTime(x, width)
        } as MonitorEventsInterface);
    },

    /**
     * 获取可拖拽鼠标样式
     */
    drawDragLine(e: ZrenderEvent, position: any) {
        const {
            zrX,
            zrY,
            zrW
        } = e.event;
        const {
            py,
            ph
        } = position;
        const lineX = this.__dragLineX;
        const __perioditemH = this.__perioditemH / 2;
        const lineWidth = 3;
        const left = CanvasUtils.Line({
            x: zrX - lineX,
            y: py - __perioditemH,
            x1: zrX - lineX,
            y1: py + ph + __perioditemH,
            sl: this.__transparentColor,
            cursor: 'w-resize',
            lineWidth: lineWidth
        });
        const right = CanvasUtils.Line({
            x: zrX + lineX + (zrW || 0),
            y: py - __perioditemH,
            x1: zrX + lineX + (zrW || 0),
            y1: py + ph + __perioditemH,
            sl: this.__transparentColor,
            cursor: 'w-resize',
            lineWidth: lineWidth
        });
        this.__zr.add(left);
        this.__zr.add(right);
        return {
            left,
            right
        }
    },

    /**
     * 检查是否可添加
     */
    __timeout: null,
    checkAddPeriod(index: number, e: ZrenderEvent) {
        // 每天段数的长度限制
        if (this.__mouseEvent.data[index].length >= this.__dayLen) {
            clearTimeout(this.__timeout);
            this.__timeout = setTimeout(() => {
                this.msg.info(`每天最多只能添加${this.__dayLen}段!`);
            }, 10);
            return false;
        }
        /**
         * 判断是否是根据数据 赋值 复制 等操作
         */
        const {zrW} = e.event;
        if (zrW) return true;
        /**
         * 判断点击区域
         */
        const {
            cw,
            ch,
            cx,
            cy
        } = this.getGridOptions();
        const {
            zrX,
            zrY
        } = this.__mouseEvent.position;
        return !(zrX < cx || zrY < cy || zrX > cx + cw || zrY > ch + cy);
    },

    /**
     * 检查拖拽过程中的状态 看下
     * @param dragX
     */
    checkDragPeriod(_typeX: string) {
        const {
            period,
            left,
            right
        } = this.__mouseEvent.draggable || {};
        const {
            cw,
            ch,
            cx,
            cy,
            cRht,
            ow
        } = this.getGridOptions();
        const {
            x,
            width
        } = period.shape;
        const movementX = this.__mouseEvent.position.movementX;
        const {zrX} = this.__mouseEvent.position;
        let typeX = _typeX === 'x' ? x : zrX;
        // 限制typeX的最大值和最小值
        if (typeX > cRht) typeX = cRht;
        if (typeX < cx) typeX = cx;
        if (typeX + movementX < cx || (width + typeX + movementX > cRht) || typeX + movementX > cRht) {
            return typeX;
        }
        return typeX + movementX;
    },

    /**
     * 编辑时间
     */
    changePeriod(dragType: string, period: any, left: any, right: any, e: ZrenderEvent) {
        this.__mouseEvent.dragType = dragType;
        this.__mouseEvent.dragStart = {
            zrX: period.shape.x,
            zrY: period.shape.y,
            movementX: 0,
            movementY: 0,
            w: period.shape.width,
            h: period.shape.height
        };
        this.__mouseEvent.draggable = {
            period,
            left,
            right
        };
    },

    /**
     * 拖拽函数
     */
    dragPeriod() {
        const {
            period,
            left,
            right
        } = this.__mouseEvent.draggable || {};
        if (period) {
            // 左右的左边值
            let leftX;
            let rightX;
            // 左右拖拽边距离rect的距离
            const lineX = this.__dragLineX;
            switch (this.__mouseEvent.dragType) {
                case 'edit': // 移动
                    period.attr('shape', {x: this.checkDragPeriod('x')});
                    leftX = period.shape.x;
                    rightX = period.shape.x + period.shape.width;
                    left.attr('shape', {
                        x1: leftX - lineX,
                        x2: leftX - lineX
                    });
                    right.attr('shape', {
                        x1: rightX + lineX,
                        x2: rightX + lineX
                    });
                    break;
                case 'left': // 左加
                    const dragX = this.checkDragPeriod('zrX');
                    period.attr('shape', {
                        x: dragX,
                        width: right.shape.x1 - dragX - lineX
                    });
                    leftX = period.shape.x;
                    left.attr('shape', {
                        x1: leftX - lineX,
                        x2: leftX - lineX,
                    });
                    break;
                case 'right': // 右加
                    const drag = this.checkDragPeriod('zrX');
                    period.attr('shape', {width: drag - period.shape.x});
                    rightX = period.shape.x + period.shape.width;
                    right.attr('shape', {
                        x1: rightX + lineX,
                        x2: rightX + lineX
                    });
                    break;
                case 'add': // 新增
                    const zrX = this.checkDragPeriod('zrX');
                    period.attr('shape', {width: zrX - period.shape.x});
                    rightX = period.shape.x + period.shape.width;
                    right.attr('shape', {
                        x1: rightX + lineX,
                        x2: rightX + lineX
                    });
                    break;
                default: // 添加
                    break;
            }
        }
    },

    /**
     * gridOptions 缓存
     */
    __gridOptions: null,
    getGridOptions() {
        if (this.__gridOptions) return this.__gridOptions;
        const {
            left,
            right,
            top,
            bottom,
            width,
            height,
            scale: {
                y,
                x
            },
            operate
        } = this.__options;
        const sw = y.width;
        const dataY = y.data;
        const sh = x.height;
        const dataX = x.data;
        const cy = top + sh;
        const cx = left + sw;
        const cBtm = height - bottom;
        const itemH = (height - cy - bottom) / dataY.length;
        const itemW = (width - cx - right - operate.width) / (dataX.length - 1);
        this.__gridOptions = {
            // scale数据
            dataX,
            dataY,
            // body元素数据
            left,
            right,
            top,
            bottom,
            width,
            height,
            // 操作区宽度
            ow: operate.width,
            // 绘制体参数
            bTop: top,
            bLeft: left,
            bBtm: height - bottom,
            bRht: width - right,
            bw: width - left - right,
            bh: height - top - bottom,
            // 每个刻度的宽高
            itemH: itemH,
            itemW: itemW,
            // 刻度宽高
            sw,
            sh,
            // content 内容区域
            cw: width - cx - right - operate.width,
            ch: height - cy - bottom,
            cx: cx,
            cy: cy,
            cTop: top + sh,
            cBtm: cBtm,
            cRht: width - right - operate.width,
            // 鼠标mouserove事件区域
            mx: left,
            my: cy,
            mBtm: cBtm,
            mRht: width - right,
            mw: width - left - right,
            mh: itemH,
        };
        return this.__gridOptions;
    },

    /**
     * 绘制X刻度
     */
    drawScaleX() {
        const {
            dataX,
            left,
            right,
            top,
            width,
            bh,
            itemW,
            sw,
            sh,
            cy
        } = this.getGridOptions();
        // 绘制title
        this.__zr.add(CanvasUtils.Rect({
            x: left,
            y: top,
            w: width - left - right,
            h: sh,
            fl: this.__bg,
            sl: this.__transparentColor
        }));
        dataX.forEach((item: any, index: number) => {
            const ix = left + sw + index * itemW;
            // 绘制线条
            this.__zr.add(CanvasUtils.Line({
                x: ix,
                y: cy,
                x1: ix,
                y1: bh + top,
                fl: this.__borderColor,
                sl: this.__borderColor
            }));
            // 绘制时间刻度
            this.__zr.add(CanvasUtils.Text({
                x: ix,
                y: sh / 2 + top - 6,
                text: item,
                fl: this.__textColor,
                sl: this.__borderColor
            }));
        });
        return this;
    },

    /**
     * 绘制鼠标移动效果
     * @param e
     */
    getMousemoveRow(index?: number) {
        return isNumber(index) ? this.__rows[index as any] : this.__rows;
    },

    /**
     * 添加Mousemove对象
     * @param opt
     */
    addMousemove(opt: ItemsRows) {
        this.__rows.push(opt);
    },

    /**
     * 绘制鼠标移动信息
     * @param e
     */
    drawMouseover(e: ZrenderEvent) {
        const {
            zrX,
            zrY,
            movementX,
            movementY
        } = e.event;
        if (!this.__mouseEvent) return;
        // 确定位置信息
        this.__mouseEvent.position = {
            zrX,
            zrY,
            movementX,
            movementY
        };
        const {
            mx,
            my,
            mBtm,
            mRht,
        } = this.getGridOptions();
        // 判断是否在body题内
        if (zrX > mx && zrX < mRht && zrY > my && zrY < mBtm) {
            const mousemoveIndex: number = this.getRowIndex(zrY);
            if (this.__mouseEvent.index === null || this.__mouseEvent.index !== mousemoveIndex) {
                this.clearMouseHover();
                const {
                    rect,
                    image
                } = this.getMousemoveRow(mousemoveIndex) || {};
                if (rect && image) {
                    rect.attr('style', {fill: 'rgba(207,207,207,.2)'});
                    image.attr('style', {opacity: 1});
                }
            }
            this.__mouseEvent.index = mousemoveIndex;
            this.dragPeriod();
        } else {
            this.__mouseEvent.index = null;
            this.clearMouseHover();
        }
    },

    /**
     * 删除hover效果
     */
    clearMouseHover() {
        const rows = this.getMousemoveRow();
        if (rows.length) rows.forEach(({
            rect,
            image
        }: ItemsRows) => {
            rect.style.fill !== 'none' && rect.attr('style', {fill: 'none'});
            image.style.opacity !== 0 && image.attr('style', {opacity: 0});
        });
    },

    /**
     * 获取当前活动区域的值 行
     * @param zrY
     */
    getRowIndex(zrY: number) {
        const {
            cy,
            itemH
        } = this.getGridOptions();
        return Math.floor((zrY - cy) / itemH);
    },

    /**
     * 获取当前活动区域 列
     * @param zrX
     */
    getColumnIndex(zrX: number) {
        const {
            cx,
            itemW
        } = this.getGridOptions();
        return Math.floor((zrX - cx) / itemW);
    },

    /**
     * 根据宽度 获取相对应的时间
     * @param w
     */
    convertedToTime(x: number, width: number) {
        const {
            cw,
            cx
        } = this.getGridOptions();
        const carryTimmerFn = carryTimmer.init();
        const start = (x - cx) / cw * oneDayTime;
        const end = (x - cx + width) / cw * oneDayTime;
        return {
            start: carryTimmerFn.getTimmer(start < 0 ? 0 : start), // 0 是最小值
            end: carryTimmerFn.getTimmer(end >= oneDayTime ? oneDayTime - 1 : end) //oneDayTime 是最大值 最大支持23:59:59
        }
    },

    /**
     * 根据时间 转换为左边
     */
    convertedToXY({
        start,
        end
    }: any) {
        const carryTimmerFn = carryTimmer.init();
        const {
            cw,
            cx
        } = this.getGridOptions();
        const startTimestamp = carryTimmerFn.getTimestamp(start);
        const endTimestamp = carryTimmerFn.getTimestamp(end);
        return {
            x: cx + startTimestamp * cw / oneDayTime,
            width: (endTimestamp - startTimestamp) * cw / oneDayTime
        }
    },
};

/**
 * 时间转换对象
 */
export const carryTimmer = {
    /**
     * 初始化幻术
     * @param timmerType
     * @param minTime
     */
    init(timmerType?: any, minTime?: number) {
        this._timmerType = timmerType || this._timmerType;
        this._minTime = minTime || this._minTime;
        return this;
    },
    // 最小时间
    _minTime: 60,
    // 天 小时 分钟 秒
    _timmerType: [86400, 3600, 60],
    /**
     * 格式化显示时间
     * @param n
     */
    fillTimeIn(n: number) {
        return n > 9 ? n : `0${n}`;
    },

    /**
     * 将Moment类型的时间转换格式
     */
    // formateTimeByMoment(date: Moment) {
    //     return `${date.hour()}:${this.fillTimeIn(date.minute())}:${this.fillTimeIn(date.second())}`
    // },
    /**
     * 事件格式化
     * @param arr
     * @returns {string}
     */
    formateTimeByArr(arr: any[]) {
        let str = '';
        arr.forEach((item, index) => {
            // 当item有值 且 前面都不为哦0 时 次数开始添加字符串
            // 天后面不需要添加':' 号 此处做下特殊处理
            if (item !== undefined || str) {
                // (item ? `${item}天` : ``)  是否大于1天
                // this.fillTimeIn(item) 数据填充
                str += (index === 0 ? (item ? `${item}天` : ``) : `${str && index > 1 ? ':' : ''}${this.fillTimeIn(item)}`)
            }
        });
        return str
    },
    /**
     * 递归将时间转换为时间戳
     * @param timmer
     * @param index
     * @param timestamp
     */
    getTimestampFn(timmer: any[], index: number, timestamp = 0): any {
        const len = timmer.length;
        const currentIndex = len - (++index);
        if (currentIndex < 0) {
            return timestamp;
        }
        timestamp += (this._timmerType[currentIndex + 1] || 1) * parseInt(timmer[currentIndex]);
        return this.getTimestampFn(timmer, index, timestamp);
    },

    /**
     * 获取对应的秒数
     * @param timmer
     */
    getTimestamp(timmer: string) {
        return this.getTimestampFn(timmer.split(':'), 0, 0);
    },

    /**
     * 获取转换后的时间
     * @param timmer
     * @param index
     * @param strArr
     */
    getTimmer(timmer: number, index: number = 0, strArr: any[] = new Array(4).fill(0)): any {
        // 最小值
        const min = this._minTime;
        // 当大于最小值时 开始转换进度
        if (timmer >= min) {
            const type = this._timmerType[index];
            // 如果大于 等于当前值 相应位置进行储值后开启递归 否则直接下位递归
            if (timmer >= type) {
                const t = Math.floor(timmer / type);
                strArr[index] = t;
                return this.getTimmer(timmer - type * t, index + 1, strArr);
            } else {
                return this.getTimmer(timmer, index + 1, strArr);
            }
        } else {
            // 个位数补值
            strArr[strArr.length - 1] = Math.round(timmer);
            return this.formateTimeByArr(strArr);
        }
    },
};

/**
 * 弹出时间框位置计算
 * @param e
 */
export const getWeekTimeChangePosition = (e: ZrenderEvent) => {
    const {
        layerX,
        layerY
    } = e.event;
    return {
        left: layerX,
        top: layerY
    }
};
/**
 *
 * @param width
 * @param itemW
 */
export const convertedToTime = ({
    width,
    itemW
}: any) => {

};

export default weekUtils;


/**
 * 获取uuid方法 用于做唯一标识时使用
 * @param {number} len  id的长度  默认64位
 * @param {number} radix  数据基数你2 10 16等  默认62位全部正常字符
 * @returns {string}
 */
export const uuid = (len: number = 64, radix: number = 62): string => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    const uuid = [];
    let i;
    radix = radix || chars.length;

    if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
        // rfc4122, version 4 form
        let r;

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        // Fill in random data. At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }
    return uuid.join('');
};

/***
 * 深度copy
 * @param finallyObj
 * @param targetObj
 * @param sourceObj
 */
export const depthCopyFn = (finallyObj: any, targetObj: any, sourceObj: any): any => {
    for (let key in targetObj) {
        if (!finallyObj[key]) finallyObj[key] = targetObj[key];
        // 尾递归优化
        if (isObject(sourceObj[key]) && !Array.isArray(sourceObj[key])) {
            depthCopyFn(finallyObj[key], targetObj[key], sourceObj[key]);
        } else {
            finallyObj[key] = isUndefined(sourceObj[key]) ? targetObj[key] : sourceObj[key];
        }
    }
    return finallyObj;
};

/**
 * 深度copy
 * @param targetObj
 * @param sourceObj
 */
export const depthCopy = (targetObj: any, sourceObj: any): any => {
    if (isUndefined(sourceObj)) return targetObj;
    return depthCopyFn({}, targetObj, sourceObj)
};

/**
 * 判断Promise类型
 * @param obj
 */
export const isPromise = (obj: any) => {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
};
/**
 *
 * @param fn
 */
export const isAsync = (fn: any) => fn?.constructor?.name === "AsyncFunction";

/**
 * 前端将前端数据 转换为服务端需要的数据
 */
export const conversionDataToServer = (val: any[], convertedToTime: any, mapping: DataMappingInterface, scaleY: Array<string>) => {
    // 数据 默认为数组
    const data: any = [];
    val.forEach((item: any[], index: number) => {
        let someday: any;
        item.forEach(({period}: PeriodInterface, _index: number) => {
            if (!someday) someday = {
                [mapping.periodsKey]: [],
                [mapping.periodsIndexKey]: index + 1,
                name: scaleY[index]
            };
            const {
                x,
                width
            } = period._rect;
            const {
                start,
                end
            } = convertedToTime(x, width);
            someday.periods.push({
                [mapping.startKey]: start,
                [mapping.indexKey]: _index + 1,
                [mapping.endKey]: end,
            });
        });
        if (someday) data.push(someday);
    });
    // 如果数据为空 不下发 使用null做判断
    return data.length ? data : null;
};

/**
 * 判断是否是Promise
 * @param fn
 */
export const checkPromise = (fn: any) => isPromise(fn) || isAsync(fn);

/**
 * 处理提交公共逻辑
 * @param fn
 */
export const currySubmit = (fn?: any, ms: number = 200) => {
    /**
     * 副作用函数 如果函数不是Promise 则构建Promise 使状态保持一致
     * es5模式下fn会被编译成普通函数 此处不能用checkPromise直接判断
     * @param arguments1
     * @param arguments2
     */
    return (arguments1?: any, arguments2?: any) => {
        const _fn = fn(arguments1, arguments2);
        return isPromise(_fn) ? _fn : new Promise((resolve) => {
            setTimeout(() => resolve(null), ms);
        });
    };
};

/**
 * 数据清洗
 * @param data
 * @param mapping
 */
export const cleanSafeData = (data: TemplateInterface, mapping: DataMappingInterface) => {
    const obj = Object.assign({}, data);
    obj[mapping.nameKey] = obj.__name__;
    obj[mapping.templateIdKey] = obj.__templateId__;
    obj[mapping.dataKey] = obj.__data__;
    delete obj.__name__;
    delete obj.__templateId__;
    delete obj.__data__;
    return obj;
};
/**
 * 分离处理数据部分
 * @param item
 * @param mapping
 * @constructor
 */
export const safeDataEffect = (item: TemplateInterface, mapping: DataMappingInterface) => Object.assign({}, item, {
    '__name__': item[mapping.nameKey],
    '__templateId__': item[mapping.templateIdKey],
    '__data__': item[mapping.dataKey],
});
/**
 * 处理数据
 * @param data
 * @param mapping
 */
export const safeData = (data: any[], mapping: DataMappingInterface) => {
    return data?.map((item: TemplateInterface) => {
        return safeDataEffect(item, mapping);
    })
};