import type { ElementASTNode, AttributeValue } from "../../services/types/types.ts";
import { BaseComponent } from "../base.ts";

export class ForComponent extends BaseComponent<ElementASTNode> {
    cache: any = undefined;

    initialize(): void {
        if (this.controller.node.expression) {
            this.controller.dataController = this.controller.parent.dataController.fork({ type: 'script', value: this.controller.node.expression });
        }
    }

    afterConnect(): void {
        this.render();
    }

    update(name: string, old: any, value: any) {
        this.render();
    }

    private render() {
        const items = this.controller.dataController.value;
        if (this.cache == items) {
            return;
        }

        this.controller.disconnectChildren();
        this.cache = items;

        if (Array.isArray(items)) {
            for (let i = 0; i < items.length; i++) {
                this.controller.createChildren({ scope: this.itemScope(i.toString()) });
            }
        } else if (items && typeof items == 'object') {
            for (const key in items) {
                this.controller.createChildren({ scope: this.itemScope(key) });
            }
        }
    }

    private itemScope(key: string): AttributeValue {
        return { type: 'script', value: { expression: { type: 'reference', path: [{ type: 'word', value: '$' }, { type: 'word', value: key } as any] } } };
    }
}
