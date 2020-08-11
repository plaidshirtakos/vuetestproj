import { Imports, RegisterFunction } from "./server_types";
import express from "express";

export default function setup (options: any, imports: Imports, register: RegisterFunction) {
    const router = express.Router ();
    router.use (express.static ("../ui"));
    imports.webserver.registerRouter (router);

    register (null, {});
}