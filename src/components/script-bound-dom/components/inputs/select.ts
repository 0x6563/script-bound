import type { DOMNodeLike, ElementNodeLike } from "../../services/elements.ts";
import { OptionComponent } from "./option.ts";
import { BaseComponent } from "../base.ts";

export class SelectComponent extends BaseComponent {
    private select?: ElementNodeLike;

    initializeComponentRegistry(): void {
        this.controller.componentDictionary = { ...this.controller.parent.componentDictionary, option: OptionComponent as any };
    }

    connect(): DOMNodeLike[] {
        this.select = this.controller
            .application
            .createNode('select', this.controller.htmlAttributes(), { change: (e) => { this.controller.attributes["value"].value = e.target.value; } });

        const refNode = this.controller.application.createComment('');
        this.select.appendChild(refNode);
        this.controller.createChildren({ refNode });
        return [this.select];
    }

    update(type: string, value: any) {
        (this.select as unknown as HTMLSelectElement).value = value;
    }
}
