import { OutputComponent } from "../../services/types/output.ts";
import type { DOMNodeLike } from "../../services/elements.ts";
import type { OutputConfig } from "../../services/types/types.ts";

export class Html extends OutputComponent<{}> {
    connect(): DOMNodeLike[] {
        const container = this.component.application.createNode('div', { "data-control": "output", "data-component": 'html' });
        container.innerHTML = (this.component.config as OutputConfig).content || this.component.data.value;
        return [container];
    }
}