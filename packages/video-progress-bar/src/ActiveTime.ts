/**********************************************************************
 *
 * @模块名称: ForwardSelect
 *
 * @模块作用: ForwardSelect
 *
 * @创建人: pgli
 *
 * @date: 2023/7/3 8:36 下午
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import forward from "./assets/forward.svg";
import backward from "./assets/backward.svg";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";
import { Mandarin } from "flatpickr/dist/l10n/zh.js"
import { BD, BG } from "./utils";
import { formatTimestamp } from "@gaopeng123/utils";

type ActiveTimeConfig = {
    'time-value': string;
    'forward-value': string;
    'speed-value': string;
}

const forwardOptions = [{
    label: '5s',
    value: '5'
}, {
    label: '20s',
    value: '20'
}, {
    label: '1分钟',
    value: '60'
}];
const speedOptions = [{
    label: '1/4x',
    value: '0.25'
}, {
    label: '1/2x',
    value: '0.5'
}, {
    label: '正常',
    value: '1'
}, {
    label: '2x',
    value: '2'
}, {
    label: '4x',
    value: '4'
}];

type CurrentConfigType =
    'time-value'
    | 'forward-value'
    | 'speed-value';

class ActiveTime extends HTMLElement {
    shadow: ShadowRoot = null;
    __config: ActiveTimeConfig = {
        'time-value': '',
        'forward-value': '5',
        'speed-value': '1',
    }

    __oldConfig: ActiveTimeConfig = {
        'time-value': '',
        'forward-value': '5',
        'speed-value': '1',
    }

    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.shadow.innerHTML = this.createTemplate();
    }

    onChange(currentType: CurrentConfigType, value?: any) {
        this.dispatchEvent(new CustomEvent('change', {
            detail: {
                currentType: currentType, ...this.__config,
                ...(value || {})
            }
        }));
    }

    connectedCallback() {
        this.initFlatpickr();
        this.shadow.querySelector('#speed').addEventListener('onChange', this.onSpeedChange);
        this.shadow.querySelector('#forward').addEventListener('onChange', this.onForwardChange);
        this.shadow.querySelector('#bth-backward').addEventListener('click', this.onBackwardClick);
        this.shadow.querySelector('#bth-forward').addEventListener('click', this.onForwardClick);
    }

    /**
     * 移除文档流
     */
    disconnectedCallback() {
        this.shadow.querySelector('#speed').removeEventListener('onChange', this.onSpeedChange);
        this.shadow.querySelector('#forward').removeEventListener('onChange', this.onForwardChange);
        this.shadow.querySelector('#bth-backward').removeEventListener('click', this.onBackwardClick);
        this.shadow.querySelector('#bth-forward').removeEventListener('click', this.onForwardClick);
    }

    /**
     * 暴露哪些属性可以被监听
     * @returns {string[]}
     */
    // @ts-ignore
    static get observedAttributes() {
        return [
            'time-value',
            'forward-value',
            'speed-value',
        ];
    }

    /**
     * 当自定义元素的一个属性被增加、移除或更改时被调用。
     * 需要setAttribute 才能被触发
     */
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue !== newValue) {
            this.__config[name as CurrentConfigType] = newValue;
        }
        this.setAllValue();
    }

    get value() {
        return this.__config['time-value'];
    }

    get speed() {
        return Number(this.__config['speed-value']);
    }

    set value(v) {
        this.__config['time-value'] = v;
        this.setTimeValue();
    }

    setTimeValue() {
        const val = this.__config['time-value'];
        this.datetime.value = val;
        this.setFlatpickrVal(val);
    }

    setAllValue() {
        this.setTimeValue();
    }

    get datetime(): HTMLInputElement {
        return this.shadow.querySelector('#datetime');
    }

    get time() {
        return this.shadow.querySelector('.time');
    }

    onSpeedChange = (e: Event) => {
        // @ts-ignore
        this.__config['speed-value'] = Number(e.detail.value);
        this.onChange('speed-value');
    }

    onForwardChange = (e: Event) => {
        // @ts-ignore
        this.__config['forward-value'] = Number(e.detail.value);
    }

    /**
     * 快退
     */
    onBackwardClick = () => {
        this.onChange('forward-value', {
            forwardValue: -Number(this.__config['forward-value']) * 1000,
        });
    }

    /**
     * 快进
     */
    onForwardClick = () => {
        this.onChange('forward-value', {
            forwardValue: Number(this.__config['forward-value']) * 1000,
        });
    }

    /**
     * 不可点击
     */
    canNotClick = () => {
        this.time.classList.add('disabled');
    }
    /**
     * 可点击
     */
    canClick = () => {
        this.time.classList.remove('disabled');
    }

    __flatpickr: any = null;

    initFlatpickr() {
        this.__flatpickr = flatpickr(this.datetime, {
            dateFormat: "Y-m-d H:i:s",
            "locale": Mandarin,
            time_24hr: true,
            onClose: (v) => {
                // 当参数一样时，此处不做onChange变更，只做赋值处理
                const dataStr = formatTimestamp(v[0]);
                if (this.__oldConfig['time-value'] != dataStr) {
                    this.__config['time-value'] = dataStr;
                    this.onChange('time-value');
                } else {
                    this.value = this.__config['time-value'];
                }
            },
            onOpen: () => {
                this.__oldConfig['time-value'] = this.__config['time-value'];
            }
        });
    }

    setFlatpickrVal(val: string) {
        if (this.__flatpickr && !this.__flatpickr.isOpen) {
            this.__flatpickr.setDate(val);
        }
    }

    createTemplate() {
        return `
            <style>
            /*时间弹窗*/
            .timeline-datetime {
                height: 18px !important;
                border: 1px solid ${BD};
                background-color: ${BG};
                color: #fff;
                border-radius: 2px;
                width: 130px;
                position: relative;
                 -webkit-user-select: none; /* Safari */
                user-select: none;
            }

             .time img {
                cursor: pointer;
                margin: 0px 8px;
                z-index: 1;
                height: 16px;
                 -webkit-user-select: none; /* Safari */
                user-select: none;
            }
            
            .time img:hover {
                background-color: #333333;
            }
            
            .time {
                height: 22px;
                padding-top: 38px;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #ffffff;
                -webkit-user-select: none; /* Safari */
                user-select: none;
              
            }
            
            .disabled {
                pointer-events: none;
            }
            </style>
             <div class="time">
                <div style="width: 60px"></div>
                <video-progress-bar-forward-select id="speed" default-value="1" options=${JSON.stringify(speedOptions)} style="position: relative;top: -25px;height: 0px;"></video-progress-bar-forward-select>
                <input id="datetime"  class="flatpickr timeline-datetime" data-enable-time="true" data-enable-seconds="true" >
                <img id="bth-backward"  title="快退" src="${backward}" />
                <video-progress-bar-forward-select id="forward" default-value="5" options=${JSON.stringify(forwardOptions)} style="position: relative;top: -25px;height: 0px;"></video-progress-bar-forward-select>
                <img id="bth-forward" title="快进" src="${forward}" />
            </div>
        `
    }
}

export default ActiveTime;

if (!customElements.get('video-progress-bar-active-time')) {
    customElements.define('video-progress-bar-active-time', ActiveTime);
}