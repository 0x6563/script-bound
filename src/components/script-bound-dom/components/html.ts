import type { DOMNodeLikeList } from "../services/elements";
import type { ElementASTNode } from "../services/types/types";
import { BaseComponent } from "./base";

export class HTMLElementComponent extends BaseComponent<ElementASTNode> {
    connect(): DOMNodeLikeList {
        const container = this.controller.application.createNode(this.controller.node.tag, this.controller.htmlAttributes());
        const refNode = this.controller.application.createComment('');
        container.appendChild(refNode);
        this.controller.createChildren({ refNode })
        return [container];
    }
}