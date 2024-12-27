import type { OutputConfig } from "../../services/types.ts";
import type { DataBoundApplication } from "../../services/application.ts";

export function Html(application: DataBoundApplication, config: OutputConfig, value: any) {
    const container = application.createNode('div');
    container.innerHTML = config.layout || value;
    return container;
}
