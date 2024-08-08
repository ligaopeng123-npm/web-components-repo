/**********************************************************************
 *
 * @模块名称: CardFlipTemplate
 *
 * @模块用途: CardFlipTemplate
 *
 * @创建人: wangxiangyu
 *
 * @date: 2024-08-08 21:17:32
 *
 **********************************************************************/
export type CardFlipConfig = {
    height?: string | number; // 高度
    width?: string | number; // 宽度
    type?: 'x' | 'y' // 翻转的方向
};

export const template = (config: CardFlipConfig) => {
    const {type,width,height} = config;
    console.log(type, height, width);
    return `
        <style>.container {
  height: 200px;
  width: 200px;
  position: relative;
}
.container:hover .front {
  -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
}
.container:hover .front-y {
  transform: rotateX(180deg);
}
.container:hover .front-x {
  transform: rotateY(180deg);
}
.container:hover .back {
  -webkit-backface-visibility: 1;
          backface-visibility: 1;
}
.container:hover .back-y {
  transform: rotateX(0deg);
}
.container:hover .back-x {
  transform: rotateY(0deg);
}

.item {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  transform-style: preserve-3d;
  transition: 1s;
}

.front {
  -webkit-backface-visibility: 1;
          backface-visibility: 1;
}

.front-y {
  transform: rotateX(0deg);
}

.front-x {
  transform: rotateY(0deg);
}

.back {
  -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
}

.back-y {
  transform: rotateX(180deg);
}

.back-x {
  transform: rotateY(180deg);
}</style>
        <div class="container">
            <div class="item front front-${type}">
                <slot name="front"></slot>
            </div>
            <div class="item back back-${type}">
                <slot name="back"></slot>
            </div>
        <div
    `
}