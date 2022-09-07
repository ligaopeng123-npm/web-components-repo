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
import { useEffect } from 'react';
import "@gaopeng123/image-upload";
import { AfterUpload, ImageUploadProps } from "@gaopeng123/image-upload";

type UploadEvent = AfterUpload;

type FileItem = {
    name: string,
    url: string,
}
type RcImageUploadProps = {
    id: string;
    width?: string | number;
    height?: string | number;
    pictureWidth?: string | number; // 图片宽高
    pictureHeight?: string | number;
    action?: string; // 上传的路径
    listType?: 'picture-card' | 'picture';
    multiple?: boolean; // 是否支持多选
    accept?: string; // 支持类型 默认.png,.jpg,.jpeg
    maxCount?: number; // 最大上传个数
    fileList?: FileItem[]; // 上传列表
    preventPreview?: boolean; // 阻止默认预览
    onPreview?: (e: FileItem) => void; // 预览事件
    onUploadChange?: (e: UploadEvent) => void; // 上传事件
    onAfterUpload?: (e: UploadEvent) => void; // 上传后事件
    onAfterDelete?: (e: UploadEvent) => void; // 删除后事件;
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
        id, width, height, pictureWidth, pictureHeight, preventPreview,
        listType, action, maxCount, multiple, accept, fileList,
        onUploadChange, onAfterUpload, onAfterDelete, onPreview
    } = props;

    const _id = id || 'rc-image-upload';
    useEffect(() => {
        const upload: any = document.querySelector(`#${id}`);

        const _preview = (e: FileItem) => {
            onPreview && onPreview(e);
        };
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
            upload.addEventListener('onPreview', _preview);
            upload.addEventListener('uploadChange', _uploadChange);
            upload.addEventListener('afterUpload', _afterUpload);
            upload.addEventListener('afterDelete', _afterDelete);
        }

        return () => {
            upload.removeEventListener('onPreview', _preview);
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
            prevent-preview={preventPreview}
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
