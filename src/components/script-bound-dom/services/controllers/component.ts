import type { ComponentAttributesDictionary, ComponentASTNode, ComponentSettings, ContainerComponentASTNode, ListComponentASTNode, ComponentsDictionary, ValueType } from '../types/types';
import type { ApplicationController } from './application';
import type { DOMNodeLike, ElementNodeLike } from '../elements';
import { DataController } from './data';
import { AttributeController } from './attribute';
import { ErrorBox } from '../../components/debugs/error';
import type { InputComponent } from '../../components/input';

export class ComponentController<T extends ComponentSettings = {}> {
    config: ComponentASTNode<T>;
    data: DataController;
    application: ApplicationController;
    attributes: {
        local: ComponentAttributesDictionary,
        inherited: ComponentAttributesDictionary
    } = {
            local: {},
            inherited: {}
        };
    private parent?: ComponentController;
    private subcomponents: ComponentController[] = [];
    private owns: (DataController | AttributeController)[] = [];
    private component: ValueType<ComponentsDictionary>;
    private componentInstance?: InstanceType<ComponentController['component']>;

    private elements?: DOMNodeLike[];
    private dataListener;
    private state = { connected: false, enabled: false }


    constructor(parameters: ComponentControllerConstructor<T>) {
        let addListener = false;
        let inherited: ComponentAttributesDictionary;
        if ('parent' in parameters) {
            this.parent = parameters.parent;
            this.data = this.parent.data;
            this.application = this.parent.application;
            inherited = this.parent.attributes.inherited;
        } else {
            this.data = parameters.data;
            this.application = parameters.application;
            inherited = parameters.attributes;
        }

        this.config = parameters.config;
        if (this.config.attributes) {
            if (this.config.attributes.bind) {
                this.data = this.data.fork(this.config.attributes);

                this.owns.push(this.data);
            }

            for (const k in inherited) {
                const key = k as keyof ComponentAttributesDictionary;
                if (typeof this.config.attributes[key] != 'undefined') {
                    const attr = inherited[key]!.fork({ data: this.data, condition: parameters.config[key] });
                    this.attributes.inherited[key] = attr;
                    this.owns.push(attr);
                    addListener = true;
                }
            }

            if (typeof this.config.attributes.if != 'undefined') {
                this.attributes.local.if = new AttributeController({
                    application: this.application,
                    data: this.data,
                    condition: this.config.attributes.if,
                    attribute: 'show',
                    lockingCondition: false
                });
                this.owns.push(this.attributes.local.if);
                addListener = true;
            }
        }

        this.attributes.local.if = this.attributes.local.if || new AttributeController({
            application: this.application,
            data: this.data,
            condition: true,
            attribute: 'show',
            lockingCondition: false
        });

        this.attributes.local.if?.checkState();

        this.component = this.application.getComponent(this.config);

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
            if (this.attributes.local.if?.value) {
                this.enable();
                this.elements = this.componentInstance?.connect(this.subcomponents as []) as DOMNodeLike[];
            } else {
                this.disable();
                this.elements = [this.placeholder()];
            }
            return this.elements;
        } catch (error) {
            console.error(error);
            return ErrorBox(this.application, (error as string) + `<br/><br/><br/>` + JSON.stringify(this.config, null, 2));
        }
    }
    private onDataChanges() {
        if (!this.state.connected)
            return;

        if (this.attributes.local.if) {
            this.attributes.local.if.checkState();
            const enable = this.attributes.local.if.value;
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
            this.subcomponents = (this.config as ContainerComponentASTNode).content.map(v => this.component.Controller({ parent: this, config: v }));
        } else if (this.component.Type == 'html') {
            this.subcomponents = (this.config as ContainerComponentASTNode).content.map(v => this.component.Controller({ parent: this, config: v }));
        } else if (this.component.Type == 'list') {
            const config = (this.config as ListComponentASTNode);
            if (Array.isArray(this.data.value)) {
                this.subcomponents = this.data.value.map((_, bind) => this.component.Controller({ parent: this, config: { ...config.template, attributes: { ...config.template?.attributes, bind: bind.toString() } } as any }));
            } else if (typeof this.data.value == 'object') {
                this.subcomponents = Object.keys(this.data.value).map((bind) => this.component.Controller({ parent: this, config: { ...config.template, attributes: { ...config.template?.attributes, bind: bind.toString() } } as any }));
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
        return document.createComment('') as any as DOMNodeLike;
    }
}

export type ComponentControllerConstructor<T extends ComponentSettings = {}> =
    ComponentControllerContext<T> |
    {
        parent: ComponentController;
        config: ComponentASTNode<T>;
    };

export interface ComponentControllerContext<T extends ComponentSettings = {}> {
    application: ApplicationController;
    attributes: ComponentAttributesDictionary;
    data: DataController;
    config: ComponentASTNode<T>;
}