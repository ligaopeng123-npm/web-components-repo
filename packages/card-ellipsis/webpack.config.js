const {merge} = require("webpack-merge");
const base = require("../../webpack.base.config");

module.exports = merge(base(__dirname), {
    entry: './__tests__/index.ts',
    devServer: {
        port: 5018,
    }
});
