import type { ComponentAttributesDictionary, ComponentASTNode, ComponentSettings, ListComponentASTNode, ComponentsDictionary, ValueType, Lifecycles } from '../types/types';
import type { ApplicationController } from './application';
import type { BaseComponent } from '../../components/base';
import type { DOMNodeLike, ElementNodeLike } from '../elements';
import { DataController } from './data';
import { AttributeController } from './attribute';

export class ComponentController<T extends ComponentASTNode = ComponentASTNode, T2 extends ComponentSettings = {}> {
    node: T;
    scope: DataController;
    application: ApplicationController;
    attributes: ComponentAttributesDictionary = {};
    additional: ComponentAttributesDictionary = {};
    get settings(): T2 {
        return this.attributes.settings?.value
    };

    private parent?: ComponentController;
    private subcomponents: ComponentController[] = [];
    private owns: DataController[] = [];
    private component: ValueType<ComponentsDictionary>;
    private componentInstance?: InstanceType<ComponentController['component']>;
    private events: Lifecycles;

    private elements?: DOMNodeLike[];
    private dataListener;
    private state = {
        connected: false,
        enabled: false,
        locked: false,
        unlocked: false
    }


    constructor(parameters: ComponentControllerConstructor) {
        let addListener = false;
        if ('parent' in parameters) {
            this.parent = parameters.parent;
            this.scope = this.parent.scope;
            this.application = this.parent.application;
        } else {
            this.scope = parameters.data;
            this.application = parameters.application;
        }

        this.node = parameters.node as T;
        this.events = 'events' in this.node ? this.node.events : {};
        if (this.node.attributes) {
            if (this.node.attributes.scope) {
                this.attributes.scope = new AttributeController<string>({
                    data: this.scope,
                    attribute: this.node.attributes.scope,
                });

                this.scope = this.scope.fork(this.attributes.scope.value);
                this.owns.push(this.scope);
                addListener = true;
            }

            for (const key in this.node.attributes) {
                if (key !== 'scope') {
                    this.attributes[key] = new AttributeController({ data: this.scope, attribute: this.node.attributes[key] });
                }
            }

        }
        if ('additional' in this.node) {
            for (const key in this.node.additional) {
                this.additional[key] = new AttributeController({ data: this.scope, attribute: this.node.additional[key] });
            }

        }

        this.attributes.if = this.attributes.if || new AttributeController({ data: this.scope, attribute: { type: 'json', value: true } });

        this.component = this.node.component;
        addListener = addListener || this.node.type == 'expression';
        if (addListener) {
            this.dataListener = () => this.onDataChanges();
            this.scope.changes.addEventListener(this.dataListener);
        }

        if (this.events.load)
            this.scope.runScript(this.events.load)
    }

    connect(): DOMNodeLike[] {
        if (this.state.connected)
            throw Error('Connect should not be called more than once');

        this.state.connected = true;
        return this.render();
    }

    disconnect() {
        this.disable();
        for (const owned of this.owns) {
            owned.disconnect();
        }
    }

    eventHandler(e: { event: string, value: any }) {
        if (e.event == 'update') {
            this.scope.value = e.value;
        }

        if (e.event == 'action') {
            if (this.events.action) {
                this.scope.runScript(this.events.action);
            }
        }

    }

    htmlAttributes() {
        const attributes = {};

        for (const key in this.additional) {
            attributes[key] = this.additional[key].value;
        }

        if (this.attributes.id) {
            attributes['id'] = this.attributes.id.value;
        }
        if (this.attributes.class) {
            attributes['class'] = this.attributes.class.value;
        }
        return attributes;
    }

    private render() {
        try {
            if (this.attributes.if!.value) {
                this.enable();
                this.elements = this.componentInstance?.connect(this.subcomponents as []) as DOMNodeLike[];
            } else {
                this.disable();
                this.elements = [this.placeholder()];
            }
            return this.elements;
        } catch (error) {
            console.error(error);
            return ErrorBox(this.application, (error as string) + `<br/><br/><br/>` + JSON.stringify(this.node, null, 2));
        }
    }
    private onDataChanges() {
        if (!this.state.connected)
            return;

        if (this.attributes.if) {
            this.attributes.if.recheck();
            const enable = this.attributes.if.value;
            if (enable != this.state.enabled) {
                const old = this.elements as DOMNodeLike[];
                this.render();
                const bookmark = old[0] as ElementNodeLike;
                const parent = bookmark.parentNode as ElementNodeLike;

                for (const element of this.elements as DOMNodeLike[]) {
                    parent.insertBefore(element, bookmark);
                }

                for (const element of old) {
                    parent.removeChild(element);
                }
            }
        }

        if (this.state.enabled) {
            (this.componentInstance as BaseComponent).update('value', this.scope.value);
        }
    }

    private enable() {
        this.state.enabled = true;
        this.componentInstance = new this.component(this as any);
        if ((this.node as ListComponentASTNode).repeat) {
            const content = (this.node as ListComponentASTNode).content;
            if (Array.isArray(this.scope.value)) {
                this.subcomponents = this.scope.value.map((_, scope) => new ComponentController({ parent: this, node: { ...content, attributes: { ...content.attributes, scope: { type: 'json', value: scope.toString() } } } as any }));
            } else if (typeof this.scope.value == 'object') {
                this.subcomponents = Object.keys(this.scope.value).map((scope) => new ComponentController({ parent: this, node: { ...content, attributes: { ...content.attributes, scope: { type: 'json', value: scope.toString() } } } as any }));
            }
        } else if ("content" in this.node && Array.isArray(this.node.content)) {
            this.subcomponents = this.node.content.map(v => new ComponentController({ parent: this, node: v }));
        }
    }

    private disable() {
        this.state.enabled = false;

        while (this.subcomponents.length) {
            this.subcomponents.pop()?.disconnect();
        }
    }

    private placeholder() {
        return this.application.createComment('');
    }
}



export function ErrorBox(application: ApplicationController, message: string) {
    const container = application.createNode('div');
    container.setAttribute('style', 'color:red; border:solid 2px red');

    const h1 = application.createNode('h1');
    container.appendChild(h1);
    h1.innerHTML = 'Error';

    const pre = application.createNode('pre');
    pre.innerHTML = message;

    container.appendChild(pre);
    return [container];
}

export type ComponentControllerConstructor<T extends ComponentASTNode = ComponentASTNode> =
    ComponentControllerContext<T> |
    {
        parent: ComponentController;
        node: ComponentASTNode;
    };

export interface ComponentControllerContext<T extends ComponentASTNode> {
    application: ApplicationController;
    attributes: ComponentAttributesDictionary;
    data: DataController;
    node: T;
}