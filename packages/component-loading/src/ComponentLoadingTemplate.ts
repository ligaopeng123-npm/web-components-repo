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
          <style>.container {
  padding: 0;
  margin: 0;
  width: 100vw;
  height: 60vh;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
          flex-direction: column;
  -webkit-box-align: center;
  -webkit-align-items: center;
          align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
          justify-content: center;
}
@-webkit-keyframes waving {
  0% {
    -webkit-transform: rotateX(30deg) translateY(0);
            transform: rotateX(30deg) translateY(0);
    text-shadow: 0px 3px 0px #ccc, 0px 10px 10px rgba(0, 0, 0, 0.5);
  }
  50% {
    -webkit-transform: rotateX(45deg) translateY(-20px);
            transform: rotateX(45deg) translateY(-20px);
    text-shadow: 0px 3px 0px #ccc, 0px 55px 20px rgba(0, 0, 0, 0.4);
  }
  100% {
    -webkit-transform: rotateX(30deg) translateY(0);
            transform: rotateX(30deg) translateY(0);
    text-shadow: 0px 3px 0px #ccc, 0px 10px 10px rgba(0, 0, 0, 0.5);
  }
}
@keyframes waving {
  0% {
    -webkit-transform: rotateX(30deg) translateY(0);
            transform: rotateX(30deg) translateY(0);
    text-shadow: 0px 3px 0px #ccc, 0px 10px 10px rgba(0, 0, 0, 0.5);
  }
  50% {
    -webkit-transform: rotateX(45deg) translateY(-20px);
            transform: rotateX(45deg) translateY(-20px);
    text-shadow: 0px 3px 0px #ccc, 0px 55px 20px rgba(0, 0, 0, 0.4);
  }
  100% {
    -webkit-transform: rotateX(30deg) translateY(0);
            transform: rotateX(30deg) translateY(0);
    text-shadow: 0px 3px 0px #ccc, 0px 10px 10px rgba(0, 0, 0, 0.5);
  }
}
.container .waving {
  -webkit-perspective: 1000px;
          perspective: 1000px;
}
.container .waving * {
  display: inline-block;
  font-size: 5rem;
  font-weight: 700;
  color: var(--component-loading-color, #5be037);
  -webkit-transform-origin: top;
          transform-origin: top;
  -webkit-animation: waving 1s infinite ease-in-out;
          animation: waving 1s infinite ease-in-out;
  -webkit-animation-fill-mode: backwards;
          animation-fill-mode: backwards;
}
.container .waving *:first-child {
  -webkit-animation-delay: 0.12s;
          animation-delay: 0.12s;
  text-transform: uppercase;
}
.container .waving *:nth-child(1) {
  -webkit-animation-delay: 0.12s;
          animation-delay: 0.12s;
}
.container .waving *:nth-child(2) {
  -webkit-animation-delay: 0.24s;
          animation-delay: 0.24s;
}
.container .waving *:nth-child(3) {
  -webkit-animation-delay: 0.36s;
          animation-delay: 0.36s;
}
.container .waving *:nth-child(4) {
  -webkit-animation-delay: 0.48s;
          animation-delay: 0.48s;
}
.container .waving *:nth-child(5) {
  -webkit-animation-delay: 0.6s;
          animation-delay: 0.6s;
}
.container .waving *:nth-child(6) {
  -webkit-animation-delay: 0.72s;
          animation-delay: 0.72s;
}
.container .waving *:nth-child(7) {
  -webkit-animation-delay: 0.84s;
          animation-delay: 0.84s;
}
.container .waving *:nth-child(8) {
  -webkit-animation-delay: 0.96s;
          animation-delay: 0.96s;
}
.container .waving *:nth-child(9) {
  -webkit-animation-delay: 1.08s;
          animation-delay: 1.08s;
}
.container .waving *:nth-child(10) {
  -webkit-animation-delay: 1.2s;
          animation-delay: 1.2s;
}
.container .waving *:nth-child(11) {
  -webkit-animation-delay: 1.32s;
          animation-delay: 1.32s;
}
.container .waving *:nth-child(12) {
  -webkit-animation-delay: 1.44s;
          animation-delay: 1.44s;
}
.container .waving *:nth-child(13) {
  -webkit-animation-delay: 1.56s;
          animation-delay: 1.56s;
}
.container .waving *:nth-child(14) {
  -webkit-animation-delay: 1.68s;
          animation-delay: 1.68s;
}
.container .waving *:nth-child(15) {
  -webkit-animation-delay: 1.8s;
          animation-delay: 1.8s;
}
.container .waving *:nth-child(16) {
  -webkit-animation-delay: 1.92s;
          animation-delay: 1.92s;
}
.container .waving *:nth-child(17) {
  -webkit-animation-delay: 2.04s;
          animation-delay: 2.04s;
}
.container .waving *:nth-child(18) {
  -webkit-animation-delay: 2.16s;
          animation-delay: 2.16s;
}
.container .waving *:nth-child(19) {
  -webkit-animation-delay: 2.28s;
          animation-delay: 2.28s;
}
.container .waving *:nth-child(20) {
  -webkit-animation-delay: 2.4s;
          animation-delay: 2.4s;
}</style>
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