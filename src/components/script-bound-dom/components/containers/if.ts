import type { ElementASTNode } from "../../services/types/types.ts";
import type { DataController } from "../../services/controllers/data.ts";
import { BaseComponent } from "../base.ts";

export class IfComponent extends BaseComponent<ElementASTNode> {
    enabled = false;
    private condition?: DataController;
    private rootListener?: () => void;

    initialize(): void {
        super.initialize();
        if (this.controller.node.expression) {
            this.condition = this.controller.dataController.fork({ type: 'script', value: this.controller.node.expression });
            this.rootListener = () => this.render();
            this.condition.scopes.root.changes.addEventListener(this.rootListener);
        }
    }

    afterConnect(): void {
        this.render();
    }

    update(name: string, old: any, value: any) {
        this.render();
    }

    private render() {
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
        if (this.rootListener) {
            this.condition?.scopes.root.changes.removeEventListener(this.rootListener);
        }
        this.condition?.disconnect();
    }
}