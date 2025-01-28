import type { DOMNodeLike, ElementNodeLike } from "../../services/elements.ts";
import { BaseComponent } from "../base.ts";

export class Button extends BaseComponent {
    static Attributes = {
        group: 'input'
    }
    private element?: ElementNodeLike;

    connect(subcomponents: []): DOMNodeLike[] {
        const container = this.controller.application.createNode('label');
        this.element = this.controller
            .application
            .createNode('button', {}, { click: (e) => { this.controller.eventHandler({ event: 'action', value: null }) } });
        container.appendChild(this.element);
        const text = this.controller.application.createNode('div', { 'data-bound-label': '' });
        container.appendChild(text);
        return [container];
    }
}