import type { OutputConfig } from "../../services/types.ts";
import type { DataBoundApplication } from "../../services/application.ts";
import type { Context } from "../../services/context.ts";

export function Debug_Dump(application: DataBoundApplication, config: OutputConfig, context: Context) {
    const container = application.createNode('div');
    const pre = application.createNode('pre');
    pre.innerHTML = JSON.stringify(config, null, 2);
    container.appendChild(pre);
    return container;
}