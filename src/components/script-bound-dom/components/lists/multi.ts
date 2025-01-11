import { GetLayoutFlow } from "../../services/utility.ts";
import type { ComponentController } from "../../services/controllers/component.ts";
import { ListComponent } from "../../services/types/list.ts";

export class Multi extends ListComponent {
    private attributes;

    constructor(protected component: ComponentController) {
        super(component);
        const { direction, wrap } = GetLayoutFlow(this.component.config.settings);
        this.attributes = {
            'data-flow': direction?.toString(),
            'data-wrap': wrap.toString(),
            'data-control': "list",
            'data-component': "multi",
        }
    }

    connect(subcomponents: ComponentController[]) {
        const container = this.component.application.createNode('div', this.attributes);
        for (const component of subcomponents) {
            const doms = component.connect();
            for (const dom of doms) {
                container.appendChild(dom);
            }
        }
        return [container];
    }

}