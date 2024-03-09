import { JSONPath } from 'jsonpath-plus';
import type { DataBoundApplication } from './application';
export class Context {
    private path?: string;
    private scopes: { [key: string]: Context };
    private $data: any;
    private children: Set<Context> = new Set();
    private meta: { [key: string]: any } = {};
    private $state = { lock: false, hide: false };

    get state() {
        return { ...this.$state }
    }

    application: DataBoundApplication;

    get data() {
        return this.access(this.path).value;
    }
    set data(value: any) {
        const { parent, parentProperty } = this.access(this.path);
        if (parentProperty) {
            parent[parentProperty] = value;
        }
    }

    constructor({ data, scopes, path, application, meta }: ContextConfig) {
        this.path = path;
        this.$data = data;
        this.scopes = { ...scopes, root: scopes?.root || this, parent: scopes?.parent || this }
        this.application = application;
        if (meta) {
            this.meta = meta;
        } else {
            this.meta.path = this.path;
        }
    }

    watch(callback: any): void;
    watch(path: string, callback: any): void;
    watch(path: string | any, callback?: any): void {
        if (typeof path == 'function') {
            this.application.observer.watch(this.$data, path);
            return;
        }

        const { parent, parentProperty } = this.access(path);
        this.application.observer.watch(parent, parentProperty || '', callback);
    }

    onDataChange(callback: (changed: []) => void) {
        this.watch('$', callback);
    }

    onStateChange(callback: (changed: []) => void) {

    }

    fork(path: string) {
        let parent;
        if (this.path || !this.scopes.parent) {
            parent = this;
        } else {
            parent = this.scopes.parent.path ? this.scopes.parent : this.scopes.parent.scopes.parent
        }
        let isMeta = this.isMetaPath(path);
        const context = new Context({
            data: isMeta ? this.$data : this.data,
            scopes: {
                ...this.scopes,
                host: this,
                parent
            },
            path,
            meta: isMeta ? this.meta : undefined,
            application: this.application
        });
        this.children.add(context);
        return context;
    }

    disconnect() {
        this.scopes.host?.children.delete(this);
    }

    private access(path: string = '$'): Result {
        if (this.isScopePath(path))
            return this.scopes[path.slice(1, path.indexOf('.'))].access(path.slice(path.indexOf('.') + 1));

        if (this.isMetaPath(path)) {
            return this.resolve(this.meta, path.slice(1));
        }
        return this.resolve(this.$data, path);
    }

    private isScopePath(path: string = '$') {
        return /^\$[a-z\d]+/i.test(path);
    }

    private isMetaPath(path: string = '$') {
        return (/^@[a-z\d]+/i.test(path));
    }

    private resolve(json: any, path: string, resultType: 'value' | 'path' | 'pointer' | 'parent' | 'parentProperty' | 'all' = 'all') {
        return JSONPath({ path, json, resultType, wrap: false });
    }
}

export interface ContextConfig {
    data: any;
    path?: string;
    scopes?: {
        [key: string]: Context;
    }
    meta?: {
        [key: string]: any
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