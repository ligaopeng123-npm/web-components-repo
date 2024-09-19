/**********************************************************************
 *
 * @模块名称: utils
 *
 * @模块作用: utils
 *
 * @创建人: pgli
 *
 * @date: 2023/1/29 7:24 下午
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import { animate, debounce, getStyle, isString } from "@gaopeng123/utils";

/**
 * 检查浏览器是否支持某个css属性值
 */
function validatesCssValue(key: string, value: string) {
    const prefix = ['-o-', '-ms-', '-moz-', '-webkit-', ''];
    const prefixValue = [];
    for (let i = 0; i < prefix.length; i++) {
        prefixValue.push(prefix[i] + value)
    }
    const element = document.createElement('div');
    const eleStyle: any = element.style;
    for (let j = 0; j < prefixValue.length; j++) {
        eleStyle[key] = prefixValue[j];
    }
    return eleStyle[key];
}

const getPaddingTop = (target: Element) => {
    return parseInt(getStyle(target, 'paddingTop') || '0')
}

const getMarginTop = (target: Element) => {
    return parseInt(getStyle(target, 'marginTop') || '0')
}

/**
 * 获取标记
 * @param value
 */
const getAttrStr = (value: string) => {
    return `${value}-p-top`;
}


export type CreateScrollNavEventProps = {
    navBar: any,
    scrollDom?: string | HTMLElement,
    navList: Array<ScrollNavItem>,
    onChange: (v: ScrollNavItem) => void;
}

