import { ComponentController, type ComponentControllerConstructor } from "../services/controllers/component";
import type { DOMNodeLike } from "../services/elements";
import type { ComponentSettings, OutputComponentASTNode } from "../services/types/types";

export abstract class OutputComponent<T extends ComponentSettings = {}> {
    static Type: 'output' = 'output';

    constructor(protected controller: ComponentController<OutputComponentASTNode, T>) { };

    abstract connect(subcomponents?: []): DOMNodeLike[];

    disconnect(): void { };

    static Controller(config: ComponentControllerConstructor<OutputComponentASTNode>): ComponentController<OutputComponentASTNode> { return new ComponentController(config) }
}