import { ObjectMutationObserver } from "object-mutation-observer";
import type { DataBoundConfig } from "./types";

export class DataBoundApplication {
    observer: ObjectMutationObserver;
    data;
    rules: { [key: string]: Function } = {};
    constructor(
        public config: DataBoundConfig,
        data: any
    ) {
        for (const key in config.rules) {
            this.rules[key] = FunctionFactory(config.rules[key]);
        }

        this.observer = new ObjectMutationObserver({
            emit: 'sync',
            greedyProxy: true,
            resolveChangeAncestors: 'early',
            tagFunctions: ['array-mutators']
        });
        this.data = this.observer.watch(data);
    }

    layout(id: string) {
        return this.config.layouts[id];
    }

    test(data: any, rule?: string | boolean) {
        if (typeof rule == 'undefined') {
            return false;
        }

        if (typeof rule == 'boolean') {
            return rule;
        }
        if (typeof rule == 'string') {
            return this.rules[rule](data);
        }
    }

}
const cache: any = {};

function FunctionFactory(s: string) {
    // TODO: Replace with not Moderate Code Interpreter.
    if (!(s in cache)) {
        cache[s] = new Function('$', `return ${s}`);
    }
    return cache[s];
}