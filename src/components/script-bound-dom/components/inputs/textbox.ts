import type { DOMNodeLike, ElementNodeLike } from "../../services/elements.ts";
import { Events } from "../../services/events.ts";
import { InputComponent } from "../input.ts";

export class Textbox extends InputComponent<{ label: string }> {
    private events: Events<{ value: boolean }> = new Events();
    private input?: ElementNodeLike;

    connect(): DOMNodeLike[] {
        const container = this.controller.application.createNode('label');
        this.input = this.controller
            .application
            .createNode(
                'input',
                {
                    type: 'text',
                    value: this.controller.data.value
                },
                {
                    change: (e) => { this.events.emit({ value: e.target.value }) }
                }
            );
        container.appendChild(this.input);

        const text = this.controller.application.createNode('div', { 'data-bound-label': '' });
        text.innerHTML = this.controller.config.settings?.label || '&nbsp;';
        container.appendChild(text);
        return [container];
    }

    update(value: any) {
        this.input?.setAttribute('value', value);
        (this.input as unknown as HTMLInputElement).value = value;
    }

    listen(event: string, callback: (event?: any) => void): void {
        this.events.addEventListener(callback);
    }

    unlisten(event: string, callback: (event?: any) => void): void {
        this.events.removeEventListener(callback);
    }
}