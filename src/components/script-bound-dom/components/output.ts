import { ComponentController, type ComponentControllerConstructor } from "../services/controllers/component";
import type { DOMNodeLike } from "../services/elements";
import type { ComponentSettings } from "../services/types/types";

export abstract class OutputComponent<T extends ComponentSettings = {}> {
    static Type: 'output' = 'output';

    static Controller<T extends ComponentSettings>(config: ComponentControllerConstructor<T>): ComponentController {
        return new ComponentController(config);
    }

    constructor(protected controller: ComponentController<T>) { };

    abstract connect(subcomponents?: []): DOMNodeLike[];

    disconnect(): void { };
}