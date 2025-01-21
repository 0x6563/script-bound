import { ComponentController, type ComponentControllerConstructor } from "../services/controllers/component";
import type { DOMNodeLike } from "../services/elements";
import type { ComponentSettings, ContainerComponentASTNode } from "../services/types/types";

export abstract class ContainerComponent<T extends ComponentSettings = {}> {
    static Type: 'container' = 'container';

    constructor(protected controller: ComponentController<ContainerComponentASTNode, T>) { };

    abstract connect(subcomponents: ComponentController[]): DOMNodeLike[];

    disconnect(): void { };

    static Controller(config: ComponentControllerConstructor<ContainerComponentASTNode>): ComponentController<ContainerComponentASTNode> { return new ComponentController(config) }
}