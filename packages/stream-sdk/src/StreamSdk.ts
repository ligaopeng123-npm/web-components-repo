/**********************************************************************
 *
 * @模块名称: StreamSdk
 *
 * @模块作用: StreamSdk
 *
 * @创建人: pgli
 *
 * @date: 2023/12/4 4:27 下午
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import { get, post } from "@gaopeng123/fetch";

type StreamSdkConfig = {
    token: string;
    tenant?: string;
    host?: string,
}

class StreamSdk {
    apiHost = 'https://ai-api-test.sany.com.cn'
    config: StreamSdkConfig;

    constructor(config: StreamSdkConfig) {
        this.config = config;
    }

    get host() {
        return this.config.host || this.apiHost;
    }

    get header() {
        return {
            'Authorization': this.config.token.startsWith('Bearer') ? this.config.token : `Bearer ${this.config.token}`,
            'Tenant': this.config.tenant || 'ubsense_iot_xingtu20_service'
        }
    }

    /**
     * 获取通道列表
     * @param carId
     */
    async getChannelListByCarId(carId: string) {
        return new Promise((resolve, reject) => {
            post(this.host + `/iot-xingtu20-service-tenant/car/operation/${carId}`, { headers: this.header }).then((res) => {
                if (res.code === 200) {
                    const bindDevices = res?.data?.result?.bindDevices;
                    if (bindDevices?.length > 0) {
                        Promise.all(bindDevices?.map((item: any) => {
                            return this.getSingleChannel(item.deviceSerialCode);
                        })).then((res) => {
                            const list: any[] = []
                            res.forEach((_res, index) => {
                                if (_res.code === 200) {
                                    const _singleList: any[] = [];
                                    _res?.data?.content.map((_item: any) => {
                                        _singleList.push(...(_item.bindDevices ?? [])?.map((_: any) => {
                                            return Object.assign({
                                                terminal: bindDevices[index].deviceSerialCode,
                                                channelNo: _.channel
                                            }, _);
                                        }));
                                    });
                                    list.push(..._singleList);
                                }
                            });
                            console.log(list);
                            resolve(list);
                        }).catch((err) => {
                            reject(err);
                        });
                    }
                    //  bindDevices result
                } else {
                    throw new Error(res.msg);
                    reject(res.msg);
                }
            }).catch((res) => {
                throw new Error(res);
                reject(res);
            })
        });
    }

    /**
     * 根据终端查询Channel
     * @param deviceSerialCodeEqual
     */
    getSingleChannel(deviceSerialCodeEqual: string) {
        return post(this.host + `/iot-common-device-tenant/api/nebula/device/aiot/devices/terminal/v1?pageNum=1&pageSize=10000`, {
            headers: this.header,
            body: { "deviceSerialCodeEqual": deviceSerialCodeEqual, "sysName": "xt" }
        });
    }

    /**
     * 获取直播链接
     */
    async getLive(params: { terminal: string, channelNo: number, streamType?: 0 | 1 }) {
        return get(this.host + '/iot-common-device-tenant/api/nebula/device/video/media/play/v2', {
            headers: this.header,
            params: {
                terminal: params.terminal,
                channelNo: params.channelNo,
                streamType: params.streamType == undefined || params.streamType === null ? 1 : params.streamType
            }
        })
    }

    /**
     * 获取回放数据
     */
    async getReplay() {

    }

    /**
     * 获取回放时间段
     */
    async getReplayTimes() {

    }
}

export default StreamSdk;