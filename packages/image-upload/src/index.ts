import { isFile, isString, isUndefined } from '@gaopeng123/utils.types';
import { parentByExpected } from '@gaopeng123/utils.object';
import { blob2Base64 } from "@gaopeng123/utils.file";
import {
    isDelIcon,
    isPictureImg,
    isPictureItem,
    isPreviewIcon,
    isTrue,
    openToPreviewBase64,
    targetText
} from "./utils";
import { pictureTemplate, template } from "./template";
import { initMsg } from '@gaopeng123/message';
import { ImageUploadProps } from "./interface";

export type { ImageUploadProps } from "./interface";

export type FileItem = { url: string, name: string };
export type UploadChangeDetails = {
    fileList: Array<FileItem | File>,
    file?: FileItem | File,
    response?: Response;
}
export type UploadChange = {
    detail: UploadChangeDetails,
    [propName: string]: any,
}

export type AfterUpload = {
    detail: UploadChangeDetails,
    [propName: string]: any,
}

export type AfterDelete = {
    detail: UploadChangeDetails,
    [propName: string]: any,
}

export default class ImageUpload extends HTMLElement {
    shadow: any = null;
    qmsg: any = null;
    /**
     * 保存配置信息
     */
    __config: ImageUploadProps = {
        width: '100%',
        height: 200,
        'prevent-preview': false,
        'picture-width': 48,
        'picture-height': 48,
        action: '', // 上传地址
        'list-type': 'picture', // picture 和 picture-card
        accept: '.png,.jpg,.jpeg', // 支持图片类型
        multiple: true, // 是否支持多选
        'max-count': Number.MAX_SAFE_INTEGER, // 最多限制上传的数据
        'file-list': [],
    }

