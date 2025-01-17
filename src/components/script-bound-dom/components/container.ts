import { ComponentController, type ComponentControllerConstructor } from "../services/controllers/component";
import type { DOMNodeLike } from "../services/elements";
import type { ComponentSettings } from "../services/types/types";

export abstract class ContainerComponent<T extends ComponentSettings = {}> {
    static Type: 'container' = 'container';

    static Controller<T extends ComponentSettings>(config: ComponentControllerConstructor<T>): ComponentController {
        return new ComponentController(config);
    }

    constructor(protected controller: ComponentController<T>) { };

    abstract connect(subcomponents: ComponentController[]): DOMNodeLike[];

    disconnect(): void { };
}