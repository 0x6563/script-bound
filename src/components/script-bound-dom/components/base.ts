import type { DOMNodeLike } from "../services/elements";
import type { ComponentSettings, BaseComponentASTNode } from "../services/types/types";
import { ComponentController } from "../services/controllers/component";

export abstract class BaseComponent<T extends ComponentSettings = {}> {
    static Attributes: {
        group?: string,
        repeat?: boolean,
        default?: boolean,
    } = {
            group: '',
            repeat: false,
            default: false,
        }

    constructor(protected controller: ComponentController<BaseComponentASTNode, T>) { };

    abstract connect(subcomponents: []): DOMNodeLike[];

    disconnect(): void { };

    update(type: string, value: any) { };
}