    get config() {
        return this.__config;
    }

    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'closed'});
        // @ts-ignore
        this.qmsg = initMsg(this);
        this.qmsg.config({
            showClose: true
        });
    }

    /**
     * 生命周期钩子函数 处理挂载
     */
    connectedCallback() {
        this.shadow.innerHTML = template(this.config);
        this.addEvent();
    }

    /**
     * 移除文档流
     */
    disconnectedCallback() {
        this.removeEvent();
    }


    /**
     * 暴露哪些属性可以被监听
     * @returns {string[]}
     */
    // @ts-ignore
    static get observedAttributes() {
        return [
            'width',
            'height',
            'picture-width',
            'picture-height',
            'list-type',
            'accept',
            'multiple',
            'action',
            'prevent-preview',
            'max-count',
            'file-list',
        ];
    }

    /**
     * 当自定义元素的一个属性被增加、移除或更改时被调用。
     * 需要setAttribute 才能被触发
     */
    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (oldValue !== newValue) {
            // @ts-ignore
            this.__config[name] = newValue;
            if (name === 'file-list') {
                this.renderFileList();
            }
        }
    }

    addEvent() {
        this.addMouseoverEvent();
        this.addPasteEvent();
        this.addPictureClick();
        this.addUploadClick();
        this.addUploadChange();
        this.addDragEvent();
        this.addEnterEvent();
    }

    removeEvent() {
        this.removeMouseoverEvent();
        this.removePasteEvent();
        this.removePictureClick();
        this.removeUploadClick();
        this.removeUploadChange();
        this.removeDragEvent();
        this.removeEnterEvent();
    }

    /**
     * 输入事件
     * @param e
     */
    onInput = (e: any) => {
        // 替换掉输入的文案 不支持用户输入其他文本
        this.targetText.innerText = targetText;
    }

    /**
     * 输入事件
     */
    addEnterEvent() {
        this.imageUploadTarget.addEventListener('input', this.onInput)
    }

    removeEnterEvent() {
        this.imageUploadTarget.removeEventListener('input', this.onInput);
    }

    /**
     * 添加拖拽事件
     */
    addDragEvent() {
        // 拖离事件
        // this.imageUpload.addEventListener('dragenter', () => {
        //
        // }, false);
        // 拖进事件
        // this.imageUpload.addEventListener('dragleave', () => {
        //
        // }, false);
        // 拖动过程 todo 必须阻止冒泡否则会触发浏览器的默认行为
        this.imageUpload.addEventListener('dragover', (e: Event) => {
            e.preventDefault();
            e.stopPropagation();
        }, false);
        // 拖拽方下
        this.imageUpload.addEventListener('drop', this.onUploadChange, false);
    }

    /**
     * 移除拖拽事件
     */
    removeDragEvent() {
        this.imageUpload.removeEventListener('drop', this.onUploadChange, false);
    }

    /**
     * 渲染list表格
     */
    renderFileList() {
        // @ts-ignore
        const fileList = isString(this.config['file-list']) ? JSON.parse(this.config['file-list']) : this.config['file-list'];
        this.fileList = fileList;
        this.fileList.forEach((file: any) => {
            this.insertPicture(file.url || file, file);
        });
    }

    /**
     * 是否达到最大值
     */
    isMax(len = 0) {
        if ((this.fileList.length + len) > this.maxCount) {
            this.qmsg.info(`上传图片不能多于${this.maxCount}张`);
            return true;
        }
        return false;
    }

    /**
     * 最多上传图片数量
     */
    get maxCount() {
        return Number(this.config['max-count'])
    }

    /**
     * 获取当前存在列表的数据
     */
    __fileList: any[] = [];

    get fileList(): any {
        return this.__fileList;
    }

    set fileList(files) {
        this.__fileList = files;
    }

    getFileList = () => {
        return this.fileList;
    }
    /**
     * 预览处理
     */
    previewProcessing = (base64: string, file: File, index: number) => {
        this.insertPicture(base64, file);
        this.fileList.push(file);
        this.uploadFetch(file, index);
        if (!this.config.action) {
            this.dispatchEvent(new CustomEvent('uploadChange', {
                detail: {file: file, fileList: this.fileList}
            }));
        }
    }
    /**
     * 处理上传
     * @param file
     */
    uploadFetch = (file: File, index: number) => {
        if (this.config.action) {
            const formData = new FormData();
            formData.append('file', file);
            fetch(this.config.action, {
                method: 'post',
                body: formData,
            })
                .then(response => response.json())
                .then((data) => {
                    const currentFile = this.fileList[isUndefined(index) ? this.fileList.length - 1 : index];
                    if (currentFile) {
                        currentFile.response = data;
                    }
                    this.dispatchEvent(new CustomEvent('afterUpload', {
                        detail: {response: data, fileList: this.fileList}
                    }));
                    this.dispatchEvent(new CustomEvent('uploadChange', {
                        detail: {file: file, fileList: this.fileList}
                    }));
                });
        }
    }

    onMouseover = () => {
        this.imageUploadTarget.focus();
    }
    /**
     * 监听粘贴事件
     * @param event
     */
    onPaste = (event: any) => {
        event.preventDefault();
        // clipboard 需要用户授权 有点影响体验 暂时不支持
        // navigator.clipboard.read().then((res) => {
        //     console.log(111, res);
        // });
        if (!this.isMax(1)) {
            // @ts-ignore
            const pasteData = event.clipboardData || window.clipboardData;
            //获取图片内容
            const blob = pasteData?.items[0]?.getAsFile();
            if (blob) {
                //判断是不是图片，最好通过文件类型判断
                const isImg = (blob && 1) || -1;
                if (isImg < 0) {
                    return;
                }
                blob2Base64(blob).then((base64_str) => {
                    this.previewProcessing(base64_str, blob, undefined);
                });
            } else {
                console.warn(`粘贴板上不是图片！`);
                this.qmsg.warning(`粘贴板上不是图片！`);
            }
        }
    }
    /**
     * 获取预览图片
     * @param target
     */
    getPreviewImageFormTarget = (target: EventTarget): string => {
        // @ts-ignore
        const img = target.querySelector('img') || target;
        return img.getAttribute('src');
    }
    /**
     * 图片点击事件
     * @param event
     */
    onPictureClick = (event: any) => {
        // 点击的是picture-item
        if (isPictureItem(event.target) || isPictureImg(event.target)) {
            const base64 = this.getPreviewImageFormTarget(event.target);
            openToPreviewBase64(base64);
        }
        // 点击的删除按钮
        else if (isDelIcon(event.target)) {
            this.removePicture(event.target);
        }
        // 点击的删除按钮
        else if (isPreviewIcon(event.target)) {
            const picture = this.getPreviewPicture(event.target);
            if (picture) {
                const preview = (file: FileItem) => {
                    const preventPreview = this.config['prevent-preview'];
                    if (!isTrue(preventPreview)) {
                        openToPreviewBase64(file.url); // preventPreview
                    }
                    this.dispatchEvent(new CustomEvent('onPreview', {
                        detail: {file: file, fileList: this.fileList}
                    }));
                }
                if (isFile(picture)) {
                    blob2Base64(picture).then((str: string) => {
                        preview({url: str, name: picture.name})
                    })
                } else {
                    preview(picture)
                }
            }
        }
    }
    /**
     * 上传按钮点击事件
     * @param event
     */
    onUploadClick = (event: Event) => {
        event.stopPropagation();
        this.uploadInput.click();
    }
    /**
     * 上传input触发事件
     * @param event
     */
    onUploadChange = (event: Event) => {
        event.preventDefault();
        event.stopPropagation();
        // @ts-ignore
        const files = event.target.files || event.dataTransfer.files;
        if (!this.isMax(files.length)) {
            const promises = [];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (file.type.indexOf('image') === -1) {
                    this.qmsg.info(`仅支持上传图片，非图片类型已被禁止！`);
                    continue;
                }
                promises.push(blob2Base64(files[i]));
            }
            Promise.all(promises).then((urls) => {
                const baseLen = this.fileList.length;
                urls.forEach((base64_str, index) => {
                    this.previewProcessing(base64_str, files[index], baseLen + index);
                })
            });
        }
    }

    addPasteEvent() {
        this.imageUploadTarget.addEventListener('paste', this.onPaste);
    }

    removePasteEvent() {
        this.imageUploadTarget.removeEventListener('paste', this.onPaste);
    }

    // image-upload
    addMouseoverEvent() {
        this.imageUpload.addEventListener('mouseenter', this.onMouseover);
    }

    removeMouseoverEvent() {
        this.imageUpload.removeEventListener('mouseenter', this.onMouseover);
    }

    addPictureClick() {
        this.imageUploadList.addEventListener('click', this.onPictureClick);
    }

    removePictureClick() {
        this.imageUploadList.removeEventListener('click', this.onPictureClick);
    }

    addUploadClick() {
        this.uploadBth.addEventListener('click', this.onUploadClick);
    }

    removeUploadClick() {
        this.uploadBth.removeEventListener('click', this.onUploadClick);
    }

    addUploadChange() {
        this.uploadInput.addEventListener('change', this.onUploadChange);
    }

    removeUploadChange() {
        this.uploadInput.removeEventListener('change', this.onUploadChange);
    }

    get targetText() {
        return this.shadow.querySelector('.target-text');
    }

    get imageUpload() {
        return this.shadow.querySelector('#image-upload');
    }

    get imageUploadTarget() {
        return this.shadow.querySelector('#screenshot-upload-target');
    }

    get imageUploadList() {
        return this.shadow.querySelector('#screenshot-upload-list');
    }

    get uploadBth() {
        return this.shadow.querySelector('#upload-bth');
    }

    get uploadInput() {
        return this.shadow.querySelector('#screenshot-upload-input');
    }

    /**
     * 插入图片
     */
    insertPicture = (url: string, file?: File) => {
        if (this.imageUploadList) {
            this.imageUploadList.appendChild(pictureTemplate(url, this.config, file));
        }
    }

    /**
     * 获取
     * @param target
     */
    getPreviewPicture(target: any) {
        const rPicture = this.findRemovePicture(target);
        const pictureList = this.imageUploadList.querySelectorAll('.picture-item');
        for (let i = 0; i < pictureList.length; i++) {
            if (rPicture === pictureList[i]) {
                return this.fileList[i];
            }
        }
    }

    /**
     * 删除图片
     * @param target
     */
    removePicture(target: any) {
        const rPicture = this.findRemovePicture(target);
        const pictureList = this.imageUploadList.querySelectorAll('.picture-item');
        let delFile;
        // 删除fileList中维护的数据
        for (let i = 0; i < pictureList.length; i++) {
            if (rPicture === pictureList[i]) {
                delFile = this.fileList.splice(i, 1);
            }
        }
        this.imageUploadList.removeChild(rPicture);
        this.dispatchEvent(new CustomEvent('afterDelete', {
            detail: {file: delFile, fileList: this.fileList}
        }));
        /**
         * 图片删除 也调用下uploadChange 发送消息
         */
        this.dispatchEvent(new CustomEvent('uploadChange', {
            detail: {file: null, fileList: this.fileList}
        }));
    }

    /**
     * 找到要移除的图片
     * @param targe
     */
    findRemovePicture(targe: any) {
        return parentByExpected(targe, (current: any) => {
            return isPictureItem(current);
        })
    }
}

if (!customElements.get('image-upload')) {
    customElements.define('image-upload', ImageUpload);
}
