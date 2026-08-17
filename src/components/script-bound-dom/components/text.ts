import type { DOMNodeLikeList, TextNodeLike } from "../services/elements";
import type { TextASTNode } from "../services/types/types";
import { BaseComponent } from "./base";

export class HTMLTextComponent extends BaseComponent<TextASTNode> {

    connect(): DOMNodeLikeList {
        const node = this.controller.application.createText('');
        node.textContent = this.controller.node.text;
        return [node]
    }
}