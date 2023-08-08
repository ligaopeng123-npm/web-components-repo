import {join, dirname} from "path";

const WebpackRules = [{
    test: /\.less$/,
    use: ['style-loader', 'css-loader',
        {
            loader: 'less-loader',
            options: {
                lessOptions: {
                    javascriptEnabled: true,
                }
            }
        }],
}];

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value) {
    return dirname(require.resolve(join(value, "package.json")));
}

/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const config = {
    stories: [
        "../stories/**/*.mdx",
        "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    ],
    outputDir: "./docs",
    addons: [
        getAbsolutePath("@storybook/addon-links"),
        getAbsolutePath("@storybook/addon-essentials"),
        getAbsolutePath("@storybook/addon-onboarding"),
        getAbsolutePath("@storybook/addon-interactions"),
    ],
    framework: {
        name: getAbsolutePath("@storybook/react-webpack5"),
        options: {},
    },
    docs: {
        autodocs: "tag",
    },
    babel: async (options) => {
      options.plugins.push('@babel/plugin-syntax-flow');
      options.presets.push('@babel/preset-typescript');
      return options;
    },
    async webpackFinal(config, {configType, options}) {
        if (configType === 'DEVELOPMENT') {
            // Modify config for development
        }
        if (configType === 'PRODUCTION') {
            // Modify config for production
        }
        WebpackRules.forEach((item) => {
            config.module.rules.push(item);
        });
        // config.output.path = config.output.path.replace('storybook-static', 'docs')
        return config;
    },
};

export default config;
