import type { ComponentContext, ListConfig, ListMultiConfig } from "../../services/types.ts";
import type { DataBoundApplication } from "../../services/application.ts";
import { Render } from "../../render.ts";
import { GetLayoutFlow } from "../../services/utility.ts";

export function Multi(application: DataBoundApplication, config: ListConfig<ListMultiConfig>, contexts: ComponentContext) {
    const state = GetLayoutFlow(config.settings);
    const container = application.createNode('div');
    container.setAttribute('data-flow', state.flow?.toString());
    container.setAttribute('data-wrap', state.wrap.toString());
    container.setAttribute('data-control', "list");
    container.setAttribute('data-component', "multi");
    for (const context of contexts) {
        container.appendChild(Render(application, config.layout, context.context))
    }
    return container;
}