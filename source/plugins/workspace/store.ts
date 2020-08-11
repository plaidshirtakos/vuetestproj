import { Module } from "vuex";
import { ToolbarButton } from "./ui_types";
import { RootState } from "./ui_types";

export interface WorkspaceState {
    toolbarButtons: ToolbarButton[],
}

export default function workspaceStore () {
	let store: Module<WorkspaceState, RootState> = {
		namespaced: true,
		state: {
			toolbarButtons: []
		},
		getters: {
			toolbarButtons: (state) => state.toolbarButtons
		},
		mutations: {
			registerToolbarButton (state, toolbarButton: ToolbarButton) {
				state.toolbarButtons.push (toolbarButton);
			}
		},
		actions: {
			registerToolbarButton (store, toolbarButton: ToolbarButton) {
				store.commit ("registerToolbarButton", toolbarButton);
			}
		}
	};
	return store;
}
