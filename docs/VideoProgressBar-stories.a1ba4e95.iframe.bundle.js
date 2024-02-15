"use strict";(self.webpackChunkweb_components_repo=self.webpackChunkweb_components_repo||[]).push([[4895],{"./stories/VideoProgressBar.stories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,default:()=>VideoProgressBar_stories,props:()=>props});var utils_esm=__webpack_require__("./node_modules/.pnpm/@gaopeng123+utils@1.1.13-alpha.2/node_modules/@gaopeng123/utils/dist/utils.esm.js");const BG="#000000",BD="#333333",addEventFactory=(dom,type,fn,useCapture=!1)=>{dom&&dom.addEventListener(type,fn,useCapture)},removeEventFactory=(dom,type,fn,useCapture=!1)=>{dom&&dom.removeEventListener(type,fn,useCapture)},SCALE_LEVEL={0:{n:"24h",v:864e5},1:{n:"12h",v:432e5},2:{n:"6h",v:216e5},3:{n:"1h",v:36e5},4:{n:"36m",v:216e4},5:{n:"24m",v:144e4},6:{n:"12m",v:72e4}},DEFAULT_CURRENT_TIME=(0,utils_esm.hKD)(`${(0,utils_esm.i$r)(Date.now(),"yyyy-MM-dd")} 00:00:00`);class VideoProgressBar extends HTMLElement{shadow=null;config={"scale-level":0,"hide-fast":!1,"hide-speed":!1,"hide-time":!1,height:60};constructor(){super(),this.shadow=this.attachShadow({mode:"open"})}static get observedAttributes(){return["scale-level","hide-fast","hide-speed","hide-time","height"]}attributeChangedCallback(name,oldValue,newValue){oldValue!==newValue&&("scale-level"===name?this._wheelDelta=+newValue:this.config[name]=newValue)}init(){}get _canvas(){return this.shadow.querySelector("#timeline-drag-canvas")}get _context(){return this._canvas.getContext("2d")}get datetime(){return this.shadow.querySelector("video-progress-bar-active-time")}_wheelDelta=0;get wheelDelta(){return this._wheelDelta}set wheelDelta(v){const previousWheelDelta=this.wheelDelta,wheelDelta=this._wheelDelta+v;wheelDelta>=0&&wheelDelta<Object.keys(this.__scaleLevel).length&&(this._wheelDelta+=v),previousWheelDelta!==this.wheelDelta&&(this.__dragCurrentX=this.diffZoomLevelValue,this.zoomStart(),this.setLevelValue(),this.__dragX+=this.__dragCurrentX),this.__dragCurrentX=0}zoomStart(){this.draw()}dragStart(status){this.draw(),this.setCurrentTime()}__dragStartEvent=null;__dragCurrentX=0;__dragX=0;_onmousewheel=(0,utils_esm.DsO)((e=>{this.wheelDelta=e.wheelDelta>0?1:-1}),200,{notDebounce:e=>{e.preventDefault(),e.stopPropagation()}});layerX=null;_onmousedown(e){this.__dragStartEvent=e,e&&this.stop()}_onmouseup(e){this.__dragStartEvent&&this.setDateTime({status:"loading"}),e&&this.__dragStartEvent&&this.start(),this.__dragStartEvent=null,this.__dragX+=this.__dragCurrentX,this.__dragCurrentX=null,this.endTime=this.currentTime,this.datetime?.canClick()}_onmousemove(e){if(this.__dragStartEvent){const beginX=(0,utils_esm.tqC)()?this.__dragStartEvent.touches[0].clientX:this.__dragStartEvent.offsetX,currentDragX=((0,utils_esm.tqC)()?e.touches[0].clientX:e.offsetX)-beginX,minTime=this.__minTime?(0,utils_esm.hKD)(this.__minTime):0,maxTime=this.__maxTime?(0,utils_esm.hKD)(this.__maxTime):Number.MAX_VALUE,changeTime=(this.endTime||this.startTime)-this.dragXToTime(currentDragX);changeTime>=minTime&&changeTime<=maxTime?(this.__dragCurrentX=currentDragX,this.dragStart(null),this.datetime?.canNotClick()):(changeTime<minTime&&(this.__dragCurrentX=this.timeToDragX(this.endTime-minTime),this.dragStart(null),this.datetime?.canNotClick()),changeTime>maxTime&&(this.__dragCurrentX=this.timeToDragX(this.endTime-maxTime,!0),this.dragStart(null),this.datetime?.canNotClick()))}}getTimeFormDrag(){}onAddClick=(0,utils_esm.DsO)((()=>{this.wheelDelta=1}),50);onDelClick=(0,utils_esm.DsO)((()=>{this.wheelDelta=-1}),50);addEvent(){addEventFactory(this._canvas,"mousewheel",this._onmousewheel.bind(this)),addEventFactory(this._canvas,(0,utils_esm.tqC)()?"touchstart":"mousedown",this._onmousedown.bind(this)),addEventFactory(this._canvas,(0,utils_esm.tqC)()?"touchmove":"mousemove",this._onmousemove.bind(this)),addEventFactory(this._canvas,(0,utils_esm.tqC)()?"touchleave":"mouseout",this._onmouseup.bind(this)),addEventFactory(this._canvas,(0,utils_esm.tqC)()?"touchend":"mouseup",this._onmouseup.bind(this)),addEventFactory(this.shadow.querySelector("#add"),"click",this.onAddClick.bind(this)),addEventFactory(this.shadow.querySelector("#del"),"click",this.onDelClick.bind(this)),addEventFactory(this.datetime,"change",this.onchange.bind(this)),addEventFactory(this.timeline,"resize",this.onResizeSubscribe.bind(this))}removeEvent(){removeEventFactory(this._canvas,"mousewheel",this._onmousewheel),removeEventFactory(this._canvas,(0,utils_esm.tqC)()?"touchstart":"mousedown",this._onmousedown),removeEventFactory(this._canvas,(0,utils_esm.tqC)()?"touchmove":"mousemove",this._onmousemove),removeEventFactory(this._canvas,(0,utils_esm.tqC)()?"touchleave":"mouseout",this._onmouseup),removeEventFactory(this._canvas,(0,utils_esm.tqC)()?"touchend":"mouseup",this._onmouseup),removeEventFactory(this.shadow.querySelector("#add"),"click",this.onAddClick),removeEventFactory(this.shadow.querySelector("#del"),"click",this.onDelClick),removeEventFactory(this.datetime,"change",this.onchange.bind(this)),removeEventFactory(this.timeline,"resize",this.onResizeSubscribe.bind(this))}afterConnectedFn(){this.setCanvasStyle(),this.startTime=this.defaultCurrentTime,this.initialize({status:"loading"}),this.setLevelValue(),this.draw()}connectedCallback(){this.shadow.innerHTML=((config,timeLine)=>{const hideFast=config["hide-fast"],hideSpeed=config["hide-speed"],hideTime=config["hide-time"];return`\n        <style>\n             /*时间拖动区域*/\n            .timeline {\n                position: relative;\n                height: 100%;\n                line-height: 100%;\n                text-align: center;\n                background-color: #000000;\n                overflow: hidden;\n             }\n             /*拖拽样式*/\n            .timeline-drag {\n                position: absolute;\n                width: 100%;\n                height: 100%;\n            }\n           \n             .timeline-datetime-level {\n                position: absolute;\n                font-size: 16px;\n                bottom: 1px;\n                right: 20px;\n                height: 18px;\n                line-height: 18px;\n                border: 1px solid ${BD};\n                background-color: ${BG};\n                border-radius: 2px;\n                display: flex;\n                color: #ffffff;\n             }\n\n             .tbar {\n                 cursor: pointer;\n             }\n             .tbar:hover {\n                background-color: #a59999;\n             }\n\n             .disabled {\n                cursor: not-allowed;\n                background-color: #726c6c;\n             }\n\n             #levelValue {\n                width: 36px;\n                padding: 0px;\n             }\n\n            .disabled-input {\n                 height: 16px;\n                 width: 150px;\n                 top: calc(100% - 16px);\n                 position: absolute;\n                 left: calc(50% - 86px);\n            }\n            \n            .active {\n                text-align: center;\n                height: 22px;\n                -webkit-user-select: none; /* Safari */\n                user-select: none;\n            }\n        </style>\n        <div id="timeline" class="timeline">\n        <div class="timeline-drag">\n            <canvas id="timeline-drag-canvas"></canvas>\n        </div>\n        <div class="active">\n            <video-progress-bar-active-time hide-time="${hideTime}" hide-fast="${hideFast}" hide-speed="${hideSpeed}"></video-progress-bar-active-time>\n        </div>\n        \n        <div class="timeline-datetime-level">\n            <img id="del" class="tbar" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABVUlEQVQ4T6WTv0vWURSHn+cfKINMCoKmElzcWgUnx8BIGuxtylmUnNS20IqGpiZbmnRu6YcEDf4PipDIizpotrSdOHpvvL4m7ze6cLnD+dyHz7nnc+U/l533I+I6MAxcAi4DV4DUHAHHZR+oG/XeH0BELAILwIci/AEcFmGC+gr0LvBafZa1E0BEZPFQPePob90Vl6vAuNqugHHggXq/yZNExFNgU12rgBlgQJ1tCEh9qC8r4AWwry41BKSDfnWmAlaAdTXPfJPHwO0u2Lb6ttRbwIjaqoB3wJcOwBRwpwuwpb4pgAlgTH1UAa+AtrrcsIXJzIs6XQFzwNXsqSHgSYZMfV4BD4F7/zjGHfV9BWR8PwNDGY5eLiLiGzCvfuqMcsZ4FPieIwX2yk7eAHAt2wRuAl/VjP5plOuKiFvAYMn8jTLK1GwCu8BP4Jf68dxn6mX7ovpvr1CGEYQMEQkAAAAASUVORK5CYII=" />\n            <div id="levelValue">24h</div>\n            <img id="add" class="tbar" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABRUlEQVQ4T6WTvyvGURSHn6cMWFAGbCZZZFEMdiRlEpNSb2IyMbLpnWTwY38zK2VgsBODUkxvMsjkxz9wdXWvXl/0TW6d5d7Pfe45n3uO/HPZeD+EMAh0Ae0NESUvwFuKR/Uy3/sEhBDWgUXgKglfgWcgAG0pIngC2FCjng9ACKEbeFCbyipK2jrQqz5mwDhQUafLAOnBNeBaPc6AGWBYXSl4UoleqNXC/lL0RT3IgChsVbcKwg2gU10u7M8m8G4GrAJ36mFKcR7oA0aBFuAEuFf30vkYMKhuZkCs6bYBEDPqB0aAZuAMqKvbvwHi9zX/sYQOdSdnMAcM/WBiNDeauP+DiW9qLQMmgYU/fuONepQBQ0BNjcaVrhBCDaiq18VWHgDOUyvHNm5s5Y40H1PA6ZdWzk+GECKgp2SYntSLb8NUmvcvgndf85gRc9c+xwAAAABJRU5ErkJggg==" />\n        </div>\n       </div>\n    `})(this.config),this.init(),this.addEvent(),this.afterConnectedCallback()}afterConnectedCallback(){this.afterConnectedFn(),setTimeout((()=>{this.sendToOutside({status:"loading"})}))}disconnectedCallback(){this.stop()}get timeline(){return this.shadow.querySelector("#timeline")}get timelineWidth(){return this.timeline.offsetWidth}setCanvasStyle(){this._canvas.style.width=`${this.timelineWidth}px`,this._canvas.style.height=`${this.timeline.offsetHeight}px`,this._canvas.width=this.timelineWidth,this._canvas.height=this.timeline.offsetHeight,this.shadow.querySelector(".active").style["padding-top"]=this.timeline.offsetHeight-22+"px"}__scaleLevel=SCALE_LEVEL;_setTBarClass(tbar,level){this.scaleLevelN===level?(tbar.classList.add("disabled"),tbar.classList.remove("tbar")):tbar.classList.contains("tbar")||(tbar.classList.add("tbar"),tbar.classList.remove("disabled"))}setLevelValue(){const add=this.shadow.querySelector("#add"),del=this.shadow.querySelector("#del"),levelValue=this.shadow.querySelector("#levelValue");this._setTBarClass(add,"12m"),this._setTBarClass(del,"24h"),levelValue.innerText=this.scaleLevelN}get scaleLevelV(){return this.scaleLevel.v}get scaleLevelN(){return this.scaleLevel.n}get scaleLevel(){return this.__scaleLevel[this.wheelDelta]}get diffZoomLevelValue(){return this.timelineWidth*(this.startTime-this.currentTime)/this.scaleLevelV-this.__dragX}get scaleData(){const median=this.scale/2,itemScale=this.scaleLevelV/this.scale,itemWidth=this.timelineWidth/this.scale,dragX=this.__dragCurrentX+this.__dragX;return new Array(this.scale+1).fill("00:00").map(((item,index)=>({time:`${(0,utils_esm.i$r)(this.startTime+(index-median-parseInt(""+dragX/itemWidth))*itemScale,"HH:mm")}`,x:index*itemWidth+(dragX||0)%itemWidth})))}__startTime=null;get startTime(){return this.__startTime}set startTime(v){this.__startTime=v}__endTime=null;get endTime(){return this.__endTime}set endTime(v){this.__endTime=v}defaultCurrentTime=DEFAULT_CURRENT_TIME;protectCurrentTime=()=>this.currentTime||this.defaultCurrentTime;__currentTime=null;get currentTime(){return this.__currentTime}set currentTime(v){this.__currentTime=v}setCurrentTime(){this.currentTime=this.getCurrentTime()}getCurrentTime(){return(this.endTime||this.startTime)-parseInt(""+this.__dragCurrentX/this.timelineWidth*this.scaleLevelV)}dragXToTime(dragx){return parseInt(""+dragx/this.timelineWidth*this.scaleLevelV)}timeToDragX(time,isNumber){const v=""+time/this.scaleLevelV*this.timelineWidth;return(0,utils_esm.FHy)(Number(v),2)}publishTimeline(obj){this.dispatchEvent(new CustomEvent("timeChange",{detail:obj}))}sendToOutside(e,value){if("loading"===e?.status||"polling"===e?.status){const currentTime=this.protectCurrentTime();this.publishTimeline(Object.assign({action:"polling"===e?.status?"polling":"drag",isInPeriods:this.checkCurrentTimeInPeriods(currentTime),timestamp:currentTime,date:(0,utils_esm.i$r)(currentTime),"speed-value":this.datetime?.speed},value))}}drawData=data=>{this.initVideoOptions({periods:data.periods||[],currentTime:(0,utils_esm.hKD)(data.currentTime||DEFAULT_CURRENT_TIME),minTime:data.minTime,maxTime:data.maxTime}),this.draw(),this.start()};changeSpeed=data=>{this.__intervalSpeed=data["speed-value"]?Number(data["speed-value"]):this.__intervalSpeed,this.start()};fastForward=data=>{const forwardValue=data["forward-value"]?Number(data["forward-value"]):0;forwardValue&&(this.__periodsTime=forwardValue,this.start())};initVideoOptions(data){this.__periods=data?.periods,this.__minTime=data?.minTime,this.__maxTime=data?.maxTime,this.defaultCurrentTime=(0,utils_esm.hKD)(data.currentTime);const status=data?.currentTime!==this.startTime?{status:"reset"}:null;this.startTime=data.currentTime,this.initialize(status)}timeCalibration=()=>{this.__dragCurrentX=-1e3*this.timelineWidth/this.scaleLevelV+(this.__dragCurrentX||0)};onResizeSubscribe=(0,utils_esm.DsO)((()=>{this.__dragX=this.timelineWidth/this._canvas.offsetWidth*this.__dragX,this.setCanvasStyle(),this.draw()}));onSplitScreenChangeSubscribe({data:{type,value,videoOptions}}){this.reset(),this.startTime=this.defaultCurrentTime,this.initialize(null),value&&(this.reset(),this.startTime=value?.currentPlayTime(),this.initVideoOptions(videoOptions),this.draw(),this.start())}setTime(time){this.datetime?.setAttribute("time-value",(0,utils_esm.i$r)(time))}initialize(e){this.startTime&&(this.currentTime="reset"===e?.status?this.startTime:this.currentTime||this.startTime,this.setTime(this.currentTime),"reset"===e?.status&&(e.status="loading"))}loadingState=e=>{"loading"===e?.status&&(this.stop(),this.publish("loading",{type:!0}),setTimeout((()=>{this.publish("loading",{type:!1})}),5e3))};setDateTimeFn=(e,value)=>{this.sendToOutside(e,value),this.loadingState(e)};setDateTime=(0,utils_esm.DsO)((e=>{this.setDateTimeFn(e)}),200,{notDebounce:e=>{this.initialize(e)}});resetSubscribe({data:{type}}){"timeline"===type&&this.reset()}reset(){this.stop(),this.__dragStartEvent=null,this.__dragCurrentX=0,this.__dragX=0,this._wheelDelta=0,this.currentTime=null,this.startTime=null,this.endTime=null,this.__periods=null,this.setDateTime({status:"reset"}),this.setLevelValue()}changeEvent=e=>{this.checkDatetime()&&(this.__dragCurrentX=(this.currentTime-new Date(this.datetime.value).getTime())*this.timelineWidth/this.scaleLevelV,this.dragStart(null),this.initialize({status:"loading"}),this.setDateTimeFn({status:"loading"},e.detail))};onchange=(0,utils_esm.DsO)((e=>{this.changeEvent(e),this.stop()}));publish=(type,opts)=>{};checkDatetime=()=>this.datetime?.value;timelineSubscribe({data:{type,value}}){if("needle"===type)switch(value){case"start":this.start();break;case"stop":this.stop();break;case"restart":this.sendToOutside({status:"loading"});break;default:console.log(`needle的type: ${value}`)}}__pollingTimer=null;stop=()=>{this.clearPollingTime()};clearPollingTime(){clearInterval(this.__pollingTimer)}checkPeriods(){if(this.__periods?.length){const currentTime=new Date(this.currentTime).getTime();for(let i=0;i<this.__periods?.length;i++){const{__start,__end}=this.__periods[i],__last=this.__periods[i+1];if(__last&&currentTime>__end&&currentTime<=__last.__start){this.__periodsTime=(__last.__start-__end)/1e3;break}}}}checkCurrentTimeInPeriods(time){if(this.__periods?.length)for(let i=0;i<this.__periods?.length;i++){const{__start,__end}=this.__periods[i];if(time>=__start&&time<=__end)return!0}return!1}__periodsTime=1;__intervalSpeed=1;pollingTimeRun(){this.__pollingTimer=setInterval((()=>{this._onmousedown(null),this.checkPeriods(),this.__dragCurrentX=-1e3*this.__periodsTime*this.timelineWidth/this.scaleLevelV+(this.__dragCurrentX||0),this.__periodsTime=1,this.dragStart(null),this.setDateTime({status:"polling"}),this._onmouseup(null)}),1e3/this.__intervalSpeed)}start(){this.clearPollingTime(),this.pollingTimeRun()}draw(){this.clearCanvas(),this.drawScale(),this.drawDispatch(),this.drawSchedule()}clearCanvas(){this._context.clearRect(0,0,this.timelineWidth,this.timeline.offsetHeight)}drawLine(x,y,x1,y1,sl,lw=1){this._context.save(),this._context.beginPath(),this._context.moveTo(x,y),this._context.lineTo(x1,y1),this._context.strokeStyle=sl,this._context.lineWidth=lw,this._context.stroke(),this._context.closePath(),this._context.restore()}drawText(text,x,y,fl,ft=12,mw=20){this._context.save(),this._context.textAlign="center",this._context.font=`${ft}px Arial`,this._context.fillStyle=fl,this._context.fillText(text,x,y,24),this._context.restore()}scale=12;drawScale(){this.drawLine(0,0,this.timelineWidth,0,"#f7ff2f"),this.scaleData.forEach((({time,x},index)=>{this.drawLine(x,0,x,9,"#fffdd9"),this.drawText(time,x,21,"#ffffff")}))}drawDispatch(){const w=this.timelineWidth/2;this.drawLine(w,2,w,this._canvas.offsetHeight,"#2bff3c",2),this.drawLine(w,2,w+4,8,"#2bff3c",2),this.drawLine(w,2,w-4,8,"#2bff3c",2)}drawSchedule(){null!==this.__periods&&this.scheduleData?.forEach((item=>{this.drawSingleSchedule(item)}))}drawSingleSchedule({w,x}){this._context.save(),this._context.fillStyle="rgba(174,218,255,.7)",this._context.fillRect(x,22,w,15),this._context.restore()}__periods=null;__minTime=null;__maxTime=null;get scheduleData(){const __periods=[];return this.__periods?.forEach((item=>{const _startTime=(0,utils_esm.hKD)(item.startTime),_endTime=(0,utils_esm.hKD)(item.endTime);__periods.push(Object.assign({_startTime,_endTime},this.getSingleScheduleData(_startTime,_endTime),item))})),__periods}getSingleScheduleData=(startTime,endTime)=>{const millisecondDistance=this.timelineWidth/this.scaleLevelV;return{w:(endTime-startTime)*millisecondDistance,x:this.timelineWidth/2-(this.currentTime-startTime)*millisecondDistance}}}customElements.get("video-progress-bar")||customElements.define("video-progress-bar",VideoProgressBar);class ForwardSelect extends HTMLElement{shadow=null;__config={options:[]};constructor(){super(),this.shadow=this.attachShadow({mode:"open"}),this.shadow.innerHTML=this.createTemplate()}onChange=e=>{this.dispatchEvent(new CustomEvent("onChange",{detail:{value:e.target.value}}))};connectedCallback(){this.select.addEventListener("change",this.onChange)}disconnectedCallback(){this.select.removeEventListener("change",this.onChange)}static get observedAttributes(){return["options","default-value"]}attributeChangedCallback(name,oldValue,newValue){oldValue!==newValue&&(this.__config[name]=JSON.parse(newValue)),this.renderOption()}get select(){return this.shadow.querySelector(".dropdown-select")}renderOption(){this.select.innerHTML=this.getOption()}getOption(){const options=this.__config.options,defaultValue=this.__config["default-value"];return options.map((item=>`<option ${item.value==defaultValue?"selected":""} value="${item.value}">${item.label}</option>`)).join("")}createTemplate(){return`\n            <style>\n                .dropdown {\n                    display: inline-block;\n                    position: relative;\n                    overflow: hidden;\n                    height: 20px;\n                    width: 60px;\n                    background: #f2f2f2;\n                    border: 1px solid;\n                    border-color: white #f7f7f7 whitesmoke;\n                    border-radius: 3px;\n                    background-image: -webkit-linear-gradient(top, transparent, rgba(0, 0, 0, 0.06));\n                    background-image: -moz-linear-gradient(top, transparent, rgba(0, 0, 0, 0.06));\n                    background-image: -o-linear-gradient(top, transparent, rgba(0, 0, 0, 0.06));\n                    background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.06));\n                    -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08);\n                    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08);\n                    -webkit-user-select: none; /* Safari */\n                    user-select: none;\n                }\n                \n                .dropdown:before, .dropdown:after {\n                    content: '';\n                    position: absolute;\n                    z-index: 2;\n                    top: 4px;\n                    right: 10px;\n                    width: 0;\n                    height: 0;\n                    border: 4px dashed;\n                    border-color: #888888 transparent;\n                    pointer-events: none;\n                }\n                \n                .dropdown:before {\n                    border-bottom-style: solid;\n                    border-top: none;\n                }\n                \n                .dropdown:after {\n                    margin-top: 7px;\n                    border-top-style: solid;\n                    border-bottom: none;\n                }\n                \n                .dropdown-select {\n                    position: relative;\n                    width: 100%;\n                    margin: 0;\n                    padding: 0px 4px 0px 4px;\n                    height: 20px;\n                    line-height: 14px;\n                    font-size: 12px;\n                    color: #ffffff;\n                    text-shadow: 0 1px white;\n                    background: #333333; /* Fallback for IE 8 */\n                    background: #333333 !important; /* "transparent" doesn't work with Opera */\n                    border: 0;\n                    border-radius: 0;\n                    -webkit-appearance: none;\n                    top: -22px;\n                }\n                \n                .dropdown-select:focus {\n                    z-index: 3;\n                    width: 100%;\n                    color: #394349;\n                    outline: 2px solid #49aff2;\n                    outline: 2px solid -webkit-focus-ring-color;\n                    outline-offset: -2px;\n                }\n                \n                .dropdown-select > option {\n                    margin: 3px;\n                    padding: 6px 8px;\n                    text-shadow: none;\n                    background: #f2f2f2;\n                    border-radius: 3px;\n                    cursor: pointer;\n                }\n                \n                /* Fix for IE 8 putting the arrows behind the select element. */\n                \n                .lt-ie9 .dropdown {\n                    z-index: 1;\n                }\n                \n                .lt-ie9 .dropdown-select {\n                    z-index: -1;\n                }\n                \n                .lt-ie9 .dropdown-select:focus {\n                    z-index: 3;\n                }\n                \n                /* Dirty fix for Firefox adding padding where it shouldn't. */\n                \n                @-moz-document url-prefix() {\n                    .dropdown-select {\n                        padding-left: 6px;\n                    }\n                }\n                \n                .dropdown-dark {\n                    background: #444;\n                    border-color: #111111 #0a0a0a black;\n                    background-image: -webkit-linear-gradient(top, transparent, rgba(0, 0, 0, 0.4));\n                    background-image: -moz-linear-gradient(top, transparent, rgba(0, 0, 0, 0.4));\n                    background-image: -o-linear-gradient(top, transparent, rgba(0, 0, 0, 0.4));\n                    background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.4));\n                    -webkit-box-shadow: inset 0 1px rgba(255, 255, 255, 0.1), 0 1px 1px rgba(0, 0, 0, 0.2);\n                    box-shadow: inset 0 1px rgba(255, 255, 255, 0.1), 0 1px 1px rgba(0, 0, 0, 0.2);\n                }\n                \n                .dropdown-dark:before {\n                    border-bottom-color: #aaa;\n                }\n                \n                .dropdown-dark:after {\n                    border-top-color: #aaa;\n                }\n                \n                .dropdown-dark .dropdown-select {\n                    color: #aaa;\n                    text-shadow: 0 1px black;\n                    background: #444;  /* Fallback for IE 8 */\n                    -webkit-user-select: none;\n                    user-select: none;\n                }\n                \n                .dropdown-dark .dropdown-select:focus {\n                    color: #ccc;\n                }\n                \n                .dropdown-dark .dropdown-select > option {\n                    background: #444;\n                    text-shadow: 0 1px rgba(0, 0, 0, 0.4);\n                }\n            </style>\n            <div class="dropdown dropdown-dark">\n            <select name="two" class="dropdown-select">\n              ${this.getOption()}\n            </select>\n          </div>\n        `}}customElements.get("video-progress-bar-forward-select")||customElements.define("video-progress-bar-forward-select",ForwardSelect);const forward_namespaceObject=__webpack_require__.p+"static/media/forward.582bfcd7.svg",backward_namespaceObject=__webpack_require__.p+"static/media/backward.01bf8874.svg";var esm=__webpack_require__("./node_modules/.pnpm/flatpickr@4.6.13/node_modules/flatpickr/dist/esm/index.js"),zh=(__webpack_require__("./node_modules/.pnpm/flatpickr@4.6.13/node_modules/flatpickr/dist/flatpickr.css"),__webpack_require__("./node_modules/.pnpm/flatpickr@4.6.13/node_modules/flatpickr/dist/l10n/zh.js"));const forwardOptions=[{label:"30s",value:"30"},{label:"1分钟",value:"60"},{label:"5分钟",value:"300"}],speedOptions=[{label:"1/4x",value:"0.25"},{label:"1/2x",value:"0.5"},{label:"正常",value:"1"},{label:"2x",value:"2"},{label:"4x",value:"4"}];class ActiveTime extends HTMLElement{shadow=null;__config={"time-value":"","forward-value":"60","speed-value":"1","hide-fast":!1,"hide-speed":!1,"hide-time":!1};__oldConfig={"time-value":"","forward-value":"60","speed-value":"1","hide-fast":!1,"hide-speed":!1};constructor(){super(),this.shadow=this.attachShadow({mode:"open"})}onChange(currentType,value){this.dispatchEvent(new CustomEvent("change",{detail:{currentType,...this.__config,...value||{}}}))}connectedCallback(){this.shadow.innerHTML=this.createTemplate(),this.initFlatpickr(),this.shadow.querySelector("#speed").addEventListener("onChange",this.onSpeedChange),this.shadow.querySelector("#forward").addEventListener("onChange",this.onForwardChange),this.shadow.querySelector("#bth-backward").addEventListener("click",this.onBackwardClick),this.shadow.querySelector("#bth-forward").addEventListener("click",this.onForwardClick)}disconnectedCallback(){this.shadow.querySelector("#speed").removeEventListener("onChange",this.onSpeedChange),this.shadow.querySelector("#forward").removeEventListener("onChange",this.onForwardChange),this.shadow.querySelector("#bth-backward").removeEventListener("click",this.onBackwardClick),this.shadow.querySelector("#bth-forward").removeEventListener("click",this.onForwardClick)}static get observedAttributes(){return["time-value","forward-value","speed-value","hide-fast","hide-speed","hide-time"]}attributeChangedCallback(name,oldValue,newValue){oldValue!==newValue&&(this.__config[name]=newValue),setTimeout((()=>{this.setAllValue()}))}get value(){return this.__config["time-value"]}get speed(){return Number(this.__config["speed-value"])}set value(v){this.__config["time-value"]=v,this.setTimeValue()}setTimeValue(){const val=this.__config["time-value"];this.datetime.value=val,this.setFlatpickrVal(val)}setAllValue(){this.setTimeValue()}get datetime(){return this.shadow.querySelector("#datetime")}get time(){return this.shadow.querySelector(".time")}onSpeedChange=e=>{this.__config["speed-value"]=Number(e.detail.value),this.onChange("speed-value")};onForwardChange=e=>{this.__config["forward-value"]=Number(e.detail.value)};onBackwardClick=()=>{this.onChange("forward-value",{forwardValue:1e3*-Number(this.__config["forward-value"])})};onForwardClick=()=>{this.onChange("forward-value",{forwardValue:1e3*Number(this.__config["forward-value"])})};canNotClick=()=>{this.time.classList.add("disabled")};canClick=()=>{this.time.classList.remove("disabled")};__flatpickr=null;initFlatpickr(){this.__flatpickr=(0,esm.Z)(this.datetime,{dateFormat:"Y-m-d H:i:S",locale:zh.Mandarin,time_24hr:!0,onClose:v=>{const dataStr=(0,utils_esm.i$r)(v[0]);this.__oldConfig["time-value"]!=dataStr?(this.__config["time-value"]=dataStr,this.onChange("time-value")):this.value=this.__config["time-value"]},onOpen:()=>{this.__oldConfig["time-value"]=this.__config["time-value"]}})}setFlatpickrVal(val){this.__flatpickr&&!this.__flatpickr.isOpen&&this.__flatpickr.setDate(val)}createTemplate(){return`\n            <style>\n            /*时间弹窗*/\n            .timeline-datetime {\n                height: 18px !important;\n                border: 1px solid ${BD};\n                background-color: ${BG};\n                color: #fff;\n                border-radius: 2px;\n                width: 130px;\n                position: relative;\n                 -webkit-user-select: none; /* Safari */\n                user-select: none;\n            }\n\n             .time img {\n                cursor: pointer;\n                margin: 0px 8px;\n                z-index: 1;\n                height: 16px;\n                 -webkit-user-select: none; /* Safari */\n                user-select: none;\n            }\n            \n            .time img:hover {\n                background-color: #333333;\n            }\n            \n            .time {\n                height: 22px;\n                display: flex;\n                justify-content: center;\n                align-items: center;\n                color: #ffffff;\n                -webkit-user-select: none; /* Safari */\n                user-select: none;\n            }\n            \n            .time > input.flatpickr {\n                display: ${(0,utils_esm.oAc)(this.__config["hide-time"])?"none":""};\n            }\n            \n            .disabled {\n                pointer-events: none;\n            }\n            \n            video-progress-bar-forward-select {\n                position: relative;\n                top: -24.5px;\n                height: 0px;\n                line-height: 60px;\n            }\n            </style>\n             <div class="time">\n\x3c!--                <div style="width: 60px"></div>--\x3e\n                <video-progress-bar-forward-select style="display: ${(0,utils_esm.oAc)(this.__config["hide-speed"])?"none":""};" id="speed" default-value="1" options=${JSON.stringify(speedOptions)}></video-progress-bar-forward-select>\n                <input id="datetime" style="display: ${(0,utils_esm.oAc)(this.__config["hide-time"])?"none":""};"  class="flatpickr timeline-datetime" data-enable-time="true" data-enable-seconds="true" >\n                <img id="bth-backward" style="display: ${(0,utils_esm.oAc)(this.__config["hide-fast"])?"none":""};"  title="快退" src="${backward_namespaceObject}" />\n                <video-progress-bar-forward-select style="display: ${(0,utils_esm.oAc)(this.__config["hide-fast"])?"none":""};" id="forward" default-value="60" options=${JSON.stringify(forwardOptions)}></video-progress-bar-forward-select>\n                <img id="bth-forward"  style="display: ${(0,utils_esm.oAc)(this.__config["hide-fast"])?"none":""};" title="快进" src="${forward_namespaceObject}" />\n            </div>\n        `}}customElements.get("video-progress-bar-active-time")||customElements.define("video-progress-bar-active-time",ActiveTime);var dist=__webpack_require__("./node_modules/.pnpm/@storybook+blocks@7.2.1_sfoxds7t5ydpegc3knd667wn6m/node_modules/@storybook/blocks/dist/index.mjs");var jsx_runtime=__webpack_require__("./node_modules/.pnpm/react@17.0.2/node_modules/react/jsx-runtime.js");const VideoProgressBar_stories={title:"Example/VideoProgressBar",component:VideoProgressBar,parameters:{layout:"centered",docs:{page:Story=>(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:(0,jsx_runtime.jsx)(dist.UG,{children:'## video-progress-bar\n\n`视频播放滚动条`[在线demo](https://ligaopeng123-npm.github.io/web-components-repo/?path=/docs/example-videoprogressbar--props)\n\n## Usage\n\n```html\n<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8"/>\n    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>\n    <meta http-equiv="X-UA-Compatible" content="ie=edge"/>\n    <title>video-progress-bar</title>\n    <style>\n        #root {\n            width: 100%;\n            height: 60px;\n        }\n    </style>\n</head>\n\n<body>\n<div id="root">\n    <div style="height: 400px;">\n       \n    </div>\n    <video-progress-bar id="bar"></video-progress-bar>\n</div>\n<script>\n    window.onload = function () {\n        setTimeout(()=> {\n            document.querySelector(\'#bar\').start();\n        }, 3000);\n        document.querySelector(\'#bar\').addEventListener(\'timeChange\', (e)=> {\n            console.log(222, e)\n        });\n    }\n<\/script>\n</body>\n</html>\n\n```\n\n\n\n'})})}},tags:["autodocs"],argTypes:{"scale-level":{control:"select",options:[0,1,2,3,4,5,6]}}},props={args:{"scale-level":0},render:props=>(0,jsx_runtime.jsx)("video-progress-bar",{"scale-level":props["scale-level"]||0,id:"video-progress-bar"})};props.parameters={...props.parameters,docs:{...props.parameters?.docs,source:{originalSource:"{\n  args: {\n    'scale-level': 0\n  },\n  render: props => {\n    return <video-progress-bar scale-level={props['scale-level'] || 0} id=\"video-progress-bar\"></video-progress-bar>;\n  }\n}",...props.parameters?.docs?.source}}};const __namedExportsOrder=["props"]}}]);