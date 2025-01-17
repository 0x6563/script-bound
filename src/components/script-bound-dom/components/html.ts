import { ComponentController, type ComponentControllerConstructor } from "../services/controllers/component";
import type { DOMNodeLike } from "../services/elements";
import type { ComponentSettings, HTMLElementASTNode } from "../services/types/types";

export class HTMLElementComponent<T extends ComponentSettings = {}> {
    static Type: 'html' = 'html';

    static Controller<T extends ComponentSettings>(config: ComponentControllerConstructor<T>): ComponentController<T> {
        return new ComponentController(config);
    }

    constructor(protected controller: { config: HTMLElementASTNode<T> } & ComponentController<T>) { };


    connect(subcomponents: ComponentController[]): DOMNodeLike[] {
        const container = this.controller.application.createNode(this.controller.config.tag, { ...this.controller.config.custom as any });
        for (const component of subcomponents) {
            const doms = component.connect();
            for (const dom of doms) {
                container.appendChild(dom);
            }
        }
        return [container];
    }
    disconnect(): void { };
}