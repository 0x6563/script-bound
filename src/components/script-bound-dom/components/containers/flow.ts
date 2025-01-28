import type { ComponentController } from "../../services/controllers/component.ts";
import type { BaseComponentASTNode, LayoutFlow } from "../../services/types/types.ts";
import { GetLayoutFlow } from "../../services/utility.ts";
import { BaseComponent } from "../base.ts";

export class Flow extends BaseComponent<LayoutFlow> {
    static Attributes = {
        group: 'container',
        default: true
    }
    private attributes;

    constructor(protected controller: ComponentController<BaseComponentASTNode, LayoutFlow>) {
        super(controller);
        const { direction, wrap } = GetLayoutFlow(this.controller.settings);
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