const architect = require ('./../server/architect.js');
const plugins = require ('./plugins.js');

function progress (name, index, all)
{
	if (index || all)
	{
		document.querySelector('#loading').innerHTML = 'Loading plugin '+name;
		document.querySelector('#loading-progress-bar').setAttribute ('style', 'width: '+Math.round((index/all*100))+'%');
		console.log ('Loading '+name);
	}
	else
	{
		document.querySelector('#loading').innerHTML = name;
		document.querySelector('#loading-progress-bar').setAttribute ('style', 'width: 100%');
		console.log (name);
	}
}

async function main ()
{
	document.querySelector('#loading-progress').style.display='block';
	try
	{
		let setupPlugins = await plugins.loadPlugins (progress);
		architect.createApp(setupPlugins, function (err, app) {
			if (err) 
			{
				document.querySelector('#startuperror').innerHTML = 'Startup Error: '+err.message;
				document.querySelector('#startuperror').style.display= 'block';
				console.error (err);
			}
			else
			{
				console.log('Starting Music Local');
				document.querySelector('#loading').style.display='none';
				document.querySelector('#loading-progress').style.display='none';
				app.services.application.start (app.services);
				//app.services.events.emit ('ready', app.services);
			}
		});
	}
	catch (e)
	{
		document.querySelector('#startuperror').innerHTML = 'Startup Error: '+e.message;
		document.querySelector('#startuperror').style.display= 'block';
		console.error (e);
	}
}

main ();
