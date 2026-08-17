import type { DOMNodeLikeList } from "../../services/elements.ts";
import { BaseComponent } from "../base.ts";

export class Html extends BaseComponent {
    connect(): DOMNodeLikeList {
        const container = this.controller.application.createNode('div', { "data-control": "output", "data-component": 'html' });
        container.innerHTML = this.controller.dataController.value;
        return [container];
    }
}