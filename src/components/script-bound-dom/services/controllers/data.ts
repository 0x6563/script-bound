import type { ApplicationController } from './application';
import type { Bindable } from '../types/types';
import { GetValueType, Value } from 'moderate-code-interpreter';
import { JSONPath } from 'jsonpath-plus';
import { Events } from '../events';

export class DataController {
    application: ApplicationController;
    parent?: DataController;
    meta: { [key: string]: any } = {};
    scopes: { [key: string]: DataController };
    changes = new Events<undefined>();

    private children: Set<DataController> = new Set();
    private dataListener;

    private $bind?: string;

    get bind() {
        return this.$bind;
    }

    private $data: any;

    get value() {
        return this.resolvePath(this.$bind).value;
    }

    set value(value: any) {
        const { parent, parentProperty } = this.resolvePath(this.$bind);
        if (parentProperty) {
            parent[parentProperty] = value;
        }
    }

    constructor({ application, meta, data, scopes, bind }: DataContextConfig) {
        this.$bind = bind;
        this.$data = data;
        this.scopes = { ...scopes, root: scopes?.root || this, relative: scopes?.relative || this }
        this.parent = this.scopes.parent;
        this.application = application;
        if (meta) {
            this.meta = meta;
        } else {
            this.meta.path = this.$bind;
        }
        this.dataListener = () => this.changes.emit(undefined);
        this.application.watch(this.$data, this.dataListener)
    }

    disconnect() {
        this.application.unwatch(this.$data, this.dataListener);
        this.scopes.parent?.children.delete(this);
    }

    fork(config: Bindable) {
        const view = PathResolver.IsMetaPath(config.bind) ? { data: this.$data, meta: this.meta } : { data: this.value };
        const context = new DataController({
            ...view,
            scopes: {
                ...this.scopes,
                parent: this
            },
            bind: config.bind,
            application: this.application
        });
        this.children.add(context);
        return context;
    }

    proxy() {
        const r: any = {};
        for (const key in this.scopes) {
            r['$' + key] = ContextProxy(this.scopes[key]);
        }
        r.$ = ValueProxy(this.value);
        return r;
    }

    private resolvePath(path: string = '$'): Result {
        if (PathResolver.IsScopePath(path))
            return this.scopes[path.slice(1, path.indexOf('.'))].resolvePath(path.slice(path.indexOf('.') + 1));

        if (PathResolver.IsMetaPath(path)) {
            return PathResolver.Resolve(this.meta, path.slice(1));
        }
        return PathResolver.Resolve(this.$data, path);
    }
}

function ContextProxy(source: DataController) {
    const p = Value('object', new Proxy(source, {
        get(target, key) {
            if (typeof key == 'symbol')
                return target[key];
            if (PathResolver.IsScopePath(key as string)) {
                return ContextProxy(source.scopes[(key as string).slice(1)])
            } else if (PathResolver.IsMetaPath(key as string)) {
                return ValueProxy(target.meta[(key as string).slice(1)])
            } else if (key == '$') {
                return ValueProxy(target.value);
            } else {
                return ValueProxy(target.value[key])
            }
        },
        ownKeys(target) {
            return Object.keys(target.value);
        },
        getOwnPropertyDescriptor(_target, key) {
            return { enumerable: true, configurable: true, value: p[key] };
        }
    }));
    return p;
}

function ValueProxy(source) {
    const srctype = GetValueType(source);
    if (srctype == 'object' || srctype == 'array')
        return Value(srctype, ObjectProxy(source));
    return Value(srctype as any, source);
}

function ObjectProxy(source: object | any[]) {
    const p = new Proxy(source, {
        get(target, key) {
            if (typeof key == 'symbol')
                return target[key];
            return ValueProxy(target[key])
        },
        ownKeys(target) {
            return Object.keys(target);
        },
        getOwnPropertyDescriptor(_, key) {
            return { enumerable: true, configurable: true, value: p[key] };
        }
    });
    return p;

}

class PathResolver {

    static IsScopePath(path: string = '$') {
        return /^\$[a-z\d]+/i.test(path);
    }

    static IsMetaPath(path: string = '$') {
        return (/^@[a-z\d]+/i.test(path));
    }

    static Resolve(json: any, path: string, resultType: 'value' | 'path' | 'pointer' | 'parent' | 'parentProperty' | 'all' = 'all') {
        return JSONPath({ path, json, resultType, wrap: false });
    }
}

export interface DataContextConfig extends Bindable {
    application: ApplicationController;
    data: any;
    scopes?: {
        [key: string]: DataController;
    }
    meta?: {
        [key: string]: any
    }
}

export interface Result {
    "value": any;
    "path": string;
    "pointer": string;
    "parentProperty"?: string;
    "parent"?: any;
}