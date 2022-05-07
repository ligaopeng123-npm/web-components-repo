/** ********************************************************************
 *
 * @模块名称: MultiPlayer
 *
 * @模块用途: MultiPlayer
 *
 * @date: 2022/3/21 16:09
 *
 * @版权所有: pgli
 *
 ********************************************************************* */
import {initMsg} from "@gaopeng123/message";
import {template} from "./template";
import mpegts from 'mpegts.js';
// import mpegts from "flv.js";
import {
    MultiPlayerComProps,
    MultiPlayerError,
    MultiPlayerErrorType,
    MultiPlayerEvent,
    MultiPlayerEventType
} from "./typing";
import {debounce} from "@gaopeng123/utils.function";
import PlayerEvent from "./PlayerEvent";

export default class MultiPlayer extends HTMLElement {
    shadow: any = null;
    /**
     * 消息处理
     */
    q_msg: any = null;
    /**
     * 保存配置信息
     */
    obj_props = ['media-data-source', 'config', 'robustness'];
    __defaultConfig: MultiPlayerComProps = {
        width: '100%',
        height: '100%',
        'media-data-source': {
            type: 'flv',  // 'mse', 'mpegts', 'm2ts', 'flv' or 'mp4'
            cors: false,
            withCredentials: false,
            hasAudio: false,
            hasVideo: true,
        },
        config: {
            stashInitialSize: 10
        },
        robustness: {
            bufferTime: 1000,
            loopBufferTime: 5000,
            maxResetTimes: 5,
        }
    };

    get defaultConfig() {
        return this.__defaultConfig;
    }

    get config() {
        return this.defaultConfig.config;
    }

    get mediaDataSource() {
        return this.defaultConfig['media-data-source'];
    }

    get robustness() {
        return this.defaultConfig['robustness'];
    }

