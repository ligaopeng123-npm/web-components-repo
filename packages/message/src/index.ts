import {messageCss} from "./messageCss";

/**
 * 添加样式
 */
const addMessageCss = () => {
    const qmsgMessageCssId = `qmsg-message-css`;
    // 避免重复插入
    if (document.querySelector(`#${qmsgMessageCssId}`)) return;
    const styles = document.createElement('style');
    styles.id = qmsgMessageCssId;
    styles.innerHTML = messageCss;
    document.head.appendChild(styles);
}

type MsgConfig = {
    type?: 'info' | 'warning' | 'success' | 'error' | 'loading',
    showClose?: boolean,
    timeout?: number,
    animation?: boolean,
    autoClose?: boolean,
    content?: string,
    onClose?: any,
    maxNums?: number,
    html?: string;
}

type MsgSTATESValue = 'opening' | 'done' | 'closing';
type MsgSTATES = {
    opening: 'MessageMoveIn',
    done: '',
    closing: 'MessageMoveOut'
}
/**
 * 避免生成全局变量
 * @param global
 */
export const initMsg = (global: any) => {
    addMessageCss();
    /**
     * 声明插件名称
     */
    const PLUGIN_NAME = "qmsg";

    /**
     * 命名空间 用于css和事件
     */
    const NAMESPACE = global && global.QMSG_GLOBALS && global.QMSG_GLOBALS.NAMESPACE || PLUGIN_NAME;

    /**
     * 状态 & 动画
     * 显示中，显示完成，关闭中
     */
    const STATES: MsgSTATES = {
        opening: 'MessageMoveIn',
        done: '',
        closing: 'MessageMoveOut'
    }

    /**
     * 全局默认配置
     * 可在引入js之前通过QMSG_GLOBALS.DEFAULTS进行配置
     * type {String} 类型，支持'info','warning','success','error','loading'
     * showClose {Boolean} 是否显示关闭图标，默认为false不显示
     * timeout {Number} 多久后自动关闭，单位ms,默认2500
     * autoClose {Boolean} 是否自动关闭，默认true,注意在type为loading的时候自动关闭为false
     * content {String} 提示的内容
     * onClose {Function} 关闭的回调函数
     */
    let DEFAULTS: MsgConfig = Object.assign({
        type: "info",
        showClose: false,
        timeout: 3500,
        animation: true,
        autoClose: true,
        content: "",
        onClose: null,
        maxNums: 5,
        html: false
    }, global && global.QMSG_GLOBALS && global.QMSG_GLOBALS.DEFAULTS)

    /**
     * 设置icon html代码
     */
    const ICONS: any = {
        info: '<svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z" fill="#1890ff" stroke="#1890ff" stroke-width="4" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M24 11C25.3807 11 26.5 12.1193 26.5 13.5C26.5 14.8807 25.3807 16 24 16C22.6193 16 21.5 14.8807 21.5 13.5C21.5 12.1193 22.6193 11 24 11Z" fill="#FFF"/><path d="M24.5 34V20H23.5H22.5" stroke="#FFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 34H28" stroke="#FFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        warning: '<svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z" fill="#faad14" stroke="#faad14" stroke-width="4" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M24 37C25.3807 37 26.5 35.8807 26.5 34.5C26.5 33.1193 25.3807 32 24 32C22.6193 32 21.5 33.1193 21.5 34.5C21.5 35.8807 22.6193 37 24 37Z" fill="#FFF"/><path d="M24 12V28" stroke="#FFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        error: '<svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" fill="#f5222d" stroke="#f5222d" stroke-width="4" stroke-linejoin="round"/><path d="M29.6569 18.3431L18.3432 29.6568" stroke="#FFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M18.3432 18.3431L29.6569 29.6568" stroke="#FFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        success: '<svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M24 4L29.2533 7.83204L35.7557 7.81966L37.7533 14.0077L43.0211 17.8197L41 24L43.0211 30.1803L37.7533 33.9923L35.7557 40.1803L29.2533 40.168L24 44L18.7467 40.168L12.2443 40.1803L10.2467 33.9923L4.97887 30.1803L7 24L4.97887 17.8197L10.2467 14.0077L12.2443 7.81966L18.7467 7.83204L24 4Z" fill="#52c41a" stroke="#52c41a" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 24L22 29L32 19" stroke="#FFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        loading: '<svg class="animate-turn" width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M4 24C4 35.0457 12.9543 44 24 44V44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4" stroke="#1890ff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M36 24C36 17.3726 30.6274 12 24 12C17.3726 12 12 17.3726 12 24C12 30.6274 17.3726 36 24 36V36" stroke="#1890ff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        close: '<svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M14 14L34 34" stroke="#909399" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 34L34 14" stroke="#909399" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    }

    /**
     * 是否支持动画属性
     * @type {Boolean}
     */
    const CAN_ANIMATION = (function () {
        const style: any = document.createElement('div').style;
        return style.animationName !== undefined ||
            style.WebkitAnimationName !== undefined ||
            style.MozAnimationName !== undefined ||
            style.msAnimationName !== undefined ||
            style.OAnimationName !== undefined;
    })();

    /**
     * 生成带插件名的名称
     * @param {...String}
     * @returns {String}
     */
    function namespacify(...props: any) {
        let res = NAMESPACE;
        for (let i = 0; i < props.length; ++i) {
            res += '-' + props[i];
        }
        return res;
    }

    /**
     * 每条消息的构造函数
     * @param {Objetc} opts 配置参数，参考DEFAULTS
     */
    function Msg(opts: any): any {
        const oMsg = this;
        oMsg.settings = Object.assign({}, DEFAULTS, opts || {});
        oMsg.id = Qmsg.instanceCount;
        let timeout: any = oMsg.settings.timeout;
        // @ts-ignore
        timeout = timeout && (parseInt(timeout) >= 0 & parseInt(timeout) <= Math.NEGATIVE_INFINITY) ? parseInt(timeout) : DEFAULTS.timeout;
        oMsg.timeout = timeout;
        oMsg.settings.timeout = timeout;
        oMsg.timer = null;
        const $elem = document.createElement("div");
        const $svg = ICONS[oMsg.settings.type || 'info'];
        let contentClassName = namespacify("content-" + oMsg.settings.type || 'info');
        contentClassName += oMsg.settings.showClose ? ' ' + namespacify('content-with-close') : ''
        const content = oMsg.settings.content || '';
        const $closeSvg = ICONS['close'];
        const $closeIcon = oMsg.settings.showClose ? '<i class="qmsg-icon qmsg-icon-close">' + $closeSvg + '</i>' : '';
        const $span = document.createElement("span");
        if (oMsg.settings.html) {
            $span.innerHTML = oMsg.settings.html;
        } else {
            $span.innerText = content;
        }
        $elem.innerHTML = '<div class="qmsg-content">\
            <div class="' + contentClassName + '">\
                <i class="qmsg-icon">' + $svg + '</i>' + $span.outerHTML + $closeIcon +
            '</div>\
    </div>';

        $elem.classList.add(namespacify('item'));
        let $wrapper = document.querySelector('.' + NAMESPACE);
        if (!$wrapper) {
            $wrapper = document.createElement("div");
            $wrapper.classList.add(NAMESPACE, namespacify('wrapper'), namespacify('is-initialized'));
            document.body.appendChild($wrapper);
        }
        $wrapper.appendChild($elem);
        oMsg.$wrapper = $wrapper;
        oMsg.$elem = $elem;
        setState(oMsg, 'opening');
        if (oMsg.settings.showClose) { //关闭按钮绑定点击事件
            $elem.querySelector(".qmsg-icon-close").addEventListener('click', function () {
                oMsg.close();
            }.bind($elem))
        }
        $elem.addEventListener("animationend", function (e: any) {   // 监听动画完成
            const target = e.target, animationName = e.animationName;
            if (animationName == STATES['closing']) {
                clearInterval(this.timer);
                this.destroy();
            }
            target.style.animationName = '';
            target.style.webkitAnimationName = '';
        }.bind(oMsg))
        if (oMsg.settings.autoClose) { // 自动关闭
            const intvMs = 10; // 定时器频率
            oMsg.timer = setInterval(function () {
                this.timeout -= intvMs;
                if (this.timeout <= 0) {
                    clearInterval(this.timer)
                    this.close();
                }
            }.bind(oMsg), intvMs);
            oMsg.$elem.addEventListener('mouseover', function () {
                clearInterval(this.timer)
            }.bind(oMsg))
            oMsg.$elem.addEventListener('mouseout', function () {
                if (this.state != 'closing') { // 状态为关闭则不重启定时器
                    this.timer = setInterval(function () {
                        this.timeout -= intvMs;
                        if (this.timeout <= 0) {
                            clearInterval(this.timer);
                            this.close();
                        }
                    }.bind(oMsg), intvMs);
                }
            }.bind(oMsg))
        }
    }

    function setState(inst: any, state: MsgSTATESValue) {
        if (!state || !STATES[state]) return;
        inst.state = state;
        inst.$elem.style.animationName = STATES[state];
    }

    /**
     * 直接销毁元素，不会触发关闭回调函数
     */
    Msg.prototype.destroy = function () {
        this.$elem.parentNode && this.$elem.parentNode.removeChild(this.$elem);
        clearInterval(this.timer);
        Qmsg.remove(this.id);
    }
    /**
     * 关闭，支持动画则会触发动画事件
     */
    Msg.prototype.close = function () {
        setState(this, 'closing');
        if (!CAN_ANIMATION) { // 不支持动画
            this.destroy();
        } else {
            Qmsg.remove(this.id);
        }
        const callback = this.settings.onClose;
        if (callback && callback instanceof Function) {
            callback.call(this);
        }
    }

    /**
     * 设置消息数量统计
     * @private
     */
    function setMsgCount(oMsg: any) {
        const countClassName = namespacify('count');
        const $content = oMsg.$elem.querySelector("." + namespacify('content'));
        let $count = $content.querySelector('.' + countClassName);
        if (!$count) {
            $count = document.createElement("span");
            $count.classList.add(countClassName);
            $content.appendChild($count);
        }
        $count.innerHTML = oMsg.count;
        $count.style.animationName = "";
        $count.style.animationName = "MessageShake";
        oMsg.timeout = oMsg.settings.timeout || DEFAULTS.timeout;
    }

    /**
     * 合并参数为配置信息，用于创建Msg实例
     * @param {String} txt 文本内容
     * @param {Object} config 配置
     * @private
     */
    function mergeArgs(txt: any, config: MsgConfig) {
        const opts = Object.assign({}, DEFAULTS);
        if (arguments.length === 0) {
            return opts;
        }
        if (txt instanceof Object) {
            return Object.assign(opts, txt);
        } else {
            opts.content = txt.toString();
        }
        if (config instanceof Object) {
            return Object.assign(opts, config)
        }
        return opts;
    }

    /**
     * 通过配置信息 来判断是否为同一条消息,并返回消息实例
     * @param {Object} params 配置项
     * @private
     */
    function judgeReMsg(params: any) {
        params = params || {};
        const opt = JSON.stringify(params)
        let oInx: any = -1;
        let oMsg;
        for (const i in this.oMsgs) {
            const oMsgItem = this.oMsgs[i];
            if (oMsgItem.config == opt) {
                oInx = i;
                oMsg = oMsgItem.inst;
                break;
            }
        }
        if (oInx < 0) {
            this.instanceCount++;
            const oItem: any = {};
            oItem.id = this.instanceCount;
            oItem.config = opt;
            // @ts-ignore
            oMsg = new Msg(params);
            oMsg.id = this.instanceCount;
            oMsg.count = '';
            oItem.inst = oMsg;
            this.oMsgs[this.instanceCount] = oItem;
            const len = this.oMsgs.length;
            const maxNums = this.maxNums;
            /**
             * 关闭多余的消息
             */
            if (len > maxNums) {
                let oIndex = 0;
                let oMsgs = this.oMsgs;
                for (oIndex; oIndex < len - maxNums; oIndex++) {
                    oMsgs[oIndex] && oMsgs[oIndex].inst.settings.autoClose && oMsgs[oIndex].inst.close();
                }
            }
        } else {
            oMsg.count = !oMsg.count ? 2 : oMsg.count + 1;
            setMsgCount(oMsg);
        }
        oMsg.$elem.setAttribute("data-count", oMsg.count);
        return oMsg;
    }


    const Qmsg = {
        version: '0.0.1',
        instanceCount: 0,
        oMsgs: [] as any,
        maxNums: DEFAULTS.maxNums || 5,
        config: function (cfg: MsgConfig) {
            DEFAULTS = cfg && cfg instanceof Object ? Object.assign(DEFAULTS, cfg) : DEFAULTS;
            // @ts-ignore
            this.maxNums = DEFAULTS.maxNums && DEFAULTS.maxNums > 0 ? parseInt(DEFAULTS.maxNums) : 3;
        },
        info: function (txt: any, config: MsgConfig) {
            const params = mergeArgs(txt, config);
            params.type = 'info';
            return judgeReMsg.call(this, params);
        },
        warning: function (txt: any, config: MsgConfig) {
            const params = mergeArgs(txt, config);
            params.type = 'warning';
            return judgeReMsg.call(this, params);
        },
        success: function (txt: any, config: MsgConfig) {
            const params = mergeArgs(txt, config);
            params.type = 'success';
            return judgeReMsg.call(this, params);
        },
        error: function (txt: any, config: MsgConfig) {
            const params = mergeArgs(txt, config);
            params.type = 'error';
            return judgeReMsg.call(this, params);
        },
        loading: function (txt: any, config: MsgConfig) {
            const params = mergeArgs(txt, config);
            params.type = 'loading';
            params.autoClose = false;
            return judgeReMsg.call(this, params);
        },
        remove: function (id: string) {
            this.oMsgs[id] && delete this.oMsgs[id];
        },
        closeAll: function () {
            for (let i in this.oMsgs) {
                this.oMsgs[i] && this.oMsgs[i].inst.close();
            }
        }
    }
    return Qmsg;
};

export default initMsg;
