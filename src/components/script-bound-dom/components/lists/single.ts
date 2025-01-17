import type { ComponentController } from "../../services/controllers/component.ts";
import { ListComponent } from "../list.ts";

export class Single extends ListComponent {
    private attributes;

    constructor(protected controller: any) {
        super(controller);
        this.attributes = {
            'data-control': "list",
            'data-component': "single",
        }
    }

    connect(subcomponents: ComponentController[]) {
        const container = this.controller.application.createNode('div', this.attributes);
        const component = subcomponents[subcomponents.length - 1]
        if (component) {
            const doms = component.connect();
            for (const dom of doms) {
                container.appendChild(dom);
            }
        }
        return [container];
    }

}