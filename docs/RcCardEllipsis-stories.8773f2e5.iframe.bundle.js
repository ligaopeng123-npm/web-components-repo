(self.webpackChunkweb_components_repo=self.webpackChunkweb_components_repo||[]).push([[549],{"./stories/RcCardEllipsis.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,default:()=>RcCardEllipsis_stories,props:()=>props});var react=__webpack_require__("./node_modules/.pnpm/react@17.0.2/node_modules/react/index.js"),utils_string_esm=(__webpack_require__("./node_modules/.pnpm/@gaopeng123+utils.types@1.1.15/node_modules/@gaopeng123/utils.types/dist/utils.types.esm.js"),__webpack_require__("./node_modules/.pnpm/@gaopeng123+utils.file@1.1.16/node_modules/@gaopeng123/utils.file/dist/utils.file.esm.js"),__webpack_require__("./node_modules/.pnpm/@gaopeng123+utils.array@1.1.15/node_modules/@gaopeng123/utils.array/dist/utils.array.esm.js"),__webpack_require__("./node_modules/.pnpm/@gaopeng123+utils.string@1.1.16/node_modules/@gaopeng123/utils.string/dist/utils.string.esm.js")),utils_esm=(__webpack_require__("./node_modules/.pnpm/@gaopeng123+utils.object@1.1.16/node_modules/@gaopeng123/utils.object/dist/utils.object.esm.js"),__webpack_require__("./node_modules/.pnpm/@gaopeng123+utils.function@1.1.16/node_modules/@gaopeng123/utils.function/dist/utils.function.esm.js"),__webpack_require__("./node_modules/.pnpm/@gaopeng123+utils.date@1.1.15/node_modules/@gaopeng123/utils.date/dist/utils.date.esm.js"),__webpack_require__("./node_modules/.pnpm/@gaopeng123+utils.number@1.1.15/node_modules/@gaopeng123/utils.number/dist/utils.number.esm.js"),__webpack_require__("./node_modules/.pnpm/@gaopeng123+utils@1.1.15/node_modules/@gaopeng123/utils/dist/utils.esm.js"));function _defineProperties(e,r){for(var t=0;t<r.length;t++){var o=r[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,_toPropertyKey(o.key),o)}}function _getPrototypeOf(t){return _getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},_getPrototypeOf(t)}function _isNativeReflectConstruct(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(t){}return(_isNativeReflectConstruct=function(){return!!t})()}function _setPrototypeOf(t,e){return _setPrototypeOf=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},_setPrototypeOf(t,e)}function _toPropertyKey(t){var i=function _toPrimitive(t,r){if("object"!=typeof t||!t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var i=e.call(t,r||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(t)}(t,"string");return"symbol"==typeof i?i:i+""}function _wrapNativeSuper(t){var r="function"==typeof Map?new Map:void 0;return _wrapNativeSuper=function(t){if(null===t||!function _isNativeFunction(t){try{return-1!==Function.toString.call(t).indexOf("[native code]")}catch(n){return"function"==typeof t}}(t))return t;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==r){if(r.has(t))return r.get(t);r.set(t,Wrapper)}function Wrapper(){return function _construct(t,e,r){if(_isNativeReflectConstruct())return Reflect.construct.apply(null,arguments);var o=[null];o.push.apply(o,e);var p=new(t.bind.apply(t,o));return r&&_setPrototypeOf(p,r.prototype),p}(t,arguments,_getPrototypeOf(this).constructor)}return Wrapper.prototype=Object.create(t.prototype,{constructor:{value:Wrapper,enumerable:!1,writable:!0,configurable:!0}}),_setPrototypeOf(Wrapper,t)},_wrapNativeSuper(t)}var template=function template(config){var minHeight=(0,utils_esm.up$)(config["min-height"]);return"\n        <style>\n        .container {\n            position: relative;\n            width: calc(100% - 2px);\n        }\n\n        .body {\n            overflow: hidden;\n            width: 100%;\n            border: 1px solid transparent;\n            transition: all .3s;\n        }\n\n        .body-expand {\n            position: absolute;\n            background: var(--background-color, #fff);\n            z-index: 1;\n        }\n\n        .body-collapse {\n\n        }\n        \n        @keyframes fadeIn {\n            0% {\n                opacity: 0;\n            }\n            100% {\n                opacity: 1;\n            }\n        }\n        \n        .body-collapse > .body-more {\n            position: absolute;\n            background-image: linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, #fff 100%);\n            height: "+(parseInt(minHeight)-60>30?60:parseInt(minHeight)/2)+"px;\n            animation: fadeIn .3s forwards;\n        }\n        \n        .body-expand > .body-more {\n        }\n\n        .body-more {\n            bottom: 0px;\n            text-align: center;\n            width: 100%;\n            cursor: pointer;\n            display: flex;\n            justify-content: center;\n            align-items: flex-end;\n            font-size: 14px;\n            color: var(--text-color, #1677ff);\n        }\n\n        .hover {\n            border: 1px solid var(--border-color, rgba(0, 0, 0, .09));\n            box-shadow: 0 2px 8px var(--border-color, rgba(0, 0, 0, .09));\n            transition: all .3s;\n        }\n\n        .body-collapse > .body-more::after {\n            content: var(--expand-text, '更多');\n            background: var(--expand-image, '');\n            background-size: cover;\n            position: relative;\n            top: 4px;\n            min-height: 22px;\n            min-width: 22px;\n        }\n\n        .body-expand > .body-more::after {\n            content: var(--collapse-text, '收起');\n            background: var(--collapse-image, '');\n            background-size: cover;\n            position: relative;\n            top: 4px;\n            min-height: 22px;\n            min-width: 22px;\n        }\n        </style>\n        <div class=\"container\" style=\"height: "+minHeight+';">\n            <div style="height: '+minHeight+';"  class="body body-collapse">\n                <slot name="content"></slot>\n                <div class="body-more"></div>\n            </div>\n        </div>\n    '},CardEllipsis=function(_HTMLElement){function CardEllipsis(){var _this;return(_this=_HTMLElement.call(this)||this).shadow=null,_this.__config={"min-height":100,mode:"complex"},_this.timmer=null,_this.render=function(){clearTimeout(_this.timmer),_this.timmer=setTimeout((function(){_this.destroy(),_this.shadow.innerHTML=template(_this.config),_this.init()}),10)},_this.init=function(){_this.bodyMore.addEventListener("click",_this.moreClick),_this.bodyMore.addEventListener("mouseenter",_this.onmouseenter),_this.bodyMore.addEventListener("mouseleave",_this.onmouseleave),_this._slot.addEventListener("slotchange",_this.onslotchange),_this.addObserver()},_this.destroy=function(){_this.bodyMore.removeEventListener("click",_this.moreClick),_this.bodyMore.removeEventListener("mouseenter",_this.onmouseenter),_this.bodyMore.removeEventListener("mouseleave",_this.onmouseleave),_this._slot.removeEventListener("slotchange",_this.onslotchange),_this.observer.disconnect()},_this.addObserver=function(){var targetNode=_this.querySelector('[slot="content"]');_this.observer=new MutationObserver((function callback(mutationsList){console.log("dom 变化啦！"),_this.domChange()})),_this.observer.observe(targetNode,{attributes:!1,childList:!0,subtree:!1})},_this.moreClick=function(){var body=_this.body,bodyStyle=body.style;body.classList.contains("body-expand")?(body.classList.remove("body-expand"),body.classList.add("body-collapse"),bodyStyle.setProperty("height",(0,utils_esm.up$)(_this.config["min-height"]))):(body.classList.remove("body-collapse"),body.classList.add("body-expand"),_this.setBodyMaxHeight()),_this.dispatchEvent(new CustomEvent("onChange",{detail:{expand:body.classList.contains("body-expand")}}))},_this.onmouseenter=function(){_this.body.classList.add("hover")},_this.onmouseleave=function(){_this.body.classList.remove("hover")},_this.onslotchange=function(e){console.log("onslotchange")},_this.domChange=function(){_this.body.classList.contains("body-expand")&&_this.setBodyMaxHeight()},_this.shadow=_this.attachShadow({mode:"open"}),_this.shadow.innerHTML=template(_this.config),_this}!function _inheritsLoose(t,o){t.prototype=Object.create(o.prototype),t.prototype.constructor=t,_setPrototypeOf(t,o)}(CardEllipsis,_HTMLElement);var _proto=CardEllipsis.prototype;return _proto.connectedCallback=function connectedCallback(){this.init()},_proto.disconnectedCallback=function disconnectedCallback(){this.destroy()},_proto.attributeChangedCallback=function attributeChangedCallback(name,oldValue,newValue){oldValue!==newValue&&(this.__config[name]=newValue),this.render()},_proto.setBodyMaxHeight=function setBodyMaxHeight(){var bodyStyle=this.body.style;if("complex"===this.config.mode){bodyStyle.setProperty("height","auto");var height=this.body.getBoundingClientRect().height;bodyStyle.setProperty("height",(0,utils_esm.up$)(this.config["min-height"])),requestAnimationFrame((function(){bodyStyle.setProperty("height",height+"px")}))}else bodyStyle.setProperty("height",(0,utils_esm.up$)(this.maxHeight))},function _createClass(e,r,t){return r&&_defineProperties(e.prototype,r),t&&_defineProperties(e,t),Object.defineProperty(e,"prototype",{writable:!1}),e}(CardEllipsis,[{key:"config",get:function get(){return this.__config}},{key:"bodyMore",get:function get(){return this.shadow.querySelector(".body-more")}},{key:"_slot",get:function get(){return this.shadow.querySelector("slot")}},{key:"body",get:function get(){return this.shadow.querySelector(".body")}},{key:"maxHeight",get:function get(){return this.querySelector('[slot="content"]').scrollHeight+this.bodyMore.scrollHeight}}],[{key:"observedAttributes",get:function get(){return["min-height","mode"]}}])}(_wrapNativeSuper(HTMLElement));customElements.get("card-ellipsis")||customElements.define("card-ellipsis",CardEllipsis);var jsx_runtime=__webpack_require__("./node_modules/.pnpm/react@17.0.2/node_modules/react/jsx-runtime.js");const RcCardEllipsis=props=>{const[id]=(0,react.useState)("card-ellipsis"+(0,utils_string_esm.uR)(16));return(0,react.useEffect)((()=>{const card=document.querySelector(`#${id}`),onChange=e=>{const detail=e.detail;props.onChange&&props.onChange(detail)};return card?.addEventListener("onChange",onChange),()=>{card?.removeEventListener("onChange",onChange)}}),[]),(0,jsx_runtime.jsx)("card-ellipsis",{mode:props.mode,id,"min-height":props.minHeight,children:(0,jsx_runtime.jsx)("div",{slot:"content",children:props.children})})};RcCardEllipsis.displayName="RcCardEllipsis";const src_RcCardEllipsis=RcCardEllipsis;try{RcCardEllipsis.displayName="RcCardEllipsis",RcCardEllipsis.__docgenInfo={description:"",displayName:"RcCardEllipsis",props:{minHeight:{defaultValue:null,description:"",name:"minHeight",required:!1,type:{name:"number"}},mode:{defaultValue:null,description:"",name:"mode",required:!1,type:{name:"enum",value:[{value:'"simple"'},{value:'"complex"'}]}},onChange:{defaultValue:null,description:"",name:"onChange",required:!1,type:{name:"(v: RcCardEllipsisChangeValue) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/rc-card-ellipsis/src/RcCardEllipsis.tsx#RcCardEllipsis"]={docgenInfo:RcCardEllipsis.__docgenInfo,name:"RcCardEllipsis",path:"packages/rc-card-ellipsis/src/RcCardEllipsis.tsx#RcCardEllipsis"})}catch(__react_docgen_typescript_loader_error){}var dist=__webpack_require__("./node_modules/.pnpm/@storybook+blocks@7.6.19_sfoxds7t5ydpegc3knd667wn6m/node_modules/@storybook/blocks/dist/index.mjs");const RcCardEllipsis_stories={title:"Example/RcCardEllipsis",component:src_RcCardEllipsis,parameters:{layout:"centered",docs:{page:Story=>(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:(0,jsx_runtime.jsx)(dist.oz,{children:"# RcCardEllipsis\n\n`卡片展开和收起 ` [在线demo](https://ligaopeng123-npm.github.io/web-components-repo/?path=/docs/example-rccardellipsis--props)  \n\n## Usage\n\n```tsx\nimport * as React from 'react';\nimport * as ReactDOM from 'react-dom';\nimport { RcCardEllipsis } from \"../src\";\n\nconst App = () => {\n    return (\n        <RcCardEllipsis onChange={(e)=> {\n            console.log(e);\n        }} minHeight={100} mode=\"simple\">\n            12<br/>\n            12<br/>\n            12<br/>\n            12<br/>\n            12<br/>\n            12<br/>\n            12<br/>\n        </RcCardEllipsis>\n    );\n};\n\nReactDOM.render(<App/>, document.getElementById('root'));\n```\n\n"})})}},tags:["autodocs"],argTypes:{}},props={args:{minHeight:120,children:(0,jsx_runtime.jsx)("div",{id:"value1",style:{height:200,width:"100%",background:"red"},children:"我是要展开的card"})}};props.parameters={...props.parameters,docs:{...props.parameters?.docs,source:{originalSource:"{\n  args: {\n    minHeight: 120,\n    children: <div id={'value1'} style={{\n      height: 200,\n      width: '100%',\n      background: 'red'\n    }}>\n            我是要展开的card\n        </div>\n  }\n}",...props.parameters?.docs?.source}}};const __namedExportsOrder=["props"]},"./node_modules/.pnpm/memoizerific@1.11.3/node_modules/memoizerific sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/.pnpm/memoizerific@1.11.3/node_modules/memoizerific sync recursive",module.exports=webpackEmptyContext}}]);