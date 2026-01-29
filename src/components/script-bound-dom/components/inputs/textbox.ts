import type { DOMNodeLike, ElementNodeLike } from "../../services/elements.ts";
import { BaseComponent } from "../base.ts";

export class Textbox extends BaseComponent<{ label: string }> {
    static Attributes = {
        group: 'input',
        default: true,
    }
    private input?: ElementNodeLike;

    connect(subcomponents: []): DOMNodeLike[] {
        const container = this.controller.application.createNode('label');
        this.input = this.controller
            .application
            .createNode('input', { type: 'text', value: this.controller.scope.value }, { change: (e) => { this.controller.eventHandler({ event: 'update', value: e.target.value }) } });
        console.log('settings', this.controller.settings);
        container.appendChild(this.input);
        const text = this.controller.application.createNode('div', { 'data-bound-label': '' });
        text.innerHTML = this.controller.settings?.label || '&nbsp;';
        container.appendChild(text);
        return [container];
    }

    update(type: string, value: any) {
        this.input?.setAttribute('value', value);
        (this.input as unknown as HTMLInputElement).value = value;
    }
}