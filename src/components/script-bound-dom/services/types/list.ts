import type { ComponentController } from "../controllers/component";
import type { DOMNodeLike } from "../elements";
import type { ComponentSettings } from "./types";

export abstract class ListComponent<T extends ComponentSettings = {}> {
    static type = 'list';

    constructor(protected component: ComponentController<T>) { };

    abstract connect(subcomponents: ComponentController[]): DOMNodeLike[];

    disconnect(): void { };
}