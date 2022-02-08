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
	devServer: {
		port: 5002
	}
});
