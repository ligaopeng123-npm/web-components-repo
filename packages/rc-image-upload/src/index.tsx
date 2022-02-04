/**********************************************************************
 *
 * @模块名称: rc-image-upload
 *
 * @模块用途: rc-image-upload
 *
 * @创建人: pgli
 *
 * @date: 2022/2/4 12:17
 *
 **********************************************************************/
import * as React from 'react';
import {useEffect} from 'react';
import "@gaopeng123/image-upload";
// @ts-ignore
import {AfterUpload, ImageUploadProps} from "@gaopeng123/image-upload";

type UploadEvent = AfterUpload;
type RcImageUploadProps = {
    id: string;
    width?: string | number;
    height?: string | number;
    pictureWidth?: string | number;
    pictureHeight?: string | number;
    action?: string;
    listType?: 'picture-card' | 'picture';
    multiple?: boolean;
    accept?: string;
    maxCount?: number; // 最大上传个数
    fileList?: any[];
    onUploadChange?: (e: UploadEvent) => void;
    onAfterUpload?: (e: UploadEvent) => void;
    onAfterDelete?: (e: UploadEvent) => void;
};

/**
 * 处理react tsx中直接使用web components报错问题
 */
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'image-upload': ImageUploadProps
        }
    }
}

const RcImageUpload: React.FC<RcImageUploadProps> = (props) => {
    const {
        id, width, height, pictureWidth, pictureHeight,
        listType, action, maxCount, multiple, accept, fileList,
        onUploadChange, onAfterUpload, onAfterDelete
    } = props;

    const _id = id || 'rc-image-upload';
    useEffect(() => {
        const upload: any = document.querySelector(`#${id}`);

        const _uploadChange = (e: UploadEvent) => {
            onUploadChange && onUploadChange(e);
        };
        const _afterUpload = (e: UploadEvent) => {
            onAfterUpload && onAfterUpload(e);
        };
        const _afterDelete = (e: UploadEvent) => {
            onAfterDelete && onAfterDelete(e);
        };

        if (upload) {
            upload.addEventListener('uploadChange', _uploadChange);
            upload.addEventListener('afterUpload', _afterUpload);
            upload.addEventListener('afterDelete', _afterDelete);
        }

        return () => {
            upload.removeEventListener('uploadChange', _uploadChange);
            upload.removeEventListener('afterUpload', _afterUpload);
            upload.removeEventListener('afterDelete', _afterDelete);
        }
    }, []);

    return (
        <image-upload
            id={_id}
            width={width}
            height={height}
            picture-width={pictureWidth}
            picture-height={pictureHeight}
            action={action}
            multiple={multiple}
            list-type={listType}
            max-count={maxCount}
            accept={accept}
            file-list={JSON.stringify(fileList || []) as any}
        />
    )
};

export default RcImageUpload;
