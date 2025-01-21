import { ComponentController, type ComponentControllerConstructor } from "../services/controllers/component";
import type { DOMNodeLike } from "../services/elements";
import type { ComponentSettings, ListComponentASTNode } from "../services/types/types";

export abstract class ListComponent<T extends ComponentSettings = {}> {
    static Type = 'list';

    constructor(protected controller: ComponentController<ListComponentASTNode, T>) { };

    abstract connect(subcomponents: ComponentController[]): DOMNodeLike[];

    disconnect(): void { };

    static Controller(config: ComponentControllerConstructor<ListComponentASTNode>): ComponentController<ListComponentASTNode> { return new ComponentController(config) }

}