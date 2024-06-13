import { CardEllipsis } from "../src";
import "../src";


window.onload = function () {
    document.querySelector('card-ellipsis').addEventListener('onChange', (e)=> {
        console.log('onChange', e);
    });
    // setTimeout(()=> {
    //     var node = document.querySelector('#content').firstChild;
    //     document.querySelector('#content').appendChild(node);
    // }, 5000)
}