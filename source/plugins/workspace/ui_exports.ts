
/** This file is used to import the data types that this plugin provides */
import { VueConstructor } from "vue/types/umd";

export type ToolbarButtonActionFunction = () => void;
export type ToolbarButtonVisibleFunction = () => boolean;
export type ToolbarButtonEnabledFunction = () => boolean;

export enum ToolbarButtonPosition {
	LEFT,
	RIGHT
}

export interface ToolbarButtonOptions {
	priority?: number;
	position?: ToolbarButtonPosition,
	action?: ToolbarButtonActionFunction | undefined;
	visible?: ToolbarButtonVisibleFunction;
	enabled?: ToolbarButtonEnabledFunction;
}

import { RouteConfig } from "vue-router";

export interface ToolbarButton {
	view: string,
	priority: number;
	position: ToolbarButtonPosition,
	action: ToolbarButtonActionFunction | undefined;
	visible: ToolbarButtonVisibleFunction;
	enabled: ToolbarButtonEnabledFunction;
}

export interface workspace
{
	registerToolbarButton(view: VueConstructor<Vue>, options: ToolbarButtonOptions): void;
	registerWorkspaceRoutes (newRoutes: RouteConfig[]): void;
}

