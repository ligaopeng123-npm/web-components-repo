/**********************************************************************
 *
 * @模块名称: typings
 *
 * @模块用途: typings
 *
 * @date: 2022/2/10 16:59
 *
 * @版权所有: pgli
 *
 **********************************************************************/
/**
 * 处理react tsx中直接使用web components报错问题
 */
export interface ImageUploadProps {
    id?: string;
    width?: string | number;
    height?: string | number;
    'picture-width'?: string | number;
    'picture-height'?: string | number;
    action?: string;
    'list-type'?: 'picture-card' | 'picture';
    multiple?: boolean;
    accept?: string;
    'max-count': number; // 最大上传个数
    'file-list'?: any[];
}
