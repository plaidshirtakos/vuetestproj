/** This file is used to import the data types that this plugin provides */

import { Module } from "vuex";
import { RouteConfig } from "vue-router";
import { VueConstructor } from "vue/types/umd";
import { AxiosInstance } from "axios";

export interface application
{
	api: AxiosInstance,

	 start (ui: any): void;
	 registerStore<T> (namespace: string, store: Module<T, RootState>): void;
	 storeDispatch (action: string, obj: any): Promise<any>;
	 registerRoutes (routes: RouteConfig[]): void;

	 registerView (view: VueConstructor<Vue>): void;
	 error (err: string): void;
}

export interface RootState {
    version: string;
}

