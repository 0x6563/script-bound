import { ComponentController, type ComponentControllerConstructor } from "../services/controllers/component";
import type { DOMNodeLike } from "../services/elements";
import type { ComponentSettings, ListComponentASTNode } from "../services/types/types";

export abstract class ListComponent<T extends ComponentSettings = {}> {
    static Type = 'list';

    static Controller<T extends ComponentSettings>(config: ComponentControllerConstructor<T>): ComponentController {
        return new ComponentController(config);
    }

    constructor(protected controller: { config: ListComponentASTNode<T> } & ComponentController<T>) { };

    abstract connect(subcomponents: ComponentController[]): DOMNodeLike[];

    disconnect(): void { };
}