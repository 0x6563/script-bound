import { ObjectMutationObserver } from "object-mutation-observer";
import { Run } from "moderate-code-interpreter";
import type { DataBoundConfig } from "./types";

export class DataBoundApplication {
    observer: ObjectMutationObserver;
    data;
    rules: { [key: string]: any } = {};
    constructor(
        public config: DataBoundConfig,
        data: any
    ) {
        for (const key in config.scripts) {
            this.rules[key] = config.scripts[key];
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

    test(data: any, rule?: string | boolean | object) {

        if (typeof rule == 'undefined') {
            return false;
        }
        if (typeof rule == 'boolean') {
            return rule;
        }

        if (typeof rule == 'string') {
            return RunTree(this.rules[rule], data);
        }

        if (typeof rule == 'object') {
            return RunTree(rule, data);
        }
    }

}

function RunTree(tree, scopes) {
    try {
        const parseStart = performance.now();
        const result = (Run(tree, { ...scopes }) as any)?.value
        console.log(result)
        console.log(performance.now() - parseStart)
        return result;
    } catch (error) {
        console.log('------------')
        console.log(tree)
        console.log(scopes)
        console.log(error)
    }
}