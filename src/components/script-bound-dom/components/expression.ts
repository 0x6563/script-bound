import type { ExpressionASTNode } from "../services/types/types";
import type { DOMNodeLike, TextNodeLike } from "../services/elements";
import { BaseComponent } from "./base";

export class ExpressionComponent extends BaseComponent<ExpressionASTNode> {
    node?: TextNodeLike;


    connect(): DOMNodeLike[] {
        this.node = this.controller.application.createText('');
        this.node.textContent = this.controller.dataController.runScript(this.controller.node.expression);
        return [this.node]
    }

    update() {
        this.node!.textContent = this.controller.dataController.runScript(this.controller.node.expression);
    }
}