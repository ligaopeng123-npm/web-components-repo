/*! For license information please see 476.1f47becc.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkweb_components_repo=self.webpackChunkweb_components_repo||[]).push([[476],{"./node_modules/.pnpm/@gaopeng123+utils.function@1.1.16/node_modules/@gaopeng123/utils.function/dist/utils.function.esm.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{X1:()=>windowSize,i0:()=>animate,nF:()=>throttle,sg:()=>debounce});var _gaopeng123_utils_types__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/.pnpm/@gaopeng123+utils.types@1.1.16-alpha.4/node_modules/@gaopeng123/utils.types/dist/utils.types.esm.js"),compose=function compose(){for(var _len=arguments.length,fns=new Array(_len),_key=0;_key<_len;_key++)fns[_key]=arguments[_key];return 0===fns.length?function(arg){return arg}:1===fns.length?fns[0]:fns.reduce((function(a,b){return function(){return a(b.apply(void 0,arguments))}}))};var Error$1,Monad=function Monad(v){var _this=this;this.value=null,this.map=function(fn){return Monad.of(fn(_this.value))},this.join=function(){return _this.value instanceof Monad?_this.value.join():_this.value},this.chain=function(fn){return fn(_this.join())},this.value=v};Monad.of=function(v){return new Monad(v)},function(Error){Error[Error.DataError=0]="DataError",Error[Error.TypeError=1]="TypeError"}(Error$1||(Error$1={}));var TypeEnum,ResponseMonad=function ResponseMonad(v){var _this=this;this.mapCallbacks=[],this.catchCallbacks=[],this.effectCallbacks=[],this.effect=function(fn){return _this.effectCallbacks.push(fn),_this},this.map=function(fn){return _this.mapCallbacks.push(fn),_this},this.join=function(){try{return compose.apply(void 0,_this.mapCallbacks)(_this.value.join())}catch(e){compose.apply(void 0,_this.catchCallbacks)(Error$1.TypeError,e)}},this.chain=function(fn){return new Promise((function(resolve){resolve(!0)})).then((function(){if(_this.effectCallbacks.length){var _v=_this.value.join();compose.apply(void 0,_this.effectCallbacks)(_v)?fn(_this.join()):compose.apply(void 0,_this.catchCallbacks)(Error$1.DataError,_v)}else fn(_this.join())})),_this},this.catch=function(fn){return _this.catchCallbacks.push(fn),_this},this.value=Monad.of(v)};ResponseMonad.of=function(v){return new ResponseMonad(v)},function(TypeEnum){TypeEnum.fullscreen="fullscreen",TypeEnum.noFullscreen="noFullscreen"}(TypeEnum||(TypeEnum={}));var windowSize=function windowSize(){var xScroll,yScroll,windowWidth,windowHeight;return window.innerHeight&&window.scrollMaxY?(xScroll=window.innerWidth+window.scrollMaxX,yScroll=window.innerHeight+window.scrollMaxY):document.body.scrollHeight>document.body.offsetHeight?(xScroll=document.body.scrollWidth,yScroll=document.body.scrollHeight):(xScroll=document.body.offsetWidth,yScroll=document.body.offsetHeight),window.self.innerHeight?(windowWidth=document.documentElement.clientWidth?document.documentElement.clientWidth:window.self.innerWidth,windowHeight=window.self.innerHeight):document.documentElement&&document.documentElement.clientHeight?(windowWidth=document.documentElement.clientWidth,windowHeight=document.documentElement.clientHeight):document.body&&(windowWidth=document.body.clientWidth,windowHeight=document.body.clientHeight),{width:xScroll<windowWidth?xScroll:windowWidth,height:yScroll<windowHeight?windowHeight:yScroll,availWidth:windowWidth,availHeight:windowHeight,screenHeight:window.screen.height,screenWidth:window.screen.width,pcZoom:pcZoom()}},pcZoom=function pcZoom(){var ratio=1,screen=window.screen;return void 0!==window.devicePixelRatio?ratio=window.devicePixelRatio:(0,_gaopeng123_utils_types__WEBPACK_IMPORTED_MODULE_0__.lT)()?screen.deviceXDPI&&screen.logicalXDPI&&(ratio=screen.deviceXDPI/screen.logicalXDPI):void 0!==window.outerWidth&&void 0!==window.innerWidth&&(ratio=window.outerWidth/window.innerWidth),ratio&&(ratio=Math.round(100*ratio)),ratio},debounce=function debounce(fn,wait,options){return function createDebounce(fn,_wait,options,_timeout){var _ref=options||{},leading=_ref.leading,notDebounce=_ref.notDebounce,callNow=!0;return function _debounce(){for(var _len=arguments.length,arg=new Array(_len),_key=0;_key<_len;_key++)arg[_key]=arguments[_key];notDebounce&&(0,_gaopeng123_utils_types__WEBPACK_IMPORTED_MODULE_0__.Tn)(notDebounce)&&notDebounce.apply(void 0,arg);var context=this,args=arguments;return _timeout&&clearTimeout(_timeout),leading&&callNow?(fn.apply(context,args),callNow=!1):_timeout=setTimeout((function(){fn.apply(context,args)}),_wait),_timeout}}(fn,wait||200,function debounceOptions(options){return Object.assign({leading:!1},options)}(options),undefined)},throttle=function throttle(fn,wait,options){return function createThrottle(fn,wait,options,timeout){var lastArgs;return function _throttle(){for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++)args[_key]=arguments[_key];var type=options.type,notThrottle=options.notThrottle,leading=options.leading,trailing=options.trailing;notThrottle&&(0,_gaopeng123_utils_types__WEBPACK_IMPORTED_MODULE_0__.Tn)(notThrottle)&&notThrottle.apply(void 0,args);var context=this;if(1===type||leading&&2!==type){var now=Date.now();now-timeout>wait&&(fn.apply(context,args),timeout=now)}else(2===type||trailing)&&(trailing&&(lastArgs=args),timeout||(0===timeout&&leading?(fn.apply(context,args),timeout=null):timeout=setTimeout((function(){fn.apply(context,trailing?lastArgs:args),(0,_gaopeng123_utils_types__WEBPACK_IMPORTED_MODULE_0__.Tn)(options.clearTimeout)?options.clearTimeout(null):timeout=null}),wait)));return timeout}}(fn,wait||200,function throttleOptions(options){return Object.assign({type:1,leading:!1},options)}(options),0)},easingFuncs={linear:function linear(k){return k},quadraticIn:function quadraticIn(k){return k*k},quadraticOut:function quadraticOut(k){return k*(2-k)},quadraticInOut:function quadraticInOut(k){return(k*=2)<1?.5*k*k:-.5*(--k*(k-2)-1)},cubicIn:function cubicIn(k){return k*k*k},cubicOut:function cubicOut(k){return--k*k*k+1},cubicInOut:function cubicInOut(k){return(k*=2)<1?.5*k*k*k:.5*((k-=2)*k*k+2)},quarticIn:function quarticIn(k){return k*k*k*k},quarticOut:function quarticOut(k){return 1- --k*k*k*k},quarticInOut:function quarticInOut(k){return(k*=2)<1?.5*k*k*k*k:-.5*((k-=2)*k*k*k-2)},quinticIn:function quinticIn(k){return k*k*k*k*k},quinticOut:function quinticOut(k){return--k*k*k*k*k+1},quinticInOut:function quinticInOut(k){return(k*=2)<1?.5*k*k*k*k*k:.5*((k-=2)*k*k*k*k+2)},sinusoidalIn:function sinusoidalIn(k){return 1-Math.cos(k*Math.PI/2)},sinusoidalOut:function sinusoidalOut(k){return Math.sin(k*Math.PI/2)},sinusoidalInOut:function sinusoidalInOut(k){return.5*(1-Math.cos(Math.PI*k))},exponentialIn:function exponentialIn(k){return 0===k?0:Math.pow(1024,k-1)},exponentialOut:function exponentialOut(k){return 1===k?1:1-Math.pow(2,-10*k)},exponentialInOut:function exponentialInOut(k){return 0===k?0:1===k?1:(k*=2)<1?.5*Math.pow(1024,k-1):.5*(2-Math.pow(2,-10*(k-1)))},circularIn:function circularIn(k){return 1-Math.sqrt(1-k*k)},circularOut:function circularOut(k){return Math.sqrt(1- --k*k)},circularInOut:function circularInOut(k){return(k*=2)<1?-.5*(Math.sqrt(1-k*k)-1):.5*(Math.sqrt(1-(k-=2)*k)+1)},elasticIn:function elasticIn(k){var s,a=.1;return 0===k?0:1===k?1:(!a||a<1?(a=1,s=.1):s=.4*Math.asin(1/a)/(2*Math.PI),-a*Math.pow(2,10*(k-=1))*Math.sin((k-s)*(2*Math.PI)/.4))},elasticOut:function elasticOut(k){var s,a=.1;return 0===k?0:1===k?1:(!a||a<1?(a=1,s=.1):s=.4*Math.asin(1/a)/(2*Math.PI),a*Math.pow(2,-10*k)*Math.sin((k-s)*(2*Math.PI)/.4)+1)},elasticInOut:function elasticInOut(k){var s,a=.1,p=.4;return 0===k?0:1===k?1:(!a||a<1?(a=1,s=.1):s=p*Math.asin(1/a)/(2*Math.PI),(k*=2)<1?a*Math.pow(2,10*(k-=1))*Math.sin((k-s)*(2*Math.PI)/p)*-.5:a*Math.pow(2,-10*(k-=1))*Math.sin((k-s)*(2*Math.PI)/p)*.5+1)},backIn:function backIn(k){var s=1.70158;return k*k*((s+1)*k-s)},backOut:function backOut(k){var s=1.70158;return--k*k*((s+1)*k+s)+1},backInOut:function backInOut(k){var s=2.5949095;return(k*=2)<1?k*k*((s+1)*k-s)*.5:.5*((k-=2)*k*((s+1)*k+s)+2)},bounceIn:function bounceIn(k){return 1-easingFuncs.bounceOut(1-k)},bounceOut:function bounceOut(k){return k<1/2.75?7.5625*k*k:k<2/2.75?7.5625*(k-=1.5/2.75)*k+.75:k<2.5/2.75?7.5625*(k-=2.25/2.75)*k+.9375:7.5625*(k-=2.625/2.75)*k+.984375},bounceInOut:function bounceInOut(k){return k<.5?.5*easingFuncs.bounceIn(2*k):.5*easingFuncs.bounceOut(2*k-1)+.5}},animate=function animate(callBack,config){var handlerId,start=0,startTime=Date.now(),_Object$assign=Object.assign({duration:1e3,easing:"linear"},config),duration=_Object$assign.duration,easing=_Object$assign.easing,afterAnimate=_Object$assign.afterAnimate,easingFn=(0,_gaopeng123_utils_types__WEBPACK_IMPORTED_MODULE_0__.Tn)(easing)?easing:easingFuncs[easing];return function step(){start+=Date.now()-startTime,startTime=Date.now(),start<=duration?(callBack(easingFn(start/duration)),handlerId=requestAnimationFrame(step)):(callBack(1),(0,_gaopeng123_utils_types__WEBPACK_IMPORTED_MODULE_0__.Tn)(afterAnimate)&&afterAnimate())}(),{clear:function clear(){cancelAnimationFrame(handlerId)}}}},"./node_modules/.pnpm/@gaopeng123+utils.string@1.1.16/node_modules/@gaopeng123/utils.string/dist/utils.string.esm.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{uR:()=>uuid,up:()=>addBoxSizeUnit,vf:()=>addOpacity});var _gaopeng123_utils_types__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/.pnpm/@gaopeng123+utils.types@1.1.16-alpha.4/node_modules/@gaopeng123/utils.types/dist/utils.types.esm.js");__webpack_require__("./node_modules/.pnpm/@gaopeng123+utils.function@1.1.16/node_modules/@gaopeng123/utils.function/dist/utils.function.esm.js");var uuid=function uuid(len,radix){if(void 0===len&&(len=64),void 0===radix&&(radix=62),(0,_gaopeng123_utils_types__WEBPACK_IMPORTED_MODULE_0__.Bd)()&&window.crypto){var uuidStr=crypto.randomUUID();if(uuidStr)return uuidStr}var i,r,chars="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),uuid=[];if(radix=radix||chars.length,len)for(i=0;i<len;i++)uuid[i]=chars[0|Math.random()*radix];else for(uuid[8]=uuid[13]=uuid[18]=uuid[23]="-",uuid[14]="4",i=0;i<36;i++)uuid[i]||(r=0|16*Math.random(),uuid[i]=chars[19==i?3&r|8:r]);return uuid.join("")},COLOR_REGEXP=/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/,addOpacity=function addOpacity(color,opacity){if(void 0===opacity&&(opacity=1),!color)return"#ffffff";var col=color.toLowerCase();if(col.startsWith("rgba")){var finalStr=col.split(",");return col.replace(finalStr[finalStr.length-1],opacity+")")}return color.startsWith("#")&&(col=function hex2Rgb(col){var sColor=col.toLowerCase();if(sColor&&COLOR_REGEXP.test(sColor)){if(4===sColor.length){for(var sColorNew="#",i=1;i<4;i+=1)sColorNew+=sColor.slice(i,i+1).concat(sColor.slice(i,i+1));sColor=sColorNew}for(var sColorChange=[],_i=1;_i<7;_i+=2)sColorChange.push(parseInt("0x"+sColor.slice(_i,_i+2)));return"rgb("+sColorChange.join(",")+")"}return sColor}(col).toLowerCase()),col=(col=col.replace(/rgb\(/,"rgba(")).replace(/\)/,","+opacity+")")},addBoxSizeUnit=function addBoxSizeUnit(size){for(var sizeStr=(size+"").replace(/;/,"").trim(),_i=0,_units=["em","px","%","rem","vw","vh","vmax","vmin","ex"];_i<_units.length;_i++){var key=_units[_i];if(sizeStr.endsWith(key))return sizeStr}return size+"px"}},"./node_modules/.pnpm/@gaopeng123+utils.types@1.1.16-alpha.4/node_modules/@gaopeng123/utils.types/dist/utils.types.esm.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{$P:()=>isDate,Bd:()=>isBrowser,Et:()=>isNumber,Fr:()=>isMobile,Gv:()=>isObject,Hn:()=>isTrue,Im:()=>isEmpty,Kg:()=>isString,P4:()=>isJSON,RI:()=>isEmptyObject,Tn:()=>isFunction,b0:()=>isUndefined,cy:()=>isArray,fo:()=>isFile,lT:()=>isIE,vd:()=>isValidDate,vq:()=>isElement,zf:()=>isUTC});var toString=Object.prototype.toString,isObject=function isObject(val){return"[object Object]"===toString.call(null)?null!=val&&"[object Object]"===toString.call(val)&&void 0===val.ownerDocument:"[object Object]"===toString.call(val)},isArray=function isArray(val){return"isArray"in Array?Array.isArray(val):"[object Array]"===toString.call(val)},isString=function isString(val){return"string"==typeof val},isUndefined=function isUndefined(val){return void 0===val},isNumber=function isNumber(val){return"number"==typeof val&&isFinite(val)},isBoolean=function isBoolean(val){return"boolean"==typeof val},isTrue=function isTrue(val){return isBoolean(val)?val:"true"===val},isFunction=function isFunction(val){return"undefined"!=typeof document&&"function"==typeof document.getElementsByTagName("body")?!!val&&"[object Function]"===toString.call(val):!!val&&"function"==typeof val},isElement=function isElement(val){return!!val&&1===(null==val?void 0:val.nodeType)},isEmpty=function isEmpty(val){return null==val||""===val||isArray(val)&&0===(null==val?void 0:val.length)||isObject(val)&&isEmptyObject(val)},isEmptyObject=function isEmptyObject(val){return"{}"===JSON.stringify(val)},isJSON=function isJSON(val){if(isObject(val)||isArray(val))return!0;if(!isString(val))return!1;var str=val;if(str.startsWith("{")&&!str.endsWith("}"))return!1;if(str.startsWith("[")&&!str.endsWith("]"))return!1;if(!(null!=str&&str.startsWith("{")||null!=str&&str.startsWith("[")))return!1;try{return JSON.parse(str),!0}catch(e){return!1}},isDate=function isDate(val){return"[object Date]"===toString.call(val)},isValidDate=function isValidDate(date){return date instanceof Date&&!isNaN(date.getTime())},isUTC=function isUTC(val){return!!isString(val)&&/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.\d{3}\+00:00$/.test(val)},isFile=function isFile(val){return"[object File]"===toString.call(val)},isBrowser=function isBrowser(){return"undefined"!=typeof window&&null!==window&&undefined===window},check=function check(regex,userAgent){return regex.test((userAgent||navigator.userAgent).toLowerCase())},isOpera=function isOpera(userAgent){return check(/opera/,userAgent)},isIE=function isIE(userAgent){return!isOpera(userAgent)&&(check(/msie/,userAgent)||check(/edge/,userAgent))||!!window.ActiveXObject||"ActiveXObject"in window},isMobile=function isMobile(){return check(/Android|webOS|iPhone|iPod|BlackBerry/i)}},"./node_modules/.pnpm/react@17.0.2/node_modules/react/cjs/react-jsx-runtime.production.min.js":(__unused_webpack_module,exports,__webpack_require__)=>{__webpack_require__("./node_modules/.pnpm/object-assign@4.1.1/node_modules/object-assign/index.js");var f=__webpack_require__("./node_modules/.pnpm/react@17.0.2/node_modules/react/index.js"),g=60103;if(exports.Fragment=60107,"function"==typeof Symbol&&Symbol.for){var h=Symbol.for;g=h("react.element"),exports.Fragment=h("react.fragment")}var m=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,n=Object.prototype.hasOwnProperty,p={key:!0,ref:!0,__self:!0,__source:!0};function q(c,a,k){var b,d={},e=null,l=null;for(b in void 0!==k&&(e=""+k),void 0!==a.key&&(e=""+a.key),void 0!==a.ref&&(l=a.ref),a)n.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:g,type:c,key:e,ref:l,props:d,_owner:m.current}}exports.jsx=q,exports.jsxs=q},"./node_modules/.pnpm/react@17.0.2/node_modules/react/jsx-runtime.js":(module,__unused_webpack_exports,__webpack_require__)=>{module.exports=__webpack_require__("./node_modules/.pnpm/react@17.0.2/node_modules/react/cjs/react-jsx-runtime.production.min.js")}}]);