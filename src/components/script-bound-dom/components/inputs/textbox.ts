import type { DOMNodeLike } from "../../services/elements.ts";
import { Events } from "../../services/events.ts";
import { InputComponent } from "../../services/types/input.ts";

export class Textbox extends InputComponent<{ label: string }> {
    private events: Events<{ value: boolean }> = new Events();
    private input?: DOMNodeLike;

    connect(): DOMNodeLike[] {
        const container = this.component.application.createNode('label');
        this.input = this.component
            .application
            .createNode(
                'input',
                {
                    type: 'text',
                    value: this.component.data.value
                },
                {
                    change: (e) => { this.events.emit({ value: e.target.value }) }
                }
            );
        container.appendChild(this.input);

        const text = this.component.application.createNode('div', { 'data-bound-label': '' });
        text.innerHTML = this.component.config.settings?.label || '&nbsp;';
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