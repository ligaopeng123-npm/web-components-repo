/**********************************************************************
 *
 * @模块名称: rc-qrcode
 *
 * @模块用途: rc-qrcode 二维码下载
 *
 * @创建人: pgli
 *
 * @date: 2022/10/9 15:11
 *
 **********************************************************************/
import React, {
    useEffect,
    useRef, useState
} from "react";
import QRCodeStyling, { Options }
    from "qr-code-styling";
import {
    assignDeep,
    blob2Base64
} from "@gaopeng123/utils";

export type RcQrcodeProps = {
    text: string;
    label?: string;
    toDataURL?: (url: string) => void;
    width?: number;
    height?: number;
    QRCodeStylingOptions?: Options
}

const RcQrcode: React.FC<RcQrcodeProps> = (props) => {
    const {
        text,
        toDataURL,
        label,
        QRCodeStylingOptions
    } = props;
    const width = props.width || 200;
    const height = props.height || 200;
    const [qrCode, setQrCode] = useState<any>();
    const ref = useRef(null);

    const _toDataURL = (value?: null) => {
        if (toDataURL) {
            if (value === null) {
                toDataURL(null);
            } else {
                const canvas = ref.current.querySelector('canvas');
                if (canvas) {
                    qrCode.getRawData().then((res: Blob) => {
                        blob2Base64(res).then((base64: string) => {
                            toDataURL(base64);
                        });
                    });
                }
            }
        }
    }

    const drawLabel = () => {
        if (label) {
            // setTimeout(() => {
            //     // 渲染二维码并获取 canvas 元素
            //     const canvas = qrCode._canvas;
            //     const ctx = canvas.getContext('2d');
            //     // 绘制文本
            //     ctx.font = '14px Arial';
            //     ctx.textAlign = 'center';
            //     ctx.fillStyle = 'red';
            //     ctx.fillText(label, canvas.width / 2, canvas.height - 10);
            // }, 20)
        }
    }

    useEffect(() => {
        const qrCode = new QRCodeStyling(assignDeep({
            width: width,
            height: height,
            qrOptions: {
                "typeNumber": 0,
                "mode": "Byte",
                "errorCorrectionLevel": "H"
            },
            dotsOptions: {
                "type": "extra-rounded",
                "gradient": {
                    "type": "linear",
                    "rotation": 0,
                    "colorStops": [
                        {
                            "offset": 0,
                            "color": "#000000"
                        },
                        {
                            "offset": 1,
                            "color": "#000000"
                        }
                    ]
                }
            },
            imageOptions: {
                crossOrigin: "anonymous",
                "hideBackgroundDots": true,
                "imageSize": 0.4,
                "margin": 0
            },

        }, QRCodeStylingOptions || {}));
        qrCode.append(ref.current);
        setQrCode(qrCode);
    }, []);

    useEffect(() => {
        if (text) {
            qrCode.update({
                data: text
            });
            drawLabel();
            _toDataURL();
        } else {
            _toDataURL(null);
        }
    }, [text]);

    return (
        <div
            ref={ref}
            style={{
                width: width,
                height: height,
            }}>
        </div>
    )
};

export default RcQrcode;