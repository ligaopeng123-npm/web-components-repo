"use strict";(self.webpackChunkweb_components_repo=self.webpackChunkweb_components_repo||[]).push([[103],{"./node_modules/.pnpm/@storybook+addon-docs@7.2.1_sfoxds7t5ydpegc3knd667wn6m/node_modules/@storybook/addon-docs/dist/DocsRenderer-3PUGWF3O.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{DocsRenderer:()=>DocsRenderer,defaultComponents:()=>defaultComponents});var react=__webpack_require__("./node_modules/.pnpm/react@17.0.2/node_modules/react/index.js"),react_16=__webpack_require__("./node_modules/.pnpm/@storybook+react-dom-shim@7.2.1_sfoxds7t5ydpegc3knd667wn6m/node_modules/@storybook/react-dom-shim/dist/react-16.mjs"),dist=__webpack_require__("./node_modules/.pnpm/@storybook+blocks@7.2.1_sfoxds7t5ydpegc3knd667wn6m/node_modules/@storybook/blocks/dist/index.mjs"),defaultComponents={code:dist.bD,a:dist.Ct,...dist.lO},ErrorBoundary=class extends react.Component{constructor(){super(...arguments),this.state={hasError:!1}}static getDerivedStateFromError(){return{hasError:!0}}componentDidCatch(err){let{showException}=this.props;showException(err)}render(){let{hasError}=this.state,{children}=this.props;return hasError?null:children}},DocsRenderer=class{constructor(){this.render=async(context,docsParameter,element)=>{let components={...defaultComponents,...docsParameter?.components},TDocs=dist.WI;return new Promise(((resolve,reject)=>{__webpack_require__.e(196).then(__webpack_require__.bind(__webpack_require__,"./node_modules/.pnpm/@mdx-js+react@2.3.0_react@17.0.2/node_modules/@mdx-js/react/index.js")).then((({MDXProvider})=>(0,react_16.l)(react.createElement(ErrorBoundary,{showException:reject,key:Math.random()},react.createElement(MDXProvider,{components},react.createElement(TDocs,{context,docsParameter}))),element))).then((()=>resolve()))}))},this.unmount=element=>{(0,react_16.K)(element)}}}}}]);