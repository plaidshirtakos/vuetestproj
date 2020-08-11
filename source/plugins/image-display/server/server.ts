
import { Imports, RegisterFunction } from "./server_types";
import { Router } from "express";


export function setup (options: any, imports: Imports, register: RegisterFunction)
{
    let image_display = {
    };
    let imageDisplayRouter = Router();


    //a simple get route -> Go to PostGetExample.vue to see how you can use it in the frontend;
    imageDisplayRouter.get("/get/data", async(req, res) => {
        try {
            res.status(200).send("This is a get example");
        } catch (e) {
            console.error(e);
            res.status(500).send({err:500});

        }
    });

    //a simple post route -> Go to PostGetExample.vue to see how you can use it in the frontend;
    imageDisplayRouter.post("/post/data", async(req, res) => {
        try {

            res.status(200).send("This is a post example");
        } catch (e) {
            console.error(e);
            res.status(500).send({err:500});

        }
    });

    imageDisplayRouter.get("/example/:param1/:param2", async(req, res) => {
        try {
            let param1:string = req.params.param1;
            let param2number:number = parseInt(req.params.param2);
            console.log(param1);
            
            let response = param1 + "This is a response " + param2number;
           res.status(200).send(
                {
                    response:"Hardcoded string",
                    text:"I successfuly responded"
                }
            );

        } catch (e) {
            console.error(e);
            res.status(500).send({err:500});

        }
    });

    
    //webserver must be consumend in the package.json of this plugin in order for this to work
    imports.webserver.registerRouterApi(1, imageDisplayRouter);
    
    register (null, {
        image_display
    });
}