import type { ComponentController } from "../../services/controllers/component.ts";
import { BaseComponent } from "../base.ts";
import type { DOMNodeLike } from "../../services/elements.ts";

export class Multi extends BaseComponent {
    static Attributes = {
        group: 'list',
        default: true,
        repeat: true
    };


    connect(subcomponents: ComponentController[]) {
        const container: DOMNodeLike[] = [];
        for (const component of subcomponents) {
            const doms = component.connect();
            for (const dom of doms) {
                container.push(dom);
            }
        }
        return container;
    }
}