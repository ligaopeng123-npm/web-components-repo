/**********************************************************************
 *
 * @模块名称: template
 *
 * @模块作用: template
 *
 * @创建人: pgli
 *
 * @date: 2023/1/29 7:05 下午
 *
 * @版权所有: pgli
 *
 **********************************************************************/
import type { ScrollNavProps } from "./utils";

export const template = (config: ScrollNavProps) => {
    return `
        <style>
            html {
                height: 100%;
                overflow: hidden;
            }
            body {
                margin: 0;
                height: 100%;
                overflow: auto;
            }
            .nav-container {
                margin: 12px 0px;
            }
            .nav {
              display: inline-flex;
              overflow: hidden !important;
              width: 100%;
              background-color: var(--background-color);
              border-radius: 4px;
              box-shadow: 0 10px 40px rgba(159, 162, 177, .2);
            }
            
            .nav-item {
              color: var(--text-color);
              padding: 8px;
              text-decoration: none;
              transition: .3s;
              margin: 0 6px;
              z-index: 1;
              font-family: 'DM Sans', sans-serif;
              font-weight: 500;
              position: relative;
              cursor: pointer;
            }
            
            .nav-item:before {
                content: "1";
                position: absolute;
                bottom: -3px;
                left: 0;
                width: 100%;
                height: 2px;
                border-radius: 8px 8px 0 0;
                opacity: 0;
                background-color: var(--hover-color);
                transition: .3s;
            }
            
            .nav-item:not(.is-active):hover:before {
              opacity: 1;
              bottom: 0;
            }
            
            
            .nav-item:not(.is-active):hover { color: var(--hover-color); }
            
            .nav-indicator {
              position: absolute;
              left: 0;
              bottom: 0;
              height: 2px;
              transition: .4s;
              z-index: 1;
              border-radius: 8px 8px 0 0;
            }
        </style>
        <div class="nav-container">
            <nav class="nav">
    <!--          <a href="#" class="nav-item is-active" active-color="blue">Home</a>-->
    <!--          <a href="#" class="nav-item" active-color="blue">About</a>-->
    <!--          <a href="#" class="nav-item" active-color="blue">Testimonials</a>-->
    <!--          <a href="#" class="nav-item" active-color="blue">Blog</a>-->
    <!--          <a href="#" class="nav-item" active-color="blue">Contact</a>-->
    <!--          <span class="nav-indicator"></span>-->
            </nav>
        </div>
        <slot name="content"></slot>
    `
}