/**********************************************************************
 *
 * @模块名称: utils
 *
 * @模块用途: utils
 *
 * @date: 2022/1/27 10:11
 *
 * @版权所有: pgli
 *
 **********************************************************************/
/**
 * 点击的是否是图片区域
 * @param dom
 */
export const isPictureItem = (dom: any) => {
    return dom?.classList.contains('picture-item')
}
/**
 * 是否点击的是删除按钮
 * @param dom
 */
export const isDelIcon = (dom: any) => {
    return dom?.classList.contains('del-icon')
}
/**
 * 点击的是否是图片区域
 * @param dom
 */
export const isPictureImg = (dom: any) => {
    return dom?.classList.contains('picture-img')
}

/**
 * 尺寸设置
 * @param size
 */
export const getSize = (size: number | string) => {
    if (`${size}`.endsWith('%') || `${size}`.endsWith('px')) {
        return size;
    } else {
        return `${size}px`
    }
}

/**
 * 预览base64图片 解决chorme的安全限制
 * @param base64URL
 */
export const openToPreviewBase64 = (base64URL: string) => {
    let win = window.open();
    // @ts-ignore
    win.document.write('<iframe src="' + base64URL + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
}
