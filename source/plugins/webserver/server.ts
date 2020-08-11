import express, { Router } from "express";
import http from "http";
import os from "os";
import { AddressInfo } from "net";
import bodyParser from "body-parser";

import { Imports, RegisterFunction } from "./server_types";

interface RouterApi {
    version: number,
    router: Router
}

export function setup (options: any, imports: Imports, register: RegisterFunction)
{
    let app = express ();

    let routers: Router[] = [];
    let routersApi: RouterApi[] = [];
    
    let webserverPublicRouter = Router ();
    let webserverPrivateRouter = Router ();
    let webserver = {
        start: function (): void
        {
            
            var server = http.createServer(app);
            let serverListener = server.listen (process.env.PORT || 6969, function () {
                let n = 0;
                let networks = os.networkInterfaces();
                for (let network in networks) {
                    for (let networkAddress of (networks as any)[network])
                    {
                        if (networkAddress.family === "IPv4" && !networkAddress.address.startsWith ("127"))
                        {
                            n = n + 1;
                            console.log ("Music Local running at http://"+networkAddress.address+":"+(serverListener.address() as AddressInfo).port);
                        }
                    }
                }
                if (n === 0)
                {
                    console.log ("Music Local running at http://127.0.0.1:"+(serverListener.address() as AddressInfo).port);
                }
            });

            
            for (let router of routers.reverse ())
            {
                app.use (router);
            }

            for (let routerApi of routersApi.reverse ())
            {
                app.use ('/api/v'+routerApi.version, routerApi.router);
            }

            serverListener.on ("error", (err) => {
                console.error (err);
            });
        },
        
        registerPublicRouter (router: Router) {
            webserverPublicRouter.use (router);
        },

        registerPrivateRouter (router: Router) {
            webserverPrivateRouter.use (router);
        },
        registerRouter: function (router: Router): void 
        {
            routers.push (router);
        },

        registerRouterApi: function (version: number, router: Router): void 
        {
            routersApi.push ({
                version, 
                router
            });
        }
    };
    let webserverRouter = Router();
    webserverRouter.use(bodyParser.json());

    webserverRouter.use (webserverPublicRouter);

    webserverRouter.use ((req, res) => {
        res.status(404).send ({err: 404});
    });

    webserver.registerRouterApi(1, webserverRouter);
    
    register (null, {
        webserver
    });
}