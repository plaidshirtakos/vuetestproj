/** This file is used to import the data types that this plugin provides */
import {Router} from "express";
export class Logger
{

}

export interface webserver
{
	 // functions that your plugin exports
	 start (): void;
	 registerRouter (router: Router): void;
	 registerRouterApi (version: number, router: Router): void;
	 registerPublicRouter (router: Router): void;
	 registerPrivateRouter (router: Router): void;
}
