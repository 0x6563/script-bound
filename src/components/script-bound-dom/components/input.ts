import { ComponentController, type ComponentControllerConstructor } from "../services/controllers/component";
import type { DOMNodeLike } from "../services/elements";
import type { ComponentSettings, InputComponentASTNode } from "../services/types/types";

export abstract class InputComponent<T extends ComponentSettings = {}> {
    static Type: 'input' = 'input';

    constructor(protected controller: { config: InputComponentASTNode<T> } & ComponentController<T>) { };

    abstract connect(subcomponents?: []): DOMNodeLike[];

    disconnect(): void { };

    abstract update(value: any): void;

    abstract listen(event: string, callback: (event?: any) => void): void;

    abstract unlisten(event: string, callback: (event?: any) => void): void;

    static Controller<T extends ComponentSettings>(config: ComponentControllerConstructor<T>): ComponentController<T> {
        return new ComponentController(config);
    }
}