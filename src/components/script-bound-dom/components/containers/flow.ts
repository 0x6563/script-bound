import { GetLayoutFlow } from "../../services/utility.ts";
import type { ComponentController } from "../../services/controllers/component.ts";
import { ContainerComponent } from "../container.ts";
import type { LayoutFlow } from "../../services/types/types.ts";

export class Flow extends ContainerComponent<LayoutFlow> {
    private attributes;

    constructor(protected controller: ComponentController<LayoutFlow>) {
        super(controller);
        const { direction, wrap } = GetLayoutFlow(this.controller.config.settings);
        this.attributes = {
            'data-flow': direction?.toString(),
            'data-wrap': wrap.toString(),
            'data-control': "container",
            'data-component': "flow",
        }
    }

    connect(subcomponents: ComponentController[]) {
        const container = this.controller.application.createNode('div', this.attributes);
        for (const component of subcomponents) {
            const doms = component.connect();
            for (const dom of doms) {
                container.appendChild(dom);
            }
        }
        return [container];
    }

}