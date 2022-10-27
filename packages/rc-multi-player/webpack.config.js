const {merge} = require("webpack-merge");
const base = require("../../webpack.base.config");

module.exports = merge(base(__dirname), {
    entry: './__tests__/index.tsx',
    devServer: {
        port: 5007,
        proxy: {
            '/flv': {
                target: 'http://49.233.99.253:8000',
                // pathRewrite: {'^/api': ''}
            },
            '/live': {
                target: 'http://49.233.99.253:9580',
                // pathRewrite: {'^/api': ''}
            },
            '/testShare/': {
                changeOrigin: true,
                target: 'https://ops.sany.com.cn/',
                // pathRewrite: {'^/testShare': ''}
            },
        }
    }
});
