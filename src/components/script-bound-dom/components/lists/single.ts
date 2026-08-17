import type { DOMNodeLikeList } from "../../services/elements.ts";
import { BaseComponent } from "../base.ts";

export class Single extends BaseComponent {

    connect(): DOMNodeLikeList {
        const attributes = {
            'data-control': "list",
            'data-component': "single",
        }


        const container = this.controller.application.createNode('div', attributes);
        // const component = subcomponents[subcomponents.length - 1]
        // if (component) {
        //     const doms = component.connect();
        //     for (const dom of doms) {
        //         container.appendChild(dom);
        //     }
        // }
        return [container];
    }

}