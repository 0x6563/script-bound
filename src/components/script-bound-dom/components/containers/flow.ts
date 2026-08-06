import { GetLayoutFlow } from "../../services/utility.ts";
import { BaseComponent } from "../base.ts";

export class Flow extends BaseComponent {
    attributes: { [key: string]: string } = {};

    connect() {
        const { direction, wrap } = GetLayoutFlow(this.controller.attributes.settings?.value);
        const container = this.controller.application.createNode('div', {
            'data-flow': direction?.toString(),
            'data-wrap': wrap.toString(),
            'data-control': "container",
            'data-component': "flow",
        });
        const refNode = this.controller.application.createComment('');
        container.appendChild(refNode);
        this.controller.createChildren({ refNode });
        return [container];
    }
}