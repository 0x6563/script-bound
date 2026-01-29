import type { DOMNodeLike } from "../../services/elements.ts";
import { BaseComponent } from "../base.ts";

export class Html extends BaseComponent<{}> {
    connect(): DOMNodeLike[] {
        const container = this.controller.application.createNode('div', { "data-control": "output", "data-component": 'html' });
        container.innerHTML = this.controller.scope.value;
        return [container];
    }
}