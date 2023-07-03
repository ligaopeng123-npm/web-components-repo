const { merge } = require("webpack-merge");
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
                target: 'https://ai-api-test.sany.com.cn',
                changeOrigin: true,
                // pathRewrite: {'^/api': ''}
            },
            '/rtc': {
                // http://xingtu.ubsense.cn:1985/rtc/v1/play/
                target: 'https://ai-api-test.sany.com.cn',
                changeOrigin: true,
                // pathRewrite: {'^/api': ''}
            }
        }
    }
});
