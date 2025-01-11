import type { ApplicationController } from "./application";
import { Events } from "../events";
import type { DataController } from "./data";

export class AttributeController {
    private parent?: AttributeController;
    private application: ApplicationController;
    private data: DataController;
    private condition: string | boolean;
    private children: AttributeController[] = [];
    private attribute: string;
    private lockingCondition: boolean = false;
    private locked: boolean = false;

    private $state: boolean = false;
    get value() {
        return this.$state;
    }

    changes = new Events<AttributeControllerChangeEvent>();

    constructor({ application, data, parent, condition, attribute }: AttributeControllerConstructor) {
        this.application = application;
        this.data = data;
        this.parent = parent;
        this.condition = condition;
        this.attribute = attribute;
    }

    checkState(unlock?: boolean) {
        if (this.locked && !unlock)
            return;

        this.locked = false;
        const state = this.application.test(this.data.proxy(), this.condition);
        console.log(state);
        this.applyState(state);
    }

    applyState(state: boolean, lock?: boolean) {
        console.log(state);
        this.locked = !!lock;
        if (state != this.value) {
            this.$state = state;
            if (state == this.lockingCondition) {
                for (const child of this.children) {
                    child.applyState(state, true);
                }
            } else {
                for (const child of this.children) {
                    child.checkState(true);
                }
            }
            this.changes.emit({ change: this.attribute, value: state });
        }
    }

    fork(overrides: Partial<AttributeControllerConstructor> & { condition: string | boolean }) {
        const child = new AttributeController({
            application: this.application,
            data: this.data,
            attribute: this.attribute,
            parent: this,
            lockingCondition: this.lockingCondition,
            ...overrides
        })
        this.children.push(child);
        if (this.$state == this.lockingCondition) {
            child.applyState(this.$state);
        } else {
            child.checkState();
        }
        return child;
    }

    disconnect() {
        for (const child of this.children) {
            child.disconnect();
        }
    }
}

export interface AttributeControllerConstructor {
    application: ApplicationController;
    data: DataController;
    parent?: AttributeController;
    attribute: string;
    condition: string | boolean;
    lockingCondition: boolean;
}

export interface AttributeControllerChangeEvent {
    change: string;
    value: boolean;
}