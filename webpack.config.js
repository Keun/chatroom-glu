const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
	mode: 'development',
	watch: true,
	entry: { 
		main: './src/main.js',
	},
	output: {
		path: path.join(__dirname, 'public/assets'),
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				exclude: /(node_modules|bower_components)/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
				  	use: [{
						loader: 'css-loader',
						options: {
							url: false,
							sourceMap: true,
						}
					}, 
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						}
					}]
				}),
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "babel-loader",
			}
		]
	},
	plugins: [
		new webpack.WatchIgnorePlugin([path.join(__dirname, 'node_modules')]),
		new ExtractTextPlugin('/css/[name].css'),
		new OptimizeCssAssetsPlugin()
	],
};