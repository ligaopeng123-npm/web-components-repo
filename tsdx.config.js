const images = require('@rollup/plugin-image');

module.exports = function (config, options) {
    config.plugins = [
        images({include: ['**/*.png', '**/*.jpg', '**/*.svg']}),
        ...config.plugins,
    ]
    config.output.sourcemap = false;
    return config
}
