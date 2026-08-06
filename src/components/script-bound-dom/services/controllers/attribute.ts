import type { DataController } from "./data";
import type { AttributeValue, BindExpression } from "../types/types";
import type { ReferenceExpression } from 'moderate-code-interpreter/dist/types';

export class AttributeController<T = any> {
    private data: DataController;
    private attribute: AttributeValue;
    private $value: T = undefined as any;
    get value(): T { return this.$value; }
    set value(value: T) {
        if (this.attribute.type == 'script' && this.attribute.binding) {
            this.data.assign((this.attribute.value as BindExpression).expression as ReferenceExpression, value);
        }
    }
    get binding(): boolean { return this.attribute.type == 'script' && !!this.attribute.binding; }


    constructor({ attribute, data }: AttributeControllerConstructor) {
        this.attribute = attribute ? attribute : { type: 'json', value: undefined as any };

        this.data = data;
        if (this.attribute.type == 'json')
            this.$value = this.attribute.value as T;
        else
            this.recheck();
    }

    recheck() {
        if (this.attribute.type != 'script')
            return;
        this.$value = this.data.runScript(this.attribute.value);
    }

}

export interface AttributeControllerConstructor {
    data: DataController;
    attribute?: AttributeValue;
} 