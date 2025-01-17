import { OutputComponent } from "../output.ts";
import type { DOMNodeLike } from "../../services/elements.ts";

export class DebugDump extends OutputComponent {
    connect(): DOMNodeLike[] {
        const container = this.controller.application.createNode('div');
        const pre = this.controller.application.createNode('pre');
        pre.innerHTML = JSON.stringify(this.controller.config, null, 2);
        container.appendChild(pre);
        return [container];
    }
}