/**********************************************************************
 *
 * @模块名称: css
 *
 * @模块用途: css
 *
 * @date: 2022/1/27 17:23
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import {getSize} from "./utils";
import {delIcon, uploadIcon} from "./assets";

export type ImageUploadConfig = {
    width?: string | number;
    height?: string | number;
    'picture-width'?: string | number;
    'picture-height'?: string | number;
    action?: string;
    'list-type'?: 'picture-card' | 'picture';
    multiple?: boolean;
    accept?: string;
    'max-count'?: number;
    'file-list'?: any[];
}

export const template = (config: ImageUploadConfig) => {
    const {width, height, accept, multiple} = config;
    // list展示类型
    const listType = config['list-type'];
    const pictureWidth = config['picture-width'];
    const pictureHeight = config['picture-height'];
    const bColor = '#07f1ab';
    return `
			<style>
                .screenshot-upload {
                    position: relative;
                    display: flex;
                    width: ${getSize(width)};
				    height: ${getSize(height)};
                    background: #fafafa;
                    border: 1px dashed #d9d9d9;
                    border-radius: 2px;
                }
				.target {
				    width: ${getSize(width)};
				    height: ${getSize(height)};
				    font-size: 14px;
				    border-radius: 2px;
				    caret-color: ${bColor};
				    caret-shape: block;
				    position: absolute;
				}
				.target:focus {
				    outline: 1px dashed ${bColor};
				    border-color: transparent;
				}
				
				.target > span {
                    line-height: 60px;
                    font-size: 16px;
                    user-select: none;
                    margin-left: 16px;
				}
				
				#screenshot-upload-list {
				    display: flex;
				    margin-top: 60px;
				    z-index: 1;
				    width: 100%;
				    height: calc(100% - 60px);
                    overflow-y: auto;
                    overflow-x: hidden;
                    flex-flow: ${listType === 'picture-card' ? 'row' : 'wrap'} wrap;
				}
				
				/* 设置滚动条的样式 */
                #screenshot-upload-list::-webkit-scrollbar {
                    width: 4px;
                    height: 4px;
                }
                /* 滚动槽 */
                #screenshot-upload-list::-webkit-scrollbar-track {
                    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.2);
                    border-radius: 4px;
                }
                /* 滚动条滑块 */
                #screenshot-upload-list::-webkit-scrollbar-thumb {
                    border-radius: 4px;
                    background: #bbb;
                    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.25);
                }
				/* 展示类型 */
				.picture {
				    flex-direction: column;
				}
				.picture-item {
				    margin: 0px;
				    width: 100%;
				    cursor: pointer;
				    display: flex;
				    align-items: center;
				}
				.picture > .picture-item {
				    border-top: 1px solid #d9d9d9;
				}
				.picture > .picture-item > .del-bth {
				    margin-right: 16px;
				    margin-left: auto;
				}
				.picture-card > .picture-item > .del-bth {
				    position: absolute;
                    top: calc(50% - 8px);
                    left: calc(50% - 8px);
                    opacity: 0;
				}
				
				.picture-card > .picture-item > .del-bth:hover {
				    opacity: 1;
				}
				
				.picture-card > .picture-item {
				    border: 1px solid #d9d9d9;
				    width: ${getSize(pictureWidth)};
				    height: ${getSize(pictureHeight)};
				    position: relative;
				    margin: 0px 4px 4px 0px;
				}
				/*展示类型2*/
				.picture-card {
				    flex-direction: row;
				}
				
				#screenshot-upload-bth {
				    position: absolute;
				    right: 16px;
                    top: 16px;
				}
				
				#upload-bth {
				    cursor: pointer;
				}
				
				.picture-item-title {
				    width: calc(100% - 100px);
				    margin-left: 12px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
				}
				
			</style>
			<div class="screenshot-upload">
			    <div id="screenshot-upload-target" class="target" 
			         readonly="true" contenteditable="true">
			         <span>
			             光标选中后“Ctrl + V”粘贴图片
                     </span>
                    </div>
			    <div id="screenshot-upload-bth">
			        <input 
			            style="display: none" 
			            id="screenshot-upload-input" 
			            type="file" 
			            accept="${accept}" 
			            name="file" 
			            `
        + (multiple ? `multiple` : ``)
        + `
			            />
			            <span><img title="点击上传" id="upload-bth"
			             width="24" height="24" alt="上传" src="${uploadIcon}"/></span>
                </div>
			    <div id="screenshot-upload-list" class="${listType}"></div>
            </div>
			`;
}

/**
 * 图片模板
 * @param config
 */
export const pictureTemplate = (url: string, config: ImageUploadConfig, file?: File) => {
    const listType = config['list-type'];
    const pictureWidth = config['picture-width'];
    const pictureHeight = config['picture-height'];
    const div = document.createElement('div');
    div.classList.add('picture-item');
    const title = file.name || url;
    div.setAttribute('title', title)
    const pictureTemplate = `
            <img class="picture-img" width="${getSize(pictureWidth)}" height="${getSize(pictureHeight)}" alt="图片" src="${url}"/>
            ` + (listType === 'picture'
        ? `<span class="picture-item-title" style="width: calc(100% - ${(Number(pictureWidth) + 46)}px)">${title}</span>`
        : ``) + `
            <span class="del-bth" title="删除">
                <img class="del-icon" width="16" height="16" src="${delIcon}"/>
            </span>
        `;
    div.innerHTML = pictureTemplate;
    return div;
}
