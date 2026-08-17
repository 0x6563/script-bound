import type { ComponentASTNode, ElementASTNode } from "../services/types/types";
import { ComponentController } from "../services/controllers/component";
import type { DOMNodeLikeList } from "../services/elements";

export abstract class BaseComponent<T2 extends ComponentASTNode = ElementASTNode> {

    constructor(protected controller: ComponentController<T2>) { };

    initialize(): void {
        this.initializeDataController();
        this.initializeComponentRegistry();
    }

    initializeDataController(): void {
        const parentData = this.controller.parent.dataController;
        if (this.controller.node.attributes?.$) {
            this.controller.dataController = parentData.fork(this.controller.node.attributes.$);
        } else {
            this.controller.dataController = parentData;
        }
    }

    initializeComponentRegistry(): void {
        this.controller.componentDictionary = this.controller.parent.componentDictionary;
    }

    connect(): DOMNodeLikeList { return [this.controller.application.createComment('')] };

    afterConnect(): void { }

    disconnect(): void { }

    update(name: string, old: any, value: any) { };
}