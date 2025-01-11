import { OutputComponent } from "../../services/types/output.ts";
import type { DOMNodeLike } from "../../services/elements.ts";
import type { ApplicationController } from "../../services/controllers/application.ts";

export class DebugError extends OutputComponent {
    connect(): DOMNodeLike[] {
        const container = this.component.application.createNode('div');
        container.setAttribute('style', 'color:red');

        const h1 = this.component.application.createNode('h1');
        container.appendChild(h1);
        h1.innerHTML = 'Error';

        const pre = this.component.application.createNode('pre');
        pre.innerHTML = JSON.stringify(this.component.config, null, 2);

        container.appendChild(pre);
        return [container];
    }
}


export function ErrorBox(application: ApplicationController, message: string) {
    const container = application.createNode('div');
    container.setAttribute('style', 'color:red');

    const h1 = application.createNode('h1');
    container.appendChild(h1);
    h1.innerHTML = 'Error';

    const pre = application.createNode('pre');
    pre.innerHTML = message;

    container.appendChild(pre);
    return [container];
}