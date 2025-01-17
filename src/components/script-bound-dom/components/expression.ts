import { ComponentController, type ComponentControllerConstructor } from "../services/controllers/component";
import type { DOMNodeLike, ElementNodeLike, TextNodeLike } from "../services/elements";
import type { ComponentSettings, ExpressionASTNode } from "../services/types/types";

export class ExpressionComponent<T extends ComponentSettings = {}> {
    static Type: 'expression' = 'expression';

    static Controller<T extends ComponentSettings>(config: ComponentControllerConstructor<T>): ComponentController {
        return new ComponentController(config);
    }

    node: TextNodeLike;
    constructor(protected controller: { config: ExpressionASTNode } & ComponentController<T>) {
        this.node = this.controller.application.createText('');
    };

    connect(subcomponents: ComponentController[]): DOMNodeLike[] {
        this.node.textContent = this.controller.application.test(this.controller.data.proxy(), this.controller.config.expression)
        return [this.node]
    }

    disconnect(): void { };
}