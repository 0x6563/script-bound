import type { ComponentASTNode, ComponentsDictionary, ScriptBoundConfig, ValueType } from "../types/types";
import { ObjectMutationObserver } from "object-mutation-observer";
// import { ObjectMutationObserver, type ChangeCallback } from "object-mutation-observer";
import { Run } from "moderate-code-interpreter";
import { CreateElementNode, CreateTextNode, type ElementNodeLike, type TextNodeLike } from "../elements";
import { ComponentsByName } from "../../components/registry";
import { ExpressionComponent } from "../../components/expression";
import { HTMLTextComponent } from "../../components/text";
import { HTMLElementComponent } from "../../components/html";
type ChangeCallback = (e: any) => void;

export class ApplicationController {
    observer: ObjectMutationObserver;
    data: any;
    rules: { [key: string]: any } = {};
    private listeners: WeakMap<any, { main: ChangeCallback, listeners: Set<ChangeCallback> }> = new WeakMap();
    private components: ComponentsDictionary;
    constructor(
        public config: ScriptBoundConfig,
        data: any
    ) {
        this.components = { ...ComponentsByName, ...config.components };
        console.log(this.components);

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

    createNode(type: string, attributes: { [key: string]: string | undefined | null } = {}, events: { [key: string]: (e: any) => void } = {}): ElementNodeLike {
        const node = CreateElementNode(type);
        for (const key in attributes) {
            node.setAttribute(key, attributes[key] || '');
        }
        for (const key in events) {
            node.addEventListener(key, events[key]);
        }
        return node;
    }

    createText(text: string): TextNodeLike {
        return CreateTextNode(text);
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

    getComponent(node: ComponentASTNode): ValueType<ComponentsDictionary> {
        if (node.type == 'expression')
            return ExpressionComponent as any;
        if (node.type == 'text')
            return HTMLTextComponent as any;
        if (node.type == 'html')
            return HTMLElementComponent as any;
        return this.components[node.component] || this.components.error;
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