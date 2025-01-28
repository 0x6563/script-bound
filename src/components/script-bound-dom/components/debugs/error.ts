import type { DOMNodeLike } from "../../services/elements.ts";
import type { ApplicationController } from "../../services/controllers/application.ts";
import { BaseComponent } from "../base.ts";

export class DebugError extends  BaseComponent {
    connect(subcomponents: []): DOMNodeLike[] {
        const container = this.controller.application.createNode('div');
        container.setAttribute('style', 'color:red');

        const h1 = this.controller.application.createNode('h1');
        container.appendChild(h1);
        h1.innerHTML = 'Error';

        const pre = this.controller.application.createNode('pre');
        pre.innerHTML = JSON.stringify(this.controller.node, null, 2);

        container.appendChild(pre);
        return [container];
    }
}