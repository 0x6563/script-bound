import type { ContainerFlowConfig, ContainerConfig } from "../../services/types.ts";
import type { DataBoundApplication } from "../../services/application.ts";
import type { Context } from "../../services/context.ts";
import { Render } from "../../render.ts";
import { GetLayoutFlow } from "../../services/utility.ts";

export function Flow(application: DataBoundApplication, config: ContainerConfig<ContainerFlowConfig>, context: Context) {
    const state = GetLayoutFlow(config.settings);
    const container = application.createNode('div');
    container.setAttribute('data-flow', state.flow?.toString());
    container.setAttribute('data-wrap', state.wrap.toString());
    container.setAttribute('data-control', "container");
    container.setAttribute('data-component', "flow");
    for (const layout of config.layouts) {
        container.appendChild(Render(application, layout, context))
    }
    return container;
}