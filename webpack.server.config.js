const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const plugins = require('./webpack.plugins.js');

const package_json = require('./package.json');

const fs = require('fs-extra');
const _ = require('lodash');

const license = fs.readFileSync ('./LICENSE').toString();

let serverPlugins = plugins.loadPlugins('server');
let items = [];

for (let plugin of serverPlugins) {
	items.push({ from: 'plugins/' + plugin.folder + '/' + plugin.name + '/package*.json', context: 'source' }, { context: 'source/plugins/' + plugin.folder + '/' + plugin.name + '/data/server', from: '**', to: 'plugins/' + plugin.folder + '/' + plugin.name + '/data' });
}

class PluginsServer {
	apply(compiler) {
		compiler.hooks.environment.tap('Plugins Server', () => {
			let build_package_json = _.assign({}, package_json);
			delete build_package_json.build;
			delete build_package_json.scripts;
			delete build_package_json.devDependencies;
			fs.mkdirpSync('./build/server');
			fs.writeFileSync('./build/server/package.json', JSON.stringify(build_package_json, null, 4));

			fs.writeFileSync('./build/server/LICENSE', license);
			
			if (compiler.options.target === 'node') {
				console.log('Loading server plugins');

				compiler.options.entry = {};

				fs.writeFileSync ('./build/server/plugins.js', 'module.exports = '+JSON.stringify (serverPlugins, null, 2)+';');

				for (let plugin of serverPlugins) {
					compiler.options.entry[plugin.folder+'/'+plugin.name] = './source/plugins/' + path.join (plugin.folder, plugin.name, plugin.main);
				}
			}
		});

	}
}

module.exports = env => {
	if (!env) env = {};
	let defines = {
		APP_KEY: JSON.stringify('014dd0822b82fb2b8a8a4b14f1182cab5fcced07')
	};

	let mode = 'development';

	if (env.NODE_ENV === 'production')
	{
		defines = {
			APP_KEY: JSON.stringify ('66482e1728771fe4a4c440e79e7e38dc810cc5e6')
		};
		mode = 'production';
	}
	return {
		entry: {
			server: './source/plugins/server/server.js',
		},
		output: {
			path: path.resolve(__dirname, './build/server'),
			// library: '',
			filename: 'plugins/[name]/index.js',
			libraryTarget: 'commonjs2',
		},
		resolve: {
			extensions: ['.ts', '.js', '.json']
		},
		optimization: {
			// splitChunks: {
			// 	chunks: 'all',
			// 	name: '../vendor'
			// },
			minimize: false,
			namedModules: true,
			namedChunks: true,
			flagIncludedChunks: true,
			occurrenceOrder: true,
		},
		module:
		{
			rules: [
				{
					test: /\.ts/,
					use: 'ts-loader',
					exclude: /node_modules/,
				},
			],
		},
		externals: [nodeExternals({
			whitelist: [...Object.keys(package_json.devDependencies)]
		})],
		mode: mode,
		node: {
			__dirname: false
		},
		plugins: [
			// make sure to include the plugin!
			new CopyPlugin([
				...items,
				{ from: '*.js', context: 'source/server' },
				// { from: '../package.json', context: 'source' },
			], { logLevel: '' }),
			new PluginsServer(),
			new webpack.DefinePlugin({
				...defines,
				TARGET: 'server'
			})
		],
		target: 'node'
	};
};