import { ComponentController, type ComponentControllerConstructor } from "../services/controllers/component";
import type { DOMNodeLike, TextNodeLike } from "../services/elements";
import type { ComponentSettings, ExpressionASTNode } from "../services/types/types";

export class ExpressionComponent<T extends ComponentSettings = {}> {
    static Type: 'expression' = 'expression';

    static Controller(config: ComponentControllerConstructor<ExpressionASTNode>): ComponentController {
        return new ComponentController(config);
    }

    node: TextNodeLike;
    constructor(protected controller: { config: ExpressionASTNode } & ComponentController<ExpressionASTNode>) {
        this.node = this.controller.application.createText('');
    };

    connect(subcomponents: ComponentController[]): DOMNodeLike[] {
        this.node.textContent = this.controller.application.runScript(this.controller.data.proxy(), this.controller.node.expression)
        return [this.node]
    }

    disconnect(): void { };
}