    /**
     * 博爱饭器对象
     */
    player: mpegts.Player = null;
    playerEvent: PlayerEvent = null;

    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
        this.q_msg = initMsg(this);
        this.q_msg.config({
            showClose: true
        });
    }

    /**
     * 生命周期钩子函数 处理挂载
     */
    connectedCallback() {
        this.shadow.innerHTML = template(this.defaultConfig);
        this.handleAttributeChanged();
        document.addEventListener('visibilitychange', this.onVisibilitychange);
    }

    /**
     * 移除文档流
     */
    disconnectedCallback() {
        document.removeEventListener('visibilitychange', this.onVisibilitychange);
        this.destroyPlayer();
    }

    /**
     * 暴露哪些属性可以被监听
     * @returns {string[]}
     */
    // @ts-ignore
    static get observedAttributes() {
        return [
            'width',
            'height',
            'media-data-source',
            'config',
            'robustness'
        ];
    }

    /**
     * 当自定义元素的一个属性被增加、移除或更改时被调用。
     * 需要setAttribute 才能被触发
     */
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue !== newValue) {
            // @ts-ignore
            this.__defaultConfig[name] = this.obj_props.includes(name) ? Object.assign({}, this.__defaultConfig[name], JSON.parse(newValue)) : newValue;
        }
        this.handleAttributeChanged();
    }

    /**
     * 合并参数
     */
    handleAttributeChanged = debounce(() => {
        this.createPlayer();
    }, 10);
    /**
     * 创建播放器
     */
    createPlayer = () => {
        /**
         * 避免插件打包把flvjs打没了
         */
        if (!mpegts.isSupported()) return new Error(`mpegts 没有准备好`);
        if (!this.mediaDataSource.url) return new Error(`url 不能为空`);
        this.player = mpegts.createPlayer(this.mediaDataSource, this.config);
        this.player.attachMediaElement(this.shadow.querySelector(`#multi-player`));
        this.player.load();
        // 返回一个promise 可以做相对应的处理 提示等
        // @ts-ignore
        this.player.play().then(() => {
            console.log(`${this.mediaDataSource.url} start playing`);
            this.loopAdjustBuffer();
            // 断线连上后 次处就是0了 以后再遇到错误 重新开始计算
            this.__resetTimes = 0;
        });
        this.onPlayEvent();
    };

    onVisibilitychange = () => {
        if (document.visibilityState === 'visible') {
            this.adjustBuffer();
        }
    }
    /**
     * 重新播放
     */
    __resetTimes: number = 0;
    restart = () => {
        if (this.__resetTimes <= this.robustness.maxResetTimes) {
            this.clearAdjustBuffer();
            this.destroyPlayer();
            this.handleAttributeChanged();
            this.__resetTimes++;
        }
    }

    play = (): Promise<void> | void => {
        return this.player.play();
    };
    pause = () => {
        this.player.pause();
    };
    /**
     * 清理缓存器
     */
    clearAdjustBuffer = () => {
        clearTimeout(this.__adjustBuffer);
        this.__lastCurrentTime = 0;
        this.playerEvent?.destroy();
    }

    /**
     * 矫正缓冲区
     */
    __adjustBuffer: any = null;
    __lastCurrentTime: number = 0; // 上次播放时间

    loopAdjustBuffer = () => {
        this.__adjustBuffer = setTimeout(() => {
            this.adjustBuffer();
        }, this.robustness.loopBufferTime);
    }

    adjustBuffer() {
        const diffSecond = this.robustness.bufferTime / 1000
        if (this.player?.buffered?.length) {
            const currentTime = this.player.currentTime;
            if (this.__lastCurrentTime && currentTime - this.__lastCurrentTime < 1) {
                // 发loading消息
                this.onEvent(MultiPlayerEvent.LOADING_COMPLETE_IMG, (currentTime - this.__lastCurrentTime) + 'almost complete loading')
            }
            //获取当前缓冲区buffered值
            const end = this.player.buffered.end(0);
            // 获取buffered与currentTime的差值 来判断缓冲区 填充了多长时间的视频
            const diff = end - currentTime;
            //如果差值大于等于0.5 手动跳帧到最新帧
            // console.log(`缓冲时间${diff}s`);
            if (diffSecond && diff >= diffSecond) {
                this.player.currentTime = this.player.buffered.end(0) - 0.05;//手动跳帧
            }
            this.__lastCurrentTime = this.player.currentTime;
        }
    };

    /**
     * 注入播放器事件
     */
    onPlayEvent = () => {
        // https://github.com/xqq/mpegts.js/blob/master/docs/api.md#mpegtsevents
        this.playerEvent = new PlayerEvent(
            this.player,
            this.onEvent.bind(this),
            this.onError.bind(this)
        );
    }

    onEvent = (eventType: MultiPlayerEventType, info: any) => {
        this.dispatchEvent(new CustomEvent(eventType, {
            detail: {event: eventType, info: info}
        }));
    }

    onError = (event: MultiPlayerErrorType, err: string, info: any) => {
        if (event === MultiPlayerError.NETWORK_ERROR) {
            this.restart();
            this.q_msg?.warning(`${event}: 网络连接失败，请稍后重试`);
        }
        this.dispatchEvent(new CustomEvent(event, {
            detail: {
                error: err,
                info: info,
                resetTimes: this.__resetTimes,
                maxResetTimes: this.robustness.maxResetTimes
            }
        }));
    }

    onPlayLog = () => {

    }

    /**
     * 销毁播放器
     */
    destroyPlayer = () => {
        if (!this.player) return;
        this.playerEvent?.destroy();
        this.player.pause();
        this.player.unload();
        this.player.detachMediaElement();
        this.player.destroy();
        this.player = null;
    }
    // https://github.com/xqq/mpegts.js/blob/master/docs/api.md
    getFeatureList = (): mpegts.FeatureList => {
        return mpegts.getFeatureList()
    }
}

if (!customElements.get('multi-player')) {
    customElements.define('multi-player', MultiPlayer);
}
