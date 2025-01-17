import { ComponentController, type ComponentControllerConstructor } from "../services/controllers/component";
import type { DOMNodeLike, TextNodeLike } from "../services/elements";
import type { ComponentSettings, TextASTNode } from "../services/types/types";

export class HTMLTextComponent<T extends ComponentSettings = {}> {
    static Type: 'text' = 'text';


    static Controller<T extends ComponentSettings>(config: ComponentControllerConstructor<T>): ComponentController {
        return new ComponentController(config);
    }

    node: TextNodeLike;
    constructor(protected controller: { config: TextASTNode } & ComponentController<T>) {
        this.node = this.controller.application.createText('');
    };

    connect(subcomponents: ComponentController[]): DOMNodeLike[] {
        this.node.textContent = this.controller.config.content;
        return [this.node]
    }

    disconnect(): void { };
}