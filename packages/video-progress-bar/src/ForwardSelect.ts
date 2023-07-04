/**********************************************************************
 *
 * @模块名称: ForwardSelect
 *
 * @模块作用: ForwardSelect
 *
 * @创建人: pgli
 *
 * @date: 2023/7/3 8:36 下午
 *
 * @版权所有: pgli
 *
 **********************************************************************/
class ForwardSelect extends HTMLElement {
    shadow: ShadowRoot = null;

    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.shadow.innerHTML = this.createTemplate();
    }

    connectedCallback() {

    }

    createTemplate() {
        return `
            <style>
                .dropdown {
                    display: inline-block;
                    position: relative;
                    overflow: hidden;
                    height: 20px;
                    width: 60px;
                    background: #f2f2f2;
                    border: 1px solid;
                    border-color: white #f7f7f7 whitesmoke;
                    border-radius: 3px;
                    background-image: -webkit-linear-gradient(top, transparent, rgba(0, 0, 0, 0.06));
                    background-image: -moz-linear-gradient(top, transparent, rgba(0, 0, 0, 0.06));
                    background-image: -o-linear-gradient(top, transparent, rgba(0, 0, 0, 0.06));
                    background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.06));
                    -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08);
                    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08);
                }
                
                .dropdown:before, .dropdown:after {
                    content: '';
                    position: absolute;
                    z-index: 2;
                    top: 4px;
                    right: 10px;
                    width: 0;
                    height: 0;
                    border: 4px dashed;
                    border-color: #888888 transparent;
                    pointer-events: none;
                }
                
                .dropdown:before {
                    border-bottom-style: solid;
                    border-top: none;
                }
                
                .dropdown:after {
                    margin-top: 7px;
                    border-top-style: solid;
                    border-bottom: none;
                }
                
                .dropdown-select {
                    position: relative;
                    width: 100%;
                    margin: 0;
                    padding: 0px 4px 0px 4px;
                    height: 20px;
                    line-height: 14px;
                    font-size: 12px;
                    color: #ffffff;
                    text-shadow: 0 1px white;
                    background: #333333; /* Fallback for IE 8 */
                    background: #333333 !important; /* "transparent" doesn't work with Opera */
                    border: 0;
                    border-radius: 0;
                    -webkit-appearance: none;
                    top: -22px;
                }
                
                .dropdown-select:focus {
                    z-index: 3;
                    width: 100%;
                    color: #394349;
                    outline: 2px solid #49aff2;
                    outline: 2px solid -webkit-focus-ring-color;
                    outline-offset: -2px;
                }
                
                .dropdown-select > option {
                    margin: 3px;
                    padding: 6px 8px;
                    text-shadow: none;
                    background: #f2f2f2;
                    border-radius: 3px;
                    cursor: pointer;
                }
                
                /* Fix for IE 8 putting the arrows behind the select element. */
                
                .lt-ie9 .dropdown {
                    z-index: 1;
                }
                
                .lt-ie9 .dropdown-select {
                    z-index: -1;
                }
                
                .lt-ie9 .dropdown-select:focus {
                    z-index: 3;
                }
                
                /* Dirty fix for Firefox adding padding where it shouldn't. */
                
                @-moz-document url-prefix() {
                    .dropdown-select {
                        padding-left: 6px;
                    }
                }
                
                .dropdown-dark {
                    background: #444;
                    border-color: #111111 #0a0a0a black;
                    background-image: -webkit-linear-gradient(top, transparent, rgba(0, 0, 0, 0.4));
                    background-image: -moz-linear-gradient(top, transparent, rgba(0, 0, 0, 0.4));
                    background-image: -o-linear-gradient(top, transparent, rgba(0, 0, 0, 0.4));
                    background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.4));
                    -webkit-box-shadow: inset 0 1px rgba(255, 255, 255, 0.1), 0 1px 1px rgba(0, 0, 0, 0.2);
                    box-shadow: inset 0 1px rgba(255, 255, 255, 0.1), 0 1px 1px rgba(0, 0, 0, 0.2);
                }
                
                .dropdown-dark:before {
                    border-bottom-color: #aaa;
                }
                
                .dropdown-dark:after {
                    border-top-color: #aaa;
                }
                
                .dropdown-dark .dropdown-select {
                    color: #aaa;
                    text-shadow: 0 1px black;
                    background: #444;  /* Fallback for IE 8 */
                }
                
                .dropdown-dark .dropdown-select:focus {
                    color: #ccc;
                }
                
                .dropdown-dark .dropdown-select > option {
                    background: #444;
                    text-shadow: 0 1px rgba(0, 0, 0, 0.4);
                }
            </style>
            <div class="dropdown dropdown-dark">
            <select name="two" class="dropdown-select">
              <option value="5">5s</option>
              <option value="20">20s</option>
              <option value="60">1分钟</option>
            </select>
          </div>
        `
    }
}

export default ForwardSelect;

if (!customElements.get('forward-select')) {
    customElements.define('forward-select', ForwardSelect);
}