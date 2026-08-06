import type { DOMNodeLike } from "../../services/elements.ts";
import { BaseComponent } from "../base.ts";

export class DebugDump extends BaseComponent {
    connect(): DOMNodeLike[] {
        const container = this.controller.application.createNode('div');
        const pre = this.controller.application.createNode('pre');
        pre.innerHTML = JSON.stringify(this.controller.node, null, 2);
        container.appendChild(pre);
        return [container];
    }
}