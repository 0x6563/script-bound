import type { DOMNodeLike } from "../../services/elements.ts";
import { Events } from "../../services/events.ts";
import { InputComponent } from "../../services/types/input.ts";

export class Checkbox extends InputComponent {
    private events: Events<{ value: boolean }> = new Events();
    private input?: DOMNodeLike;
    connect(): DOMNodeLike[] {
        this.input = this.component
            .application
            .createNode(
                'input',
                {
                    type: 'checkbox',
                    value: this.component.data.value
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