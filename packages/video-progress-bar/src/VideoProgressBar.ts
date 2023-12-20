/**
 * @类名: 全屏控制组件
 * @作用: 回放按钮开发
 * @作者: pgli
 */
import { debounce, formatTimestamp, getTime, isMobile, toFixed } from "@gaopeng123/utils";
import { addEventFactory, createTemplate, removeEventFactory } from "./utils";
import {
    wheelDeltaLevel,
    status,
    SCALE_LEVEL,
    DEFAULT_CURRENT_TIME,
    VideoOptions,
    VideoProgressBarConfig
} from "./typing";
import ActiveTime from "./ActiveTime";


export default class VideoProgressBar extends HTMLElement {
    shadow: ShadowRoot = null;
    config: VideoProgressBarConfig = {
        'scale-level': 0,
        'hide-fast': false,
        'hide-speed': false,
        'hide-time': false,
        'height': 60
    };

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
    }

    /**
     * 暴露哪些属性可以被监听
     * @returns {string[]}
     */
    // @ts-ignore
    static get observedAttributes() {
        return [
            'scale-level',
            'hide-fast',
            'hide-speed',
            'hide-time',
            'height'
        ];
    }

    /**
     * 当自定义元素的一个属性被增加、移除或更改时被调用。
     * 需要setAttribute 才能被触发
     */
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue !== newValue) {
            if (name === 'scale-level') {
                this._wheelDelta = +newValue;
            } else {
                // @ts-ignore
                this.config[name] = newValue;
            }
        }
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
    get datetime(): ActiveTime {
        return this.shadow.querySelector('video-progress-bar-active-time');
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
        if (e) this.stop();
    }

    /**
     * 鼠标弹起事件
     * @param e
     */
    _onmouseup(e: any) {
        this.__dragStartEvent && this.setDateTime({ status: 'loading' });
        /**
         * video注册的也有事件 此处要多加个判断
         */
        if (e && this.__dragStartEvent) this.start();
        this.__dragStartEvent = null;
        this.__dragX += this.__dragCurrentX;
        this.__dragCurrentX = null;
        this.endTime = this.currentTime;
        this.datetime?.canClick();
    }

    /**
     * 移动过程中的处理
     * @param e
     */
    _onmousemove(e: any) {
        if (this.__dragStartEvent) {
            const beginX = isMobile() ? this.__dragStartEvent.touches[0].clientX : this.__dragStartEvent.offsetX;
            const endX = isMobile() ? e.touches[0].clientX : e.offsetX;
            // 当前的推拽长度
            const currentDragX = endX - beginX;
            const minTime = this.__minTime ? getTime(this.__minTime) : 0;
            const maxTime = this.__maxTime ? getTime(this.__maxTime) : Number.MAX_VALUE;
            const changeTime = (this.endTime || this.startTime) - this.dragXToTime(currentDragX);
            if (changeTime >= minTime && changeTime <= maxTime) {
                this.__dragCurrentX = currentDragX;
                this.dragStart(null);
                this.datetime?.canNotClick();
            } else {
                if (changeTime < minTime) {
                    this.__dragCurrentX = this.timeToDragX(this.endTime - minTime);
                    this.dragStart(null);
                    this.datetime?.canNotClick();
                }
                if (changeTime > maxTime) {
                    this.__dragCurrentX = this.timeToDragX(this.endTime - maxTime, true);
                    this.dragStart(null);
                    this.datetime?.canNotClick();
                }
            }
        }
    }

    /**
     * 如果设置最小值来 则拖拽需要做限制
     */
    getTimeFormDrag() {

    }

    // 点击去抖时间现对短一些 加快响应
    onAddClick = debounce(() => {
        this.wheelDelta = 1;
    }, 50);

    // 点击去抖时间现对短一些 加快响应
    onDelClick = debounce(() => {
        this.wheelDelta = -1;
    }, 50);

    addEvent() {
        addEventFactory(this._canvas, 'mousewheel', this._onmousewheel.bind(this));
        addEventFactory(this._canvas, isMobile() ? 'touchstart' : 'mousedown', this._onmousedown.bind(this));
        addEventFactory(this._canvas, isMobile() ? 'touchmove' : 'mousemove', this._onmousemove.bind(this));
        addEventFactory(this._canvas, isMobile() ? 'touchleave' : 'mouseout', this._onmouseup.bind(this));
        addEventFactory(this._canvas, isMobile() ? 'touchend' : 'mouseup', this._onmouseup.bind(this));
        addEventFactory(this.shadow.querySelector('#add'), 'click', this.onAddClick.bind(this));
        addEventFactory(this.shadow.querySelector('#del'), 'click', this.onDelClick.bind(this));
        addEventFactory(this.datetime, 'change', this.onchange.bind(this));
        addEventFactory(this.timeline, 'resize', this.onResizeSubscribe.bind(this));
    }

    removeEvent() {
        removeEventFactory(this._canvas, 'mousewheel', this._onmousewheel);
        removeEventFactory(this._canvas, isMobile() ? 'touchstart' : 'mousedown', this._onmousedown);
        removeEventFactory(this._canvas, isMobile() ? 'touchmove' : 'mousemove', this._onmousemove);
        removeEventFactory(this._canvas, isMobile() ? 'touchleave' : 'mouseout', this._onmouseup);
        removeEventFactory(this._canvas, isMobile() ? 'touchend' : 'mouseup', this._onmouseup);
        removeEventFactory(this.shadow.querySelector('#add'), 'click', this.onAddClick);
        removeEventFactory(this.shadow.querySelector('#del'), 'click', this.onDelClick);
        removeEventFactory(this.datetime, 'change', this.onchange.bind(this));
        removeEventFactory(this.timeline, 'resize', this.onResizeSubscribe.bind(this));
    }

    afterConnectedFn() {
        this.setCanvasStyle();
        this.startTime = this.defaultCurrentTime;
        this.initialize({ status: 'loading' });
        this.setLevelValue();
        this.draw();
    }

    /**
     * dom结构插入后
     */
    connectedCallback() {
        this.shadow.innerHTML = createTemplate(this.config);
        this.init();
        this.addEvent();
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
            this.sendToOutside({ status: 'loading' });
        })
    }

    /**
     * 移除文档流
     */
    disconnectedCallback() {
        this.stop();
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
        this._canvas.style.height = `${this.timeline.offsetHeight}px`;
        this._canvas.width = this.timelineWidth;
        this._canvas.height = this.timeline.offsetHeight;
        // @ts-ignore
        this.shadow.querySelector('.active').style['padding-top'] = `${this.timeline.offsetHeight - 22}px`;
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
    _setTBarClass(tbar: HTMLElement, level: any) {
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
        const levelValue: HTMLElement = this.shadow.querySelector('#levelValue');
        // 当点击到最小
        this._setTBarClass(add, '12m');
        // 当点击到最大
        this._setTBarClass(del, '24h');
        levelValue.innerText = this.scaleLevelN;
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
                time: `${formatTimestamp(this.startTime + (index - median - parseInt(`${dragX / itemWidth}`)) * itemScale, 'HH:mm')}`,
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
        this.currentTime = this.getCurrentTime();
    }

    /**
     * 获取当前拖拽时长
     */
    getCurrentTime() {
        return (this.endTime || this.startTime) - parseInt(`${this.__dragCurrentX / this.timelineWidth * this.scaleLevelV}`);
    }

    /**
     * 拖拽转换成时间戳
     * @param dragx
     */
    dragXToTime(dragx: number) {
        return parseInt(`${dragx / this.timelineWidth * this.scaleLevelV}`);
    }

    /**
     * 时间戳转推拽宽度
     * @param time
     */
    timeToDragX(time: number, isNumber?: boolean) {
        const v = `${time / this.scaleLevelV * this.timelineWidth}`;
        return toFixed(Number(v), 2);
    }

    /**
     * 快进处理
     */
    // fastForward() {
    //     if (this.__periodsTime > 1) {
    //         const currentTime = this.__periodsTime * 1000 + this.protectCurrentTime();
    //         this.publishTimeline({
    //             action: 'auto', // 自动快进
    //             isInPeriods: this.checkCurrentTimeInPeriods(currentTime),
    //             timestamp: currentTime,
    //             date: formatTimestamp(currentTime),
    //             'speed-value': this.datetime.speed
    //         })
    //     }
    // }

    /**
     * 消息推送
     * @param obj
     */
    publishTimeline(obj: any) {
        this.dispatchEvent(new CustomEvent('timeChange', {
            detail: obj
        }));
    }

    /**
     * 向外部发送消息
     */
    sendToOutside(e: any, value?: any) {
        // 当收到触发加载时 启动loading 并向外部发送消息
        if (e?.status === 'loading' || e?.status === 'polling') {
            const currentTime = this.protectCurrentTime();
            this.publishTimeline(Object.assign({
                action: e?.status === 'polling' ? 'polling' : 'drag', // 拖拽快进
                isInPeriods: this.checkCurrentTimeInPeriods(currentTime),
                timestamp: currentTime,
                date: formatTimestamp(currentTime),
                'speed-value': this.datetime?.speed
            }, value));
        }
    }

    /**
     * 用户自定义配置
     * @param data
     */
    drawData = (data: VideoOptions) => {
        this.initVideoOptions({
            periods: data.periods || [],
            currentTime: getTime(data.currentTime || DEFAULT_CURRENT_TIME),
            minTime: data.minTime,
            maxTime: data.maxTime
        });
        this.draw();
        this.start();
    }

    /**
     * 倍速播放
     * @param data
     */
    changeSpeed = (data: VideoOptions) => {
        this.__intervalSpeed = data['speed-value'] ? Number(data['speed-value']) : this.__intervalSpeed;
        this.start();
    }

    /**
     * 快进处理
     * @param data
     */
    fastForward = (data: VideoOptions) => {
        const forwardValue = data['forward-value'] ? Number(data['forward-value']) : 0;
        if (forwardValue) {
            this.__periodsTime = forwardValue;
            this.start();
        }
    }

    /**
     * 初始化视频参数
     * @param data
     */
    initVideoOptions(data: VideoOptions) {
        this.__periods = data?.periods;
        this.__minTime = data?.minTime;
        this.__maxTime = data?.maxTime;
        this.defaultCurrentTime = getTime(data.currentTime);
        const status = data?.currentTime !== this.startTime ? { status: 'reset' } : null;
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
    onResizeSubscribe = debounce(() => {
        // 保证缩放的倍数 数据的准确性
        this.__dragX = (this.timelineWidth / this._canvas.offsetWidth) * this.__dragX;
        this.setCanvasStyle();
        this.draw();
    })

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
            this.draw();
            /**
             * TODO 仅只有多屏模式下 才需要动态调整进度条
             */
            this.start();
        }
    }

    /**
     * 时间框赋值
     */
    setTime(time: any) {
        this.datetime?.setAttribute('time-value', formatTimestamp(time));
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
            this.stop();
            this.publish('loading', { type: true });
            // 如果一直未响应 则5秒后移除loading
            setTimeout(() => {
                this.publish('loading', { type: false });
            }, 5000);
        }
    };

    /**
     * 给时间赋值
     * @param e
     */
    setDateTimeFn = (e: any, value?: any) => {
        this.sendToOutside(e, value);
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
    resetSubscribe({ data: { type } }: any) {
        if (type === 'timeline') {
            this.reset();
        }
    }

    /**
     * 将状态重置
     */
    reset() {
        this.stop();
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
        this.setDateTime({ status: 'reset' });
        this.setLevelValue();
        // this.draw();
    }

    /**
     * 时间选择框事件
     * @param e
     */
    changeEvent = (e: any) => {
        if (this.checkDatetime()) {
            this.__dragCurrentX = (this.currentTime - new Date(this.datetime.value).getTime()) * this.timelineWidth / this.scaleLevelV;
            this.dragStart(null);
            this.initialize({ status: 'loading' });
            this.setDateTimeFn({ status: 'loading' }, e.detail);
        }
    };

    onchange = debounce((e: any) => {
        this.changeEvent(e);
        this.stop();
    });

    publish = (type: any, opts: any) => {
    }
    /**
     * 检查时间是否合法 不合法给提示 并不匀速下发
     */
    checkDatetime = () => {
        return this.datetime?.value;
    };

    /**
     * 监听暂停播放 来处理时间 当播放状态 且src存在 则处理响应逻辑
     * 否则不处理
     */
    // pseudoSubscribe({data: {type}}) {
    //     if (type === 'play') {
    //         this.getSrc() && this.moveTime();
    //     } else if (type === 'pause') {
    //         this.stop();
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
                case 'start':
                    this.start();
                    break;
                case 'stop':
                    this.stop();
                    break;
                //  重新拉取新数据
                case 'restart':
                    this.sendToOutside({ status: 'loading' });
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
    __pollingTimer: any = null;

    stop = () => {
        this.clearPollingTime();
    }

    clearPollingTime() {
        clearInterval(this.__pollingTimer);
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
    __intervalSpeed = 1;

    pollingTimeRun() {
        this.__pollingTimer = setInterval(() => {
            /**
             * 模拟鼠标事件 基于鼠标事件处理相对应的逻辑
             * @type {number}
             * @private
             */
            this._onmousedown(null);
            this.checkPeriods();
            // this.fastForward();
            this.__dragCurrentX = this.__periodsTime * (-1000) * this.timelineWidth / this.scaleLevelV + (this.__dragCurrentX || 0);
            // 用完销毁
            this.__periodsTime = 1;
            this.dragStart(null);
            this.setDateTime({ status: 'polling' });
            this._onmouseup(null);
        }, 1000 / this.__intervalSpeed);
    }

    /**
     * 根据播放时间轮询开始 手动控制轮询开始
     */
    start() {
        this.clearPollingTime();
        this.pollingTimeRun();
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
        this._context.clearRect(0, 0, this.timelineWidth, this.timeline.offsetHeight);
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
     *  绘制刻度值
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
            // 130 65是右边操作区域的宽度 todo 此处是测试方法
            // this.drawSingleSchedule({
            //     x: 65,
            //     w: this.timelineWidth - 130
            // });
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

    __minTime: string = null;
    __maxTime: string = null;

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
     * @param endTimestop
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