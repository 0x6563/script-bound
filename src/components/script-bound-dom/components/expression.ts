import type { ComponentSettings, ExpressionASTNode } from "../services/types/types";
import type { DOMNodeLike, TextNodeLike } from "../services/elements";
import { ComponentController, type ComponentControllerConstructor } from "../services/controllers/component";

export class ExpressionComponent<T extends ComponentSettings = {}> {
    static Attributes = {
        group: '',
        repeat: false
    }

    node: TextNodeLike;

    constructor(protected controller: ComponentController<ExpressionASTNode, T>) {
        this.node = this.controller.application.createText('');
    };

    connect(subcomponents: ComponentController[]): DOMNodeLike[] {
        this.node.textContent = this.controller.application.runScript(this.controller.data.proxy(), this.controller.node.expression)
        return [this.node]
    }
    disconnect(): void { };
    update() {
        this.node.textContent = this.controller.application.runScript(this.controller.data.proxy(), this.controller.node.expression)
    }
}