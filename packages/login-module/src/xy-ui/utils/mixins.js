/**
 * @函数名称：copyProperties
 * @param
 * @作用：类的属性和函数copy
 */
function copyProperties(target, source) {
    for (let key of Reflect.ownKeys(source)) {
        if ( key !== 'constructor'
            && key !== 'prototype'
            // && key !== 'name' // name 属性允许继承
        ) {
            let desc = Object.getOwnPropertyDescriptor(source, key);
            Object.defineProperty(target, key, desc);
        }
    }
}

/**
 * @函数名称：mixin
 * @param  类名
 * @作用：实现多继承
 * @return：继承后的类
 */
export function mixin(...mixins) {
    class Mix {
        constructor() {
            for (let mixin of mixins) {
                copyProperties(this, new mixin()); // 拷贝实例属性
            }
        }
    }

    for (let mixin of mixins) {
        copyProperties(Mix, mixin); // 拷贝静态属性
        copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
    }

    return Mix;
}
