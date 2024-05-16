/**********************************************************************
 *
 * @模块名称: HlsPlayerComponent
 *
 * @模块用途: HlsPlayerComponent
 *
 * @创建人: wangxiangyu
 *
 * @date: 2024-05-15 14:50:29
 *
 **********************************************************************/

import { HlsPlayerConfig, HlsPlayerEventType, template } from "./HlsPlayerTemplate";
import Hls, { HlsConfig } from "hls.js";
import { addBoxSizeUnit, debounce } from "@gaopeng123/utils";


class HlsPlayer extends HTMLElement {
    shadow: ShadowRoot = null;
    /**
     * 保存配置信息
     */
    obj_props = ['media-data-source'];
    /*
    * 保存配置信息
    */
    __defaultConfig: HlsPlayerConfig = {
        "object-fit": 'fill',
        width: '100%',
        height: '100%',
        'media-data-source': {
            url: '',
            type: ''
        },
    };

    /**
     * 博爱饭器对象
     */
    player: Hls = null;

    get config() {
        return this.__defaultConfig;
    }

    get mediaDataSource() {
        return this.config['media-data-source'];
    }

    get video() {
        return this.shadow.querySelector('video');
    }

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.shadow.innerHTML = template(this.config);
    }

    /**
     * 生命周期钩子函数 处理挂载
     */
    connectedCallback() {
        this.init();
    }

    /**
     * 移除文档流
     */
    disconnectedCallback() {
        this.destroy();
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
            'robustness',
            'object-fit'
        ];
    }

    /**
     * 当自定义元素的一个属性被增加、移除或更改时被调用。
     * 需要setAttribute 才能被触发
     */
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue !== newValue) {
            if (name === 'media-data-source') {
                this.initMediaDataSource();
            }
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
        this.changeSize();
    }, 10);

    initMediaDataSource = () => {

    }

    changeSize = () => {
        const { width, height } = this.config;
        if (width) {
            this.video.style.width = addBoxSizeUnit(width);
        }
        if (height) {
            this.video.style.height = addBoxSizeUnit(height);
        }
        if (this.config['object-fit']) {
            // @ts-ignore
            this.video.style['object-fit'] = this.config['object-fit'];
        }
    }

    createPlayer = () => {
        if (this.mediaDataSource && this.mediaDataSource['url']) {
            this.destroyPlayer();
            const videoSrc = this.mediaDataSource['url'];
            // 如果直接能播放 则直接播放
            if (this.video.canPlayType('application/vnd.apple.mpegurl')) {
                this.video.src = videoSrc;
            } else if (Hls.isSupported()) {
                this.player = new Hls();
                this.player.loadSource(videoSrc);
                this.player.attachMedia(this.video);
            }
            this.initEvents();
        } else {

        }
    }

    /**
     * 销毁播放器
     */
    destroyPlayer = () => {
        if (this.player) {
            this.player.destroy();
            this.player = null;
        }
    }

    initEvents = () => {
        if (this.video.canPlayType('application/vnd.apple.mpegurl')) {
            this.video.addEventListener('error', this.onError);
            this.video.addEventListener('stalled', this.onError);
            this.video.addEventListener('waiting', this.onWaiting);
        } else if (Hls.isSupported()) {
            this.player.on(Hls.Events.ERROR, this.onError)
        }
        this.video.addEventListener('play', this.onStart);
    }

    offEvent = () => {
        if (Hls.isSupported()) {
            this.player.on(Hls.Events.ERROR, this.onError);
        }
        this.video.removeEventListener('play', this.onStart);
        this.video.removeEventListener('error', this.onError);
        this.video.removeEventListener('stalled', this.onError);
        this.video.removeEventListener('waiting', this.onWaiting);
    }

    onError = (err: any) => {
        this.sentEvent(HlsPlayerEventType.ERROR, err);
    }

    onStart = (info: any) => {
        this.sentEvent(HlsPlayerEventType.LOAD_START, info);
    }

    onWaiting = (info: any) => {
        this.sentEvent(HlsPlayerEventType.LOADING_COMPLETE, info);
    }

    sentEvent = (eventType: HlsPlayerEventType, info: any) => {
        this.dispatchEvent(new CustomEvent(eventType, {
            detail: {
                event: eventType,
                info: info
            }
        }));
    }
    /**
     * 初始化
     */
    init = () => {

    }
    /**
     * 事件销毁
     */
    destroy = () => {
        this.offEvent();
        this.destroyPlayer();
    }
}

export default HlsPlayer;

if (!customElements.get("hls-player")) {
    customElements.define("hls-player", HlsPlayer);
}
