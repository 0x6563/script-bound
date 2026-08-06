import type { DOMNodeLike, ElementNodeLike } from "../../services/elements.ts";
import { BaseComponent } from "../base.ts";

export class Checkbox extends BaseComponent {

    private input?: ElementNodeLike;
    connect(): DOMNodeLike[] {
        this.input = this.controller
            .application
            .createNode('input', { type: 'checkbox', value: this.controller.dataController.value }, { change: (e) => this.controller.eventHandler({ event: 'update', value: e.target.checked }) });
        return [this.input];
    }

    update(type: string, value: any) {
        this.input?.setAttribute('value', value);
        (this.input as unknown as HTMLInputElement).value = value;
    }
}