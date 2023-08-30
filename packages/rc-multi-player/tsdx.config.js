const tsdxConfig = require("../../tsdx.config");

module.exports = {
    // 去掉css
    rollup: (config, options)=> tsdxConfig(config, Object.assign({}, options, {writeMeta: false})),
}
