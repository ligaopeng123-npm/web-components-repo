const tsdxConfig = require("../../tsdx.config");

module.exports = {
    rollup: (config, options)=> tsdxConfig(config, Object.assign({}, options, {writeMeta: false})),
}
