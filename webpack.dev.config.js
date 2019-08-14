const path = require('path');
// 导入每次删除文件夹的插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
	template: path.join(__dirname, "./example/src/index.html"),
	filename: "./index.html"
});

module.exports = {
	entry: path.join(__dirname, "./example/src/app.js"),
	output: {
		path: path.join(__dirname, "example/dist"),
		filename: "[name].bundle.js"
	},
    mode: 'development',
	module: {
		rules: [{
			test: /\.(js|jsx)$/,
			loader: "babel-loader",
			exclude: [/node_modules/, '/lib/']
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
                use: [
                	{
                		loader: 'css-loader',
						options: {
                			modules: {
                                mode: 'local',
                                localIdentName: '[name]__[local]--[hash:base64:5]'
                            },
						}
					},
					'sass-loader']
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
		]
	},
	plugins: [
        new CleanWebpackPlugin(),
		htmlWebpackPlugin,
        new ExtractTextPlugin('style.css')
    ],
	resolve: {
		extensions: [".js", ".jsx"]
	},
	devServer: {
		port: 3002
	}
};

