import type { ComponentController } from "../controllers/component";
import type { DOMNodeLike } from "../elements";
import type { ComponentSettings } from "./types";

export abstract class InputComponent<T extends ComponentSettings = {}> {
    static type = 'input';

    constructor(protected component: ComponentController<T>) { };

    abstract connect(subcomponents?: []): DOMNodeLike[];

    disconnect(): void { };

    abstract update(value: any): void;

    abstract listen(event: string, callback: (event?: any) => void): void;

    abstract unlisten(event: string, callback: (event?: any) => void): void;
}