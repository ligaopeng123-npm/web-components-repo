const tsdxConfig = require("../../tsdx.config");

module.exports = {
    rollup: (config, options)=> {
        config.external = [];
        return tsdxConfig(config, options);
    }
}
