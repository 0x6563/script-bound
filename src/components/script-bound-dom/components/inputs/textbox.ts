import type { DOMNodeLike, ElementNodeLike } from "../../services/elements.ts";
import { BaseComponent } from "../base.ts";

export class Textbox extends BaseComponent {

    private input?: ElementNodeLike;


    connect(): DOMNodeLike[] {
        console.log(this.controller)
        this.input = this.controller
        .application
        .createNode('input', {
            type: 'text',
            value: this.controller.attributes["value"]?.value
        }, {
            change: (e) => {
                console.log(e)
                this.controller.attributes["value"].value = e.target.value;
            }
        });
        console.log(this.input)
        return [this.input];
    }

    update(type: string, value: any) {
        this.input?.setAttribute('value', value);
        (this.input as unknown as HTMLInputElement).value = value;
    }
}