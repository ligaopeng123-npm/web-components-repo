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
import React, { useEffect, useState } from "react";
import QRCode from 'qrcode';

type RcQrcodeProps = {
    text: string;
    toDataURL?: (url: string) => void;
    width?: number;
    height?: number;
}

const RcQrcode: React.FC<RcQrcodeProps> = (props) => {
    const {text, toDataURL} = props;
    const width = props.width || 200;
    const height = props.height || 200;
    const [src, setSrc] = useState<string>();

    useEffect(() => {
        if (text) {
            QRCode.toDataURL(text, { errorCorrectionLevel: 'H' })
                .then((url: string) => {
                    setSrc(url);
                    if (toDataURL) {
                        toDataURL(url)
                    }
                })
                .catch((err: Error) => {
                    console.error(err)
                })
        } else {
            setSrc(null);
            if (toDataURL) {
                toDataURL(null)
            }
        }
    }, [text]);

    return (
        <>
            {
                src ? <img width={width} height={height} src={src} /> : null
            }
        </>
    )
};

export default RcQrcode;