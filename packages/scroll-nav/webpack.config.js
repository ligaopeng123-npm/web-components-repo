/**********************************************************************
 *
 * @模块名称: webpack.config
 *
 * @模块用途: webpack.config
 *
 * @date: 2022/2/4 11:23
 *
 * @版权所有: pgli
 *
 **********************************************************************/
const {merge} = require('webpack-merge');
// @ts-ignore
const base = require('../../webpack.base.config');

module.exports = merge(base(__dirname), {
    entry: './__tests__/index.ts',
    devServer: {
        port: 5012,
        proxy: {
            '/flv': {
                target: 'http://49.233.99.253:8000',
                // pathRewrite: {'^/api': ''}
            },
        }
    }
});

