const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV?.trimEnd();
const fs = require('fs');


class AddTypeModulePlugin {
    apply(compiler) {
        compiler.hooks.compilation.tap('AddTypeModulePlugin', (compilation) => {
            HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(
                'AddTypeModulePlugin',
                (data, cb) => {
                    data.headTags.forEach(tag => {
                        if (tag.tagName === 'script') {
                            tag.attributes.type = 'module';
                        }
                    });
                    cb(null, data);
                }
            );
        });
    }
}


module.exports = function (dirname = __dirname) {
    const plugins = [
        // new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            // title: '登录',
            template: './__tests__/index.html',
            scriptLoading: 'defer',
        }),
        new AddTypeModulePlugin()
    ];
    const dirPath = path.resolve(dirname, './__tests__/assets');
    if (fs.existsSync(dirPath) && fs.readdirSync(dirPath).length > 0) {
        plugins.push(new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(dirname, './__tests__/assets'),//想要复制的文件夹
                    to: path.resolve(dirname, './dist/assets') //复制在哪个文件夹
                }
            ]
        }));
    }

    return {
        mode: 'development',// 环境管理
        devtool: 'eval-source-map',
        entry: './src/index.ts',
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.js$/,
                    use: {
                        loader: 'babel-loader',
                        options: { // 用 babel-loader 需要把 es6 -> es5
                            presets: [
                                '@babel/preset-env', // 这里面就是把es6 -> es5的模块
                                // 按需加载es版本
                                // ['@babel/env', {
                                //     modules: false,
                                //     useBuiltIns: false,
                                //     targets: {
                                //         browsers: [
                                //             'Chrome >= 88'
                                //         ]
                                //     }
                                // }]
                            ],
                            plugins: [
                                [   // 支持类(class)的写法
                                    '@babel/plugin-proposal-class-properties',
                                    { 'loose': true } // 宽松模式
                                ]
                            ]
                        }
                    },
                    include: [path.resolve(dirname, '__tests__'), path.resolve(dirname, 'src')],
                    exclude: /node_modules/
                },
                {
                    test: /\.(gif|webp|png|jpe|jpg|svg?g)$/i,
                    loader: 'url-loader', // url-loader 依赖于  file-loader 要使用url-loader必须安装file-loader
                    options: {
                        name: '[name].[ext]', // 文件名.hash.文件扩展名 默认格式为[hash].[ext]，没有文件名
                        limit: 1024 * 8, // 将小于8KB的图片转换成base64的格式
                        outputPath: 'assets/', // 为你的文件配置自定义 output 输出目录 ; 用来处理图片路径问题
                        publicPath: 'assets/' // 为你的文件配置自定义 public 发布目录 ; 用来处理图片路径问题
                    }
                },
                {
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
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
            ]
        },
        plugins: plugins,
        experiments: {
            outputModule: true // 让模块可以使用import导入使用
        },
        output: {
            filename: 'index.js',
            libraryTarget: 'module', //module es6模式 umd模式
            path: path.resolve(dirname, 'dist'),
            // clean: true, // 清理冗余文件
        },
        target: 'web',
        devServer: {
            static: {
                directory: path.join(dirname, '__test__'),
                publicPath: ['/'],
            },
            watchFiles: ['src/**/*', 'src/**/*'],
            allowedHosts: 'auto',
            // hot: true,
            // 压缩代码 先注释
            compress: NODE_ENV == 'production',
            // 打开浏览器
            open: true,
            https: false,
            client: {
                webSocketURL: { hostname: undefined, pathname: undefined, port: undefined },
                overlay: false
            },
        }
    }
}
