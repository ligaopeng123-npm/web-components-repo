/** ********************************************************************
 *
 * @模块名称: utils
 *
 * @模块用途: utils
 *
 * @date: 2022/6/10 16:53
 *
 * @版权所有: pgli
 *
 ********************************************************************* */
import {isBoolean} from "@gaopeng123/utils.types";

/**
 * 是否是true
 * @param val
 */
export const isTrue = (val: any) => {
    return isBoolean(val) ? val : val === 'true';
}

/**
 * 是否是false
 * @param val
 */
export const isFalse = (val: any) => {
    return isBoolean(val) ? val : val === 'false';
}

export const getItemClass = ()=> {

}
