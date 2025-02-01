import type { ComponentController } from "../../services/controllers/component.ts";
import type { ElementNodeLike } from "../../services/elements.ts";
import { BaseComponent } from "../base.ts";

export class Button extends BaseComponent {
    static Attributes = {
        group: 'input'
    }
    private element?: ElementNodeLike;

    connect(subcomponents: ComponentController[]) {
        this.element = this.controller
            .application
            .createNode('button', this.controller.htmlAttributes(), { click: (e) => { this.controller.eventHandler({ event: 'action', value: null }) } });
        for (const component of subcomponents) {
            const doms = component.connect();
            for (const dom of doms) {
                this.element.appendChild(dom);
            }
        }
        return [this.element];
    }
}