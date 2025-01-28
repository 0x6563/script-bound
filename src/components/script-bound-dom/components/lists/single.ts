import type { ComponentController } from "../../services/controllers/component.ts";
import { BaseComponent } from "../base.ts";

export class Single extends BaseComponent {
    static Attributes = {
        group: 'list',
        repeat: true
    };
    private attributes;

    connect(subcomponents: ComponentController[]) {
        this.attributes = {
            'data-control': "list",
            'data-component': "single",
        }


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