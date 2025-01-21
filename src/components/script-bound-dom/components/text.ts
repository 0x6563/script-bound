import { ComponentController, type ComponentControllerConstructor } from "../services/controllers/component";
import type { DOMNodeLike, TextNodeLike } from "../services/elements";
import type { ComponentSettings, TextASTNode } from "../services/types/types";

export class HTMLTextComponent {
    static Type: 'text' = 'text';

    node: TextNodeLike;

    constructor(protected controller: ComponentController<TextASTNode>) {
        this.node = this.controller.application.createText('');
    }

    connect(subcomponents: ComponentController[]): DOMNodeLike[] {
        this.node.textContent = this.controller.node.content;
        return [this.node]
    }

    disconnect(): void { };

    static Controller(config: ComponentControllerConstructor<TextASTNode>): ComponentController<TextASTNode> { return new ComponentController(config) }
}