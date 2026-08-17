import type { DOMNodeLikeList } from "../../services/elements.ts";
import { BaseComponent } from "../base.ts";

export class OptionComponent extends BaseComponent {
    connect(): DOMNodeLikeList {
        const option = this.controller.application.createNode('option', this.controller.htmlAttributes());
        const refNode = this.controller.application.createComment('');
        option.appendChild(refNode);
        this.controller.createChildren({ refNode });
        return [option];
    }
}
