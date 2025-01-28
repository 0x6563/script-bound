import type { ComponentController } from "../../services/controllers/component.ts";
import type { DOMNodeLike } from "../../services/elements.ts";
import { BaseComponent } from "../base.ts";

export class Virtual extends BaseComponent {

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