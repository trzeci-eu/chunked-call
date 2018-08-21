const path = require('path');

module.exports = {
	// mode: 'production',
	mode: 'development',

	entry: "./src/main.ts",
	// devtool: 'inline-source-map',
	module: {
		rules: [{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
		]
	},
	resolve: {
		extensions: [
			'.html',
			'.tsx',
			'.ts',
			'.js',
		]
	},

	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'js')
	},

};