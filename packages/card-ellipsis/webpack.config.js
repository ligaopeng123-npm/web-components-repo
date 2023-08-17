const {merge} = require("webpack-merge");
const base = require("../../webpack.base.config");

module.exports = merge(base(__dirname), {
    devServer: {
        port: 5018,
    }
});
