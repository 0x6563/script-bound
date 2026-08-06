import type { DOMNodeLike, TextNodeLike } from "../services/elements";
import type { TextASTNode } from "../services/types/types";
import { BaseComponent } from "./base";

export class HTMLTextComponent extends BaseComponent<TextASTNode> {

    connect(): DOMNodeLike[] {
        const node = this.controller.application.createText('');
        node.textContent = this.controller.node.text;
        return [node]
    }
}