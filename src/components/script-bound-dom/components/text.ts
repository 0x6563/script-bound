import type { DOMNodeLike, TextNodeLike } from "../services/elements";
import type { TextASTNode } from "../services/types/types";
import { ComponentController, type ComponentControllerConstructor } from "../services/controllers/component";

export class HTMLTextComponent {
    static Attributes = {
        class: '',
        repeat: false
    }

    node: TextNodeLike;

    constructor(protected controller: ComponentController<TextASTNode>) {
        this.node = this.controller.application.createText('');
    }

    connect(subcomponents: ComponentController[]): DOMNodeLike[] {
        this.node.textContent = this.controller.node.text;
        return [this.node]
    }

    disconnect(): void { };
}