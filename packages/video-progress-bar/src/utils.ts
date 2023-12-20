/**********************************************************************
 *
 * @模块名称: template
 *
 * @模块作用: template
 *
 * @创建人: pgli
 *
 * @date: 2023/6/16 7:32 下午
 *
 * @版权所有: pgli
 *
 **********************************************************************/
export const transparentColor = 'rgba(0,0,0,0)';

export const BG = '#000000';
export const BD = '#333333';

export const addEventFactory = (dom: any, type: string, fn: any, useCapture = false) => {
    dom && dom.addEventListener(type, fn, useCapture);
}

export const removeEventFactory = (dom: any, type: string, fn: any, useCapture = false) => {
    dom && dom.removeEventListener(type, fn, useCapture);
}

export const createTemplate = (config: any, timeLine?: any) => {
    const hideFast = config['hide-fast'];
    const hideSpeed = config['hide-speed'];
    const hideTime = config['hide-time'];
    return `
        <style>
             /*时间拖动区域*/
            .timeline {
                position: relative;
                height: 100%;
                line-height: 100%;
                text-align: center;
                background-color: #000000;
                overflow: hidden;
             }
             /*拖拽样式*/
            .timeline-drag {
                position: absolute;
                width: 100%;
                height: 100%;
            }
           
             .timeline-datetime-level {
                position: absolute;
                font-size: 16px;
                bottom: 1px;
                right: 20px;
                height: 18px;
                line-height: 18px;
                border: 1px solid ${BD};
                background-color: ${BG};
                border-radius: 2px;
                display: flex;
                color: #ffffff;
             }

             .tbar {
                 cursor: pointer;
             }
             .tbar:hover {
                background-color: #a59999;
             }

             .disabled {
                cursor: not-allowed;
                background-color: #726c6c;
             }

             #levelValue {
                width: 36px;
                padding: 0px;
             }

            .disabled-input {
                 height: 16px;
                 width: 150px;
                 top: calc(100% - 16px);
                 position: absolute;
                 left: calc(50% - 86px);
            }
            
            .active {
                text-align: center;
                height: 22px;
                -webkit-user-select: none; /* Safari */
                user-select: none;
            }
        </style>
        <div id="timeline" class="timeline">
        <div class="timeline-drag">
            <canvas id="timeline-drag-canvas"></canvas>
        </div>
        <div class="active">
            <video-progress-bar-active-time hide-time="${hideTime}" hide-fast="${hideFast}" hide-speed="${hideSpeed}"></video-progress-bar-active-time>
        </div>
        
        <div class="timeline-datetime-level">
            <img id="del" class="tbar" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABVUlEQVQ4T6WTv0vWURSHn+cfKINMCoKmElzcWgUnx8BIGuxtylmUnNS20IqGpiZbmnRu6YcEDf4PipDIizpotrSdOHpvvL4m7ze6cLnD+dyHz7nnc+U/l533I+I6MAxcAi4DV4DUHAHHZR+oG/XeH0BELAILwIci/AEcFmGC+gr0LvBafZa1E0BEZPFQPePob90Vl6vAuNqugHHggXq/yZNExFNgU12rgBlgQJ1tCEh9qC8r4AWwry41BKSDfnWmAlaAdTXPfJPHwO0u2Lb6ttRbwIjaqoB3wJcOwBRwpwuwpb4pgAlgTH1UAa+AtrrcsIXJzIs6XQFzwNXsqSHgSYZMfV4BD4F7/zjGHfV9BWR8PwNDGY5eLiLiGzCvfuqMcsZ4FPieIwX2yk7eAHAt2wRuAl/VjP5plOuKiFvAYMn8jTLK1GwCu8BP4Jf68dxn6mX7ovpvr1CGEYQMEQkAAAAASUVORK5CYII=" />
            <div id="levelValue">24h</div>
            <img id="add" class="tbar" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABRUlEQVQ4T6WTvyvGURSHn6cMWFAGbCZZZFEMdiRlEpNSb2IyMbLpnWTwY38zK2VgsBODUkxvMsjkxz9wdXWvXl/0TW6d5d7Pfe45n3uO/HPZeD+EMAh0Ae0NESUvwFuKR/Uy3/sEhBDWgUXgKglfgWcgAG0pIngC2FCjng9ACKEbeFCbyipK2jrQqz5mwDhQUafLAOnBNeBaPc6AGWBYXSl4UoleqNXC/lL0RT3IgChsVbcKwg2gU10u7M8m8G4GrAJ36mFKcR7oA0aBFuAEuFf30vkYMKhuZkCs6bYBEDPqB0aAZuAMqKvbvwHi9zX/sYQOdSdnMAcM/WBiNDeauP+DiW9qLQMmgYU/fuONepQBQ0BNjcaVrhBCDaiq18VWHgDOUyvHNm5s5Y40H1PA6ZdWzk+GECKgp2SYntSLb8NUmvcvgndf85gRc9c+xwAAAABJRU5ErkJggg==" />
        </div>
       </div>
    `
}
