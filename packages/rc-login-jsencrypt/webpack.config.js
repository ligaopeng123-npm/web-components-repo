const {merge} = require("webpack-merge");
const base = require("../../webpack.base.config");

module.exports = merge(base(__dirname), {
    entry: './__tests__/index.tsx',
    devServer: {
        port: 5001,
        proxy: {
            '/testAuth': {
                target: 'https://ops-test.sany.com.cn',
                pathRewrite: {'^/testAuth' : ''},
                secure:true ,//接受对方是https的接口
                changeOrigin:true // 是否需要跨域
            }
        }
    }
});
