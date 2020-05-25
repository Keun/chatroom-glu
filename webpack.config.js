const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	mode: 'development',
	watch: true,
	entry: { 
		main: './src/main.js',
		style: './src/style.js',
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
				  	use: ['css-loader', 'sass-loader']
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
		new ExtractTextPlugin('/css/[name].css')
	],
};
