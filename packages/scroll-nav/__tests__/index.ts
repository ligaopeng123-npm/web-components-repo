/**********************************************************************
 *
 * @模块名称: index
 *
 * @模块作用: index
 *
 * @创建人: pgli
 *
 * @date: 2023/1/30 1:43 下午
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import "../src";

window.onload = function () {
    const nav = document.querySelector('scroll-nav');
    nav.setAttribute('items', JSON.stringify([{label: 'Web1', value: 1},
        {label: 'Web2', value: 'b'}, {label: 'Web3', value: 'c'}, {label: 'Web4', value: 'd'}, {label: 'Web5', value: 'f'}]));
    nav.addEventListener('onChange', ({detail}: any) => {
        console.log(detail);
    });
    // const {navClick} = createScrollNavEvent({
    //     navBar: document.querySelector('.nav-bar-wrap'),
    //     navList: [{label: 'a', value: '#a'}, {label: 'b', value: '#b'}, {label: 'c', value: '#c'}],
    //     onMenuChange: (v: any) => {
    //         console.log(v);
    //     }
    // });
    //
    // document.querySelector('.nav-bar').addEventListener('click', (e: any) => {
    //     navClick(e.target.getAttribute('data-id'));
    //     // menuClick
    // })
}