export const createScrollNavEvent = (
    {
        navBar,
        scrollDom,
        navList,
        onChange
    }: CreateScrollNavEventProps) => {
    /**
     * 选择滚动条
     */
    const scrollContainer: any = scrollDom
        ? (isString(scrollDom) ? document.querySelector(scrollDom as string) : scrollDom)
        : document.querySelector('body');
    const needFixed = true;
    // 这是body的paddingTop，因为导航栏的offsetParent不是body，因为要减去body的paddingTop才能用来跟导航栏的offsetTop做比较
    const extraFixed = getPaddingTop(scrollContainer);
    // 55 - 24：导航栏高度 - body的paddingTop
    // 在不吸顶的情况下，导航指定的内容只要滚动到body顶部就算到了该内容了的导航了，即滚动了【内容的offsetTop + body的paddingTop】的距离
    // 但是吸顶之后，只要滚动到吸顶导航栏底部就算到了指定导航内容了，所以相当于只要滚动【内容的offsetTop + body的paddingTop - 吸顶导航栏的高度】的距离就会到达临界值
    // 转换成公式来理解，c代表导航内容的offsetTop，s代表滚动的距离，body的paddingTop为24，吸顶导航栏高度为55。只要滚动距离大于等于上面说的临界值，即肯定到达了对应导航。
    const offsetTops: any = {};
    const isSupportSticky = validateSticky();
    calcTop(true);
    scrollContainer.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', debounce(handleResize, 200));

    // 检查拖动过程中标签是否变化
    let oldSelected: any;
    const _onChange = (v: ScrollNavItem) => {
        if (JSON.stringify(oldSelected) !== JSON.stringify(v)) {
            onChange(v);
            oldSelected = v;
        }
    }

    /**
     * 计算页面的各个offsetTop
     */
    function calcTop(realNav: boolean) {
        realNav && (offsetTops.navBar = navBar.offsetTop);
        for (let j = 0; j < navList.length; j++) {
            const { value } = navList[j];
            const currentDom: any = document.querySelector(`#${value}`)
            offsetTops[value] = currentDom.offsetTop;
            offsetTops[getAttrStr(value)] = getPaddingTop(currentDom);
        }
    }

    /**
     * 选择标题跳到对应内容
     */
    function navClick(e: Event | string) {
        let target: any;
        if (isString(e)) {
            const domList: any = scrollContainer.querySelectorAll('[data-id]');
            if (domList.length) {
                target = Array.from(domList).filter((itemDom: any) => itemDom.getAttribute('data-id') === e)[0];
            } else {
                console.error(`未查到attr=data-id的元素`);
                return;
            }
        } else {
            const ev: any = e || event;
            target = ev.target || ev.srcElement; // 兼容IE
        }
        if (target) {
            // body 当前拖动的scrollTop
            const currentScrollTop = scrollContainer.scrollTop;
            // 当前要指向的元素paddingTop
            const currentPaddingTop = getPaddingTop(target);
            // const currentMarginTop = getMarginTop(target);
            const navBarHeight = navBar.offsetHeight;
            const dataId = target.getAttribute('data-id');
            animate((v: number) => {
                scrollContainer.scrollTop = currentScrollTop
                    + (offsetTops[dataId] - currentScrollTop - navBarHeight - currentPaddingTop) * v
            }, {
                duration: 500,
                easing: 'cubicOut',
                afterAnimate: () => {
                    _onChange(navList.filter((item) => item.value === dataId)[0])
                }
            });
        } else {
            console.error(`未查到attr=data-id的元素`);
        }
    }

    /**
     * 检查浏览器是否有支持的sticky值，没有返回false，有就添加sticky相关css，实现吸顶
     */
    function validateSticky() {
        const supportStickyValue = validatesCssValue('position', 'sticky');
        if (supportStickyValue) {
            navBar.style.position = supportStickyValue;
            navBar.style.top = '0';
            return true;
        }
        return false;
    }

    /**
     * 监听滚动事件，实现吸顶和滚动导航
     */
    function handleScroll() {
        const top = scrollContainer.scrollTop;
        const fixedBaseTop = top + navBar.offsetHeight; // 这是吸顶之后用来做衡量的scrollTop
        const menuLength = navList.length;
        if (needFixed && !isSupportSticky) {
            // 这是控制导航栏吸顶 - 吸顶
            if ((top + extraFixed) >= offsetTops.navBar) {
                navBar.style.position = 'fixed';
                navBar.style.top = 0;
            }
            // 这是控制导航栏吸顶 - 取消吸顶
            if ((top + extraFixed) < offsetTops.navBar) {
                navBar.style.position = 'static';
                navBar.style.width = '100%';
                navBar.style.height = '100%';
            }
        }
        // 滚动条到达底部就选中最后一个导航
        if (Math.ceil(top + scrollContainer.clientHeight) >= scrollContainer.scrollHeight) {
            _onChange(navList[menuLength - 1]);
            return;
        }
        // 以下都为依据滚动自动选择对应导航
        for (let i = 0; i < menuLength - 1; i++) {
            const currentValue = navList[i].value;
            const nextValue = navList[i + 1].value;
            const currentFixedBaseTop = fixedBaseTop + offsetTops[getAttrStr(currentValue)];
            if (currentFixedBaseTop >= offsetTops[currentValue] && currentFixedBaseTop < offsetTops[nextValue]) {
                _onChange(navList[i]);
                return;
            }
        }
        const lastMenuVal = navList[menuLength - 1].value;
        if (fixedBaseTop + offsetTops[getAttrStr(lastMenuVal)] >= offsetTops[lastMenuVal]) {
            _onChange(navList[menuLength - 1]);
            return;
        }
        _onChange(navList[0]);
    }

    /**
     * 监听resize事件，变化时重新计算offsetTop
     */
    function handleResize() {
        calcTop(true);
    }

    return {
        navClick: navClick
    }
}

/**
 * 处理react tsx中直接使用web components报错问题
 */
export type ScrollNavItem = {
    label: string,
    value: string,
}
export type ScrollNavProps = {
    items: Array<ScrollNavItem>;
    'scroll-dom'?: string; // 滚动的父级节点
    'primary-color'?: string;
    'text-color'?: string;
    'background-color'?: string;
}