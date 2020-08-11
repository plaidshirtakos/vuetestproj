import { Imports, RegisterFunction } from "./ui_types";
import { ToolbarButton, ToolbarButtonPosition, ToolbarButtonOptions } from "./ui_exports";
import Vue from "vue";
import { VueConstructor } from "vue";
import workspaceStore from "./store";
import Workspace from "./views/Workspace.vue";
import { RouteConfig } from "vue-router";

export function setup (options: any, imports: Imports, register: RegisterFunction)
{
    let routes:RouteConfig[] = [];

    let workspace = {
        registerToolbarButton(view: VueConstructor<Vue>, options: ToolbarButtonOptions = {}) 
        {
			console.log ((view as any).options.name);
            Vue.component ((view as any ).options.name, view);
            let toolbarButton: ToolbarButton = {
                view: (view as any).options.name,
                priority: options.priority || 1,
                position: options.position || ToolbarButtonPosition.LEFT,
                action: options.action,
                visible: options.visible || (() => true),
                enabled: options.enabled || (() => true)
            };
            imports.application.storeDispatch ("workspace/registerToolbarButton", toolbarButton);
        },

        registerWorkspaceRoutes (newRoutes: RouteConfig[]) {
            // TODO throw exception if routes are registered after the start of the application
            routes.push (...newRoutes);
        },
    };

    imports.application.registerStore('workspace', workspaceStore());

    imports.application.registerRoutes ([{
        path: '/workspace',
        children: routes,
        component: Workspace
    }]);

    register (null, {
        workspace
    });
}