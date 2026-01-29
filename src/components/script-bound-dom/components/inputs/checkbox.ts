import type { DOMNodeLike, ElementNodeLike } from "../../services/elements.ts";
import { BaseComponent } from "../base.ts";

export class Checkbox extends BaseComponent {
    static Attributes = {
        group: 'input'
    }

    private input?: ElementNodeLike;
    connect(subcomponents: []): DOMNodeLike[] {
        this.input = this.controller
            .application
            .createNode('input', { type: 'checkbox', value: this.controller.scope.value }, { change: (v) => this.controller.eventHandler({ event: 'update', value: v }) });
        return [this.input];
    }

    update(type: string, value: any) {
        this.input?.setAttribute('value', value);
        (this.input as unknown as HTMLInputElement).value = value;
    }
}