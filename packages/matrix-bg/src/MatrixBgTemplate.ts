/**********************************************************************
 *
 * @模块名称: MatrixBgTemplate
 *
 * @模块用途: MatrixBgTemplate
 *
 * @创建人: wangxiangyu
 *
 * @date: 2024-08-09 18:41:32
 *
 **********************************************************************/
export type Config = {
  backgroundColor?: string;
  textColor?: string;
}

export const template = (config: any) => {
  return `
        <style>.container {
  background-color: #000000;
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
}
.container #matrix {
  position: absolute;
  top: 0px;
  width: 100%;
  height: 100%;
}</style>
        <div class="container">
            <canvas id="matrix"></canvas>
            <slot name="content"></slot>
        <div
    `
}