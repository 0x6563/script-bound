import type { ComponentController } from "../controllers/component";
import type { DOMNodeLike } from "../elements";
import type { ComponentSettings } from "./types";

export abstract class ContainerComponent<T extends ComponentSettings = {}> {
    static type = 'container';

    constructor(protected component: ComponentController<T>) { };

    abstract connect(subcomponents: ComponentController[]): DOMNodeLike[];

    disconnect(): void { };
}