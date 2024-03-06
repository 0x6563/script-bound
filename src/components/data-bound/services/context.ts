import { JSONPath } from 'jsonpath-plus';
import type { DataBoundApplication } from './application';
// import type { ChangeCallback } from 'object-mutation-observer/dist/types';
export class Context {
    private path: string;
    private scopes: { [key: string]: Context };
    application: DataBoundApplication;
    data: any;

    constructor({ data, scopes, path, application }: ContextConfig) {
        this.path = path || '';
        this.scopes = Object.assign({}, scopes);
        this.scopes.root = this.scopes.root || this;
        this.data = data;
        this.application = application;
    }

    get(path: string) {
        return this.resolve(path).value;
    }

    set(path: string, value: any) {
        const { parent, parentProperty } = this.resolve(path);
        if (parentProperty) {
            parent[parentProperty] = value;
        }
    }

    watch(path: string, callback: any) {
        const r = this.resolve(path);
        this.application.observer.watch(this.data, r.pointer, callback);
    }

    fork(path: string) {
        const r = this.resolve(path);
        const { path: p, value } = r;
        return new Context({ data: value, scopes: { ...this.scopes, parent: this }, path: p, application: this.application });
    }

    resolve(path: string): Result {
        if (path == '@path')
            return {
                parent: this.scopes.parent?.data,
                parentProperty: this.path,
                pointer: this.path,
                path: this.path,
                value: this.path
            };
        if (path == '@empty')
            return {
                parent: null,
                parentProperty: '',
                pointer: '',
                path: '',
                value: {}
            };

        if (/^\$[a-z\d]+\./i.test(path)) {
            return this.scopes[path.slice(1, path.indexOf('.'))].resolve(path.slice(path.indexOf('.') + 1))
        }
        return JSONPath({ path, json: this.data, resultType: 'all', wrap: false });
    }

}

export interface ContextConfig {
    data: any;
    path?: string;
    scopes?: {
        [key: string]: Context;
    }
    application: DataBoundApplication;
}

export interface Result {
    "value": any;
    "path": string;
    "pointer": string;
    "parentProperty"?: string;
    "parent"?: any;
}