const path = require ('path');
const upath = require ('upath');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require ('fs-extra');
const webpack = require ('webpack');
const plugins = require ('./webpack.plugins.js');

let uiPlugins = plugins.loadPlugins ('ui');

const package_json = require ('./package.json');

let items = [];

for (let plugin of uiPlugins)
{
	items.push ({ from: 'plugins/'+plugin.folder+'/'+plugin.name+'/package*.json', context: 'source' }, { from: '**', context: 'source/plugins/'+plugin.folder+'/'+plugin.name+'/data/ui', to: 'plugins/'+plugin.folder+'/'+plugin.name+'/data' });
}

class PluginsUI {
	apply(compiler) {
		compiler.hooks.environment.tap('Plugins UI', () => {

			console.log('Loading ui plugins');

			let source = 'async function loadPlugins (progress = () => {}) {\n\tvar plugins = [];\n\tvar index = 0;\n\n';

			let index = 0;
			for (let plugin of uiPlugins)
			{
				source = source + '\tlet plugin'+index+' = import (\'../plugins/'+upath.join (plugin.folder, plugin.name, plugin.main)+'\').then ((plugin) => { let setupFunction = plugin.setup || plugin.default || plugin; if (typeof setupFunction !== "function") { throw new Error ("Plugin '+upath.join (plugin.folder, plugin.name)+' has not setup function"); } else { plugins.push ({folder: \''+plugin.folder+'\', name:\''+plugin.name+'\', consumes:'+JSON.stringify (plugin.consumes)+', provides:'+JSON.stringify (plugin.provides)+', setup: setupFunction }); } index=index+1; progress (\''+plugin.folder+'/'+plugin.name+'\', index, '+uiPlugins.length+'); });\n';
				index=index+1;
			}

			source = source + '\tawait Promise.all ([';

			for (let index = 0; index < uiPlugins.length; index++)
			{
				source = source + 'plugin'+index+', ';
			}

			source = source + ']);\n';

			source = source + '\tprogress (\'Your workspace is almost ready ...\');\n';

			source = source + '\treturn plugins;\n}\nmodule.exports.loadPlugins = loadPlugins;\n';
			
			fs.writeFileSync ('./source/ui/plugins.js', source);

			compiler.options.entry = {};
			compiler.options.entry.ui = './source/ui/index.js';

			delete package_json.build;
			delete package_json.devDependencies;
			delete package_json.optionalDependencies;
			delete package_json.scripts;
			// package_json.name = 'wstudio-web';
			// package_json.description = 'Wyliodrin STUDIO web browser version';
			// package_json.scripts = {
			// 	start: 'node server.js'
			// };
			// package_json.bin = {
			// 	'wstudio-web': 'server.js'
			// };
			// package_json.dependencies = {
			// 	express: '*',
			// 	ws: '*'
			// };
			fs.mkdirpSync ('./build/ui');
			fs.writeFileSync ('./build/ui/package.json', JSON.stringify (package_json, null, 4));
			
		});

		// compiler.hooks.done.tap('Setting permissions', () => {
		// 	fs.chmodSync ('./build/server.js', 0o755);
		// });
	
	}
}

module.exports = env => {
	if (!env) env = {};
	
	let defines = {
		APP_KEY: JSON.stringify('681861617d59c9287a87eec1b7ad495a2a16b28a')
	};
	
	let mode = 'development';
	
	if (env.NODE_ENV === 'production')
	{
		defines = {
			APP_KEY: JSON.stringify('afbca5438a7d9c08b131ec0d89572df0ae26af84')
		};
		mode = 'production';
	}
	return {
		entry: {
			workspace: './source/plugins/ui/ui.js',
		},
		output: {
			path: path.resolve(__dirname, './build/ui'),
			filename: 'imports/[name]_[hash].js',
		},
		watch:true,
		optimization: {
			splitChunks: {
				chunks: 'all',
				name: '../vendor'
			},
			minimize: true,
			namedModules: false,
			namedChunks: true,
			flagIncludedChunks: true,
			occurrenceOrder: true,
		},
		resolve: {
			extensions: ['.ts', '.js', '.json']
		},
		module:
		{
			rules: [
				// ... other rules
				{
					test: /\.vue$/,
					loader: 'vue-loader'
				},
				{
					test: /\.less$/,
					use: [
						{
							loader: 'vue-style-loader',
							options: {
								// convertToAbsoluteUrls: true
							}
						},
						{
							loader: 'css-loader',
							options: { url: false }
						},
						{
							loader: 'less-loader',
							options: {
								relativeUrls: false
							}
						}
					]
				},
				{
					test: /\.css$/,
					use: ['style-loader', 'css-loader']
				},
				{
					test: /\.txt$/i,
					use: 'raw-loader',
				},
				{
					test: /\.ts$/,
					loader: 'ts-loader',
					exclude: /node_modules/,
					options: { appendTsSuffixTo: [/\.vue$/] }
				},
				// {
				// 	test: /\.(png|jpg|gif)$/,
				// 	use: [
				// 		{
				// 			loader: 'url-loader',
				// 			options: {
				// 				limit: 5000
				// 			}
				// 		}
				// 	]
				// }
			],
		},
		mode: mode,
		node: {
			__dirname: false
		},
		plugins: [
			// make sure to include the plugin!
			new VueLoaderPlugin({
				esModule: false
			}),
			new CopyPlugin([
				...items,
				// { from: 'index.html', context: 'source/web' },
				{ from: 'img/**', context: 'source/ui' },
				{ from: 'fonts/**', context: 'node_modules/material-design-icons-iconfont/dist/' },
				{ from: 'fonts/**', context: 'node_modules/@mdi/font/' },
				{ from: 'fonts/**', context: 'node_modules/katex/dist/' },
			], {logLevel: ''}),
			new HtmlWebpackPlugin({
				title: 'StartupWay',
				// Load a custom template (lodash by default)
				template: 'source/ui/index.html'
			}),
			new PluginsUI (),
			new webpack.DefinePlugin({
				...defines,
				TARGET: 'ui'
			})
		],
		target: 'web'
	};
};