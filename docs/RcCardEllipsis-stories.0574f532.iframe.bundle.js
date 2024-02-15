"use strict";(self.webpackChunkweb_components_repo=self.webpackChunkweb_components_repo||[]).push([[908],{"./stories/RcCardEllipsis.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,default:()=>RcCardEllipsis_stories,props:()=>props});var react=__webpack_require__("./node_modules/.pnpm/react@17.0.2/node_modules/react/index.js"),utils_string_esm=(__webpack_require__("./node_modules/.pnpm/@gaopeng123+utils.types@1.1.14/node_modules/@gaopeng123/utils.types/dist/utils.types.esm.js"),__webpack_require__("./node_modules/.pnpm/@gaopeng123+utils.file@1.1.14/node_modules/@gaopeng123/utils.file/dist/utils.file.esm.js"),__webpack_require__("./node_modules/.pnpm/@gaopeng123+utils.array@1.1.7/node_modules/@gaopeng123/utils.array/dist/utils.array.esm.js"),__webpack_require__("./node_modules/.pnpm/@gaopeng123+utils.string@1.1.14/node_modules/@gaopeng123/utils.string/dist/utils.string.esm.js")),utils_esm=(__webpack_require__("./node_modules/.pnpm/@gaopeng123+utils.object@1.1.14/node_modules/@gaopeng123/utils.object/dist/utils.object.esm.js"),__webpack_require__("./node_modules/.pnpm/@gaopeng123+utils.function@1.1.14/node_modules/@gaopeng123/utils.function/dist/utils.function.esm.js"),__webpack_require__("./node_modules/.pnpm/@gaopeng123+utils.date@1.1.7/node_modules/@gaopeng123/utils.date/dist/utils.date.esm.js"),__webpack_require__("./node_modules/.pnpm/@gaopeng123+utils@1.1.10/node_modules/@gaopeng123/utils/dist/utils.esm.js"));function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,(arg=descriptor.key,key=void 0,"symbol"==typeof(key=function _toPrimitive(input,hint){if("object"!=typeof input||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!=typeof res)return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string"))?key:String(key)),descriptor)}var arg,key}function _getPrototypeOf(o){return _getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf.bind():function _getPrototypeOf(o){return o.__proto__||Object.getPrototypeOf(o)},_getPrototypeOf(o)}function _setPrototypeOf(o,p){return _setPrototypeOf=Object.setPrototypeOf?Object.setPrototypeOf.bind():function _setPrototypeOf(o,p){return o.__proto__=p,o},_setPrototypeOf(o,p)}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}function _construct(Parent,args,Class){return _construct=_isNativeReflectConstruct()?Reflect.construct.bind():function _construct(Parent,args,Class){var a=[null];a.push.apply(a,args);var instance=new(Function.bind.apply(Parent,a));return Class&&_setPrototypeOf(instance,Class.prototype),instance},_construct.apply(null,arguments)}function _wrapNativeSuper(Class){var _cache="function"==typeof Map?new Map:void 0;return _wrapNativeSuper=function _wrapNativeSuper(Class){if(null===Class||!function _isNativeFunction(fn){return-1!==Function.toString.call(fn).indexOf("[native code]")}(Class))return Class;if("function"!=typeof Class)throw new TypeError("Super expression must either be null or a function");if(void 0!==_cache){if(_cache.has(Class))return _cache.get(Class);_cache.set(Class,Wrapper)}function Wrapper(){return _construct(Class,arguments,_getPrototypeOf(this).constructor)}return Wrapper.prototype=Object.create(Class.prototype,{constructor:{value:Wrapper,enumerable:!1,writable:!0,configurable:!0}}),_setPrototypeOf(Wrapper,Class)},_wrapNativeSuper(Class)}var template=function template(config){var minHeight=(0,utils_esm.GU$)(config["min-height"]);return"\n        <style>\n        .container {\n            position: relative;\n            width: calc(100% - 2px);\n        }\n\n        .body {\n            overflow: hidden;\n            width: 100%;\n            border: 1px solid transparent;\n            transition: all .3s;\n        }\n\n        .body-expand {\n            position: absolute;\n            background: var(--background-color, #fff);\n            z-index: 1;\n        }\n\n        .body-collapse {\n\n        }\n        \n        .body-collapse > .body-more {\n            position: absolute;\n            background-image: linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, #fff 100%);\n            height: "+(parseInt(minHeight)-60>30?60:parseInt(minHeight)/2)+"px;\n        }\n        \n        .body-expand > .body-more {\n            \n        }\n\n        .body-more {\n            bottom: 0px;\n            text-align: center;\n            width: 100%;\n            cursor: pointer;\n            display: flex;\n            justify-content: center;\n            align-items: flex-end;\n            font-size: 14px;\n            color: var(--text-color, #1677ff);\n        }\n\n        .hover {\n            border: 1px solid var(--border-color, rgba(0, 0, 0, .09));\n            box-shadow: 0 2px 8px var(--border-color, rgba(0, 0, 0, .09));\n            transition: all .3s;\n        }\n\n        .body-collapse > .body-more::after {\n            content: var(--expand-text, '更多');\n            background: var(--expand-image, '');\n            background-size: cover;\n            position: relative;\n            top: 4px;\n            min-height: 22px;\n            min-width: 22px;\n        }\n\n        .body-expand > .body-more::after {\n            content: var(--collapse-text, '收起');\n            background: var(--collapse-image, '');\n            background-size: cover;\n            position: relative;\n            top: 4px;\n            min-height: 22px;\n            min-width: 22px;\n        }\n        </style>\n        <div class=\"container\" style=\"height: "+minHeight+';">\n            <div style="height: '+minHeight+';"  class="body body-collapse">\n                <slot name="content"></slot>\n                <div class="body-more"></div>\n            </div>\n        </div>\n    '},CardEllipsis=function(_HTMLElement){function CardEllipsis(){var _this;return(_this=_HTMLElement.call(this)||this).shadow=null,_this.__config={"min-height":100,mode:"complex"},_this.timmer=null,_this.render=function(){clearTimeout(_this.timmer),_this.timmer=setTimeout((function(){_this.destroy(),_this.shadow.innerHTML=template(_this.config),_this.init()}),10)},_this.init=function(){_this.bodyMore.addEventListener("click",_this.moreClick),_this.bodyMore.addEventListener("mouseenter",_this.onmouseenter),_this.bodyMore.addEventListener("mouseleave",_this.onmouseleave),_this._slot.addEventListener("slotchange",_this.onslotchange),_this.addObserver()},_this.destroy=function(){_this.bodyMore.removeEventListener("click",_this.moreClick),_this.bodyMore.removeEventListener("mouseenter",_this.onmouseenter),_this.bodyMore.removeEventListener("mouseleave",_this.onmouseleave),_this._slot.removeEventListener("slotchange",_this.onslotchange),_this.observer.disconnect()},_this.addObserver=function(){var targetNode=_this.querySelector('[slot="content"]');_this.observer=new MutationObserver((function callback(mutationsList){console.log("dom 变化啦！"),_this.domChange()})),_this.observer.observe(targetNode,{attributes:!1,childList:!0,subtree:!1})},_this.moreClick=function(){var body=_this.body,bodyStyle=body.style;body.classList.contains("body-expand")?(body.classList.remove("body-expand"),body.classList.add("body-collapse"),bodyStyle.setProperty("height",(0,utils_esm.GU$)(_this.config["min-height"]))):(body.classList.remove("body-collapse"),body.classList.add("body-expand"),_this.setBodyMaxHeight()),_this.dispatchEvent(new CustomEvent("onChange",{detail:{expand:body.classList.contains("body-expand")}}))},_this.onmouseenter=function(){_this.body.classList.add("hover")},_this.onmouseleave=function(){_this.body.classList.remove("hover")},_this.onslotchange=function(e){console.log("onslotchange")},_this.domChange=function(){_this.body.classList.contains("body-expand")&&_this.setBodyMaxHeight()},_this.shadow=_this.attachShadow({mode:"open"}),_this.shadow.innerHTML=template(_this.config),_this}!function _inheritsLoose(subClass,superClass){subClass.prototype=Object.create(superClass.prototype),subClass.prototype.constructor=subClass,_setPrototypeOf(subClass,superClass)}(CardEllipsis,_HTMLElement);var _proto=CardEllipsis.prototype;return _proto.connectedCallback=function connectedCallback(){this.init()},_proto.disconnectedCallback=function disconnectedCallback(){this.destroy()},_proto.attributeChangedCallback=function attributeChangedCallback(name,oldValue,newValue){oldValue!==newValue&&(this.__config[name]=newValue),this.render()},_proto.setBodyMaxHeight=function setBodyMaxHeight(){this.body.style.setProperty("height","complex"===this.config.mode?"auto":(0,utils_esm.GU$)(this.maxHeight))},function _createClass(Constructor,protoProps,staticProps){return protoProps&&_defineProperties(Constructor.prototype,protoProps),staticProps&&_defineProperties(Constructor,staticProps),Object.defineProperty(Constructor,"prototype",{writable:!1}),Constructor}(CardEllipsis,[{key:"config",get:function get(){return this.__config}},{key:"bodyMore",get:function get(){return this.shadow.querySelector(".body-more")}},{key:"_slot",get:function get(){return this.shadow.querySelector("slot")}},{key:"body",get:function get(){return this.shadow.querySelector(".body")}},{key:"maxHeight",get:function get(){return this.querySelector('[slot="content"]').scrollHeight+this.bodyMore.scrollHeight}}],[{key:"observedAttributes",get:function get(){return["min-height","mode"]}}]),CardEllipsis}(_wrapNativeSuper(HTMLElement));customElements.get("card-ellipsis")||customElements.define("card-ellipsis",CardEllipsis);var jsx_runtime=__webpack_require__("./node_modules/.pnpm/react@17.0.2/node_modules/react/jsx-runtime.js");const RcCardEllipsis=props=>{const[id]=(0,react.useState)("card-ellipsis"+(0,utils_string_esm.Vj)(16));return(0,react.useEffect)((()=>{const card=document.querySelector(`#${id}`),onChange=e=>{const detail=e.detail;props.onChange&&props.onChange(detail)};return card?.addEventListener("onChange",onChange),()=>{card?.removeEventListener("onChange",onChange)}}),[]),(0,jsx_runtime.jsx)("card-ellipsis",{mode:props.mode,id,"min-height":props.minHeight,children:(0,jsx_runtime.jsx)("div",{slot:"content",children:props.children})})};RcCardEllipsis.displayName="RcCardEllipsis";const src_RcCardEllipsis=RcCardEllipsis;try{RcCardEllipsis.displayName="RcCardEllipsis",RcCardEllipsis.__docgenInfo={description:"",displayName:"RcCardEllipsis",props:{minHeight:{defaultValue:null,description:"",name:"minHeight",required:!1,type:{name:"number"}},mode:{defaultValue:null,description:"",name:"mode",required:!1,type:{name:"enum",value:[{value:'"simple"'},{value:'"complex"'}]}},onChange:{defaultValue:null,description:"",name:"onChange",required:!1,type:{name:"(v: RcCardEllipsisChangeValue) => void"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["packages/rc-card-ellipsis/src/RcCardEllipsis.tsx#RcCardEllipsis"]={docgenInfo:RcCardEllipsis.__docgenInfo,name:"RcCardEllipsis",path:"packages/rc-card-ellipsis/src/RcCardEllipsis.tsx#RcCardEllipsis"})}catch(__react_docgen_typescript_loader_error){}var dist=__webpack_require__("./node_modules/.pnpm/@storybook+blocks@7.2.1_sfoxds7t5ydpegc3knd667wn6m/node_modules/@storybook/blocks/dist/index.mjs");const RcCardEllipsis_stories={title:"Example/RcCardEllipsis",component:src_RcCardEllipsis,parameters:{layout:"centered",docs:{page:Story=>(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:(0,jsx_runtime.jsx)(dist.UG,{children:"# RcCardEllipsis\n\n`卡片展开和收起 ` [在线demo](https://ligaopeng123-npm.github.io/web-components-repo/?path=/docs/example-rccardellipsis--props)  \n\n## Usage\n\n```tsx\nimport * as React from 'react';\nimport * as ReactDOM from 'react-dom';\nimport { RcCardEllipsis } from \"../src\";\n\nconst App = () => {\n    return (\n        <RcCardEllipsis onChange={(e)=> {\n            console.log(e);\n        }} minHeight={100} mode=\"simple\">\n            12<br/>\n            12<br/>\n            12<br/>\n            12<br/>\n            12<br/>\n            12<br/>\n            12<br/>\n        </RcCardEllipsis>\n    );\n};\n\nReactDOM.render(<App/>, document.getElementById('root'));\n```\n\n"})})}},tags:["autodocs"],argTypes:{}},props={args:{minHeight:120,children:(0,jsx_runtime.jsx)("div",{id:"value1",style:{height:200,width:"100%",background:"red"},children:"我是要展开的card"})}};props.parameters={...props.parameters,docs:{...props.parameters?.docs,source:{originalSource:"{\n  args: {\n    minHeight: 120,\n    children: <div id={'value1'} style={{\n      height: 200,\n      width: '100%',\n      background: 'red'\n    }}>\n            我是要展开的card\n        </div>\n  }\n}",...props.parameters?.docs?.source}}};const __namedExportsOrder=["props"]}}]);