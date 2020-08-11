require ('dotenv').config();
const path = require ('path');
const architect = require ('./architect');

function progress (plugin, index, total)
{
    console.log ('Loading plugin '+plugin+ ' ('+index+'/'+total+')');
}

function loadPlugins (pluginsFolder)
{
	let plugins = [];
	try
	{
		plugins = require ('./plugins.js');
		let pluginNumber = 0;
		for (let p of plugins)
		{
			pluginNumber = pluginNumber + 1;
			try
			{
				progress (p.id, pluginNumber, plugins.length);
				let plugin = require (path.join (pluginsFolder, p.folder, p.name));
				let setupFunction = plugin.setup || plugin.default || plugin;
				if (typeof setupFunction !== 'function')
				{
					throw (new Error ('Plugin '+p.name+' is missing the setup function'));
				}
				p.setup = setupFunction;
			}
			catch (e)
			{
				console.error ('Error loading plugin '+p.name+' '+e.message);
				console.error (e);
			}
		}
		console.log ('The server is almost loaded ...');
	}
	catch (e)
	{
		console.log ('Failed to load plugins '+e.message);
	}
	return plugins;
}

// var configPath = path.join(__dirname, 'plugins.js');
// var config = architect.loadConfig(configPath);
// console.log (config);


async function main ()
{
	architect.createApp(await loadPlugins (path.join(__dirname, 'plugins')), function (err, app) {
		if (err) 
		{
			console.error (err);
		}
		else
		{
			console.log('Starting Vue Project');
			// console.log (app);
			app.services.webserver.start (app.services);
			// app.services.events.emit ('ready', app.services);
		}
	});
}

main ();
