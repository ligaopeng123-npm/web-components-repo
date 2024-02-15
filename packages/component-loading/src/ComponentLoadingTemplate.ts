/**********************************************************************
 *
 * @模块名称: component-loadingTemplate
 *
 * @模块用途: component-loadingTemplate
 *
 * @创建人: wangxiangyu
 *
 * @date: 2024-02-15 10:39:24
 *
 **********************************************************************/

export const template = (config: any) => {
    return `
          <style>
            .container {
                padding: 0;
                margin: 0;
                width: 100vw;
                height: 60vh;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
    
            .waving {
                perspective: 1000px;
                -moz-perspective: 1000px;
            }
            .waving > * {
                display: inline-block;
                font-size: 5rem;
                font-weight: 700;
                color: var(--component-loading-color, #5be037);
                transform-origin: top;
                animation: waving 1s infinite ease-in-out;
                animation-fill-mode: backwards;
            }
            .waving > *:first-child {
                animation-delay: 0.12s;
                text-transform: uppercase;
            }
            .waving > *:nth-child(1) {
                animation-delay: 0.12s;
            }
            .waving > *:nth-child(2) {
                animation-delay: 0.24s;
            }
            .waving > *:nth-child(3) {
                animation-delay: 0.36s;
            }
            .waving > *:nth-child(4) {
                animation-delay: 0.48s;
            }
            .waving > *:nth-child(5) {
                animation-delay: 0.6s;
            }
            .waving > *:nth-child(6) {
                animation-delay: 0.72s;
            }
            .waving > *:nth-child(7) {
                animation-delay: 0.84s;
            }
            .waving > *:nth-child(8) {
                animation-delay: 0.96s;
            }
            .waving > *:nth-child(9) {
                animation-delay: 1.08s;
            }
            .waving > *:nth-child(10) {
                animation-delay: 1.2s;
            }
            .waving > *:nth-child(11) {
                animation-delay: 1.32s;
            }
            .waving > *:nth-child(12) {
                animation-delay: 1.44s;
            }
            .waving > *:nth-child(13) {
                animation-delay: 1.56s;
            }
            .waving > *:nth-child(14) {
                animation-delay: 1.68s;
            }
            .waving > *:nth-child(15) {
                animation-delay: 1.8s;
            }
            .waving > *:nth-child(16) {
                animation-delay: 1.92s;
            }
            .waving > *:nth-child(17) {
                animation-delay: 2.04s;
            }
            .waving > *:nth-child(18) {
                animation-delay: 2.16s;
            }
            .waving > *:nth-child(19) {
                animation-delay: 2.28s;
            }
            .waving > *:nth-child(20) {
                animation-delay: 2.4s;
            }
    
            @keyframes waving {
                0% {
                    transform: rotateX(30deg) translateY(0);
                    text-shadow: 0px 3px 0px #ccc, 0px 10px 10px rgba(0, 0, 0, 0.5);
                }
                50% {
                    transform: rotateX(45deg) translateY(-20px);
                    text-shadow: 0px 3px 0px #ccc, 0px 55px 20px rgba(0, 0, 0, 0.4);
                }
                100% {
                    transform: rotateX(30deg) translateY(0);
                    text-shadow: 0px 3px 0px #ccc, 0px 10px 10px rgba(0, 0, 0, 0.5);
                }
            }
        </style>
        <div class="container">
            <div class="waving">
                <span>l</span>
                <span>o</span>
                <span>a</span>
                <span>d</span>
                <span>i</span>
                <span>n</span>
                <span>g</span>
            </div>
            <div class="waving">
                <span>载</span>
                <span>入</span>
                <span>中</span>
            </div>
        </div>
    `
}