"use strict";(self.webpackChunkweb_components_repo=self.webpackChunkweb_components_repo||[]).push([[993],{"./node_modules/.pnpm/@gaopeng123+utils.file@1.1.16/node_modules/@gaopeng123/utils.file/dist/utils.file.esm.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{pS:()=>classnames,tq:()=>downloadScreenshotPicture,v0:()=>blob2Base64});var _gaopeng123_utils_types__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/.pnpm/@gaopeng123+utils.types@1.1.16-alpha.4/node_modules/@gaopeng123/utils.types/dist/utils.types.esm.js"),urlJoinParams=(__webpack_require__("./node_modules/.pnpm/@gaopeng123+utils.object@1.1.16/node_modules/@gaopeng123/utils.object/dist/utils.object.esm.js"),__webpack_require__("./node_modules/.pnpm/@gaopeng123+utils.string@1.1.16/node_modules/@gaopeng123/utils.string/dist/utils.string.esm.js"),function urlJoinParams(params){if((0,_gaopeng123_utils_types__WEBPACK_IMPORTED_MODULE_0__.Gv)(params)){var str="",count=1;for(var i in params){str+=""+(count>1?"&":"")+i+"="+params[i],count++}return str?"?"+str:str}return""});var downloadClickA=function downloadClickA(_ref){var href=_ref.href,fileName=_ref.fileName,blob=_ref.blob,elt=document.createElement("a");elt.setAttribute("href",href),elt.setAttribute("target","_blank"),elt.setAttribute("download",fileName||function getFileNameFromUrl(url){var urlArr=url.split("/"),currentUrl=urlArr[urlArr.length-1];return currentUrl.includes(".")?currentUrl:null}(href)||"default"),elt.style.display="none",document.body.appendChild(elt),elt.click(),document.body.removeChild(elt),blob&&URL.revokeObjectURL(href)},download=function download(config){var url=config.url,fileName=config.fileName,blob=config.blob,params=config.params,origin=config.origin;if(!url&&!blob)return new Error("url or blob is undefined");var _params=params||config.parmas;if(blob)downloadClickA({href:URL.createObjectURL(blob),blob,fileName});else if(function checkOrigin(url){return(null==url?void 0:url.startsWith(window.location.origin))||!(null!=url&&url.startsWith("http"))}(url)||!origin)downloadClickA({href:url+urlJoinParams(_params),blob,fileName});else{var xhr=new window.XMLHttpRequest;xhr.open("GET",url+urlJoinParams(_params),!0),xhr.setRequestHeader("Access-Control-Allow-Origin","*"),xhr.responseType="blob",xhr.onload=function(){downloadClickA({href:URL.createObjectURL(xhr.response),blob:xhr.response,fileName})},xhr.send()}};var toBase64=function toBase64(_ref){var _canvas,canvas=_ref.canvas,type=_ref.type,encoderOptions=_ref.encoderOptions;if(null!=(_canvas=canvas)&&_canvas.toDataURL){var base64Str=canvas.toDataURL(type||"image/png",(0,_gaopeng123_utils_types__WEBPACK_IMPORTED_MODULE_0__.b0)(encoderOptions)?1:encoderOptions);return canvas=null,base64Str}return""},downloadScreenshotPicture=function downloadScreenshotPicture(dom,options){var videoDom;if(videoDom=(0,_gaopeng123_utils_types__WEBPACK_IMPORTED_MODULE_0__.vq)(dom)?dom:document.getElementById(dom),console.log("videoDom",videoDom),videoDom){var canvas;if(console.log("videoDom.tagName",videoDom.tagName),"VIDEO"===videoDom.tagName){canvas=document.createElement("canvas");var width=options.width||videoDom.offsetWidth,height=options.height||videoDom.offsetHeight;canvas.width=width,canvas.height=height,canvas.style.height=width+"px",canvas.style.height=height+"px",canvas.getContext("2d").drawImage(videoDom,0,0,width,height)}else canvas=videoDom;download({url:toBase64({canvas,type:(null==options?void 0:options.type)||"image/png",encoderOptions:null==options?void 0:options.encoderOptions}),fileName:null==options?void 0:options.fileName})}},blob2Base64=function blob2Base64(blob){return new Promise((function(resolve,reject){var reader=new FileReader;reader.readAsDataURL(blob),reader.onload=function(event){var base64_str=event.target.result;resolve(base64_str)}}))},hasOwn={}.hasOwnProperty,classnames=function classnames(){for(var classes=[],i=0;i<arguments.length;i++){var arg=i<0||arguments.length<=i?void 0:arguments[i];if(arg)if((0,_gaopeng123_utils_types__WEBPACK_IMPORTED_MODULE_0__.Kg)(arg)||(0,_gaopeng123_utils_types__WEBPACK_IMPORTED_MODULE_0__.Et)(arg))classes.push(arg);else if((0,_gaopeng123_utils_types__WEBPACK_IMPORTED_MODULE_0__.cy)(arg)){if(arg.length){var inner=classnames.apply(null,arg);inner&&classes.push(inner)}}else if((0,_gaopeng123_utils_types__WEBPACK_IMPORTED_MODULE_0__.Gv)(arg)){if(arg.toString!==Object.prototype.toString&&!arg.toString.toString().includes("[native code]")){classes.push(arg.toString());continue}for(var key in arg)hasOwn.call(arg,key)&&arg[key]&&classes.push(key)}}return classes.join(" ")}},"./node_modules/.pnpm/@gaopeng123+utils.object@1.1.16/node_modules/@gaopeng123/utils.object/dist/utils.object.esm.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{US:()=>assignDeep,gd:()=>getStyle,Sq:()=>parentByExpected});var utils_types_esm=__webpack_require__("./node_modules/.pnpm/@gaopeng123+utils.types@1.1.16-alpha.4/node_modules/@gaopeng123/utils.types/dist/utils.types.esm.js");__webpack_require__("./node_modules/.pnpm/@gaopeng123+utils.function@1.1.16/node_modules/@gaopeng123/utils.function/dist/utils.function.esm.js");var getStyle=function getStyle(el,styleName){if((0,utils_types_esm.vq)(el)){if(el.currentStyle)return el.currentStyle[styleName];var computed=getComputedStyle(el,null);return computed[styleName]||(computed.getPropertyValue?computed.getPropertyValue(styleName):"")}return""},parentByExpected=function parentByExpected(dom,expected){return"BODY"===dom.tagName||(0,utils_types_esm.Tn)(expected)&&expected(dom)?dom:parentByExpected(dom.parentNode||dom.parentElement,expected)},mergeArray=function mergeArray(input){return input.map(mergeValue)},mergeObject=function mergeObject(source){var output={};for(var key in source)source.hasOwnProperty(key)&&(output[key]=mergeValue(source[key]));return output},mergeValue=function mergeValue(value){return(0,utils_types_esm.Gv)(value)?mergeObject(value):(0,utils_types_esm.cy)(value)?mergeArray(value):value},deepMerge=function deepMerge(target,sources,options){for(var _options={arrayHandle:(null==options?void 0:options.arrayHandle)||"replace"},output=target||{},oIndex=0;oIndex<sources.length;oIndex++)for(var source=sources[oIndex],keys=Object.keys(source),kIndex=0;kIndex<keys.length;kIndex++){var key=keys[kIndex],sourceValue=source[key],targetValue=output[key];if((0,utils_types_esm.Gv)(sourceValue))if((0,utils_types_esm.b0)(targetValue))output[key]=mergeValue(sourceValue);else{var existingValue=(0,utils_types_esm.Gv)(targetValue)?targetValue:{};output[key]=deepMerge({},[existingValue,mergeValue(sourceValue)],_options)}else if((0,utils_types_esm.cy)(sourceValue))if((0,utils_types_esm.cy)(targetValue))if("cover"===_options.arrayHandle)output[key]=targetValue;else{var newValue=mergeArray(sourceValue);output[key]="merge"===_options.arrayHandle?output[key].concat(newValue):newValue}else output[key]=mergeArray(sourceValue);else output[key]=sourceValue}return output},assignDeep=function assignDeep(target){for(var _len=arguments.length,source=new Array(_len>1?_len-1:0),_key=1;_key<_len;_key++)source[_key-1]=arguments[_key];return deepMerge(target,source)}}}]);