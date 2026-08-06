import type { ComponentASTNode, ElementASTNode } from "../services/types/types";
import { ComponentController } from "../services/controllers/component";
import type { DOMNodeLike } from "../services/elements";

export abstract class BaseComponent<T2 extends ComponentASTNode = ElementASTNode> {

    constructor(protected controller: ComponentController<T2>) { };

    initialize(): void {
        this.initializeDataController();
        this.initializeComponentRegistry();
    }

    initializeDataController(): void {
        const parentData = this.controller.parent.dataController;
        this.controller.dataController = this.controller.node.attributes?.$
            ? parentData.fork(this.controller.node.attributes.$)
            : parentData;
    }

    initializeComponentRegistry(): void {
        this.controller.componentDictionary = this.controller.parent.componentDictionary;
    }

    connect(): DOMNodeLike[] { return [this.controller.application.createComment('')] };

    disconnect(): void { }


    update(type: string, value: any) { };
}