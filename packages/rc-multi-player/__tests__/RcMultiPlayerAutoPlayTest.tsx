/**********************************************************************
 *
 * @模块名称: RcMultiPlayerTest
 *
 * @模块用途: RcMultiPlayerTest
 *
 * @创建人: pgli
 *
 * @date: 2022/10/28 9:18
 *
 **********************************************************************/
import * as React from 'react';
import { RcMultiPlayer } from "../src";

type RcMultiPlayerAutoPlayTestProps = {};
const RcMultiPlayerAutoPlayTest: React.FC<RcMultiPlayerAutoPlayTestProps> = (props) => {
    const [mediaDataSource, setMediaDataSource] = React.useState<any>({});
    React.useEffect(() => {
        setTimeout(()=> {
            setMediaDataSource({
                url: 'webrtc://iot-stream.ubsense.cn/live/43231100034-1-31882?schema=https',
                type: 'url'
            });
        }, 5000)
    }, []);
    return (
        <div style={{ height: 600 }}>
            <RcMultiPlayer
                showAction={true}
                events={{
                    onFullChange: (v) => {
                        console.log(v);
                    },
                    onActionChange: (allValue) => {
                        console.log(allValue);
                    }
                }}
                defaultPlayerConfig={{
                    protocol: {
                        defaultValue: 'WebRTC', options: [
                            {
                                label: 'WebRTC',
                                value: 'WebRTC'
                            },
                            {
                                label: 'HTTP-FLV',
                                value: 'FLV'
                            },
                        ]
                    },
                    maxPlayerTime: false,
                    resolution: {
                        defaultValue: "1",
                        options: [
                            {
                                label: '子码流',
                                value: "1"
                            },
                            {
                                label: '主码流',
                                value: "2"
                            }
                        ]
                    },
                    objectFit: 'cover',
                }}
                protocol={'WebRTC'}
                hideToolbarInFullScreen={false}
                videoToolbar={{ close: false, fullScreen: true, screenshot: false, back: true }}
                className={'RcMultiPlayerTest'}
                mediaDataSource={mediaDataSource}/>
        </div>
    );
};

export default RcMultiPlayerAutoPlayTest;
