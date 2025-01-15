import type { ScriptBoundConfig } from "../types/types";
import { ObjectMutationObserver } from "object-mutation-observer";
// import { ObjectMutationObserver, type ChangeCallback } from "object-mutation-observer";
import { Run } from "moderate-code-interpreter";
import { CreateElementNode, type DOMNodeLike } from "../elements";
type ChangeCallback = (e: any) => void;
export class ApplicationController {
    observer: ObjectMutationObserver;
    data: any;
    private listeners: WeakMap<any, { main: ChangeCallback, listeners: Set<ChangeCallback> }> = new WeakMap();
    rules: { [key: string]: any } = {};
    constructor(
        public config: ScriptBoundConfig,
        data: any
    ) {
        // for (const key in config.scripts) {
        //     this.rules[key] = config.scripts[key];
        // }

        this.observer = new ObjectMutationObserver({
            emit: 'sync',
            greedyProxy: true,
            resolveChangeAncestors: 'early',
            tagFunctions: ['array-mutators']
        });
        this.data = this.observer.watch(data);
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

    createNode(type: string, attributes: { [key: string]: string | undefined | null } = {}, events: { [key: string]: (e: any) => void } = {}): DOMNodeLike {
        const node = CreateElementNode(type);
        for (const key in attributes) {
            node.setAttribute(key, attributes[key] || '');
        }
        for (const key in events) {
            node.addEventListener(key, events[key]);
        }
        return node;
    }


    watch(data: any, callback: ChangeCallback) {
        if (!this.listeners.has(data)) {
            const callbacker: { main: ChangeCallback, listeners: Set<ChangeCallback> } = { main: undefined as any, listeners: new Set<ChangeCallback>() };
            callbacker.main = (e) => callbacker.listeners.forEach(c => c(e));
            this.listeners.set(data, callbacker);
            this.observer.watch(data, callbacker.main);
        }
        this.listeners.get(data)?.listeners.add(callback);
    }
    unwatch(data: any, callback: ChangeCallback) {
        const callbacker = this.listeners.get(data);
        callbacker?.listeners.delete(callback);
        if (callbacker?.listeners.size == 0) {
            this.listeners.delete(data);
            this.observer.unwatch(data, callbacker.main);
        }

    }
}

function RunTree(tree, scopes) {
    try {
        const parseStart = performance.now();
        const result = (Run(tree, { ...scopes }) as any)?.value
        // console.log(result)
        // console.log(performance.now() - parseStart)
        return result;
    } catch (error) {
        console.log('------------')
        console.log(tree)
        console.log(scopes)
        console.log(error)
    }
}