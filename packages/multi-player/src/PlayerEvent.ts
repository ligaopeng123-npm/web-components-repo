/** ********************************************************************
 *
 * @模块名称: Event
 *
 * @模块用途: Event
 *
 * @date: 2022/3/22 18:42
 *
 * @版权所有: pgli
 *
 ********************************************************************* */
import mpegts from "mpegts.js";
import {MultiPlayerEventType} from "./typing";

export const events: any[MultiPlayerEventType] = [
    mpegts.Events.ERROR,
    mpegts.Events.LOADING_COMPLETE,
    mpegts.Events.RECOVERED_EARLY_EOF,
    mpegts.Events.MEDIA_INFO,
    mpegts.Events.METADATA_ARRIVED,
    mpegts.Events.SCRIPTDATA_ARRIVED,
    mpegts.Events.TIMED_ID3_METADATA_ARRIVED,
    mpegts.Events.PES_PRIVATE_DATA_DESCRIPTOR,
    mpegts.Events.PES_PRIVATE_DATA_ARRIVED,
    mpegts.Events.STATISTICS_INFO,
];

export const errors: any[MultiPlayerEventType] = [
    mpegts.ErrorTypes.NETWORK_ERROR,
    mpegts.ErrorTypes.MEDIA_ERROR,
    mpegts.ErrorTypes.OTHER_ERROR,
];

export class PlayerEvent {
    player: any;
    __onEvent: any;
    __onError: any;

    constructor(player: mpegts.Player, onEvent: any, onError: any) {
        this.player = player;
        this.__onEvent = onEvent;
        this.__onError = onError;
        this.init();
    }

    init() {
        // https://github.com/xqq/mpegts.js/blob/master/docs/api.md#mpegtsevents
        this.addEvent();
        // this.addError();
    }

    destroy() {
        for (const event of events) {
            // @ts-ignore
            this.player.off(event, this.onEvents);
        }
    }

    addEvent = () => {
        for (const event of events) {
            // @ts-ignore
            this.player.on(event, this.onEvents.bind(this, event));
        }
    }

    addError = () => {
        for (const errType of errors) {
            // @ts-ignore
            this.player.on(errType, this.onErrors.bind(this, errType));
        }
    }


    onEvents = (event: MultiPlayerEventType, info: any) => {
        // 如果是错误信息 走错误信息模块处理
        if (event === mpegts.Events.ERROR) {
            this.onErrors(event, info)
        } else {
            this.__onEvent && this.__onEvent(event, info);
            // @ts-ignore
            this[`on${event}`] && this[`on${event}`](err, info);
        }
    }

    onErrors = (event: string, info: any) => {
        // NETWORK_ERROR  网络错误
        // MEDIA_ERROR    流媒体错误
        // OTHER_ERROR    未知错误
        this.__onError && this.__onError(event, info);
        // @ts-ignore
        this[`on${event}`] && this[`on${event}`](err, info);
    }
    /**
     * 输入的 MediaDataSource 已经完全缓冲到 end
     * @param err
     * @param info
     */
    onLOADING_COMPLETE = (err: any, info: any) => {
    }

    onRECOVERED_EARLY_EOF = () => {

    }

    onMEDIA_INFO = () => {

    }

    onMETADATA_ARRIVED = () => {

    }

    onSCRIPTDATA_ARRIVED = () => {

    }

    onTIMED_ID3_METADATA_ARRIVED = () => {

    }

    onSCTE35_METADATA_ARRIVED = () => {

    }

    onPES_PRIVATE_DATA_ARRIVED = () => {

    }

    onSTATISTICS_INFO = () => {

    }
}

export default PlayerEvent;
