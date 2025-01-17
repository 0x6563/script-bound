import type { DOMNodeLike, ElementNodeLike } from "../../services/elements.ts";
import { Events } from "../../services/events.ts";
import { InputComponent } from "../input.ts";

export class Checkbox extends InputComponent {
    private events: Events<{ value: boolean }> = new Events();
    private input?: ElementNodeLike;
    connect(): DOMNodeLike[] {
        this.input = this.controller
            .application
            .createNode(
                'input',
                {
                    type: 'checkbox',
                    value: this.controller.data.value
                },
                { change: (v) => this.events.emit({ value: v }) }
            );
        return [this.input];
    }

    listen(event: string, callback: (event?: any) => void): void {
        this.events.addEventListener(callback);
    }

    update(value: any) {
        this.input?.setAttribute('value', value);
        (this.input as unknown as HTMLInputElement).value = value;
    }

    unlisten(event: string, callback: (event?: any) => void): void {
        this.events.removeEventListener(callback);
    }
}