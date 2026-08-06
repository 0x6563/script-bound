import type { ElementASTNode } from "../../services/types/types.ts";
import type { DataController } from "../../services/controllers/data.ts";
import { BaseComponent } from "../base.ts";

export class IfComponent extends BaseComponent<ElementASTNode> {
    enabled = false;
    private condition?: DataController;

    initialize(): void {
        super.initialize();
        if (this.controller.node.expression) {
            this.condition = this.controller.dataController.fork({ type: 'script', value: this.controller.node.expression });
            this.condition.changes.addEventListener(() => this.update('', ''));
        }
    }

    update(type: string, value: any) {
        const enable = !!this.condition?.value;
        if (enable != this.enabled) {
            this.enabled = enable;
            if (this.enabled) {
                this.controller.createChildren();
            } else {
                this.controller.disconnectChildren();
            }
        }
    }

    disconnect(): void {
        this.condition?.disconnect();
    }
}