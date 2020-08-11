async function loadPlugins (progress = () => {}) {
	var plugins = [];
	var index = 0;

	let plugin0 = import ('../plugins/application/ui.ts').then ((plugin) => { let setupFunction = plugin.setup || plugin.default || plugin; if (typeof setupFunction !== "function") { throw new Error ("Plugin application has not setup function"); } else { plugins.push ({folder: '', name:'application', consumes:[], provides:["application"], setup: setupFunction }); } index=index+1; progress ('/application', index, 3); });
	let plugin1 = import ('../plugins/image-display/ui/ui.ts').then ((plugin) => { let setupFunction = plugin.setup || plugin.default || plugin; if (typeof setupFunction !== "function") { throw new Error ("Plugin image-display has not setup function"); } else { plugins.push ({folder: '', name:'image-display', consumes:["application","workspace"], provides:["image_display"], setup: setupFunction }); } index=index+1; progress ('/image-display', index, 3); });
	let plugin2 = import ('../plugins/workspace/ui.ts').then ((plugin) => { let setupFunction = plugin.setup || plugin.default || plugin; if (typeof setupFunction !== "function") { throw new Error ("Plugin workspace has not setup function"); } else { plugins.push ({folder: '', name:'workspace', consumes:["application"], provides:["workspace"], setup: setupFunction }); } index=index+1; progress ('/workspace', index, 3); });
	await Promise.all ([plugin0, plugin1, plugin2, ]);
	progress ('Your workspace is almost ready ...');
	return plugins;
}
module.exports.loadPlugins = loadPlugins;
