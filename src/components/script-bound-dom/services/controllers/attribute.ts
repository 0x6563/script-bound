import type { DataController } from "./data";
import type { ComponentController } from "./component";
import type { AttributeValue, BindExpression } from "../types/types";
import type { ReferenceExpression } from 'moderate-code-interpreter/dist/types';

export class AttributeController<T = any> {
    private data: DataController;
    private attribute: AttributeValue;
    private $value: T = undefined as any;
    private controller?: ComponentController;
    private name?: string;
    private dataListener?: () => void;

    get value(): T { return this.$value; }
    set value(value: T) {
        if (this.attribute.type == 'script' && this.attribute.binding) {
            this.data.assign((this.attribute.value as BindExpression).expression as ReferenceExpression, value);
        }
    }
    get binding(): boolean { return this.attribute.type == 'script' && !!this.attribute.binding; }


    constructor({ attribute, data, controller, name }: AttributeControllerConstructor) {
        this.attribute = attribute ? attribute : { type: 'json', value: undefined as any };

        this.data = data;
        this.controller = controller;
        this.name = name;
        if (this.attribute.type == 'json') {
            this.$value = this.attribute.value as T;
        } else {
            this.$value = this.data.runScript(this.attribute.value);
            if (this.binding) {
                this.dataListener = () => this.recheckValue();
                this.data.scopes.root.changes.addEventListener(this.dataListener);
            }
        }
    }

    recheckValue() {
        if (this.attribute.type != 'script')
            return;
        const old = this.$value;
        this.$value = this.data.runScript(this.attribute.value);
        if (old !== this.$value && this.controller && this.name !== undefined) {
            this.controller.update(this.name, old, this.$value);
        }
    }

    disconnect() {
        if (this.dataListener) {
            this.data.scopes.root.changes.removeEventListener(this.dataListener);
        }
    }

}

export interface AttributeControllerConstructor {
    data: DataController;
    attribute?: AttributeValue;
    controller?: ComponentController;
    name?: string;
}