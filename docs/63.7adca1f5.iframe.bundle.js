"use strict";(self.webpackChunkweb_components_repo=self.webpackChunkweb_components_repo||[]).push([[63],{"./node_modules/.pnpm/@gaopeng123+utils.function@1.1.18-alpha.2/node_modules/@gaopeng123/utils.function/dist/utils.function.esm.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{X1:()=>windowSize,Y5:()=>_fullscreen,sg:()=>debounce});var _gaopeng123_utils_types__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/.pnpm/@gaopeng123+utils.types@1.1.18-alpha.1/node_modules/@gaopeng123/utils.types/dist/utils.types.esm.js"),compose=function compose(){for(var _len=arguments.length,fns=new Array(_len),_key=0;_key<_len;_key++)fns[_key]=arguments[_key];return 0===fns.length?function(arg){return arg}:1===fns.length?fns[0]:fns.reduce((function(a,b){return function(){return a(b.apply(void 0,arguments))}}))};var Error$1,Monad=function Monad(v){var _this=this;this.value=null,this.map=function(fn){return Monad.of(fn(_this.value))},this.join=function(){return _this.value instanceof Monad?_this.value.join():_this.value},this.chain=function(fn){return fn(_this.join())},this.value=v};Monad.of=function(v){return new Monad(v)},function(Error){Error[Error.DataError=0]="DataError",Error[Error.TypeError=1]="TypeError"}(Error$1||(Error$1={}));var TypeEnum,ResponseMonad=function ResponseMonad(v){var _this=this;this.mapCallbacks=[],this.catchCallbacks=[],this.effectCallbacks=[],this.effect=function(fn){return _this.effectCallbacks.push(fn),_this},this.map=function(fn){return _this.mapCallbacks.push(fn),_this},this.join=function(){try{return compose.apply(void 0,_this.mapCallbacks)(_this.value.join())}catch(e){compose.apply(void 0,_this.catchCallbacks)(Error$1.TypeError,e)}},this.chain=function(fn){return new Promise((function(resolve){resolve(!0)})).then((function(){if(_this.effectCallbacks.length){var _v=_this.value.join();compose.apply(void 0,_this.effectCallbacks)(_v)?fn(_this.join()):compose.apply(void 0,_this.catchCallbacks)(Error$1.DataError,_v)}else fn(_this.join())})),_this},this.catch=function(fn){return _this.catchCallbacks.push(fn),_this},this.value=Monad.of(v)};ResponseMonad.of=function(v){return new ResponseMonad(v)},function(TypeEnum){TypeEnum.fullscreen="fullscreen",TypeEnum.noFullscreen="noFullscreen"}(TypeEnum||(TypeEnum={}));var _fullscreen=function fullscreen(el,options){return _fullscreen=el.requestFullscreen?function fullscreen(el,options){return el.requestFullscreen(options)}:el.webkitRequestFullScreen?function fullscreen(el,options){return el.webkitRequestFullScreen(options)}:el.mozRequestFullScreen?function fullscreen(el,options){return el.mozRequestFullScreen(options)}:function fullscreen(el,options){return el.msRequestFullscreen(options)},_fullscreen(el,options)},windowSize=function windowSize(){var xScroll,yScroll,windowWidth,windowHeight;return window.innerHeight&&window.scrollMaxY?(xScroll=window.innerWidth+window.scrollMaxX,yScroll=window.innerHeight+window.scrollMaxY):document.body.scrollHeight>document.body.offsetHeight?(xScroll=document.body.scrollWidth,yScroll=document.body.scrollHeight):(xScroll=document.body.offsetWidth,yScroll=document.body.offsetHeight),window.self.innerHeight?(windowWidth=document.documentElement.clientWidth?document.documentElement.clientWidth:window.self.innerWidth,windowHeight=window.self.innerHeight):document.documentElement&&document.documentElement.clientHeight?(windowWidth=document.documentElement.clientWidth,windowHeight=document.documentElement.clientHeight):document.body&&(windowWidth=document.body.clientWidth,windowHeight=document.body.clientHeight),{width:xScroll<windowWidth?xScroll:windowWidth,height:yScroll<windowHeight?windowHeight:yScroll,availWidth:windowWidth,availHeight:windowHeight,screenHeight:window.screen.height,screenWidth:window.screen.width,pcZoom:pcZoom()}},pcZoom=function pcZoom(){var ratio=1,screen=window.screen;return void 0!==window.devicePixelRatio?ratio=window.devicePixelRatio:(0,_gaopeng123_utils_types__WEBPACK_IMPORTED_MODULE_0__.lT)()?screen.deviceXDPI&&screen.logicalXDPI&&(ratio=screen.deviceXDPI/screen.logicalXDPI):void 0!==window.outerWidth&&void 0!==window.innerWidth&&(ratio=window.outerWidth/window.innerWidth),ratio&&(ratio=Math.round(100*ratio)),ratio},debounce=function debounce(fn,wait,options){return function createDebounce(fn,_wait,options,_timeout){var _ref=options||{},leading=_ref.leading,notDebounce=_ref.notDebounce,callNow=!0;return function _debounce(){for(var _len=arguments.length,arg=new Array(_len),_key=0;_key<_len;_key++)arg[_key]=arguments[_key];notDebounce&&(0,_gaopeng123_utils_types__WEBPACK_IMPORTED_MODULE_0__.Tn)(notDebounce)&&notDebounce.apply(void 0,arg);var context=this,args=arguments;return _timeout&&clearTimeout(_timeout),leading&&callNow?(fn.apply(context,args),callNow=!1):_timeout=setTimeout((function(){fn.apply(context,args)}),_wait),_timeout}}(fn,wait||200,function debounceOptions(options){return Object.assign({leading:!1},options)}(options),undefined)}},"./node_modules/.pnpm/@gaopeng123+utils.string@1.1.18-alpha.2/node_modules/@gaopeng123/utils.string/dist/utils.string.esm.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{up:()=>addBoxSizeUnit});__webpack_require__("./node_modules/.pnpm/@gaopeng123+utils.types@1.1.18-alpha.1/node_modules/@gaopeng123/utils.types/dist/utils.types.esm.js"),__webpack_require__("./node_modules/.pnpm/@gaopeng123+utils.function@1.1.18-alpha.2/node_modules/@gaopeng123/utils.function/dist/utils.function.esm.js");var addBoxSizeUnit=function addBoxSizeUnit(size){for(var sizeStr=(size+"").replace(/;/,"").trim(),_i=0,_units=["em","px","%","rem","vw","vh","vmax","vmin","ex"];_i<_units.length;_i++){var key=_units[_i];if(sizeStr.endsWith(key))return sizeStr}return size+"px"}},"./node_modules/.pnpm/@gaopeng123+utils.types@1.1.18-alpha.1/node_modules/@gaopeng123/utils.types/dist/utils.types.esm.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Et:()=>isNumber,Gv:()=>isObject,Im:()=>isEmpty,Kg:()=>isString,Tn:()=>isFunction,b0:()=>isUndefined,cy:()=>isArray,fo:()=>isFile,lT:()=>isIE,vq:()=>isElement});var toString=Object.prototype.toString,isObject=function isObject(val){return"[object Object]"===toString.call(null)?null!=val&&"[object Object]"===toString.call(val)&&void 0===val.ownerDocument:"[object Object]"===toString.call(val)},isArray=function isArray(val){return"isArray"in Array?Array.isArray(val):"[object Array]"===toString.call(val)},isString=function isString(val){return"string"==typeof val},isUndefined=function isUndefined(val){return void 0===val},isNumber=function isNumber(val){return"number"==typeof val&&isFinite(val)},isFunction=function isFunction(val){return"undefined"!=typeof document&&"function"==typeof document.getElementsByTagName("body")?!!val&&"[object Function]"===toString.call(val):!!val&&"function"==typeof val},isElement=function isElement(val){return!!val&&1===(null==val?void 0:val.nodeType)},isEmpty=function isEmpty(val){return null==val||""===val||isArray(val)&&0===(null==val?void 0:val.length)||isObject(val)&&isEmptyObject(val)},isEmptyObject=function isEmptyObject(val){return"{}"===JSON.stringify(val)},isFile=function isFile(val){return"[object File]"===toString.call(val)},check=function check(regex,userAgent){return regex.test((userAgent||navigator.userAgent).toLowerCase())},isOpera=function isOpera(userAgent){return check(/opera/,userAgent)},isIE=function isIE(userAgent){return!isOpera(userAgent)&&(check(/msie/,userAgent)||check(/edge/,userAgent))||!!window.ActiveXObject||"ActiveXObject"in window}}}]);