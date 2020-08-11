import { Imports, RegisterFunction } from "./ui_types";
import Vue from "vue";
import Vuetify from "vuetify";
import { RouteConfig } from "vue-router";
import VueRouter from "vue-router";
import Vuex, { StoreOptions } from "vuex";
import { RootState } from "./ui_exports";
import { Module } from "vuex";
import Application from "./views/Application.vue";
import { VueConstructor } from "vue";
import axios from "axios";

export function setup (options: any, imports: Imports, register: RegisterFunction)
{
    let vuetify = new Vuetify({
        theme: {
            themes: {
                light: {
                    primary: '#803b9c',
                    secondary: '#470163',
                    accent: '#9108f9',
                    error: '#FF0000',
                },
                dark: {
                    primary: '#236f24',
                    secondary: '#32a187',
                    accent: '#3CDEDE',
                    error: '#FF1818',
                },
            },
        },
        icons: {
            iconfont: 'md',
        },
	});

	const routes: RouteConfig[] = [];

	
	Vue.use(VueRouter);
    Vue.use(Vuetify, {
		font: 'mdi',
		iconfont: 'mdi'
    });
    
    Vue.use (Vuex);

    let storeData: StoreOptions<RootState> = {
        state: {
            version: "1.0.0"
        },
        modules: {},
        strict: process.env.NODE_ENV !== "production"
    };

    let store = new Vuex.Store(storeData);

    let application = {
        api: axios.create (),
        __no_hook_api:  "do not hook the api field",

        store,
        // TODO add ui type
        start (ui: any) {
            routes.push (
                { path: "*", redirect: "/workspace" }
            );

            console.log (routes);

            let router = new VueRouter({
                routes
            });

			Vue.prototype.ui = ui;

            let vue = new Vue ({
                el: '#app',
                vuetify,
                router,
                store,
                render: function (render) {
                    return render(Application);
                }
            });
        },

        registerStore<T>(namespace: string, store: Module<T, RootState>) {
            if (this.store) {
                // TODO check if it is already registered
                this.store.registerModule(namespace, store);
            }
            else {
                this.error('Unable to register store module ' + namespace + ', store has not been already started');
            }
        },

        storeDispatch (action: string, obj: any): Promise<any>
        {
            return this.store.dispatch (action, obj);
        },

        registerRoutes (newRoutes: RouteConfig[]) {
            
            routes.push (...newRoutes);
		},
		
		registerView (view: VueConstructor<Vue>) {
			console.log ((view as any).options.name);
			Vue.component ((view as any).options.name, view);
		},

        error (err: string) {
            console.error (err);
        }
    };

    register (null, {
        application
    });
}