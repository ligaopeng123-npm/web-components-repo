/**********************************************************************
 *
 * @模块名称: ThreeDemoTemplate
 *
 * @模块用途: ThreeDemoTemplate
 *
 * @创建人: wangxiangyu
 *
 * @date: 2024-10-17 17:56:28
 *
 **********************************************************************/

export const template = (isCanvas?: boolean) => {
    return `
        <style>
            ::-webkit-scrollbar {
  height: 16px;
  width: 16px;
  overflow: visible
}

::-webkit-scrollbar-button {
  width: 0;
  height: 0
}

::-webkit-scrollbar-corner {
  background: transparent
}

::-webkit-scrollbar-thumb {
  background-color: #ddd;
  background-clip: padding-box;
  border: 4px solid #f2f4f7;
  border-radius: 8px;
  min-height: 24px
}

::-webkit-scrollbar-thumb:hover {
  background-color: #c9c9c9
}

::-webkit-scrollbar-track {
  background: #f2f4f7;
  background-clip: padding-box
}

* {
  margin: 0;
  padding: 0;
}

body {
  background-color: #F2F4F7;
}

ul {
  list-style: none;
}

.menu {
  width: 100%;
  height: 60px;
  top: 0;
  z-index: 9;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F2F4F7;
  box-shadow: 0 2px 4px 0 transparent;
}

.menu-divider {
  width: 1px;
  height: 16px;
  margin: 0 8px;
  display: inline-block;
  background-color: #cfd2d8;
}

.menu-item {
  height: 24px;
  display: flex;
  align-items: center;
  position: relative;
}

.menu-item>div {
  width: 24px;
  height: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 2px;
}

.menu-item>div:hover {
  background: rgba(25, 55, 88, .04);
}

.menu-item>div.active {
  background: rgba(25, 55, 88, .08);
}

.menu-item i {
  width: 16px;
  height: 16px;
  display: inline-block;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.menu-item>div>span {
  width: 16px;
  height: 3px;
  display: inline-block;
  border: 1px solid #e2e6ed;
}

.menu-item .select {
  border: none;
  font-size: 12px;
  line-height: 24px;
  user-select: none;
}

.menu-item .select::after {
  position: absolute;
  content: "";
  top: 11px;
  width: 0;
  height: 0;
  right: 2px;
  border-color: #767c85 transparent transparent;
  border-style: solid solid none;
  border-width: 3px 3px 0;
}

.menu-item .options {
  width: 70px;
  position: absolute;
  left: 0;
  top: 25px;
  padding: 10px;
  background: #fff;
  font-size: 14px;
  box-shadow: 0 2px 12px 0 rgb(56 56 56 / 20%);
  border: 1px solid #e2e6ed;
  border-radius: 2px;
  display: none;
}

.menu-item .options.visible {
  display: block;
}

.menu-item .options li {
  padding: 5px;
  margin: 5px 0;
  user-select: none;
  transition: all .3s;
}

.menu-item .options li:hover {
  background-color: #ebecef;
}

.menu-item .options li.active {
  background-color: #e2e6ed;
}

.menu-item .menu-item__font {
  width: 65px;
  position: relative;
}

.menu-item .menu-item__size {
  width: 50px;
  text-align: center;
  position: relative;
}

.menu-item__font .select,
.menu-item__size .select {
  width: 100%;
  height: 100%;
}

.menu-item__undo.no-allow,
.menu-item__redo.no-allow,
.menu-item>div.disable {
  color: #c0c4cc;
  cursor: not-allowed;
  opacity: 0.4;
  pointer-events: none;
}

.menu-item__undo i {
  background-image: url('assets/images/undo.svg');
}

.menu-item__redo i {
  background-image: url('assets/images/redo.svg');
}

.menu-item__painter i {
  background-image: url('assets/images/painter.svg');
}

.menu-item__format i {
  background-image: url('assets/images/format.svg');
}

.menu-item__size-add i {
  background-image: url('assets/images/size-add.svg');
}

.menu-item__size-minus i {
  background-image: url('assets/images/size-minus.svg');
}

.menu-item__bold i {
  background-image: url('assets/images/bold.svg');
}

.menu-item__italic i {
  background-image: url('assets/images/italic.svg');
}

.menu-item .menu-item__underline {
  width: 30px;
  position: relative;
}

.menu-item__underline>i {
  flex-shrink: 0;
  background-image: url('assets/images/underline.svg');
}

.menu-item__underline .select {
  width: 100%;
  height: 100%;
}

.menu-item .menu-item__underline .options {
  width: 128px;
}

.menu-item .menu-item__underline li {
  padding: 1px 5px;
}

.menu-item__underline li i {
  pointer-events: none;
}

.menu-item__underline li[data-decoration-style="solid"] {
  background-image: url('assets/images/line-single.svg');
}

.menu-item__underline li[data-decoration-style="double"] {
  background-image: url('assets/images/line-double.svg')
}

.menu-item__underline li[data-decoration-style="dashed"] {
  background-image: url('assets/images/line-dash-small-gap.svg');
}

.menu-item__underline li[data-decoration-style="dotted"] {
  background-image: url('assets/images/line-dot.svg');
}

.menu-item__underline li[data-decoration-style="wavy"] {
  background-image: url('assets/images/line-wavy.svg');
}

.menu-item__strikeout i {
  background-image: url('assets/images/strikeout.svg');
}

.menu-item__superscript i {
  background-image: url('assets/images/superscript.svg');
}

.menu-item__subscript i {
  background-image: url('assets/images/subscript.svg');
}

.menu-item__color,
.menu-item__highlight {
  display: flex;
  flex-direction: column;
}

.menu-item__color #color,
.menu-item__highlight #highlight {
  width: 1px;
  height: 1px;
  visibility: hidden;
  outline: none;
  appearance: none;
}

.menu-item__color i {
  background-image: url('assets/images/color.svg');
}

.menu-item__color span {
  background-color: #000000;
}

.menu-item__highlight i {
  background-image: url('assets/images/highlight.svg');
}

.menu-item__highlight span {
  background-color: #ffff00;
}

.menu-item .menu-item__title {
  width: 60px;
  position: relative;
}

.menu-item__title .select {
  width: calc(100% - 20px);
  height: 100%;
}

.menu-item__title i {
  transform: translateX(-5px);
  background-image: url('assets/images/title.svg');
}

.menu-item__title .options {
  width: 80px;
}

.menu-item__left i {
  background-image: url('assets/images/left.svg');
}

.menu-item__center i {
  background-image: url('assets/images/center.svg');
}

.menu-item__right i {
  background-image: url('assets/images/right.svg');
}

.menu-item__alignment i {
  background-image: url('assets/images/alignment.svg');
}

.menu-item__justify i {
  background-image: url('assets/images/justify.svg');
}

.menu-item__row-margin {
  position: relative;
}

.menu-item__row-margin i {
  background-image: url('assets/images/row-margin.svg');
}

.menu-item__list {
  position: relative;
}

.menu-item__list i {
  background-image: url('assets/images/list.svg');
}

.menu-item__list .options {
  width: 110px;
}

.menu-item__list .options>ul>li * {
  pointer-events: none;
}

.menu-item__list .options>ul>li li {
  margin-left: 18px;
}

.menu-item__list .options>ul>li[data-list-style='checkbox'] li::marker {
  font-size: 11px;
}

.menu-item__image i {
  background-image: url('assets/images/image.svg');
}

.menu-item__image input {
  display: none;
}

.menu-item__table {
  position: relative;
}

.menu-item__table i {
  background-image: url('assets/images/table.svg');
}

.menu-item .menu-item__table__collapse {
  width: 270px;
  height: 310px;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgb(56 56 56 / 20%);
  border: 1px solid #e2e6ed;
  box-sizing: border-box;
  border-radius: 2px;
  position: absolute;
  display: none;
  z-index: 99;
  top: 25px;
  left: 0;
  padding: 14px 27px;
  cursor: auto;
}

.menu-item .menu-item__table__collapse .table-close {
  position: absolute;
  right: 10px;
  top: 5px;
  cursor: pointer;
}

.menu-item .menu-item__table__collapse .table-close:hover {
  color: #7d7e80;
}

.menu-item .menu-item__table__collapse:hover {
  background: #fff;
}

.menu-item .menu-item__table__collapse .table-title {
  display: flex;
  justify-content: flex-start;
  padding-bottom: 5px;
  border-bottom: 1px solid #e2e6ed;
}

.table-title span {
  font-size: 12px;
  color: #3d4757;
  display: inline;
  margin: 0;
}

.table-panel {
  cursor: pointer;
}

.table-panel .table-row {
  display: flex;
  flex-wrap: nowrap;
  margin-top: 10px;
  pointer-events: none;
}

.table-panel .table-cel {
  width: 16px;
  height: 16px;
  box-sizing: border-box;
  border: 1px solid #e2e6ed;
  background: #fff;
  position: relative;
  margin-right: 6px;
  pointer-events: none;
}

.table-panel .table-cel.active {
  border: 1px solid rgba(73, 145, 242, .2);
  background: rgba(73, 145, 242, .15);
}

.table-panel .table-row .table-cel:last-child {
  margin-right: 0;
}

.menu-item__hyperlink i {
  background-image: url('assets/images/hyperlink.svg');
}

.menu-item__separator {
  position: relative;
}

.menu-item__separator>i {
  background-image: url('assets/images/separator.svg');
}

.menu-item .menu-item__separator .options {
  width: 128px;
}

.menu-item .menu-item__separator li {
  padding: 1px 5px;
}

.menu-item__separator li i {
  pointer-events: none;
}

.menu-item__separator li[data-separator="0,0"] {
  background-image: url('assets/images/line-single.svg');
}

.menu-item__separator li[data-separator="1,1"] {
  background-image: url('assets/images/line-dot.svg');
}

.menu-item__separator li[data-separator="3,1"] {
  background-image: url('assets/images/line-dash-small-gap.svg');
}

.menu-item__separator li[data-separator="4,4"] {
  background-image: url('assets/images/line-dash-large-gap.svg');
}

.menu-item__separator li[data-separator="7,3,3,3"] {
  background-image: url('assets/images/line-dash-dot.svg');
}

.menu-item__separator li[data-separator="6,2,2,2,2,2"] {
  background-image: url('assets/images/line-dash-dot-dot.svg');
}

.menu-item__watermark>i {
  background-image: url('assets/images/watermark.svg');
}

.menu-item__watermark {
  position: relative;
}

.menu-item__codeblock i {
  background-image: url('assets/images/codeblock.svg');
}

.menu-item__page-break i {
  background-image: url('assets/images/page-break.svg');
}

.menu-item__control {
  position: relative;
}

.menu-item__control i {
  background-image: url('assets/images/control.svg');
}

.menu-item__checkbox i {
  background-image: url('assets/images/checkbox.svg');
}

.menu-item__radio i {
  background-image: url('assets/images/radio.svg');
}

.menu-item__latex i {
  background-image: url('assets/images/latex.svg');
}

.menu-item__date {
  position: relative;
}

.menu-item__date i {
  background-image: url('assets/images/date.svg');
}

.menu-item__date .options {
  width: 160px;
}

.menu-item__block i {
  background-image: url('assets/images/block.svg');
}

.menu-item .menu-item__control .options {
  width: 55px;
}

.menu-item__search {
  position: relative;
}

.menu-item__search i {
  background-image: url('assets/images/search.svg');
}

.menu-item .menu-item__search__collapse {
  width: 260px;
  height: 72px;
  box-sizing: border-box;
  position: absolute;
  display: none;
  z-index: 99;
  top: 25px;
  left: 0;
  background: #ffffff;
  box-shadow: 0px 5px 5px #e3dfdf;
}

.menu-item .menu-item__search__collapse:hover {
  background: #ffffff;
}

.menu-item .menu-item__search__collapse>div {
  width: 250px;
  height: 36px;
  padding: 0 5px;
  line-height: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
}

.menu-item .menu-item__search__collapse>div input {
  width: 205px;
  height: 27px;
  appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #ebebeb;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  line-height: 27px;
  outline: none;
  padding: 0 5px;
}

.menu-item .menu-item__search__collapse>div span {
  height: 100%;
  color: #dcdfe6;
  font-size: 25px;
  display: inline-block;
  border: 0;
  padding: 0 10px;
}

.menu-item .menu-item__search__collapse__replace button {
  display: inline-block;
  border: 1px solid #e2e6ed;
  border-radius: 2px;
  background: #fff;
  line-height: 22px;
  padding: 0 6px;
  white-space: nowrap;
  margin-left: 4px;
  cursor: pointer;
  font-size: 12px;
}

.menu-item .menu-item__search__collapse__replace button:hover {
  background: rgba(25, 55, 88, .04);
}

.menu-item .menu-item__search__collapse__search {
  position: relative;
}

.menu-item .menu-item__search__collapse__search label {
  right: 110px;
  font-size: 12px;
  color: #3d4757;
  position: absolute;
}

.menu-item .menu-item__search__collapse__search>input {
  padding: 5px 90px 5px 5px !important;
}

.menu-item .menu-item__search__collapse__search>div {
  width: 28px;
  height: 27px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-left: 1px solid #e2e6ed;
  transition: all .5s;
}

.menu-item .menu-item__search__collapse__search>div:hover {
  background-color: rgba(25, 55, 88, .04);
}

.menu-item .menu-item__search__collapse__search i {
  width: 6px;
  height: 8px;
  transform: translateY(1px);
}

.menu-item .menu-item__search__collapse__search .arrow-left {
  right: 76px;
}

.menu-item .menu-item__search__collapse__search .arrow-left i {
  background: url(assets/images/arrow-left.svg) no-repeat;
}

.menu-item .menu-item__search__collapse__search .arrow-right {
  right: 48px;
}

.menu-item .menu-item__search__collapse__search .arrow-right i {
  background: url(assets/images/arrow-right.svg) no-repeat;
}

.menu-item__print i {
  background-image: url('assets/images/print.svg');
}

.catalog {
  width: 250px;
  position: fixed;
  left: 0;
  bottom: 0;
  top: 100px;
  padding: 0 20px 40px 20px;
}

.catalog .catalog__header {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e2e6ed;
}

.catalog .catalog__header span {
  color: #3d4757;
  font-size: 14px;
  font-weight: bold;
}

.catalog .catalog__header i {
  width: 16px;
  height: 16px;
  cursor: pointer;
  display: inline-block;
  background: url(assets/images/close.svg) no-repeat;
  transition: all .2s;
}

.catalog .catalog__header>div:hover {
  background: rgba(235, 238, 241);
}

.catalog__main {
  height: calc(100% - 60px);
  padding: 10px 0;
  overflow-y: auto;
  overflow-x: hidden;
}

.catalog__main .catalog-item {
  width: 100%;
  padding-left: 10px;
  box-sizing: border-box;
}

.catalog__main>.catalog-item {
  padding-left: 0;
}

.catalog__main .catalog-item .catalog-item__content {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.catalog__main .catalog-item .catalog-item__content:hover>span {
  color: #4991f2;
}

.catalog__main .catalog-item .catalog-item__content span {
  color: #3d4757;
  line-height: 30px;
  font-size: 12px;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
}

.editor>div {
  margin: 80px auto;
}

.ce-page-container canvas {
  box-shadow: rgb(158 161 165 / 40%) 0px 2px 12px 0px;
}

.comment {
  width: 250px;
  height: 650px;
  position: fixed;
  transform: translateX(420px);
  top: 200px;
  left: 50%;
  overflow-y: auto;
}

.comment-item {
  background: #ffffff;
  border: 1px solid #e2e6ed;
  position: relative;
  border-radius: 8px;
  padding: 15px;
  font-size: 14px;
  margin-bottom: 20px;
  cursor: pointer;
  transition: all .5s;
}

.comment-item:hover {
  border-color: #c0c6cf;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
}

.comment-item.active {
  border-color: #E99D00;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
}

.comment-item__title {
  height: 22px;
  position: relative;
  display: flex;
  align-items: center;
  color: #c1c6ce;
}

.comment-item__title span:first-child {
  background-color: #dbdbdb;
  width: 4px;
  height: 16px;
  margin-right: 5px;
  display: inline-block;
  border-radius: 999px;
}

.comment-item__title span:nth-child(2) {
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.comment-item__title i {
  width: 16px;
  height: 16px;
  cursor: pointer;
  position: absolute;
  right: -8px;
  top: -8px;
  background: url(assets/images/close.svg) no-repeat;
}

.comment-item__title i:hover {
  opacity: 0.6;
}

.comment-item__info {
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.comment-item__info>span:first-child {
  font-weight: 600;
}

.comment-item__info>span:last-child {
  color: #c1c6ce;
}

.comment-item__content {
  line-height: 22px;
}

.footer {
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f2f4f7;
  z-index: 9;
  position: fixed;
  bottom: 0;
  left: 0;
  font-size: 12px;
  padding: 0 4px 0 20px;
  box-sizing: border-box;
}

.footer>div:first-child {
  display: flex;
  align-items: center;
}

.footer .catalog-mode {
  padding: 1px;
  position: relative;
}

.footer .catalog-mode i {
  width: 16px;
  height: 16px;
  margin-right: 5px;
  cursor: pointer;
  display: inline-block;
  background-image: url('assets/images/catalog.svg');
}

.footer .page-mode {
  padding: 1px;
  position: relative;
}

.footer .page-mode i {
  width: 16px;
  height: 16px;
  margin-right: 5px;
  cursor: pointer;
  display: inline-block;
  background-image: url('assets/images/page-mode.svg');
}

.footer .options {
  width: 70px;
  position: absolute;
  left: 0;
  bottom: 25px;
  padding: 10px;
  background: #fff;
  font-size: 14px;
  box-shadow: 0 2px 12px 0 rgb(56 56 56 / 20%);
  border: 1px solid #e2e6ed;
  border-radius: 2px;
  display: none;
}

.footer .options.visible {
  display: block;
}

.footer .options li {
  padding: 5px;
  margin: 5px 0;
  user-select: none;
  transition: all .3s;
  text-align: center;
  cursor: pointer;
}

.footer .options li:hover {
  background-color: #ebecef;
}

.footer .options li.active {
  background-color: #e2e6ed;
}

.footer>div:first-child>span {
  display: inline-block;
  margin-right: 5px;
  letter-spacing: 1px;
}

.footer>div:last-child {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.footer>div:last-child>div {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer>div:last-child>div:hover {
  background: rgba(25, 55, 88, .04);
}

.footer>div:last-child i {
  width: 16px;
  height: 16px;
  display: inline-block;
  cursor: pointer;
}

.footer .editor-option i {
  background-image: url('assets/images/option.svg');
}

.footer .page-scale-minus i {
  background-image: url('assets/images/page-scale-minus.svg');
}

.footer .page-scale-add i {
  background-image: url('assets/images/page-scale-add.svg');
}

.footer .page-scale-percentage {
  cursor: pointer;
  user-select: none;
}

.footer .fullscreen i {
  background-image: url('assets/images/request-fullscreen.svg');
}

.footer .fullscreen.exist i {
  background-image: url('assets/images/exit-fullscreen.svg');
}

.footer .paper-margin i {
  background-image: url('assets/images/paper-margin.svg');
}

.footer .editor-mode {
  cursor: pointer;
  user-select: none;
}

.footer .paper-size {
  position: relative;
}

.footer .paper-size i {
  background-image: url('assets/images/paper-size.svg');
}

.footer .paper-size .options {
  right: 0;
  left: unset;
}

.footer .paper-direction {
  position: relative;
}

.footer .paper-direction i {
  background-image: url('assets/images/paper-direction.svg');
}

.footer .paper-direction .options {
  right: 0;
  left: unset;
}

.ce-contextmenu-signature {
  background-image: url('assets/images/signature.svg');
}

.ce-contextmenu-word-tool {
  background-image: url('assets/images/word-tool.svg');
}

.ce-select-control-popup{max-width:160px;min-width:69px;max-height:225px;position:absolute;z-index:1;border:1px solid #e4e7ed;border-radius:4px;background-color:#fff;box-shadow:0 2px 12px #0000001a;box-sizing:border-box;margin:5px 0;overflow-y:auto}.ce-select-control-popup ul{list-style:none;padding:3px 0;margin:0;box-sizing:border-box}.ce-select-control-popup ul li{font-size:13px;padding:0 20px;position:relative;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#666;height:36px;line-height:36px;box-sizing:border-box;cursor:pointer}.ce-select-control-popup ul li:hover{background-color:#eef2fd}.ce-select-control-popup ul li.active{color:var(--COLOR-HOVER, #5175f4);font-weight:700}.ce-date-container{display:none;width:300px;overflow:hidden;left:0;right:0;position:absolute;z-index:1;color:#606266;background:#ffffff;border-radius:4px;padding:10px;user-select:none;border:1px solid #e4e7ed;box-shadow:0 2px 12px #0000001a}.ce-date-container.active{display:block}.ce-date-wrap{display:none}.ce-date-wrap.active{display:block}.ce-date-title{display:flex;justify-content:center;align-items:center;text-align:center;color:#606266;font-size:16px}.ce-date-title>span{display:inline-block}.ce-date-title>span:not(.ce-date-title__now){font-family:cursive;cursor:pointer}.ce-date-title>span:not(.ce-date-title__now):hover{color:#5175f4}.ce-date-title .ce-date-title__pre-year,.ce-date-title .ce-date-title__pre-month{width:15%}.ce-date-title .ce-date-title__now{width:40%}.ce-date-title .ce-date-title__next-year,.ce-date-title .ce-date-title__next-month{width:15%}.ce-date-week{width:100%;display:flex;justify-content:center;margin-top:15px;padding-bottom:5px;border-bottom:1px solid #e4e7ed}.ce-date-week>span{list-style:none;width:14.28571%;text-align:center;color:#606266;font-size:14px}.ce-date-day{width:100%;display:flex;flex-wrap:wrap;align-items:center;margin-top:5px}.ce-date-day>div{width:14.28571%;height:40px;text-align:center;color:#606266;font-size:14px;cursor:pointer;line-height:40px;border-radius:4px}.ce-date-day>div:hover{color:#5175f4;opacity:.8}.ce-date-day>div.active{color:#5175f4;font-weight:700}.ce-date-day>div.disable{color:#c0c4cc}.ce-date-day>div.select{color:#fff;background-color:#5175f4}.ce-time-wrap{display:none;padding:10px;height:286px}.ce-time-wrap ::-webkit-scrollbar{width:0}.ce-time-wrap.active{display:flex}.ce-time-wrap li{list-style:none}.ce-time-wrap>li{width:33.3%;height:100%;text-align:center}.ce-time-wrap>li>span{transform:translateY(-5px);display:inline-block}.ce-time-wrap>li>ol{height:calc(100% - 20px);overflow-y:auto;border:1px solid #e2e2e2;position:relative}.ce-time-wrap>li:first-child>ol{border-right:0}.ce-time-wrap>li:last-child>ol{border-left:0}.ce-time-wrap>li>ol>li{line-height:30px;cursor:pointer;transition:all .3s}.ce-time-wrap>li>ol>li:hover{background-color:#eaeaea}.ce-time-wrap>li>ol>li.active{color:#fff;background:#5175F4}.ce-date-menu{width:100%;height:28px;display:flex;justify-content:flex-end;align-items:center;padding-top:10px;position:relative;border-top:1px solid #e4e7ed}.ce-date-menu button{display:inline-block;line-height:1;white-space:nowrap;cursor:pointer;background:#fff;border:1px solid #dcdfe6;color:#606266;appearance:none;text-align:center;box-sizing:border-box;outline:none;transition:.1s;font-weight:500;user-select:none;padding:7px 15px;font-size:12px;border-radius:3px;margin:0 0 0 10px}.ce-date-menu button:hover{color:#5175f4;border-color:#5175f4}.ce-date-menu button.ce-date-menu__time{border:1px solid transparent;position:absolute;left:0;margin-left:0}.ce-date-menu button.ce-date-menu__time:hover{color:#5175f4}.ce-block-item{position:absolute;z-index:0;overflow:hidden;border-radius:8px;background-color:#fff;border:1px solid rgb(235 236 240)}.ce-table-tool__row{position:absolute;width:12px;border-radius:6.5px;overflow:hidden;background-color:#e2e6ed}.ce-table-tool__row .ce-table-tool__row__item{width:100%;position:relative}.ce-table-tool__row .ce-table-tool__row__item:after{content:"";position:absolute;bottom:0;left:2px;width:8px;height:1px;background-color:#c0c6cf}.ce-table-tool__row .ce-table-tool__row__item:last-child:after{display:none}.ce-table-tool__quick__add{width:16px;height:16px;position:absolute;border-radius:50%;background-color:#e2e6ed;cursor:pointer}.ce-table-tool__quick__add:after{content:"+";color:#fff;position:absolute;top:50%;left:50%;transform:translate(-50%,-55%)}.ce-table-tool__select{width:16px;height:18px;position:absolute;border-radius:3px;cursor:pointer}.ce-table-tool__select:hover{background-color:#e2e6ed}.ce-table-tool__select:after{content:":::";color:#aaaaab;position:absolute;top:50%;left:50%;transform:translate(-75%,-50%) rotate(-90deg)}.ce-table-tool__col{position:absolute;height:12px;border-radius:6.5px;overflow:hidden;background-color:#e2e6ed;display:flex}.ce-table-tool__col .ce-table-tool__col__item{height:100%;position:relative}.ce-table-tool__col .ce-table-tool__col__item:after{content:"";position:absolute;top:2px;left:-1px;width:1px;height:8px;z-index:1;background-color:#c0c6cf}.ce-table-tool__col .ce-table-tool__col__item:first-child:after{display:none}.ce-table-tool__row .ce-table-tool__row__item.active,.ce-table-tool__col .ce-table-tool__col__item.active{background-color:#c4d7fa}.ce-table-tool__col .ce-table-tool__anchor{right:-5px;width:10px;height:12px;z-index:9;position:absolute;cursor:col-resize}.ce-table-tool__row .ce-table-tool__anchor{bottom:-5px;left:0;width:12px;height:10px;z-index:9;position:absolute;cursor:row-resize}.ce-table-anchor__line{z-index:9;position:absolute;border:1px dotted #000000}.ce-table-tool__border{position:absolute;z-index:1;background:transparent;pointer-events:none}.ce-table-tool__border__row{position:absolute;cursor:row-resize;pointer-events:auto}.ce-table-tool__border__col{position:absolute;cursor:col-resize;pointer-events:auto}.ce-resizer-selection{position:absolute;border:1px solid;pointer-events:none}.ce-resizer-selection .resizer-handle{position:absolute;z-index:9;width:10px;height:10px;box-shadow:0 1px 4px #0000004d;border-radius:5px;border:2px solid #ffffff;box-sizing:border-box;pointer-events:initial}.ce-resizer-selection .handle-0{cursor:nw-resize}.ce-resizer-selection .handle-1{cursor:n-resize}.ce-resizer-selection .handle-2{cursor:ne-resize}.ce-resizer-selection .handle-3{cursor:e-resize}.ce-resizer-selection .handle-4{cursor:se-resize}.ce-resizer-selection .handle-5{cursor:s-resize}.ce-resizer-selection .handle-6{cursor:sw-resize}.ce-resizer-selection .handle-7{cursor:w-resize}.ce-resizer-size-view{display:flex;align-items:center;height:20px;white-space:nowrap;position:absolute;z-index:9;top:-30px;left:0;opacity:.9;background-color:#000;padding:0 5px;border-radius:4px}.ce-resizer-size-view span{color:#fff;font-size:12px}.ce-resizer-image{position:absolute;opacity:.5}.ce-image-previewer{position:fixed;left:0;top:0;z-index:1000;width:100%;height:100%;overflow:hidden;background:#f2f4f7;display:flex;align-items:center;justify-content:center;animation:previewerAnimation .3s}@keyframes previewerAnimation{0%{opacity:.1}to{opacity:1}}.ce-image-previewer .image-close{width:24px;height:24px;display:inline-block;position:absolute;right:50px;top:30px;z-index:99;cursor:pointer;background:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTIzLjk3IDdsMS40MTUgMS40MTQtNy43NzkgNy43NzggNy43NzkgNy43NzktMS40MTQgMS40MTQtNy43NzktNy43NzktNy43NzggNy43NzlMNyAyMy45N2w3Ljc3OC03Ljc3OUw3IDguNDE0IDguNDE0IDdsNy43NzggNy43NzhMMjMuOTcxIDd6IiBmaWxsPSIjM0Q0NzU3IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=) no-repeat;background-size:100% 100%;transition:all .3s;border-radius:50%}.ce-image-previewer .image-close:hover{background-color:#e2e6ed}.ce-image-previewer .ce-image-container{position:relative}.ce-image-previewer .ce-image-container img{cursor:move;position:relative}.ce-image-previewer .ce-image-menu{height:50px;position:absolute;bottom:50px;z-index:99;display:flex;align-items:center;justify-content:center}.ce-image-previewer .ce-image-menu i{width:32px;height:32px;margin:0 8px;cursor:pointer;display:inline-block;background-repeat:no-repeat;background-size:100% 100%;transition:all .3s;border-radius:50%}.ce-image-previewer .ce-image-menu i:hover{background-color:#e2e6ed}.ce-image-previewer .ce-image-menu i.zoom-in{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTE0IDE0di00aDJ2NGg0djJoLTR2NGgtMnYtNGgtNHYtMmg0em04Ljc0OSAxMC4xNjNBMTEuOTUyIDExLjk1MiAwIDAxMTUgMjdDOC4zNzMgMjcgMyAyMS42MjcgMyAxNVM4LjM3MyAzIDE1IDNzMTIgNS4zNzMgMTIgMTJjMCAyLjk1NC0xLjA2NyA1LjY1OC0yLjgzNyA3Ljc0OWw0LjkwOCA0LjkwOC0xLjQxNCAxLjQxNC00LjkwOC00LjkwOHpNMTUgMjVjNS41MjMgMCAxMC00LjQ3NyAxMC0xMFMyMC41MjMgNSAxNSA1IDUgOS40NzcgNSAxNXM0LjQ3NyAxMCAxMCAxMHoiIGZpbGw9IiMzRDQ3NTciLz48L3N2Zz4=)}.ce-image-previewer .ce-image-menu i.zoom-out{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTIyLjc0OSAyNC4xNjNBMTEuOTUyIDExLjk1MiAwIDAxMTUgMjdDOC4zNzMgMjcgMyAyMS42MjcgMyAxNVM4LjM3MyAzIDE1IDNzMTIgNS4zNzMgMTIgMTJjMCAyLjk1NC0xLjA2NyA1LjY1OC0yLjgzNyA3Ljc0OWw0LjkwOCA0LjkwOC0xLjQxNCAxLjQxNC00LjkwOC00LjkwOHpNMTUgMjVjNS41MjMgMCAxMC00LjQ3NyAxMC0xMFMyMC41MjMgNSAxNSA1IDUgOS40NzcgNSAxNXM0LjQ3NyAxMCAxMCAxMHptLTUtMTFoMTB2MkgxMHYtMnoiIGZpbGw9IiMzRDQ3NTciLz48L3N2Zz4=)}.ce-image-previewer .ce-image-menu i.rotate{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iIzNENDc1NyIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTYgNGM2LjYyNyAwIDEyIDUuMzczIDEyIDEyYTExLjk3IDExLjk3IDAgMDEtNCA4Ljk0NFYyM2gtLjg2QTkuOTY4IDkuOTY4IDAgMDAyNiAxNmMwLTUuNTIzLTQuNDc3LTEwLTEwLTEwUzYgMTAuNDc3IDYgMTZjMCA1LjE4NSAzLjk0NyA5LjQ0OSA5IDkuOTV2Mi4wMDlDOC44NCAyNy40NTEgNCAyMi4yOTEgNCAxNiA0IDkuMzczIDkuMzczIDQgMTYgNHoiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik0xOS44NzkgMjcuMzI4bDEuNzY3LTYuNzE3IDQuOTUgNC45NXoiLz48L2c+PC9zdmc+)}.ce-image-previewer .ce-image-menu i.original-size{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTQgNGgyNHYyNEg0VjR6bTIgMnYyMGgyMFY2SDZ6bTQgNWgydjEwaC0yVjExem01IDJoMnYyaC0ydi0yem0wIDRoMnYyaC0ydi0yem01LTZoMnYxMGgtMlYxMXoiIGZpbGw9IiMzRDQ3NTciLz48L3N2Zz4=)}.ce-image-previewer .ce-image-menu i.image-download{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTQuNSAxNXYzLjVoMTVWMTVIMjF2NUgzdi01aDEuNXptOC4yMzItMTEuMjI2djkuMTk2bDQuMDUtNC4wNSAxLjA2IDEuMDYtNS44MzQgNS44MzQtNS44MzMtNS44MzMgMS4wNi0xLjA2IDMuOTk4IDMuOTk2VjMuNzc0aDEuNXoiIGZpbGw9IiMzRDQ3NTciLz48L3N2Zz4=)}.ce-contextmenu-container{z-index:9;position:fixed;display:none;padding:4px;overflow-x:hidden;overflow-y:auto;background:#fff;box-shadow:0 2px 12px #38383833;border:1px solid #e2e6ed;border-radius:2px}.ce-contextmenu-content{display:flex;flex-direction:column}.ce-contextmenu-content .ce-contextmenu-sub-item:after{position:absolute;content:"";width:16px;height:16px;right:12px;background:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMCAwaDE2djE2SDB6Ii8+PGcgZmlsbD0iIzc2N0M4NSI+PHBhdGggZD0iTTcgMTIuMjQzbC0uNzA3LS43MDcgNC4yNDMtNC4yNDMuNzA3LjcwN3oiLz48cGF0aCBkPSJNNi4yOTMgNC40NjRMNyAzLjc1NyAxMS4yNDMgOGwtLjcwNy43MDd6Ii8+PC9nPjwvZz48L3N2Zz4=)}.ce-contextmenu-content .ce-contextmenu-item{min-width:140px;padding:0 32px 0 16px;height:30px;display:flex;align-items:center;white-space:nowrap;box-sizing:border-box;cursor:pointer}.ce-contextmenu-content .ce-contextmenu-item.hover{background:rgba(25,55,88,.04)}.ce-contextmenu-content .ce-contextmenu-item span{max-width:300px;font-size:12px;color:#3d4757;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.ce-contextmenu-content .ce-contextmenu-item span.ce-shortcut{color:#767c85;height:30px;flex:1;text-align:right;line-height:30px;margin-left:20px}.ce-contextmenu-content .ce-contextmenu-item i{width:16px;height:16px;vertical-align:middle;display:inline-block;background-repeat:no-repeat;background-size:100% 100%;flex-shrink:0;margin-right:8px}.ce-contextmenu-divider{background-color:#e2e6ed;margin:4px 16px;height:1px}.ce-contextmenu-print{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjM0Q0NzU3IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0xMiA0aC0xVjJINXYySDRWMmExIDEgMCAwMTEtMWg2YTEgMSAwIDAxMSAxdjJ6bTAgNXY0YTEgMSAwIDAxLTEgMUg1YTEgMSAwIDAxLTEtMVY5aDF2NGg2VjloMXoiLz48cGF0aCBkPSJNMTIgMTJ2LTFoMlY1SDJ2NmgydjFIMmExIDEgMCAwMS0xLTFWNWExIDEgMCAwMTEtMWgxMmExIDEgMCAwMTEgMXY2YTEgMSAwIDAxLTEgMWgtMnoiLz48cGF0aCBkPSJNMyA4aDEwdjFIM3ptOC0yaDJ2MWgtMnoiLz48L2c+PC9zdmc+)}.ce-contextmenu-image{background-image:url(data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSLlm77lsYJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIwIiB5PSIwIiB2aWV3Qm94PSIwIDAgMTYgMTYiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxzdHlsZT4uc3Qwe2ZpbGw6IzNkNDc1N308L3N0eWxlPjxnIGlkPSJfeDMwXzAt5YWs5YWxX3gyRl8wMuW3peWFt+agj194MkZf5o+S5YWl5Zu+54mHLTE2cHgtIj48ZyBpZD0iR3JvdXAtMTkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEgMSkiPjxwYXRoIGlkPSJDb21iaW5lZC1TaGFwZSIgY2xhc3M9InN0MCIgZD0iTTEgMGgxMmMuNiAwIDEgLjQgMSAxdjExYzAgLjYtLjQgMS0xIDFIMWMtLjYgMC0xLS40LTEtMVYxYzAtLjYuNC0xIDEtMXptMCAxdjExaDEyVjFIMXoiLz48Y2lyY2xlIGlkPSLmpK3lnIblvaIiIGNsYXNzPSJzdDAiIGN4PSIxMCIgY3k9IjQiIHI9IjEiLz48cGF0aCBpZD0iUGF0aCIgY2xhc3M9InN0MCIgZD0iTTguNSAxMS4ybC00LTQuMUwxIDEwLjdWOS4yYzEuNy0xLjYgMi43LTIuNSAzLTIuOC40LS41LjctLjQgMSAwTDguNSAxMCAxMSA3LjNjLjQtLjUuNi0uNSAxLS4xbDIgMi44djEuNWwtMi41LTMuNC0zIDMuMXoiLz48L2c+PC9nPjwvc3ZnPg==)}.ce-contextmenu-image-change{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyIDQpIiBmaWxsPSIjM0Q0NzU3Ij48Y2lyY2xlIGZpbGwtcnVsZT0ibm9uemVybyIgY3g9IjMiIGN5PSIxIiByPSIxIi8+PHBhdGggZD0iTTcuNDczIDguMjIzTDMuNDcgNC4xMDcgMCA3LjY2N3YtMS41QzEuNzE1IDQuNiAyLjcwNyAzLjY2NCAyLjk3NSAzLjM1OGMuNDAyLS40NTcuNjUxLS4zOSAxLjA0MiAwTDcuNDczIDcgOS45NiA0LjM0OWMuNDE0LS40NjIuNjItLjQ2MiAxLjAxMS0uMDcxTDEzIDcuMDZ2MS41bC0yLjUxLTMuNDEtMy4wMTcgMy4wNzJ6Ii8+PC9nPjxwYXRoIGQ9Ik02IDEuNUgxLjV2MTJoMTN2LTRWMTNhLjUuNSAwIDAxLS41LjVIMmEuNS41IDAgMDEtLjUtLjVWMmEuNS41IDAgMDEuNS0uNWg0em04LjUgOFY2bC0uNS41aDFsLS41LS41djMuNXpNNiAxLjVoNEw5LjUgMXYxbC41LS41SDZ6IiBzdHJva2U9IiMzRDQ3NTciLz48cGF0aCBkPSJNMTMuMDg1IDEuMzE2bC0zLjgxNCA0YTEgMSAwIDAwMS40NTggMS4zNjhsMy44MTUtNGExIDEgMCAxMC0xLjQ1OS0xLjM2OHoiIGZpbGw9IiMzRDQ3NTciIGZpbGwtcnVsZT0ibm9uemVybyIvPjwvZz48L3N2Zz4=)}.ce-contextmenu-insert-row-col{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBzdHJva2U9IiMzRDQ3NTciIGQ9Ik04LjUgNS41aDZ2NGgtNnoiLz48cGF0aCBmaWxsPSIjM0Q0NzU3IiBkPSJNNCA3djFoMlY3em0tMyAuNUw0IDV2NXpNMSAxaDEydjFIMXptMCAxMmgxMnYxSDF6Ii8+PC9nPjwvc3ZnPg==)}.ce-contextmenu-insert-top-row{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBmaWxsPSIjM0Q0NzU3IiBkPSJNOCA1SDd2M2gxem0tLjUtM0wxMCA1SDV6Ii8+PHJlY3Qgc3Ryb2tlPSIjM0Q0NzU3IiB4PSIxLjUiIHk9IjEwLjUiIHdpZHRoPSIxMiIgaGVpZ2h0PSIzIiByeD0iMSIvPjwvZz48L3N2Zz4=)}.ce-contextmenu-insert-bottom-row{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBmaWxsPSIjM0Q0NzU3IiBkPSJNNyAxMWgxVjhIN3ptLjUgM0w1IDExaDV6Ii8+PHJlY3Qgc3Ryb2tlPSIjM0Q0NzU3IiB4PSIxLjUiIHk9IjIuNSIgd2lkdGg9IjEyIiBoZWlnaHQ9IjMiIHJ4PSIxIi8+PC9nPjwvc3ZnPg==)}.ce-contextmenu-insert-left-col{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBmaWxsPSIjM0Q0NzU3IiBkPSJNMTEgN3YxaDNWN3ptLTMgLjVMMTEgNXY1eiIvPjxyZWN0IHN0cm9rZT0iIzNENDc1NyIgdHJhbnNmb3JtPSJyb3RhdGUoOTAgNCA3LjUpIiB4PSItMiIgeT0iNiIgd2lkdGg9IjEyIiBoZWlnaHQ9IjMiIHJ4PSIxIi8+PC9nPjwvc3ZnPg==)}.ce-contextmenu-insert-right-col{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBmaWxsPSIjM0Q0NzU3IiBkPSJNNSA4VjdIMnYxem0zLS41TDUgMTBWNXoiLz48cmVjdCBzdHJva2U9IiMzRDQ3NTciIHRyYW5zZm9ybT0icm90YXRlKDkwIDEyIDcuNSkiIHg9IjYiIHk9IjYiIHdpZHRoPSIxMiIgaGVpZ2h0PSIzIiByeD0iMSIvPjwvZz48L3N2Zz4=)}.ce-contextmenu-delete-row-col{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBzdHJva2U9IiM5MjlBQTgiIGQ9Ik04LjUgNi41aDZ2MmgtNnoiLz48cGF0aCBmaWxsPSIjM0Q0NzU3IiBkPSJNMiAxMmgxMXYxSDJ6TTIgMmgxMXYxSDJ6bS42MyAzTDcgOS4zNWwtLjYzNS42NUwyIDUuNjN6Ii8+PHBhdGggZmlsbD0iIzNENDc1NyIgZD0iTTIgOS4zNjNMNi4zNTUgNSA3IDUuNzA3IDIuNjk1IDEweiIvPjwvZz48L3N2Zz4=)}.ce-contextmenu-delete-row{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBzdHJva2U9IiM5MjlBQTgiIGQ9Ik04LjUgNS41aDZ2NGgtNnoiLz48cGF0aCBmaWxsPSIjM0Q0NzU3IiBkPSJNMSAxM2gxMnYxSDF6TTEgMWgxMnYxSDF6bTAgNGgxdjFIMXptMSAxaDF2MUgyem0xIDFoMXYxSDN6bTEtMWgxdjFINHptMS0xaDF2MUg1ek00IDhoMXYxSDR6TTIgOGgxdjFIMnptMyAxaDF2MUg1ek0xIDloMXYxSDF6Ii8+PC9nPjwvc3ZnPg==)}.ce-contextmenu-delete-col{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBzdHJva2U9IiM5MjlBQTgiIGQ9Ik01LjUgNy41di02aDR2NnoiLz48cGF0aCBmaWxsPSIjM0Q0NzU3IiBkPSJNMTMgMTVWM2gxdjEyek0xIDE1VjNoMXYxMnptNCAwdi0xaDF2MXptMS0xdi0xaDF2MXptMS0xdi0xaDF2MXptLTEtMXYtMWgxdjF6bS0xLTF2LTFoMXYxem0zIDF2LTFoMXYxem0wIDJ2LTFoMXYxem0xLTN2LTFoMXYxem0wIDR2LTFoMXYxeiIvPjwvZz48L3N2Zz4=)}.ce-contextmenu-delete-table{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iIzNENDc1NyIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTQgMTNoLTF2LTNIMnYzSDF2LTNhMSAxIDAgMDExLTFoMTFhMSAxIDAgMDExIDF2M3oiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik01LjYyNSAyTDEwIDYuMzc1IDkuMzc1IDcgNSAyLjYyNXoiLz48cGF0aCBkPSJNNSA2LjM3NUw5LjM3NSAybC42MjUuNjI1TDUuNjI1IDd6Ii8+PC9nPjwvc3ZnPg==)}.ce-contextmenu-merge-cell{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iIzNENDc1NyIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNNiAxdjFIMnYxMWg0djFIMmExIDEgMCAwMS0xLTFWMmExIDEgMCAwMTEtMWg0em0zIDBoNGExIDEgMCAwMTEgMXYxMWExIDEgMCAwMS0xIDFIOXYtMWg0VjJIOVYxeiIvPjxwYXRoIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTYgMWgxdjRINnptMiAwaDF2NEg4eiIvPjxwYXRoIGQ9Ik04IDcuNUwxMCA2djN6bS0xIDBMNSA2djN6Ii8+PHBhdGggZD0iTTkgN2gzdjFIOXpNMyA3aDN2MUgzeiIvPjxwYXRoIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTggMTBoMXY0SDh6bS0yIDBoMXY0SDZ6Ii8+PC9nPjwvc3ZnPg==)}.ce-contextmenu-merge-cancel-cell{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iIzNENDc1NyIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNNiAxdjFIMnYxMWg0djFIMmExIDEgMCAwMS0xLTFWMmExIDEgMCAwMTEtMWg0em0zIDBoNGExIDEgMCAwMTEgMXYxMWExIDEgMCAwMS0xIDFIOXYtMWg0VjJIOVYxeiIvPjxwYXRoIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTYgMWgxdjRINnptMiAwaDF2NEg4eiIvPjxwYXRoIGQ9Ik0zIDcuNUw1IDZ2M3ptOSAwTDEwIDZ2M3oiLz48cGF0aCBkPSJNNCA3aDN2MUg0em00IDBoM3YxSDh6Ii8+PHBhdGggZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNOCAxMGgxdjRIOHptLTIgMGgxdjRINnoiLz48L2c+PC9zdmc+)}.ce-contextmenu-vertical-align{background-image:url(data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjE2IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHdpZHRoPSIxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMiAxM2gxMnYxSDJ6bTAtM2g4djFIMnptMC0zaDEydjFIMnptMC02aDEydjFIMnptMCAzaDh2MUgyeiIgZmlsbD0iIzNkNDc1NyIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+)}.ce-contextmenu-vertical-align-top{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTggOEg3djZoMXptLS41LTNMMTAgOEg1ek0yIDNoMTF2MUgyeiIgZmlsbD0iIzNENDc1NyIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+)}.ce-contextmenu-vertical-align-middle{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNOCAxMkg3djNoMXptLS41LTNsMi41IDNINXpNNyAzaDFWMEg3em0uNSAzTDUgM2g1ek0yIDdoMTF2MUgyeiIgZmlsbD0iIzNENDc1NyIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+)}.ce-contextmenu-vertical-align-bottom{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTcgOWgxVjNIN3ptLjUgM0w1IDloNXpNMiAxM2gxMXYxSDJ6IiBmaWxsPSIjM0Q0NzU3IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=)}.ce-contextmenu-border-all{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTIuNSAzYS41LjUgMCAwMS41LS41aDExYS41LjUgMCAwMS41LjV2MTFhLjUuNSAwIDAxLS41LjVIM2EuNS41IDAgMDEtLjUtLjVWM3oiIHN0cm9rZT0iIzNENDc1NyIvPjxwYXRoIGZpbGw9IiMzRDQ3NTciIGQ9Ik0zIDhoMTF2MUgzeiIvPjxwYXRoIGZpbGw9IiMzRDQ3NTciIGQ9Ik05IDN2MTFIOFYzeiIvPjwvc3ZnPg==)}.ce-contextmenu-border-empty{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMyAzaC0xVjJoMWExIDEgMCAwMTEgMXYxaC0xVjN6bS0zLTF2MUg4LjV2MmgtMVYzSDZWMmg0ek00IDJ2MUgzdjFIMlYzYTEgMSAwIDAxMS0xaDF6TTIgNmgxdjEuNWgydjFIM1YxMEgyVjZ6bTAgNmgxdjFoMXYxSDNhMSAxIDAgMDEtMS0xdi0xem00IDJ2LTFoMS41di0yaDF2MkgxMHYxSDZ6bTYgMHYtMWgxdi0xaDF2MWExIDEgMCAwMS0xIDFoLTF6bTItNGgtMVY4LjVoLTJ2LTFoMlY2aDF2NHpNOC41IDcuNXYtMWgtMXYxaC0xdjFoMXYxaDF2LTFoMXYtMWgtMXoiIGZpbGw9IiNBQUFDQjAiLz48L3N2Zz4=)}.ce-contextmenu-border-external{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTIuNSAzYS41LjUgMCAwMS41LS41aDExYS41LjUgMCAwMS41LjV2MTFhLjUuNSAwIDAxLS41LjVIM2EuNS41IDAgMDEtLjUtLjVWM3oiIHN0cm9rZT0iIzNENDc1NyIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNOSA1VjNIOHYyaDF6bTAgOXYtMkg4djJoMXpNNSA4SDN2MWgyVjh6bTkgMGgtMnYxaDJWOHpNOSA3djFoMXYxSDl2MUg4VjlIN1Y4aDFWN2gxeiIgZmlsbD0iI0FBQUNCMCIvPjwvc3ZnPg==)}.ce-contextmenu-border-td{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTIuNSAzYS41LjUgMCAwMS41LS41aDExYS41LjUgMCAwMS41LjV2MTFhLjUuNSAwIDAxLS41LjVIM2EuNS41IDAgMDEtLjUtLjVWM3oiIHN0cm9rZT0iI0FBQUNCMCIvPjxwYXRoIHN0cm9rZT0iIzNENDc1NyIgZD0iTTguNSAyLjUgdjYgaC02Ii8+PC9zdmc+)}.ce-contextmenu-border-td-top{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTIuNSAzYS41LjUgMCAwMS41LS41aDExYS41LjUgMCAwMS41LjV2MTFhLjUuNSAwIDAxLS41LjVIM2EuNS41IDAgMDEtLjUtLjVWM3oiIHN0cm9rZT0iI0FBQUNCMCIvPjxwYXRoIHN0cm9rZT0iIzNENDc1NyIgc3Ryb2tlLXdpZHRoPSIyIiBkPSJNMi41IDMgaDEyIi8+PC9zdmc+)}.ce-contextmenu-border-td-left{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTIuNSAzYS41LjUgMCAwMS41LS41aDExYS41LjUgMCAwMS41LjV2MTFhLjUuNSAwIDAxLS41LjVIM2EuNS41IDAgMDEtLjUtLjVWM3oiIHN0cm9rZT0iI0FBQUNCMCIvPjxwYXRoIHN0cm9rZT0iIzNENDc1NyIgc3Ryb2tlLXdpZHRoPSIyIiBkPSJNMyAzIHYxMSIvPjwvc3ZnPg==)}.ce-contextmenu-border-td-bottom{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTIuNSAzYS41LjUgMCAwMS41LS41aDExYS41LjUgMCAwMS41LjV2MTFhLjUuNSAwIDAxLS41LjVIM2EuNS41IDAgMDEtLjUtLjVWM3oiIHN0cm9rZT0iI0FBQUNCMCIvPjxwYXRoIHN0cm9rZT0iIzNENDc1NyIgc3Ryb2tlLXdpZHRoPSIyIiBkPSJNMi41IDE0IGgxMiIvPjwvc3ZnPg==)}.ce-contextmenu-border-td-right{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTIuNSAzYS41LjUgMCAwMS41LS41aDExYS41LjUgMCAwMS41LjV2MTFhLjUuNSAwIDAxLS41LjVIM2EuNS41IDAgMDEtLjUtLjVWM3oiIHN0cm9rZT0iI0FBQUNCMCIvPjxwYXRoIHN0cm9rZT0iIzNENDc1NyIgc3Ryb2tlLXdpZHRoPSIyIiBkPSJNMTQgMyB2MTEiLz48L3N2Zz4=)}.ce-contextmenu-border-td-forward{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTIuNSAzYS41LjUgMCAwMS41LS41aDExYS41LjUgMCAwMS41LjV2MTFhLjUuNSAwIDAxLS41LjVIM2EuNS41IDAgMDEtLjUtLjVWM3oiIHN0cm9rZT0iI0FBQUNCMCIgLz48cGF0aCBzdHJva2U9IiMzRDQ3NTciIGQ9Ik0xNCAzIGwtMTEgMTEiIC8+PC9zdmc+)}.ce-contextmenu-border-td-back{background-image:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTIuNSAzYS41LjUgMCAwMS41LS41aDExYS41LjUgMCAwMS41LjV2MTFhLjUuNSAwIDAxLS41LjVIM2EuNS41IDAgMDEtLjUtLjVWM3oiIHN0cm9rZT0iI0FBQUNCMCIgLz48cGF0aCBzdHJva2U9IiMzRDQ3NTciIGQ9Ik0zIDMgbDExIDExIiAvPjwvc3ZnPg==)}.ce-hyperlink-popup{background:#fff;box-shadow:0 2px 12px #626b8433;border-radius:2px;color:#3d4757;padding:12px 16px;position:absolute;z-index:1;text-align:center;display:none}.ce-hyperlink-popup a{min-width:100px;max-width:300px;font-size:12px;display:inline-block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;cursor:pointer;text-decoration:none;border-bottom-width:1px;border-bottom-style:solid;color:#00f}.ce-zone-indicator>div{padding:3px 6px;color:#000;font-size:12px;background:rgb(218 231 252);position:absolute;transform-origin:0 0}.ce-zone-indicator-border__top,.ce-zone-indicator-border__bottom,.ce-zone-indicator-border__left,.ce-zone-indicator-border__right{display:block;position:absolute;z-index:0}.ce-zone-indicator-border__top{border-top:2px dashed rgb(238,238,238)}.ce-zone-indicator-border__bottom{border-top:2px dashed rgb(238,238,238);width:100%}.ce-zone-indicator-border__left{border-left:2px dashed rgb(238,238,238)}.ce-zone-indicator-border__right{border-right:2px dashed rgb(238,238,238)}.ce-zone-tip{display:none;align-items:center;height:30px;white-space:nowrap;position:fixed;opacity:.9;background-color:#000;padding:0 5px;border-radius:4px;z-index:9;transition:all .3s;outline:none;user-select:none;pointer-events:none;transform:translate(10px,10px)}.ce-zone-tip.show{display:flex}.ce-zone-tip span{color:#fff;font-size:12px}.ce-inputarea{width:100px;height:30px;min-width:0;min-height:0;margin:0;padding:0;left:0;right:0;letter-spacing:0;font-size:12px;position:absolute;z-index:-1;outline:none;resize:none;border:none;overflow:hidden;color:transparent;user-select:none;caret-color:transparent;background-color:transparent}.ce-cursor{width:1px;height:20px;left:0;right:0;position:absolute;outline:none;background-color:#000;pointer-events:none}.ce-cursor.ce-cursor--animation{animation-duration:1s;animation-iteration-count:infinite;animation-name:cursorAnimation}@keyframes cursorAnimation{0%{opacity:1}13%{opacity:0}50%{opacity:0}63%{opacity:1}to{opacity:1}}.ce-float-image{position:absolute;opacity:.5;pointer-events:none}
        </style>
        <div class="container">
        <div class="menu" editor-component="menu">
      <div class="menu-item">
        <div class="menu-item__undo">
          <i></i>
        </div>
        <div class="menu-item__redo">
          <i></i>
        </div>
        <div class="menu-item__painter" title="格式刷(双击可连续使用)">
          <i></i>
        </div>
        <div class="menu-item__format" title="清除格式">
          <i></i>
        </div>
      </div>
      <div class="menu-divider"></div>
      <div class="menu-item">
        <div class="menu-item__font">
          <span class="select" title="字体">微软雅黑</span>
          <div class="options">
            <ul>
              <li data-family="Microsoft YaHei" style="font-family:'Microsoft YaHei';">微软雅黑</li>
              <li data-family="华文宋体" style="font-family:'华文宋体';">华文宋体</li>
              <li data-family="华文黑体" style="font-family:'华文黑体';">华文黑体</li>
              <li data-family="华文仿宋" style="font-family:'华文仿宋';">华文仿宋</li>
              <li data-family="华文楷体" style="font-family:'华文楷体';">华文楷体</li>
              <li data-family="华文琥珀" style="font-family:'华文琥珀';">华文琥珀</li>
              <li data-family="华文楷体" style="font-family:'华文楷体';">华文楷体</li>
              <li data-family="华文隶书" style="font-family:'华文隶书';">华文隶书</li>
              <li data-family="华文新魏" style="font-family:'华文新魏';">华文新魏</li>
              <li data-family="华文行楷" style="font-family:'华文行楷';">华文行楷</li>
              <li data-family="华文中宋" style="font-family:'华文中宋';">华文中宋</li>
              <li data-family="华文彩云" style="font-family:'华文彩云';">华文彩云</li>
              <li data-family="Arial" style="font-family:'Arial';">Arial</li>
              <li data-family="Segoe UI" style="font-family:'Segoe UI';">Segoe UI</li>
              <li data-family="Ink Free" style="font-family:'Ink Free';">Ink Free</li>
              <li data-family="Fantasy" style="font-family:'Fantasy';">Fantasy</li>
            </ul>
          </div>
        </div>
        <div class="menu-item__size">
          <span class="select" title="字体">小四</span>
          <div class="options">
            <ul>
              <li data-size="56">初号</li>
              <li data-size="48">小初</li>
              <li data-size="34">一号</li>
              <li data-size="32">小一</li>
              <li data-size="29">二号</li>
              <li data-size="24">小二</li>
              <li data-size="21">三号</li>
              <li data-size="20">小三</li>
              <li data-size="18">四号</li>
              <li data-size="16">小四</li>
              <li data-size="14">五号</li>
              <li data-size="12">小五</li>
              <li data-size="10">六号</li>
              <li data-size="8">小六</li>
              <li data-size="7">七号</li>
              <li data-size="6">八号</li>
            </ul>
          </div>
        </div>
        <div class="menu-item__size-add">
          <i></i>
        </div>
        <div class="menu-item__size-minus">
          <i></i>
        </div>
        <div class="menu-item__bold">
          <i></i>
        </div>
        <div class="menu-item__italic">
          <i></i>
        </div>
        <div class="menu-item__underline">
          <i></i>
          <span class="select"></span>
          <div class="options">
            <ul>
              <li data-decoration-style='solid'>
                <i></i>
              </li>
              <li data-decoration-style='double'>
                <i></i>
              </li>
              <li data-decoration-style='dashed'>
                <i></i>
              </li>
              <li data-decoration-style='dotted'>
                <i></i>
              </li>
              <li data-decoration-style='wavy'>
                <i></i>
              </li>
            </ul>
          </div>
        </div>
        <div class="menu-item__strikeout" title="删除线(Ctrl+Shift+X)">
          <i></i>
        </div>
        <div class="menu-item__superscript">
          <i></i>
        </div>
        <div class="menu-item__subscript">
          <i></i>
        </div>
        <div class="menu-item__color" title="字体颜色">
          <i></i>
          <span></span>
          <input type="color" id="color" />
        </div>
        <div class="menu-item__highlight" title="高亮">
          <i></i>
          <span></span>
          <input type="color" id="highlight">
        </div>
      </div>
      <div class="menu-divider"></div>
      <div class="menu-item">
        <div class="menu-item__title">
          <i></i>
          <span class="select" title="切换标题">正文</span>
          <div class="options">
            <ul>
              <li style="font-size:16px;">正文</li>
              <li data-level="first" style="font-size:26px;">标题1</li>
              <li data-level="second" style="font-size:24px;">标题2</li>
              <li data-level="third" style="font-size:22px;">标题3</li>
              <li data-level="fourth" style="font-size:20px;">标题4</li>
              <li data-level="fifth" style="font-size:18px;">标题5</li>
              <li data-level="sixth" style="font-size:16px;">标题6</li>
            </ul>
          </div>
        </div>
        <div class="menu-item__left">
          <i></i>
        </div>
        <div class="menu-item__center">
          <i></i>
        </div>
        <div class="menu-item__right">
          <i></i>
        </div>
        <div class="menu-item__alignment">
          <i></i>
        </div>
        <div class="menu-item__justify">
          <i></i>
        </div>
        <div class="menu-item__row-margin">
          <i title="行间距"></i>
          <div class="options">
            <ul>
              <li data-rowmargin='1'>1</li>
              <li data-rowmargin="1.25">1.25</li>
              <li data-rowmargin="1.5">1.5</li>
              <li data-rowmargin="1.75">1.75</li>
              <li data-rowmargin="2">2</li>
              <li data-rowmargin="2.5">2.5</li>
              <li data-rowmargin="3">3</li>
            </ul>
          </div>
        </div>
        <div class="menu-item__list">
          <i></i>
          <div class="options">
            <ul>
              <li>
                <label>取消列表</label>
              </li>
              <li data-list-type="ol" data-list-style='decimal'>
                <label>有序列表：</label>
                <ol>
                  <li>________</li>
                </ol>
              </li>
              <li data-list-type="ul" data-list-style='checkbox'>
                <label>复选框列表：</label>
                <ul style="list-style-type: '☑️ ';">
                  <li>________</li>
                </ul>
              </li>
              <li data-list-type="ul" data-list-style='disc'>
                <label>实心圆点列表：</label>
                <ul style="list-style-type: disc;">
                  <li>________</li>
                </ul>
              </li>
              <li data-list-type="ul" data-list-style='circle'>
                <label>空心圆点列表：</label>
                <ul style="list-style-type: circle;">
                  <li>________</li>
                </ul>
              </li>
              <li data-list-type="ul" data-list-style='square'>
                <label>空心方块列表：</label>
                <ul style="list-style-type: '☐ ';">
                  <li>________</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="menu-divider"></div>
      <div class="menu-item">
        <div class="menu-item__table">
          <i title="表格"></i>
        </div>
        <div class="menu-item__table__collapse">
          <div class="table-close">×</div>
          <div class="table-title">
            <span class="table-select">插入</span>
            <span>表格</span>
          </div>
          <div class="table-panel"></div>
        </div>
        <div class="menu-item__image">
          <i title="图片"></i>
          <input type="file" id="image" accept=".png, .jpg, .jpeg, .svg, .gif">
        </div>
        <div class="menu-item__hyperlink">
          <i title="超链接"></i>
        </div>
        <div class="menu-item__separator">
          <i title="分割线"></i>
          <div class="options">
            <ul>
              <li data-separator='0,0'>
                <i></i>
              </li>
              <li data-separator="1,1">
                <i></i>
              </li>
              <li data-separator="3,1">
                <i></i>
              </li>
              <li data-separator="4,4">
                <i></i>
              </li>
              <li data-separator="7,3,3,3">
                <i></i>
              </li>
              <li data-separator="6,2,2,2,2,2">
                <i></i>
              </li>
            </ul>
          </div>
        </div>
        <div class="menu-item__watermark">
          <i title="水印(添加、删除)"></i>
          <div class="options">
            <ul>
              <li data-menu="add">添加水印</li>
              <li data-menu="delete">删除水印</li>
            </ul>
          </div>
        </div>
        <div class="menu-item__codeblock" title="代码块">
          <i></i>
        </div>
        <div class="menu-item__page-break" title="分页符">
          <i></i>
        </div>
        <div class="menu-item__control">
          <i title="控件"></i>
          <div class="options">
            <ul>
              <li data-control='text'>文本</li>
              <li data-control="select">列举</li>
              <li data-control="date">日期</li>
              <li data-control="checkbox">复选框</li>
              <li data-control="radio">单选框</li>
            </ul>
          </div>
        </div>
        <div class="menu-item__checkbox" title="复选框">
          <i></i>
        </div>
        <div class="menu-item__radio" title="单选框">
          <i></i>
        </div>
        <div class="menu-item__latex" title="LateX">
          <i></i>
        </div>
        <div class="menu-item__date">
          <i title="日期"></i>
          <div class="options">
            <ul>
              <li data-format="yyyy-MM-dd"></li>
              <li data-format="yyyy-MM-dd hh:mm:ss"></li>
            </ul>
          </div>
        </div>
        <div class="menu-item__block" title="内容块">
          <i></i>
        </div>
      </div>
      <div class="menu-divider"></div>
      <div class="menu-item">
        <div class="menu-item__search" data-menu="search">
          <i></i>
        </div>
        <div class="menu-item__search__collapse" data-menu="search">
          <div class="menu-item__search__collapse__search">
            <input type="text" />
            <label class="search-result"></label>
            <div class="arrow-left">
              <i></i>
            </div>
            <div class="arrow-right">
              <i></i>
            </div>
            <span>×</span>
          </div>
          <div class="menu-item__search__collapse__replace">
            <input type="text">
            <button>替换</button>
          </div>
        </div>
        <div class="menu-item__print" data-menu="print">
          <i></i>
        </div>
      </div>
    </div>
    <div class="catalog" editor-component="catalog">
      <div class="catalog__header">
        <span>目录</span>
        <div class="catalog__header__close">
          <i></i>
        </div>
      </div>
      <div class="catalog__main"></div>
    </div>
    <div class="editor"></div>
    <div class="comment" editor-component="comment"></div>
    <div class="footer" editor-component="footer">
      <div>
        <div class="catalog-mode" title="目录">
          <i></i>
        </div>
        <div class="page-mode">
          <i title="页面模式(分页、连页)"></i>
          <div class="options">
            <ul>
              <li data-page-mode="paging" class="active">分页</li>
              <li data-page-mode="continuity">连页</li>
            </ul>
          </div>
        </div>
        <span>可见页码：<span class="page-no-list">1</span></span>
        <span>页面：<span class="page-no">1</span>/<span class="page-size">1</span></span>
        <span>字数：<span class="word-count">0</span></span>
      </div>
      <div class="editor-mode" title="编辑模式(编辑、清洁、只读、表单、设计)">编辑模式</div>
      <div>
        <div class="page-scale-minus" title="缩小(Ctrl+-)">
          <i></i>
        </div>
        <span class="page-scale-percentage" title="显示比例(点击可复原Ctrl+0)">100%</span>
        <div class="page-scale-add" title="放大(Ctrl+=)">
          <i></i>
        </div>
        <div class="paper-size">
          <i title="纸张类型"></i>
          <div class="options">
            <ul>
              <li data-paper-size="794*1123" class="active">A4</li>
              <li data-paper-size="1593*2251">A2</li>
              <li data-paper-size="1125*1593">A3</li>
              <li data-paper-size="565*796">A5</li>
              <li data-paper-size="412*488">5号信封</li>
              <li data-paper-size="450*866">6号信封</li>
              <li data-paper-size="609*862">7号信封</li>
              <li data-paper-size="862*1221">9号信封</li>
              <li data-paper-size="813*1266">法律用纸</li>
              <li data-paper-size="813*1054">信纸</li>
            </ul>
          </div>
        </div>
        <div class="paper-direction">
          <i title="纸张方向"></i>
          <div class="options">
            <ul>
              <li data-paper-direction="vertical" class="active">纵向</li>
              <li data-paper-direction="horizontal">横向</li>
            </ul>
          </div>
        </div>
        <div class="paper-margin" title="页边距">
          <i></i>
        </div>
        <div class="fullscreen" title="全屏显示">
          <i></i>
        </div>
        <div class="editor-option" title="编辑器设置">
          <i></i>
        </div>
      </div>
    </div>
        <div
    `
}