import type { ComponentContext, ListConfig, ListMultiConfig } from "../../services/types.ts";
import type { DataBoundApplication } from "../../services/application.ts";
import { Render } from "../../render.ts";

export function Single(application: DataBoundApplication, config: ListConfig<ListMultiConfig>, contexts: ComponentContext) {
    const container = application.createNode('div');
    container.setAttribute('data-control', "list");
    container.setAttribute('data-component', "single");
    const context = contexts[contexts.length - 1]
    if (context)
        container.appendChild(Render(application, config.layout, context.context));
    return container;
}