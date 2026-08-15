import type { ApplicationController } from './application';
import type { AttributeValue, BindExpression, Runnable } from '../types/types';
import { GetValueType, Unmarshal, Value } from 'moderate-code-interpreter';
import { Events } from '../events';
import type { ReferenceExpression } from 'moderate-code-interpreter/dist/types';

const Unwrap = Symbol('unwrap');

export class DataController {
    application: ApplicationController;
    parent?: DataController;
    meta: { [key: string]: any } = {};
    local: { [key: string]: any } = {}
    scopes: { [key: string]: DataController };
    changes = new Events<undefined>();

    private children: Set<DataController> = new Set();
    private dataListener;

    private $data: any;
    private $bind?: BindExpression;

    get value() {
        if (this.$bind) {
            return this.parent!.runScript(this.$bind);
        }
        return this.$data;
    }

    set value(value: any) {
        if (this.$bind) {
            this.parent!.assign(this.$bind.expression as ReferenceExpression, value);
        } else {
            this.$data = value;
        }
    }

    assign(reference: ReferenceExpression, value: any) {
        const o = this.proxy({ '#value': value });
        this.application.runScript(o, {
            statements: [{
                type: 'assignment',
                reference,
                value: { type: 'reference', path: [{ type: 'word', value: '#value' }] }
            }]
        });
    }

    constructor({ application, meta, data, scopes, bind }: DataControllerConstructor) {
        this.$data = data;
        this.$bind = bind;
        this.scopes = { ...scopes }
        this.scopes.root = scopes?.root || this;
        this.scopes.relative = scopes?.relative || this;
        this.parent = this.scopes.parent;
        this.application = application;
        if (meta) {
            this.meta = meta;
        }
        this.dataListener = () => this.changes.emit(undefined);
        this.application.watch(this.$data, this.dataListener)
    }

    disconnect() {
        this.application.unwatch(this.$data, this.dataListener);
        this.scopes.parent?.children.delete(this);
    }

    fork(bind: AttributeValue) {
        const context = new DataController({
            data: bind.type == 'script' ? this.value : bind.value,
            scopes: {
                ...this.scopes,
                parent: this
            },
            bind: bind.type == 'script' ? bind.value as BindExpression : undefined,
            application: this.application
        });
        this.children.add(context);
        return context;
    }

    proxy(extra?: { [key: string]: any }) {
        const r: any = {};
        if (extra) {
            for (const key in extra) {
                r[key] = ValueProxy(extra[key]);
            }
        }
        for (const key in this.scopes) {
            r['$' + key] = ContextProxy(this.scopes[key]);
        }
        r.$ = ValueProxy(this.value);
        return r;
    }

    runScript(script: Runnable, extra?: { [key: string]: any }) {
        const o = this.proxy(extra);
        const result = this.application.runScript(o, script);
        const kind = GetValueType(result);
        return (kind == 'object' || kind == 'array') ? (result as any)?.[Unwrap] : result;
    }
}

function ContextProxy(source: DataController) {
    const p = Value('object', new Proxy(source, {
        get(target, key) {
            if (key === Unwrap)
                return target;

            if (typeof key == 'symbol')
                return (target as any)[key];

            if (PathResolver.IsScopePath(key as string))
                return ContextProxy(source.scopes[(key as string).slice(1)])

            if (PathResolver.IsMetaPath(key as string))
                return ValueProxy(target.meta[(key as string).slice(1)])

            if (PathResolver.IsLocalPath(key as string))
                return ValueProxy(target.local[(key as string).slice(1)])

            if (key == '$')
                return ValueProxy(target.value);

            return ValueProxy(target.value[key])

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
            if (key === Unwrap)
                return target;
            if (typeof key == 'symbol')
                return (target as any)[key];
            return ValueProxy(target[key])
        },
        set(target, key, value) {
            return !!(target[key] = Unmarshal(value));
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

    static IsLocalPath(path: string = '$') {
        return /^#[a-z\d]+/i.test(path);
    }

    static IsMetaPath(path: string = '$') {
        return (/^@[a-z\d]+/i.test(path));
    }
}


export interface DataControllerConstructor {
    application: ApplicationController;
    data: any;
    bind?: BindExpression;
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