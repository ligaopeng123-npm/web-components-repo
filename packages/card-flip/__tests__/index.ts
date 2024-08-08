import { CardFlip } from "../src";
import "../src";


window.onload = function () {
    setTimeout(()=> {
        console.log(111, document.querySelector('card-flip'))
        document.querySelector('card-flip')?.setAttribute('type', 'y');
    }, 5000)
}