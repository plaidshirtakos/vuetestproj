import { Imports, RegisterFunction } from "./ui_types";
import { RouteConfig } from "vue-router";

import Images from "./views/Images.vue";
import Videos from "./views/Videos.vue";
import Cmp from "./views/Cmp.vue";
import Cmp1 from "./views/Cmp1.vue";
import Example from "./views/Example.vue";
import PropExample from "./views/PropExample.vue";
import GetPostExample from "./views/PostGetExample.vue"
export function setup (options: any, imports: Imports, register: RegisterFunction)
{
    let routes:RouteConfig[] = [];

    let image_display = {};

    
    // imports.application.registerView(Cmp);

    // imports.application.registerView(Cmp1);
    
    imports.application.registerView(PropExample);

    let imagesRoutes = [
        {
            path:'/workspace/images/cmp',
            component:Cmp
        },
        {
            path:'/workspace/images/cmp1',
            component:Cmp1
        }
    ];
    imports.workspace.registerWorkspaceRoutes ([{
        path: '/workspace/images',
        children:imagesRoutes,
        component: Images
    }]);

    imports.workspace.registerWorkspaceRoutes ([{
        path: '/workspace/videos',
        component: Videos
    }]);

    imports.workspace.registerWorkspaceRoutes ([{
        path: '/workspace/example',
        component: Example
    }]);

    imports.workspace.registerWorkspaceRoutes([{
        path:'/getpostexample',
        component: GetPostExample
    }]);

    imports.application.registerRoutes ([{
        path: '/example',
        component: Example
    }]);
    register (null, {
        image_display
    });
}