import type { DOMNodeLikeList } from "../../services/elements.ts";
import { BaseComponent } from "../base.ts";

export class Button extends BaseComponent {

    connect(): DOMNodeLikeList {
        const container = this.controller
            .application
            .createNode('button', this.controller.htmlAttributes(), { click: (e) => { this.controller.eventScript('click', null) } });

        const bookmark = this.controller.application.createComment('');
        container.appendChild(bookmark);
        this.controller.createChildren({ refNode: bookmark });
        return [container];
    }
}