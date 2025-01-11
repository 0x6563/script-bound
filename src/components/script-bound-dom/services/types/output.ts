import type { ComponentController } from "../controllers/component";
import type { DOMNodeLike } from "../elements";
import type { ComponentSettings } from "./types";

export abstract class OutputComponent<T extends ComponentSettings = {}> {
    static type = 'output';

    constructor(protected component: ComponentController<T>) { };

    abstract connect(subcomponents?: []): DOMNodeLike[];

    disconnect(): void { };
}