import type { DOMNodeLikeList, ElementNodeLike } from "../../services/elements.ts";
import { BaseComponent } from "../base.ts";

export class Input extends BaseComponent {

    private input?: ElementNodeLike;

    connect(): DOMNodeLikeList {
        const type = this.controller.attributes.type?.value || 'text';
        switch (type) {
            case 'checkbox': {
                this.connectCheckbox();
                break;
            }
            case 'radio': {
                this.connectRadio();
                break;
            }
            case 'file': {
                this.connectFile();
                break;
            }
            default: {
                this.connectText(type);
                break;
            }
        }
        return [this.input!];
    }

    update(name: string, old: any, value: any) { }

    private connectText(type: string): void {
        this.input = this.controller.application.createNode('input', {
            ...this.nativeAttributes(),
            type,
            value: this.controller.attributes.value?.value
        }, {
            change: (e) => { this.controller.attributes.value.value = e.target.value; }
        });

        this.update = (name: string, old: any, value: any) => {
            if (name === 'value') {
                (this.input as unknown as HTMLInputElement).value = value;
            }
        };
    }

    private connectCheckbox(): void {
        this.input = this.controller.application.createNode('input', {
            ...this.nativeAttributes(),
            type: 'checkbox'
        }, {
            change: (e) => { this.controller.attributes.value.value = e.target.checked; }
        });
        (this.input as unknown as HTMLInputElement).checked = !!this.controller.attributes.value?.value;

        this.update = (name: string, old: any, value: any) => {
            if (name === 'value') {
                (this.input as unknown as HTMLInputElement).checked = !!value;
            }
        };
    }

    private connectRadio(): void {
        this.input = this.controller.application.createNode('input', {
            ...this.nativeAttributes(),
            type: 'radio'
        }, {
            change: (e) => {
                if (e.target.checked) {
                    this.controller.attributes.value.value = this.controller.dataController.value;
                }
            }
        });
        this.syncChecked();

        this.update = (name: string) => {
            if (name === 'value') {
                this.syncChecked();
            }
        };
    }

    private connectFile(): void {
        this.input = this.controller.application.createNode('input', {
            ...this.nativeAttributes(),
            type: 'file'
        }, {
            change: (e) => { this.controller.attributes.value.value = e.target.files?.[0]?.name ?? ''; }
        });
    }

    private syncChecked(): void {
        const own = this.controller.dataController.value;
        const shared = this.controller.attributes.value?.value;
        (this.input as unknown as HTMLInputElement).checked = own === shared;
    }

    private nativeAttributes(): { [key: string]: any } {
        const attributes = this.controller.htmlAttributes();
        const result: { [key: string]: any } = {};
        for (const key in attributes) {
            if (key === 'value' || key === 'type') { continue; }
            const v = attributes[key];
            if (v !== null && typeof v === 'object') { continue; }
            result[key] = v;
        }
        return result;
    }
}
