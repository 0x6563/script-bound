import { OutputComponent } from "../../services/types/output.ts";
import type { DOMNodeLike } from "../../services/elements.ts";

export class DebugDump extends OutputComponent {
    connect(): DOMNodeLike[] {
        const container = this.component.application.createNode('div');
        const pre = this.component.application.createNode('pre');
        pre.innerHTML = JSON.stringify(this.component.config, null, 2);
        container.appendChild(pre);
        return [container];
    }
}