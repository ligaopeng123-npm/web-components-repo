/**
 * @类名: 全屏控制组件
 * @作用: 控制全屏能力
 * @作者: pgli
 */
import { debounce, formatTimestamp, getTime } from "@gaopeng123/utils";
import { addEventFactory, createTemplate, removeEventFactory, TIMELINEHEIGHT } from "./utils";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import { Mandarin } from "flatpickr/dist/l10n/zh.js"
import { wheelDeltaLevel, status, SCALE_LEVEL, DEFAULT_CURRENT_TIME } from "./typing";


export default class VideoProgressBar extends HTMLElement {
    shadow: ShadowRoot = null;
    config = {};

    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.shadow.innerHTML = createTemplate(this.config);
        this.init();
    }

    init() {
    }

    /**
     * canvas对象
     * @returns {Element | any}
     * @private
     */
    get _canvas(): HTMLCanvasElement {
        return this.shadow.querySelector('#timeline-drag-canvas');
    }

    /**
     * context 对象
     * @returns {CanvasRenderingContext2D | WebGLRenderingContext}
     * @private
     */
    get _context() {
        return this._canvas.getContext("2d");
    }

    /**
     * 时间选择框
     * @returns {Element | any}
     */
    get datetime(): any {
        return this.shadow.querySelector('#datetime');
    }

    _wheelDelta = 0;
    /**
     * 滚动倍数
     * @returns {number}
     */
    get wheelDelta() {
        // 鼠标每一次触发滚动都是150
        return this._wheelDelta;
    }

    /**
     * 根据级别设置滚轮滚动参数
     * @param v
     */
    set wheelDelta(v) {
        // 记录上一次的值 只有当前值和上一次的值 不一致时 才会触发zoom事件
        const previousWheelDelta = this.wheelDelta;
        const wheelDelta = this._wheelDelta + v;
        if (wheelDelta >= 0 && wheelDelta < Object.keys(this.__scaleLevel).length) {
            this._wheelDelta += v;
        }
        // 新 老 值变更时 触发zoom事件
        if (previousWheelDelta !== this.wheelDelta) {
            this.__dragCurrentX = this.diffZoomLevelValue;
            this.zoomStart();
            this.setLevelValue();
            this.__dragX += this.__dragCurrentX;
        }
        this.__dragCurrentX = 0;
    }

    /**
     * 开始zoom
     */
    zoomStart() {
        // 后续处理动画 优化体验
        this.draw();
    }

    /**
     * 设置时间
     */
    dragStart(status: status) {
        this.draw();
        this.setCurrentTime();
    }

    // 初始Event
    __dragStartEvent: any = null;
    // 当前拖拽距离
    __dragCurrentX = 0;
    // 拖拽总距离
    __dragX = 0;

    /**
     * 鼠标滚动事件 模拟zoom
     * @param e
     */
    _onmousewheel = debounce((e: any) => {
        this.wheelDelta = (e.wheelDelta > 0 ? 1 : -1);
    }, 200, {
        notDebounce: (e: any) => {
            // 阻止默认事件
            e.preventDefault();
            // 停止冒泡
            e.stopPropagation();
        }
    });

    layerX: any = null;

    /**
     * 鼠标按下事件
     * @param e
     */
    _onmousedown(e: any) {
        this.__dragStartEvent = e;
        if (e) this.stopMoveTime();
    }

    /**
     * 鼠标弹起事件
     * @param e
     */
    _onmouseup(e: any) {
        this.__dragStartEvent && this.setDateTime({status: 'loading'});
        /**
         * video注册的也有事件 此处要多加个判断
         */
        if (e && this.__dragStartEvent) this.moveTime();
        this.__dragStartEvent = null;
        this.__dragX += this.__dragCurrentX;
        this.__dragCurrentX = null;
        this.endTime = this.currentTime;
    }

    /**
     * 移动过程中的处理
     * @param e
     */
    _onmousemove(e: any) {
        if (this.__dragStartEvent) {
            const beginX = this.__dragStartEvent.layerX;
            const endX = e.layerX;
            this.__dragCurrentX = endX - beginX;
            this.dragStart(null);
        }
    }

    // 点击去抖时间现对短一些 加快响应
    onAddclick = debounce(() => {
        this.wheelDelta = 1;
    }, 50);
    // 点击去抖时间现对短一些 加快响应
    onDelclick = debounce(() => {
        this.wheelDelta = -1;
    }, 50);


    addEvent() {
        addEventFactory(this._canvas, 'mousewheel', this._onmousewheel.bind(this));
        addEventFactory(this._canvas, 'mousedown', this._onmousedown.bind(this));
        addEventFactory(this._canvas, 'mousemove', this._onmousemove.bind(this));
        addEventFactory(this._canvas, 'mouseout', this._onmouseup.bind(this));
        addEventFactory(this._canvas, 'mouseup', this._onmouseup.bind(this));
        addEventFactory(this.shadow.querySelector('#add'), 'click', this.onAddclick.bind(this));
        addEventFactory(this.shadow.querySelector('#del'), 'click', this.onDelclick.bind(this));
    }

    removeEvent() {
        removeEventFactory(this._canvas, 'mousewheel', this._onmousewheel);
        removeEventFactory(this._canvas, 'mousedown', this._onmousedown);
        removeEventFactory(this._canvas, 'mousemove', this._onmousemove);
        removeEventFactory(this._canvas, 'mouseout', this._onmouseup);
        removeEventFactory(this._canvas, 'mouseup', this._onmouseup);
        removeEventFactory(this.shadow.querySelector('#add'), 'click', this.onAddclick);
        removeEventFactory(this.shadow.querySelector('#del'), 'click', this.onDelclick);
    }

    afterConnectedFn() {
        this.setCanvasStyle();
        this.startTime = this.defaultCurrentTime;
        this.initFlatpickr();
        this.initialize({status: 'loading'});
        this.setLevelValue();
        this.draw();
    }

    __flatpickr: any = null;

    initFlatpickr() {
        this.__flatpickr = flatpickr(this.datetime, {
            dateFormat: "Y-m-d H:i:s",
            "locale": Mandarin,
            time_24hr: true,
            onClose: (v) => {
                this.datetime.value = v[0];
                this.onchange();
            }
        });
    }

    setFlatpickrVal(val: string) {
        if (this.__flatpickr) {
            this.__flatpickr.setDate(val);
        }
    }

    /**
     * dom结构插入后
     */
    connectedCallback() {
        this.addEvent();
        // this.addObserver();
        this.afterConnectedCallback();
    }

    /**
     * 设置canvas的样式 主要是宽高设置
     */
    afterConnectedCallback() {
        this.afterConnectedFn();
        /**
         * 避免外部注册过晚 接收不到
         */
        setTimeout(() => {
            this.sendToOutside({status: 'loading'});
        })
    }

    beforeDestroy() {
        this.stopMoveTime();
    }

    // 时间框
    get timeline(): HTMLCanvasElement {
        return this.shadow.querySelector('#timeline');
    }

    // 时间框长度
    get timelineWidth() {
        return this.timeline.offsetWidth;
    }

    /**
     * 设置canvas的样式 主要是宽高设置
     */
    setCanvasStyle() {
        this._canvas.style.width = `${this.timelineWidth}px`;
        this._canvas.style.height = `${TIMELINEHEIGHT}px`;
        this._canvas.width = this.timelineWidth;
        this._canvas.height = TIMELINEHEIGHT;
    }

    /**
     * 每个级别要显示的时长
     * @private
     */
    __scaleLevel = SCALE_LEVEL;

    /**
     * 设置点击样式
     * @param tbar
     * @param level
     * @private
     */
    _setTbarClass(tbar: HTMLElement, level: any) {
        if (this.scaleLevelN === level) {
            tbar.classList.add('disabled');
            tbar.classList.remove('tbar');
        } else {
            if (!tbar.classList.contains('tbar')) {
                tbar.classList.add('tbar');
                tbar.classList.remove('disabled');
            }
        }
    }

    /**
     * 设置级别数据
     */
    setLevelValue() {
        const add: HTMLElement = this.shadow.querySelector('#add');
        const del: HTMLElement = this.shadow.querySelector('#del');
        // 当点击到最小
        this._setTbarClass(add, '12m');
        // 当点击到最大
        this._setTbarClass(del, '24h');
        (this.shadow.querySelector('#levelValue') as HTMLElement).innerText = this.scaleLevelN;
    }

    get scaleLevelV() {
        return this.scaleLevel.v;
    }

    get scaleLevelN() {
        return this.scaleLevel.n;
    }

    get scaleLevel() {
        return this.__scaleLevel[this.wheelDelta as wheelDeltaLevel]
    }

    /**
     * zoom过程中 根据时间跨度 以及 各个等级直接的差距 动态获取当前要移动的距离
     * @returns {number}
     */
    get diffZoomLevelValue() {
        // 减去可能产生的拖拽距离__dragX
        return this.timelineWidth * (this.startTime - this.currentTime) / this.scaleLevelV - this.__dragX;
    }

    /**
     * 获取可视范围内的坐标点数据
     * @returns {{x: number, time: string}[]}
     */
    get scaleData() {
        const median = this.scale / 2;
        const itemScale = this.scaleLevelV / this.scale;
        const itemWidth = this.timelineWidth / this.scale;
        const dragX = this.__dragCurrentX + this.__dragX;
        return new Array(this.scale + 1).fill('00:00').map((item, index) => {
            return {
                time: `${formatTimestamp(this.startTime + (index - median - parseInt(`${dragX / itemWidth}`)) * itemScale, 'hh:mm')}`,
                x: index * itemWidth + (dragX || 0) % itemWidth,
            }
        });
    }

    // 拖拽开始时间
    __startTime: any = null;

    get startTime() {
        return this.__startTime;
    }

    set startTime(v) {
        this.__startTime = v;
    }

    // 拖拽结束时间
    __endTime: any = null;

    get endTime() {
        return this.__endTime;
    }

    set endTime(v) {
        this.__endTime = v;
    }

    /**
     * 增加默认值
     * @type {number}
     */
    defaultCurrentTime = DEFAULT_CURRENT_TIME;
    /**
     * 防止当前拿到错误的数据
     * @returns {*|number}
     */
    protectCurrentTime = () => {
        return this.currentTime || this.defaultCurrentTime;
    };
    // 当前时间
    __currentTime: any = null;

    get currentTime() {
        return this.__currentTime;
    }

    set currentTime(v) {
        this.__currentTime = v;
    }

    /**
     * 设置当前状态时长
     */
    setCurrentTime() {
        this.currentTime = (this.endTime || this.startTime)
            - parseInt(`${this.__dragCurrentX / this.timelineWidth * this.scaleLevelV}`);
    }

    /**
     * 快进处理
     */
    fastForward() {
        if (this.__periodsTime > 1) {
            const currentTime = this.__periodsTime * 1000 + this.protectCurrentTime();
            this.publishTimeline({
                action: 'auto', // 自动快进
                isInPeriods: this.checkCurrentTimeInPeriods(currentTime),
                timestamp: currentTime,
                date: formatTimestamp(currentTime)
            })
        }
    }

    /**
     * 消息推送
     * @param obj
     */
    publishTimeline(obj: any) {
        // this.publish('timeline', Object.assign({
        //     type: 'current',
        // }, obj))
    }

    /**
     * 向外部发送消息
     */
    sendToOutside(e: any) {
        // 当收到触发加载时 启动loading 并向外部发送消息
        if (e?.status === 'loading') {
            const currentTime = this.protectCurrentTime();
            this.publishTimeline({
                action: 'drag', // 拖拽快进
                isInPeriods: this.checkCurrentTimeInPeriods(currentTime),
                timestamp: this.protectCurrentTime(),
                date: formatTimestamp(currentTime)
            });
        }
    }

    /**
     * 用户自定义配置
     * @param data
     */
    videoOptionsSubscribe({data}: any) {
        if (data?.currentTime
            && (!this.startTime || data?.currentTime !== this.startTime)
            && data?.stream !== 'live') {
            if (data?.currentTime !== this.startTime) {
                this.reset();
            }
            this.initVideoOptions(data);
            this.draw();
        }
    }


    /**
     * 初始化视频参数
     * @param data
     */
    initVideoOptions(data: any) {
        this.__periods = data?.periods;
        this.defaultCurrentTime = data.currentTime;
        const status = data?.currentTime !== this.startTime ? {status: 'reset'} : null;
        this.startTime = data.currentTime;
        this.initialize(status);
    }

    /**
     * TODO 时间校准 将刻度保证在正点刻度 后续实现
     */
    timeCalibration = () => {
        this.__dragCurrentX = (-1000) * this.timelineWidth / this.scaleLevelV + (this.__dragCurrentX || 0);
    }

    /**
     * 窗口尺寸变化重新绘制
     */
    onResizeSubscribe() {
        // 保证缩放的倍数 数据的准确性
        this.__dragX = (this.timelineWidth / this._canvas.offsetWidth) * this.__dragX;
        this.setCanvasStyle();
        // this.draw();
    }

    /**
     * 分屏 每个小块切换时触发
     */
    onSplitScreenChangeSubscribe({
        data: {
            type,
            value,
            videoOptions
        }
    }: any) {
        this.reset();
        this.startTime = this.defaultCurrentTime;
        this.initialize(null);
        // this.draw();

        if (value) {
            this.reset();
            /**
             * 已播放时长
             * @type {*|number}
             */
            this.startTime = value?.currentPlayTime();
            this.initVideoOptions(videoOptions);
            // this.draw();
            /**
             * TODO 仅只有多屏模式下 才需要动态调整进度条
             */
            // if (this.getMultiscreen()) {
            //     this.moveTime();
            // }
        }
    }

    /**
     * 赋值输入框
     */
    setTime = (time: any) => {
        this.datetime.value = formatTimestamp(time);
        this.setFlatpickrVal(this.datetime.value);
    };

    /**
     * 初始化参数
     * @param e
     */
    initialize(e: any) {
        if (this.startTime) {
            /**
             * 如果是重置状态 当前时间默认为初始值
             */
            this.currentTime = (e?.status === 'reset' ? this.startTime : this.currentTime || this.startTime);
            /**
             * 赋值输入框
             */
            this.setTime(this.currentTime);
            // 重置后 要将状态修改下 后续需要优化下
            if (e?.status === 'reset') e.status = 'loading';
        }
    }

    /**
     * loading状态处理
     */
    loadingState = (e: any) => {
        if (e?.status === 'loading') {
            // 暂停时间
            this.stopMoveTime();
            // TODO
            // this.publish('loading', {type: true});
            // // 如果一直未响应 则5秒后移除loading
            // setTimeout(() => {
            //     this.publish('loading', {type: false});
            // }, 5000);
        }
    };

    /**
     * 给时间赋值
     * @param e
     */
    setDateTimeFn = (e: any) => {
        this.sendToOutside(e);
        /**
         * 加载loading效果 1秒后删除 增加体验
         */
        this.loadingState(e);
    };
    /**
     * 时间赋值
     */
    setDateTime = debounce((e: any) => {
        this.setDateTimeFn(e);
    }, 200, {
        notDebounce: (e: any) => {
            this.initialize(e);
        }
    });

    /**
     * 接收重置指令
     * @param data
     */
    resetSubscribe({data: {type}}: any) {
        if (type === 'timeline') {
            this.reset();
        }
    }

    /**
     * 将状态重置
     */
    reset() {
        this.stopMoveTime();
        this.__dragStartEvent = null;
        // 当前拖拽距离
        this.__dragCurrentX = 0;
        // 拖拽总距离
        this.__dragX = 0;
        this._wheelDelta = 0;
        this.currentTime = null;
        this.startTime = null;
        this.endTime = null;
        this.__periods = null;
        this.setDateTime({status: 'reset'});
        this.setLevelValue();
        // this.draw();
    }

    /**
     * 时间选择框事件
     * @param e
     */
    changeEvent = () => {
        if (this.checkDatetime()) {
            this.__dragCurrentX = (this.currentTime - new Date(this.datetime.value).getTime()) * this.timelineWidth / this.scaleLevelV;
            this.dragStart(null);
            this.initialize({status: 'loading'});
            this.setDateTimeFn({status: 'loading'});
        }
    };
    onchange = debounce((e: any) => {
        this.changeEvent();
    });
    publish = (type: any, opts: any) => {
        console.log(type, opts)
    }
    /**
     * 检查时间是否合法 不合法给提示 并不匀速下发
     */
    checkDatetime = () => {
        const time = this.datetime.value;
        if (!time) {
            this.publish('message', {
                type: 'waring',
                message: '时间不合法，请重新选择或输入！'
            });
            return false;
        }
        const timeArr = time.split('-');
        const yyyy = Number(timeArr[0]);
        if (yyyy > 9999 || yyyy < 1970) {
            this.publish('message', {
                type: 'waring',
                message: '年份必须大于1970且不超过9999，请重新选择或输入！'
            });
            return false;
        }
        return true;
    };

    /**
     * 监听暂停播放 来处理时间 当播放状态 且src存在 则处理响应逻辑
     * 否则不处理
     */
    // pseudoSubscribe({data: {type}}) {
    //     if (type === 'play') {
    //         this.getSrc() && this.moveTime();
    //     } else if (type === 'pause') {
    //         this.stopMoveTime();
    //     } else {
    //         // 无需处理
    //         console.log(`pseudo的type: ${type}`)
    //     }
    // }

    /**
     * 时间轴拖动
     * @param type
     * @param value
     */
    timelineSubscribe({
        data: {
            type,
            value
        }
    }: any) {
        if (type === 'needle') {
            switch (value) {
                case 'run':
                    this.moveTime();
                    break;
                case 'stop':
                    this.stopMoveTime();
                    break;
                //  重新拉取新数据
                case 'restart':
                    this.sendToOutside({status: 'loading'});
                    break;
                default:
                    console.log(`needle的type: ${value}`);
                    break
            }
        }
    }

    /**
     * 根据时间将时间轴推动
     */
    __pollingtimer: any = null;

    stopMoveTime() {
        this.clearPollingTime();
    }

    clearPollingTime() {
        clearInterval(this.__pollingtimer);
    }

    /**
     * 检查时间段，确认是否连续播放
     */
    checkPeriods() {
        if (this.__periods?.length) {
            const currentTime = new Date(this.currentTime).getTime();
            for (let i = 0; i < this.__periods?.length; i++) {
                const {
                    __start,
                    __end
                } = this.__periods[i];
                const __last = this.__periods[i + 1];
                if (__last && currentTime > __end && currentTime <= __last.__start) {
                    this.__periodsTime = (__last.__start - __end) / 1000;
                    break;
                }
            }
        }
    }

    /**
     * 确定当前拖拽的时间 是否在有流数据上
     */
    checkCurrentTimeInPeriods(time: any) {
        if (this.__periods?.length) {
            for (let i = 0; i < this.__periods?.length; i++) {
                const {
                    __start,
                    __end
                } = this.__periods[i];
                if (time >= __start && time <= __end) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * 时间段跳跃时间
     * @type {number}
     * @private
     */
    __periodsTime = 1;

    /**
     * 播放绘制
     */
    pollingTimeRun() {
        this.__pollingtimer = setInterval(() => {
            /**
             * 模拟鼠标事件 基于鼠标事件处理相对应的逻辑
             * @type {number}
             * @private
             */
            this._onmousedown(null);
            this.checkPeriods();
            this.fastForward();
            this.__dragCurrentX = this.__periodsTime * (-1000) * this.timelineWidth / this.scaleLevelV + (this.__dragCurrentX || 0);
            // 用完销毁
            this.__periodsTime = 1;
            this.dragStart(null);
            if (this.datetime._mouseState !== 'focus') {
                this.setDateTime({status: 'polling'});
            }
            this._onmouseup(null);
        }, 1000);
    }

    /**
     * 根据播放时间轮询开始
     */
    moveTime() {
        this.clearPollingTime();
        /**
         * TODO 只有回放有时间进度
         */
        // if (this.getIsReplay() && this.getSrc()) {
        //     this.pollingTimeRun();
        // }
    }

    /**
     * 绘制入口
     */
    draw() {
        this.clearCanvas();
        this.drawScale();
        this.drawDispatch();
        this.drawSchedule();
    }

    /**
     * 清除画布
     */
    clearCanvas() {
        this._context.clearRect(0, 0, this.timelineWidth, TIMELINEHEIGHT);
    }

    /**
     * 绘制线
     */
    drawLine(x: number, y: number, x1: number, y1: number, sl: string, lw = 1) {
        this._context.save();
        this._context.beginPath();
        this._context.moveTo(x, y);
        this._context.lineTo(x1, y1);
        this._context.strokeStyle = sl;
        this._context.lineWidth = lw;
        this._context.stroke();
        this._context.closePath();
        this._context.restore();
    }

    /**
     * 绘制文字
     */
    drawText(text: string, x: number, y: number, fl: any, ft = 12, mw = 20) {
        this._context.save();
        this._context.textAlign = `center`;
        this._context.font = `${ft}px Arial`;
        this._context.fillStyle = fl;
        this._context.fillText(text, x, y, 24);
        this._context.restore();
    }

    /**
     * 刻度值
     * @type {number}
     */
    scale = 12;

    /**
     *  绘制刻度
     */
    drawScale() {
        this.drawLine(0, 0, this.timelineWidth, 0, '#f7ff2f');
        this.scaleData.forEach(({
            time,
            x
        }, index) => {
            const y = 9;
            this.drawLine(x, 0, x, y, '#fffdd9');
            this.drawText(time, x, y + 12, '#ffffff');
        });
    }

    /**
     * 绘制调度值
     */
    drawDispatch() {
        const w = this.timelineWidth / 2;
        const y = 2;
        const z = 4;
        const color = '#2bff3c';
        const lineWidth = 2;
        this.drawLine(w, y, w, this._canvas.offsetHeight, color, lineWidth);
        this.drawLine(w, y, w + z, z * 2, color, lineWidth);
        this.drawLine(w, y, w - z, z * 2, color, lineWidth);
    }

    /**
     * 绘制有视频区域
     */
    drawSchedule() {
        if (this.__periods !== null) {
            this.scheduleData?.forEach((item: any) => {
                this.drawSingleSchedule(item);
            });
        } else {
            // 130 65是右边操作区域的宽度
            this.drawSingleSchedule({
                x: 65,
                w: this.timelineWidth - 130
            });
        }
    }

    /**
     * 绘制单条数据
     * @param w
     * @param x
     */
    drawSingleSchedule({
        w,
        x
    }: any) {
        this._context.save();
        this._context.fillStyle = 'rgba(174,218,255,.7)';
        this._context.fillRect(x, 22, w, 15);
        this._context.restore();
    }

    /**
     * 时间段数据
     * @type {null}
     * @private
     */
    __periods: Array<any> = null;

    /**
     * 根据数据获取有流区域
     */
    get scheduleData() {
        const __periods: any = [];
        this.__periods?.forEach((item: any) => {
            const _startTime = getTime(item.startTime);
            const _endTime = getTime(item.endTime);
            __periods.push(Object.assign({
                _startTime,
                _endTime
            }, this.getSingleScheduleData(_startTime, _endTime), item))
        });
        return __periods;
    }

    /**
     * 获取单个时间区域内的数据
     * @param startTime
     * @param endTime
     */
    getSingleScheduleData = (startTime: any, endTime: any) => {
        /**
         * 每毫秒的距离
         * @type {number}
         */
        const millisecondDistance = this.timelineWidth / this.scaleLevelV;
        /**
         * 长度
         * @type {number}
         */
        const w = (endTime - startTime) * millisecondDistance;
        /**
         * 起始点
         */
        const x = this.timelineWidth / 2 - (this.currentTime - startTime) * millisecondDistance;
        return {
            w,
            x
        };
    }
}

if (!customElements.get('video-progress-bar')) {
    customElements.define('video-progress-bar', VideoProgressBar);
}