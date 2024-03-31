import { ObjectMutationObserver } from "object-mutation-observer";
import { Parse, Run } from "moderate-code-interpreter";
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

function FunctionFactory(s: string) {
    try {
        const tree = Parse(s);
        return (scopes) => {
            try {
                const parseStart = performance.now();
                console.log(scopes)
                const result = (Run(tree, { ...scopes }) as any)?.value
                console.log(result)
                console.log(performance.now() - parseStart)
                return result;
            } catch (error) {
                console.log(error)
            }
        };
    } catch (error) {
        console.log(error);
        return () => false;
    }
}

function JSFunctionFactory(s: string) {
    return new Function('$', `return ${s}`);
}