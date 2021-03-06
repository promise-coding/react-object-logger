const path = require('path');
// 导入每次删除文件夹的插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 压缩js文件
const TerserPlugin = require('terser-webpack-plugin');

const webpack = require('webpack');

// 导入抽取CSS的插件
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// 导入压缩CSS的插件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, './src/index.js'),
    mode: 'production',
    output: {
        path: path.join(__dirname, './lib'),
        filename: 'index.js',
        libraryTarget: 'umd', //发布组件专用
        library: 'ReactObjectLogger',
    },
    plugins: [ // 插件
        new CleanWebpackPlugin(),
        new ExtractTextPlugin("css/styles.css"), // 抽取CSS文件
        new OptimizeCssAssetsPlugin(), // 压缩CSS的插件
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), //排除moment语言包
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true
            })
        ],
    },
    module: {
        rules: [
            {
                test: /\.css$/, use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader",
                    publicPath: '../' // 指定抽取的时候，自动为我们的路径加上 ../ 前缀
                })
            },
            {
                test: /\.styl$/, use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'stylus-loader'],
                    publicPath: '../' // 指定抽取的时候，自动为我们的路径加上 ../ 前缀
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
                    use: [
                        {loader: 'css-loader',
                            options: { modules: {
                                    mode: 'local',
                                    localIdentName: '[name]__[local]--[hash:base64:5]'
                                },}},
                        'sass-loader'],
                    publicPath: '../'
                })
            },
            {
                test: /\.(png|jpe?g|gif|bmp)$/i,
                loader: 'url-loader',
                options: {
                    limit: 10240,
                    name: 'images/[name]-[hash:8].[ext]'
                },
            },
            { test: /\.(ttf|eot|svg|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: '[name]-[hash:8].[ext]',
                    outputPath: 'images',
                },
            },
            { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ }
        ]
    }
};
