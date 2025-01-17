import { OutputComponent } from "../output.ts";
import type { DOMNodeLike } from "../../services/elements.ts";

export class Html extends OutputComponent<{}> {
    connect(): DOMNodeLike[] {
        const container = this.controller.application.createNode('div', { "data-control": "output", "data-component": 'html' });
        container.innerHTML = this.controller.data.value;
        return [container];
    }
}