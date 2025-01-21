import type { ComponentAttributesDictionary, ComponentASTNode, ComponentSettings, ContainerComponentASTNode, ListComponentASTNode, ComponentsDictionary, ValueType } from '../types/types';
import type { ApplicationController } from './application';
import { CreateCommentNode, type DOMNodeLike, type ElementNodeLike } from '../elements';
import { DataController } from './data';
import { AttributeController } from './attribute';
import { ErrorBox } from '../../components/debugs/error';
import type { InputComponent } from '../../components/input';

export class ComponentController<T extends ComponentASTNode = ComponentASTNode, T2 extends ComponentSettings = {}> {
    node: T;
    data: DataController;
    application: ApplicationController;
    attributes: ComponentAttributesDictionary = {};
    additional: ComponentAttributesDictionary = {};
    settings: AttributeController<T2>;

    private parent?: ComponentController;
    private subcomponents: ComponentController[] = [];
    private owns: DataController[] = [];
    private component: ValueType<ComponentsDictionary>;
    private componentInstance?: InstanceType<ComponentController['component']>;

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
            this.data = this.parent.data;
            this.application = this.parent.application;
        } else {
            this.data = parameters.data;
            this.application = parameters.application;
        }

        this.node = parameters.node as T;
        if (this.node.attributes) {
            if (this.node.attributes.bind) {
                this.attributes.bind = new AttributeController<string>({
                    data: this.data,
                    attribute: this.node.attributes.bind,
                });

                this.data = this.data.fork(this.attributes.bind.value);
                this.owns.push(this.data);
                addListener = true;
            }

            for (const key in this.node.attributes) {
                if (key !== 'bind') {
                    this.attributes[key] = new AttributeController({ data: this.data, attribute: this.node.attributes[key] });
                }
            }

        }
        if ('additional' in this.node) {
            for (const key in this.node.additional) {
                this.additional[key] = new AttributeController({ data: this.data, attribute: this.node.additional[key] });
            }

        }
        this.settings = new AttributeController({ data: this.data, attribute: this.node.settings });


        this.attributes.if = this.attributes.if || new AttributeController({ data: this.data, attribute: { type: 'json', value: true } });

        this.component = this.application.getComponent(this.node);

        if (this.component.Type == 'input') {
            addListener = true;
        }

        if (addListener) {
            this.dataListener = () => this.onDataChanges();
            this.data.changes.addEventListener(this.dataListener);
        }

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
            if (this.component.Type == 'input') {
                (this.componentInstance as InputComponent).update(this.data.value);
            }
        }
    }

    private enable() {
        this.state.enabled = true;
        this.componentInstance = new this.component(this as any);
        if (this.component.Type == 'container') {
            this.subcomponents = (this.node as ContainerComponentASTNode).content.map(v => this.component.Controller({ parent: this, node: v }));
        } else if (this.component.Type == 'html') {
            this.subcomponents = (this.node as ContainerComponentASTNode).content.map(v => this.component.Controller({ parent: this, node: v }));
        } else if (this.component.Type == 'list') {
            const config = (this.node as ListComponentASTNode);
            if (Array.isArray(this.data.value)) {
                this.subcomponents = this.data.value.map((_, bind) => this.component.Controller({ parent: this, node: { ...config.template, attributes: { ...config.template?.attributes, bind: { type: 'json', value: bind.toString() } } } as any }));
            } else if (typeof this.data.value == 'object') {
                this.subcomponents = Object.keys(this.data.value).map((bind) => this.component.Controller({ parent: this, node: { ...config.template, attributes: { ...config.template?.attributes, bind: { type: 'json', value: bind.toString() } } } as any }));
            }
        } else if (this.component.Type == 'input') {
            (this.componentInstance as InputComponent).listen('change', ({ value }) => { this.data.value = value });
            this.subcomponents = [];
        } else if (this.component.Type == 'output') {
            this.subcomponents = [];
        }
    }

    private disable() {
        this.state.enabled = false;

        while (this.subcomponents.length) {
            this.subcomponents.pop()?.disconnect();
        }
        if (this.component.Type == 'input') {
            (this.componentInstance as InputComponent)?.unlisten('change', ({ value }) => { this.data.value = value });
            this.subcomponents = [];
        }
    }

    private placeholder() {
        return this.application.createComment('');
    }
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