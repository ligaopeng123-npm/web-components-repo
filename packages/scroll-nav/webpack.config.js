const { merge } = require("webpack-merge");
const base = require("../../webpack.base.config");

module.exports = merge(base(__dirname), {
    entry: './__tests__/index.tsx',
    devServer: {
        port: 5513,
        proxy: {
            '/flv': {
                target: 'http://49.233.99.253:8000',
                // pathRewrite: {'^/api': ''}
            },
            '/live': {
                target: 'http://49.233.99.253:9580',
                // pathRewrite: {'^/api': ''}
            },
            '/rtc': {
                // http://xingtu.ubsense.cn:1985/rtc/v1/play/
                target: 'http://xingtu.ubsense.cn:3008',
                // pathRewrite: {'^/api': ''}
            }
        }
    }
});
