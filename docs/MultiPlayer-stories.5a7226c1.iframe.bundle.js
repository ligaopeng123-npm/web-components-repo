(self.webpackChunkweb_components_repo=self.webpackChunkweb_components_repo||[]).push([[53],{"./stories/MultiPlayer.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,default:()=>MultiPlayer_stories,props:()=>props});var message_esm=__webpack_require__("./packages/message/dist/message.esm.js"),utils_string_esm=__webpack_require__("./node_modules/.pnpm/@gaopeng123+utils.string@1.1.16/node_modules/@gaopeng123/utils.string/dist/utils.string.esm.js");var mpegts=__webpack_require__("./node_modules/.pnpm/mpegts.js@1.7.3/node_modules/mpegts.js/dist/mpegts.js"),mpegts_default=__webpack_require__.n(mpegts);const MultiPlayerError_NETWORK_ERROR=mpegts_default().ErrorTypes.NETWORK_ERROR,MultiPlayerEvent_LOADING_COMPLETE=(mpegts_default().ErrorTypes.NETWORK_ERROR,mpegts_default().ErrorTypes.NETWORK_ERROR,mpegts_default().Events.ERROR,mpegts_default().Events.LOADING_COMPLETE),MultiPlayerEvent_LOADING_COMPLETE_ING=(mpegts_default().Events.RECOVERED_EARLY_EOF,mpegts_default().Events.MEDIA_INFO,mpegts_default().Events.METADATA_ARRIVED,mpegts_default().Events.SCRIPTDATA_ARRIVED,mpegts_default().Events.TIMED_ID3_METADATA_ARRIVED,mpegts_default().Events.PES_PRIVATE_DATA_DESCRIPTOR,mpegts_default().Events.PES_PRIVATE_DATA_ARRIVED,mpegts_default().Events.STATISTICS_INFO,"loading_complete_ing"),MultiPlayerEvent_LOAD_START="load_start";var utils_function_esm=__webpack_require__("./node_modules/.pnpm/@gaopeng123+utils.function@1.1.16/node_modules/@gaopeng123/utils.function/dist/utils.function.esm.js");const events=[mpegts_default().Events.ERROR,mpegts_default().Events.LOADING_COMPLETE,mpegts_default().Events.RECOVERED_EARLY_EOF,mpegts_default().Events.MEDIA_INFO,mpegts_default().Events.METADATA_ARRIVED,mpegts_default().Events.SCRIPTDATA_ARRIVED,mpegts_default().Events.TIMED_ID3_METADATA_ARRIVED,mpegts_default().Events.PES_PRIVATE_DATA_DESCRIPTOR,mpegts_default().Events.PES_PRIVATE_DATA_ARRIVED,mpegts_default().Events.STATISTICS_INFO],errors=[mpegts_default().ErrorTypes.NETWORK_ERROR,mpegts_default().ErrorTypes.MEDIA_ERROR,mpegts_default().ErrorTypes.OTHER_ERROR];const src_PlayerEvent=class PlayerEvent{constructor(player,onEvent,onError){this.player=player,this.__onEvent=onEvent,this.__onError=onError,this.init()}init(){this.addEvent()}destroy(){for(const event of events)this.player.off(event,this.onEvents)}addEvent=()=>{for(const event of events)this.player.on(event,this.onEvents.bind(this,event))};addError=()=>{for(const errType of errors)this.player.on(errType,this.onErrors.bind(this,errType))};onEvents=(event,info)=>{event===mpegts_default().Events.ERROR?this.onErrors(event,info):(this.__onEvent&&this.__onEvent(event,info),this[`on${event}`]&&this[`on${event}`](err,info))};onErrors=(event,info)=>{this.__onError&&this.__onError(event,info),this[`on${event}`]&&this[`on${event}`](err,info)};onLOADING_COMPLETE=(err,info)=>{};onRECOVERED_EARLY_EOF=()=>{};onMEDIA_INFO=()=>{};onMETADATA_ARRIVED=()=>{};onSCRIPTDATA_ARRIVED=()=>{};onTIMED_ID3_METADATA_ARRIVED=()=>{};onSCTE35_METADATA_ARRIVED=()=>{};onPES_PRIVATE_DATA_ARRIVED=()=>{};onSTATISTICS_INFO=()=>{}},DEFAULT_ROBUSTNESS={bufferTime:1e3,loopBufferTime:5e3,maxResetTimes:5,isOpen:!0},DEFAULT_MEDIA_DATA_SOURCE={type:"flv",cors:!0,withCredentials:!1,hasAudio:!1,hasVideo:!0};class MultiPlayer extends HTMLElement{shadow=null;q_msg=null;obj_props=["media-data-source","config","robustness"];__defaultConfig={"object-fit":"fill",width:"100%",height:"100%","media-data-source":DEFAULT_MEDIA_DATA_SOURCE,config:{stashInitialSize:10,enableWorker:!0,liveBufferLatencyChasing:!0,autoCleanupSourceBuffer:!0,lazyLoadMaxDuration:300},robustness:DEFAULT_ROBUSTNESS};get defaultConfig(){return this.__defaultConfig}get config(){return this.defaultConfig.config}get mediaDataSource(){return this.defaultConfig["media-data-source"]}initMediaDataSource(){this.__defaultConfig["media-data-source"]=DEFAULT_MEDIA_DATA_SOURCE}get robustness(){return this.defaultConfig.robustness}player=null;playerEvent=null;constructor(){super(),this.shadow=this.attachShadow({mode:"closed"}),this.q_msg=(0,message_esm.s)(this),this.q_msg.config({showClose:!0})}connectedCallback(){this.shadow.innerHTML=(config=>{const{width,height}=config;return`\n\t\t\t<style>\n                .multi-player {\n                   width: ${(0,utils_string_esm.up)(width)};\n                   height: ${(0,utils_string_esm.up)(height)};\n                   object-fit: ${config["object-fit"]}\n                }\n\t\t\t</style>\n\t\t\t<video poster="noposter" playsinline id="multi-player" class="multi-player" muted="muted" autoplay="autoplay">\n\t\t\t`})(this.defaultConfig),this.handleAttributeChanged(),document.addEventListener("visibilitychange",this.onVisibilityChange)}disconnectedCallback(){document.removeEventListener("visibilitychange",this.onVisibilityChange),this.destroyPlayer()}static get observedAttributes(){return["width","height","media-data-source","config","robustness","object-fit"]}attributeChangedCallback(name,oldValue,newValue){oldValue!==newValue&&("media-data-source"===name&&this.initMediaDataSource(),this.__defaultConfig[name]=this.obj_props.includes(name)?Object.assign({},this.__defaultConfig[name],JSON.parse(newValue)):newValue),this.handleAttributeChanged()}handleAttributeChanged=(0,utils_function_esm.sg)((()=>{this.createPlayer()}),10);createPlayer=()=>(this.destroyPlayer(),mpegts_default().isSupported()?this.mediaDataSource.url?(this.player=mpegts_default().createPlayer(this.mediaDataSource,this.config),this.player.attachMediaElement(this.shadow.querySelector("#multi-player")),this.player.load(),this.player.play().then((()=>{console.log(`${this.mediaDataSource.url} start playing`),this.loopAdjustBuffer(),this.__resetTimes=0,this.onEvent(MultiPlayerEvent_LOAD_START,"load_start"),this.addLoadingEvent(null)})),void this.onPlayEvent()):new Error("url 不能为空"):new Error("mpegts 没有准备好"));onVisibilityChange=()=>{"visible"===document.visibilityState&&this.adjustBuffer()};__resetTimes=0;restart=()=>{this.__resetTimes<=this.robustness.maxResetTimes&&(this.clearAdjustBuffer(),this.destroyPlayer(),this.handleAttributeChanged(),this.__resetTimes++)};play=()=>this.player.play();pause=()=>{this.player.pause()};get video(){return this.shadow.querySelector("#multi-player")}setCurrentTime=v=>{this.player.currentTime=v};set objectFit(val){this.video&&(this.video.style["object-fit"]=val)}clearAdjustBuffer=()=>{clearTimeout(this.__adjustBuffer),this.__lastCurrentTime=0,this.playerEvent?.destroy()};__adjustBuffer=null;__lastCurrentTime=0;loopAdjustBuffer=()=>{this.robustness.isOpen&&(this.__adjustBuffer=setTimeout((()=>{this.adjustBuffer()}),this.robustness.loopBufferTime))};adjustBuffer(){const diffSecond=this.robustness.bufferTime/1e3;if(this.player?.buffered?.length){const currentTime=this.player.currentTime;this.__lastCurrentTime&&this.__lastCurrentTime;const end=this.player.buffered.end(0);diffSecond&&end-currentTime>=diffSecond&&(this.player.currentTime=this.player.buffered.end(0)-.05),this.__lastCurrentTime=this.player.currentTime}}onPlayEvent=()=>{this.playerEvent=new src_PlayerEvent(this.player,this.onEvent.bind(this),this.onError.bind(this))};_speedIntervalKey=null;_loadingIntervalKey=null;_loopCheckEnd=()=>{let intervalTime=0;clearInterval(this._speedIntervalKey),this._speedIntervalKey=setInterval((()=>{try{if(this.player){const currentTime=this.player.currentTime,speed=this.player.statisticsInfo.speed,end=this.player.buffered.end(0);console.log(`paused: ${this.video.paused} speed: ${speed} currentTime: ${currentTime}, end: ${end}`),end-currentTime<.001?intervalTime+=1:intervalTime=0,intervalTime>=2&&(clearInterval(this._speedIntervalKey),this.onEvent(MultiPlayerEvent_LOADING_COMPLETE_ING,end-currentTime+"almost complete loading"))}else clearInterval(this._speedIntervalKey)}catch(e){console.log(e),clearInterval(this._speedIntervalKey)}}),1e3)};addLoadingEvent=eventType=>{clearInterval(this._speedIntervalKey),clearInterval(this._loadingIntervalKey),setTimeout((()=>{eventType?eventType===MultiPlayerEvent_LOADING_COMPLETE&&(clearInterval(this._speedIntervalKey),this._loopCheckEnd()):this._loopCheckEnd()}),this.robustness.loopBufferTime)};onEvent=(eventType,info)=>{this.dispatchEvent(new CustomEvent(eventType,{detail:{event:eventType,info}}))};onError=(event,err,info)=>{event===MultiPlayerError_NETWORK_ERROR&&(this.restart(),this.q_msg?.warning(`${event}: 网络连接失败，请稍后重试`)),console.error(new Date,event,err,info),this.dispatchEvent(new CustomEvent(event,{detail:{error:err,info,resetTimes:this.__resetTimes,maxResetTimes:this.robustness.maxResetTimes}}))};onPlayLog=()=>{};destroyPlayer=()=>{clearInterval(this._loadingIntervalKey),clearInterval(this._speedIntervalKey),this.player&&(this.playerEvent?.destroy(),this.player.pause(),this.player.unload(),this.player.detachMediaElement(),this.player.destroy(),this.player=null)};getFeatureList=()=>mpegts_default().getFeatureList()}customElements.get("multi-player")||customElements.define("multi-player",MultiPlayer);var dist=__webpack_require__("./node_modules/.pnpm/@storybook+blocks@7.6.19_sfoxds7t5ydpegc3knd667wn6m/node_modules/@storybook/blocks/dist/index.mjs");var injectStylesIntoStyleTag=__webpack_require__("./node_modules/.pnpm/style-loader@3.3.4_webpack@5.91.0/node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/.pnpm/style-loader@3.3.4_webpack@5.91.0/node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/.pnpm/style-loader@3.3.4_webpack@5.91.0/node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/.pnpm/style-loader@3.3.4_webpack@5.91.0/node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/.pnpm/style-loader@3.3.4_webpack@5.91.0/node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/.pnpm/style-loader@3.3.4_webpack@5.91.0/node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),cjs_ruleSet_1_rules_8_use_1_stories_MultiPlayer=__webpack_require__("./node_modules/.pnpm/css-loader@6.11.0_webpack@5.91.0/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[8].use[1]!./stories/MultiPlayer.css"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(cjs_ruleSet_1_rules_8_use_1_stories_MultiPlayer.A,options);cjs_ruleSet_1_rules_8_use_1_stories_MultiPlayer.A&&cjs_ruleSet_1_rules_8_use_1_stories_MultiPlayer.A.locals&&cjs_ruleSet_1_rules_8_use_1_stories_MultiPlayer.A.locals;var jsx_runtime=__webpack_require__("./node_modules/.pnpm/react@17.0.2/node_modules/react/jsx-runtime.js");const MultiPlayer_stories={title:"Example/MultiPlayer",component:MultiPlayer,parameters:{layout:"centered",docs:{page:Story=>(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:(0,jsx_runtime.jsx)(dist.oz,{children:"# `multi-player`\n\n> 播放器\n\n## [media-data-source](https://github.com/xqq/mpegts.js/blob/master/docs/api.md#mediadatasource)\n\n| 属性                                                         | 说明                                                         | 类型                                                         | 默认值 |\n| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------ |\n| type                                                         | [流媒体类型](https://github.com/xqq/mpegts.js/blob/master/docs/api.md#mediadatasource) | mse: MPEG2-TS/FLV over WebSocket<br />mpegts: MPEG2-TS over HTTP <br />m2ts: <br />flv: HTTPHTTP FLV<br />mp4 | flv    |\n| isLive                                                       | 是否为直播流                                                 | boolean                                                      | true   |\n| cors                                                         | 是否启用 CORS                                                | boolean                                                      | true   |\n| withCredentials                                              | 是否使用cookie                                               | boolean                                                      | false  |\n| hasAudio                                                     | 是否有音轨                                                   | boolean                                                      | false  |\n| hasVideo                                                     | 是否有视频轨道                                               | boolean                                                      | true   |\n| duration                                                     | 总媒体持续时间，以毫秒为单位                                 | number                                                       |        |\n| filesize                                                     | 媒体文件的总文件大小，以字节为单位                           | number                                                       |        |\n| url                                                          | 媒体 URL，可以以`'http(s)'`或者 `'ws(s)'`(WebSocket)开头     | string                                                       |        |\n| [segments](https://github.com/xqq/mpegts.js/blob/master/docs/multipart.md) |                                                              | Array<MediaSegment>                                          |        |\n\n## config\n\nhttps://github.com/xqq/mpegts.js/blob/master/docs/api.md#config\n\n## robustness\n\n```js\ntype MultiPlayerRobustness = {\n    bufferTime: DOMTimeStamp;     //    播放过程中缓冲器最小矫正的时间 默认为1000ms\n    loopBufferTime: DOMTimeStamp; // 多场时间探测一次 默认5000ms\n    maxResetTimes: number;        // 最大断线重连次数 默认为 5 次\n};\n```\n\n## Events\n\nhttps://github.com/xqq/mpegts.js/blob/master/docs/api.md#mpegtsevents\n\n```typescript\nimport {MultiPlayerEvent} from \"@gaopeng123/multi-player\"\n\nconst player = document.querySelector('#player');\nplayer.addEventListener(MultiPlayerEvent.STATISTICS_INFO, ({detail}) => {\n    console.log(detail);\n});\n```\n\n## Error\n\nhttps://github.com/xqq/mpegts.js/blob/master/docs/api.md#mpegtserrortypes\n\n```typescript\nimport {MultiPlayerError} from \"@gaopeng123/multi-player\"\n\nconst player = document.querySelector('#player');\nplayer.addEventListener(MultiPlayerError.NETWORK_ERROR, ({detail}) => {\n    console.log(detail);\n});\n```\n\n## Usage\n\n```ts\n<multi-player\n        id=\"player\"\n        media-data-source='{\"url\": \"https://xxx/flv/xxx\"}'>\n</multi-player>\n\nconst player = document.querySelector('#player');\nplayer.addEventListener(MultiPlayerError.NETWORK_ERROR, ({detail}) => {\n    console.log(detail);\n});\n```\n"})})}},tags:["autodocs"],argTypes:{}},props={args:{"media-data-source":{url:"http://1011.hlsplay.aodianyun.com/demo/game.flv",type:"flv"}},render:props=>(setTimeout((()=>{const multi=document.querySelector("multi-player");for(let key in props)multi.setAttribute(key,JSON.stringify(props[key]))}),50),(0,jsx_runtime.jsx)("multi-player",{class:"multi-player"}))};props.parameters={...props.parameters,docs:{...props.parameters?.docs,source:{originalSource:'{\n  args: {\n    "media-data-source": {\n      url: "http://1011.hlsplay.aodianyun.com/demo/game.flv",\n      type: \'flv\'\n    }\n  },\n  render: props => {\n    setTimeout(() => {\n      const multi = document.querySelector(\'multi-player\');\n      for (let key in props) {\n        multi.setAttribute(key, JSON.stringify(props[key]));\n      }\n    }, 50);\n    return <multi-player class="multi-player"></multi-player>;\n  }\n}',...props.parameters?.docs?.source}}};const __namedExportsOrder=["props"]},"./packages/message/dist/message.esm.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{s:()=>initMsg});var initMsg=function initMsg(global){!function addMessageCss(){if(!document.querySelector("#qmsg-message-css")){var styles=document.createElement("style");styles.id="qmsg-message-css",styles.innerHTML='\n    .qmsg.qmsg-wrapper{\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n    color: rgba(0, 0, 0, .55);\n    font-size: 13px;\n    font-variant: tabular-nums;\n    line-height: 1;\n    list-style: none;\n    font-feature-settings: "tnum";\n    position: fixed;\n    top: 16px;\n    left: 0;\n    z-index: 1010;\n    width: 100%;\n    pointer-events: none;\n}\n.qmsg .qmsg-item{\n    padding: 8px;\n    text-align: center;\n    -webkit-animation-duration: .3s;\n    animation-duration: .3s;\n    position: relative;\n}\n.qmsg .qmsg-item .qmsg-count{\n    position: absolute;\n    left: -4px;\n    top: -4px;\n    background-color: red;\n    color: #fff;\n    font-size: 12px;\n    line-height: 16px;\n    border-radius: 2px;\n    display: inline-block;\n    min-width: 16px;\n    height: 16px;\n    -webkit-animation-duration: .3s;\n    animation-duration: .3s;\n}\n.qmsg .qmsg-item:first-child{\n    margin-top: -8px;\n}\n.qmsg .qmsg-content{\n    position: relative;\n    display: inline-block;\n    padding: 10px 16px;\n    background: #fff;\n    border-radius: 4px;\n    box-shadow: 0 4px 12px rgba(0, 0, 0, .15);\n    pointer-events: all;\n    /* min-width: 175px; */\n}\n.qmsg .qmsg-content .qmsg-content-with-close{\n    padding-right: 20px;\n}\n.qmsg .qmsg-icon{\n    display: inline-block;\n    color: inherit;\n    font-style: normal;\n    line-height: 0;\n    text-align: center;\n    text-transform: none;\n    vertical-align: -.125em;\n    text-rendering: optimizeLegibility;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n    position: relative;\n    top: 1px;\n    margin-right: 8px;\n    font-size: 16px;\n}\n.qmsg .qmsg-icon svg{\n    display: inline-block;\n}\n\n.qmsg .qmsg-content-info .qmsg-icon{\n    color: #1890ff;\n    user-select: none;\n}\n.qmsg .qmsg-icon-close{\n    position: absolute;\n    top: 11px;\n    right: 5px;\n    padding: 0;\n    overflow: hidden;\n    font-size: 12px;\n    line-height: 22px;\n    background-color: transparent;\n    border: none;\n    outline: none;\n    cursor: pointer;\n    color: rgba(0, 0, 0, .45);\n    transition: color .3s\n}\n.qmsg .qmsg-icon-close:hover>svg path{\n    stroke: #555;\n}\n.qmsg .animate-turn{\n    animation:MessageTurn 1s linear infinite;  \n    -webkit-animation: MessageTurn 1s linear infinite;\n}\n@keyframes MessageTurn{\n    0%{-webkit-transform:rotate(0deg);}\n    25%{-webkit-transform:rotate(90deg);}\n    50%{-webkit-transform:rotate(180deg);}\n    75%{-webkit-transform:rotate(270deg);}\n    100%{-webkit-transform:rotate(360deg);}\n}\n@-webkit-keyframes MessageTurn{\n    0%{-webkit-transform:rotate(0deg);}\n    25%{-webkit-transform:rotate(90deg);}\n    50%{-webkit-transform:rotate(180deg);}\n    75%{-webkit-transform:rotate(270deg);}\n    100%{-webkit-transform:rotate(360deg);}\n}\n\n@-webkit-keyframes MessageMoveOut {\n    0% {\n        max-height: 150px;\n        padding: 8px;\n        opacity: 1\n    }\n\n    to {\n        max-height: 0;\n        padding: 0;\n        opacity: 0\n    }\n}\n\n@keyframes MessageMoveOut {\n    0% {\n        max-height: 150px;\n        padding: 8px;\n        opacity: 1\n    }\n\n    to {\n        max-height: 0;\n        padding: 0;\n        opacity: 0\n    }\n}\n\n\n@-webkit-keyframes MessageMoveIn {\n    \n    0% {\n        transform: translateY(-100%);\n        transform-origin: 0 0;\n        opacity: 0\n    }\n\n    to {\n        transform: translateY(0);\n        transform-origin: 0 0;\n        opacity: 1\n    }\n}\n\n@keyframes MessageMoveIn {\n    0% {\n        transform: translateY(-100%);\n        transform-origin: 0 0;\n        opacity: 0\n    }\n\n    to {\n        transform: translateY(0);\n        transform-origin: 0 0;\n        opacity: 1\n    }\n}\n@-webkit-keyframes MessageShake {\n    0%,\n    100% {\n      transform: translateX(0px);\n      opacity: 1;\n    }\n  \n    25%,\n    75% {\n        transform: translateX(-4px);\n      opacity: 0.75;\n    }\n  \n    50% {\n        transform: translateX(4px);\n        opacity: 0.25;\n    }\n  }\n@keyframes MessageShake {\n    0%,\n    100% {\n      transform: translateX(0px);\n      opacity: 1;\n    }\n  \n    25%,\n    75% {\n        transform: translateX(-4px);\n      opacity: 0.75;\n    }\n  \n    50% {\n        transform: translateX(4px);\n        opacity: 0.25;\n    }\n  }   \n',document.head.appendChild(styles)}}();var style,NAMESPACE=global&&global.QMSG_GLOBALS&&global.QMSG_GLOBALS.NAMESPACE||"qmsg",STATES={opening:"MessageMoveIn",done:"",closing:"MessageMoveOut"},DEFAULTS=Object.assign({type:"info",showClose:!1,timeout:3500,animation:!0,autoClose:!0,content:"",onClose:null,maxNums:5,html:!1},global&&global.QMSG_GLOBALS&&global.QMSG_GLOBALS.DEFAULTS),ICONS={info:'<svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z" fill="#1890ff" stroke="#1890ff" stroke-width="4" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M24 11C25.3807 11 26.5 12.1193 26.5 13.5C26.5 14.8807 25.3807 16 24 16C22.6193 16 21.5 14.8807 21.5 13.5C21.5 12.1193 22.6193 11 24 11Z" fill="#FFF"/><path d="M24.5 34V20H23.5H22.5" stroke="#FFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 34H28" stroke="#FFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>',warning:'<svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M24 44C29.5228 44 34.5228 41.7614 38.1421 38.1421C41.7614 34.5228 44 29.5228 44 24C44 18.4772 41.7614 13.4772 38.1421 9.85786C34.5228 6.23858 29.5228 4 24 4C18.4772 4 13.4772 6.23858 9.85786 9.85786C6.23858 13.4772 4 18.4772 4 24C4 29.5228 6.23858 34.5228 9.85786 38.1421C13.4772 41.7614 18.4772 44 24 44Z" fill="#faad14" stroke="#faad14" stroke-width="4" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M24 37C25.3807 37 26.5 35.8807 26.5 34.5C26.5 33.1193 25.3807 32 24 32C22.6193 32 21.5 33.1193 21.5 34.5C21.5 35.8807 22.6193 37 24 37Z" fill="#FFF"/><path d="M24 12V28" stroke="#FFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>',error:'<svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" fill="#f5222d" stroke="#f5222d" stroke-width="4" stroke-linejoin="round"/><path d="M29.6569 18.3431L18.3432 29.6568" stroke="#FFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M18.3432 18.3431L29.6569 29.6568" stroke="#FFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>',success:'<svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M24 4L29.2533 7.83204L35.7557 7.81966L37.7533 14.0077L43.0211 17.8197L41 24L43.0211 30.1803L37.7533 33.9923L35.7557 40.1803L29.2533 40.168L24 44L18.7467 40.168L12.2443 40.1803L10.2467 33.9923L4.97887 30.1803L7 24L4.97887 17.8197L10.2467 14.0077L12.2443 7.81966L18.7467 7.83204L24 4Z" fill="#52c41a" stroke="#52c41a" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 24L22 29L32 19" stroke="#FFF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>',loading:'<svg class="animate-turn" width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M4 24C4 35.0457 12.9543 44 24 44V44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4" stroke="#1890ff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M36 24C36 17.3726 30.6274 12 24 12C17.3726 12 12 17.3726 12 24C12 30.6274 17.3726 36 24 36V36" stroke="#1890ff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>',close:'<svg width="16" height="16" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M14 14L34 34" stroke="#909399" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 34L34 14" stroke="#909399" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>'},CAN_ANIMATION=void 0!==(style=document.createElement("div").style).animationName||void 0!==style.WebkitAnimationName||void 0!==style.MozAnimationName||void 0!==style.msAnimationName||void 0!==style.OAnimationName;function namespacify(){for(var res=NAMESPACE,i=0;i<arguments.length;++i)res+="-"+(i<0||arguments.length<=i?void 0:arguments[i]);return res}function Msg(opts){var oMsg=this;oMsg.settings=Object.assign({},DEFAULTS,opts||{}),oMsg.id=Qmsg.instanceCount;var timeout=oMsg.settings.timeout;timeout=timeout&&parseInt(timeout)>=0&parseInt(timeout)<=Math.NEGATIVE_INFINITY?parseInt(timeout):DEFAULTS.timeout,oMsg.timeout=timeout,oMsg.settings.timeout=timeout,oMsg.timer=null;var $elem=document.createElement("div"),$svg=ICONS[oMsg.settings.type||"info"],contentClassName=namespacify("content-"+oMsg.settings.type||0);contentClassName+=oMsg.settings.showClose?" "+namespacify("content-with-close"):"";var content=oMsg.settings.content||"",$closeSvg=ICONS.close,$closeIcon=oMsg.settings.showClose?'<i class="qmsg-icon qmsg-icon-close">'+$closeSvg+"</i>":"",$span=document.createElement("span");oMsg.settings.html?$span.innerHTML=oMsg.settings.html:$span.innerText=content,$elem.innerHTML='<div class="qmsg-content">            <div class="'+contentClassName+'">                <i class="qmsg-icon">'+$svg+"</i>"+$span.outerHTML+$closeIcon+"</div>    </div>",$elem.classList.add(namespacify("item"));var $wrapper=document.querySelector("."+NAMESPACE);if($wrapper||(($wrapper=document.createElement("div")).classList.add(NAMESPACE,namespacify("wrapper"),namespacify("is-initialized")),document.body.appendChild($wrapper)),$wrapper.appendChild($elem),oMsg.$wrapper=$wrapper,oMsg.$elem=$elem,setState(oMsg,"opening"),oMsg.settings.showClose&&$elem.querySelector(".qmsg-icon-close").addEventListener("click",function(){oMsg.close()}.bind($elem)),$elem.addEventListener("animationend",function(e){var target=e.target;e.animationName==STATES.closing&&(clearInterval(this.timer),this.destroy()),target.style.animationName="",target.style.webkitAnimationName=""}.bind(oMsg)),oMsg.settings.autoClose){oMsg.timer=setInterval(function(){this.timeout-=10,this.timeout<=0&&(clearInterval(this.timer),this.close())}.bind(oMsg),10),oMsg.$elem.addEventListener("mouseover",function(){clearInterval(this.timer)}.bind(oMsg)),oMsg.$elem.addEventListener("mouseout",function(){"closing"!=this.state&&(this.timer=setInterval(function(){this.timeout-=10,this.timeout<=0&&(clearInterval(this.timer),this.close())}.bind(oMsg),10))}.bind(oMsg))}}function setState(inst,state){state&&STATES[state]&&(inst.state=state,inst.$elem.style.animationName=STATES[state])}function mergeArgs(txt,config){var opts=Object.assign({},DEFAULTS);return 0===arguments.length?opts:txt instanceof Object?Object.assign(opts,txt):(opts.content=txt.toString(),config instanceof Object?Object.assign(opts,config):opts)}function judgeReMsg(params){params=params||{};var oMsg,opt=JSON.stringify(params),oInx=-1;for(var i in this.oMsgs){var oMsgItem=this.oMsgs[i];if(oMsgItem.config==opt){oInx=i,oMsg=oMsgItem.inst;break}}if(oInx<0){this.instanceCount++;var oItem={};oItem.id=this.instanceCount,oItem.config=opt,(oMsg=new Msg(params)).id=this.instanceCount,oMsg.count="",oItem.inst=oMsg,this.oMsgs[this.instanceCount]=oItem;var len=this.oMsgs.length,maxNums=this.maxNums;if(len>maxNums)for(var oIndex=0,oMsgs=this.oMsgs;oIndex<len-maxNums;oIndex++)oMsgs[oIndex]&&oMsgs[oIndex].inst.settings.autoClose&&oMsgs[oIndex].inst.close()}else oMsg.count=oMsg.count?oMsg.count+1:2,function setMsgCount(oMsg){var countClassName=namespacify("count"),$content=oMsg.$elem.querySelector("."+namespacify("content")),$count=$content.querySelector("."+countClassName);$count||(($count=document.createElement("span")).classList.add(countClassName),$content.appendChild($count)),$count.innerHTML=oMsg.count,$count.style.animationName="",$count.style.animationName="MessageShake",oMsg.timeout=oMsg.settings.timeout||DEFAULTS.timeout}(oMsg);return oMsg.$elem.setAttribute("data-count",oMsg.count),oMsg}Msg.prototype.destroy=function(){this.$elem.parentNode&&this.$elem.parentNode.removeChild(this.$elem),clearInterval(this.timer),Qmsg.remove(this.id)},Msg.prototype.close=function(){setState(this,"closing"),CAN_ANIMATION?Qmsg.remove(this.id):this.destroy();var callback=this.settings.onClose;callback&&callback instanceof Function&&callback.call(this)};var Qmsg={version:"0.0.1",instanceCount:0,oMsgs:[],maxNums:DEFAULTS.maxNums||5,config:function config(cfg){DEFAULTS=cfg&&cfg instanceof Object?Object.assign(DEFAULTS,cfg):DEFAULTS,this.maxNums=DEFAULTS.maxNums&&DEFAULTS.maxNums>0?parseInt(DEFAULTS.maxNums):3},info:function info(txt,config){var params=mergeArgs(txt,config);return params.type="info",judgeReMsg.call(this,params)},warning:function warning(txt,config){var params=mergeArgs(txt,config);return params.type="warning",judgeReMsg.call(this,params)},success:function success(txt,config){var params=mergeArgs(txt,config);return params.type="success",judgeReMsg.call(this,params)},error:function error(txt,config){var params=mergeArgs(txt,config);return params.type="error",judgeReMsg.call(this,params)},loading:function loading(txt,config){var params=mergeArgs(txt,config);return params.type="loading",params.autoClose=!1,judgeReMsg.call(this,params)},remove:function remove(id){this.oMsgs[id]&&delete this.oMsgs[id]},closeAll:function closeAll(){for(var i in this.oMsgs)this.oMsgs[i]&&this.oMsgs[i].inst.close()}};return Qmsg}},"./node_modules/.pnpm/css-loader@6.11.0_webpack@5.91.0/node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[8].use[1]!./stories/MultiPlayer.css":(module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_pnpm_css_loader_6_11_0_webpack_5_91_0_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/.pnpm/css-loader@6.11.0_webpack@5.91.0/node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_pnpm_css_loader_6_11_0_webpack_5_91_0_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_pnpm_css_loader_6_11_0_webpack_5_91_0_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_pnpm_css_loader_6_11_0_webpack_5_91_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/.pnpm/css-loader@6.11.0_webpack@5.91.0/node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_pnpm_css_loader_6_11_0_webpack_5_91_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_pnpm_css_loader_6_11_0_webpack_5_91_0_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".multi-player {\n    height: 500px;\n    width: 800px;\n}","",{version:3,sources:["webpack://./stories/MultiPlayer.css"],names:[],mappings:"AAAA;IACI,aAAa;IACb,YAAY;AAChB",sourcesContent:[".multi-player {\n    height: 500px;\n    width: 800px;\n}"],sourceRoot:""}]);const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"./node_modules/.pnpm/memoizerific@1.11.3/node_modules/memoizerific sync recursive":module=>{function webpackEmptyContext(req){var e=new Error("Cannot find module '"+req+"'");throw e.code="MODULE_NOT_FOUND",e}webpackEmptyContext.keys=()=>[],webpackEmptyContext.resolve=webpackEmptyContext,webpackEmptyContext.id="./node_modules/.pnpm/memoizerific@1.11.3/node_modules/memoizerific sync recursive",module.exports=webpackEmptyContext}}]);