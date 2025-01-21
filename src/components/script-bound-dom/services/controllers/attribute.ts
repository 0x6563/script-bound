import type { DataController } from "./data";
import type { AttributeValue, JSONLike } from "../types/types";

export class AttributeController<T = any> {
    private data: DataController;
    private attribute: AttributeValue;
    private $value: T = undefined as any;
    get value(): T { return this.$value; }


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