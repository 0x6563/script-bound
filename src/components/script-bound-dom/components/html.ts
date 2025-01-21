import { ComponentController, type ComponentControllerConstructor } from "../services/controllers/component";
import type { DOMNodeLike } from "../services/elements";
import type { ComponentSettings, HTMLElementASTNode } from "../services/types/types";

export class HTMLElementComponent<T extends ComponentSettings = {}> {
    static Type: 'html' = 'html';

    constructor(protected controller: ComponentController<HTMLElementASTNode, T>) { };

    connect(subcomponents: ComponentController[]): DOMNodeLike[] {
        const attributes = {};
        for (const key in this.controller.additional) {
            attributes[key] = this.controller.additional[key].value;
        }
        const container = this.controller.application.createNode(this.controller.node.tag, attributes);
        for (const component of subcomponents) {
            const doms = component.connect();
            for (const dom of doms) {
                container.appendChild(dom);
            }
        }
        return [container];
    }
    disconnect(): void { };


    static Controller(config: ComponentControllerConstructor<HTMLElementASTNode>): ComponentController<HTMLElementASTNode> { return new ComponentController(config) }
}