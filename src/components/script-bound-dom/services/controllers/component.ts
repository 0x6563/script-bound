import type { ComponentAttributesDictionary, ComponentASTNode, Lifecycles, Runnable, ElementASTNode, AttributeValue, ComponentsDictionary, } from '../types/types';
import type { ApplicationController } from './application';
import type { DOMNodeLike, ElementNodeLike } from '../elements';
import type { BaseComponent } from '../../components/base';
import { DataController } from './data';
import { AttributeController } from './attribute';
import { SymbolExpression, SymbolText } from '../../components/registry';

export class ComponentController<T extends ComponentASTNode = ComponentASTNode> {
    node: T;
    dataController!: DataController;
    application: ApplicationController;
    attributes: ComponentAttributesDictionary = {};
    children: Set<ComponentController> = new Set();
    refNode: DOMNodeLike;
    parent: ComponentController;
    componentDictionary?: ComponentsDictionary;

    private componentInstance: BaseComponent;
    private events: Lifecycles;
    private dataListener;


    constructor(parameters: ComponentControllerConstructor) {
        if ('parent' in parameters) {
            this.parent = parameters.parent;
            this.application = this.parent.application;
            this.refNode = parameters.refNode;
        } else {
            this.parent = { dataController: parameters.data, application: parameters.application, componentDictionary: parameters.application.components } as unknown as ComponentController;
            this.application = parameters.application;
            this.refNode = this.application.createComment('');
            parameters.parentNode.appendChild(this.refNode);
        }
        this.node = parameters.node as T;
        if (this.node.type == 'expression') {
            this.componentInstance = new (this.application.getComponent(SymbolExpression))(this) as BaseComponent;
        } else if (this.node.type == 'text') {
            this.componentInstance = new (this.application.getComponent(SymbolText))(this) as BaseComponent;
        } else {
            const componentClass = this.parent.componentDictionary?.[this.node.tag] || this.application.getComponent(this.node.tag);
            this.componentInstance = new componentClass(this) as BaseComponent;
        }

        this.componentInstance.initialize();

        this.events = 'events' in this.node ? this.node.events : {};
        if (this.node.attributes) {
            for (const key in this.node.attributes) {
                this.attributes[key] = new AttributeController({ data: this.dataController, attribute: this.node.attributes[key] });
            }
        }

        const addListener = this.dataController !== this.parent.dataController || this.node.type == 'expression';
        if (addListener) {
            this.dataListener = () => this.onDataChanges();
            this.dataController.changes.addEventListener(this.dataListener);
        }

        if (this.events.load)
            this.dataController.runScript(this.events.load)

        let initial = this.componentInstance!.connect();

        if (!initial?.length) {
            initial = [this.application.createComment('')];
        }

        const endcap = initial[initial.length - 1];
        this.append(initial);
        if (!('refNode' in parameters)) {
            this.refNode.remove();
        }
        this.refNode = endcap;

        if ('expression' in this.node && this.node.expression) {
            this.componentInstance?.update('', '');
        }
    }

    disconnect() {
        this.componentInstance?.disconnect();
        this.refNode.remove();
        if (this.dataListener)
            this.dataController.changes.removeEventListener(this.dataListener);
        if (this.dataController !== this.parent.dataController)
            this.dataController.disconnect();
    }

    eventHandler(e: { event: string, value: any }) {
        if (e.event == 'update') {
            this.dataController.value = e.value;
        }

        if (e.event == 'action') {
            if (this.events.action) {
                this.dataController.runScript(this.events.action);
            }
        }

    }
    htmlAttributes() {
        const attributes = {};

        for (const key in this.attributes) {
            attributes[key] = this.attributes[key].value;
        }
        return attributes;
    }


    createChildren(config: { content?: ComponentASTNode[], refNode?: DOMNodeLike, scope?: AttributeValue } = {}): ComponentController[] {
        const content: ComponentASTNode[] = config.content || (this.node as ElementASTNode).content;
        const refNode: DOMNodeLike = config.refNode || this.refNode;
        const scope: AttributeValue | undefined = config.scope;
        const components: ComponentController[] = [];
        for (const v of content) {
            let node = v;
            if (scope) {
                node = {
                    ...v,
                    attributes: {
                        ...v.attributes,
                        $: scope
                    }

                } as ComponentASTNode
            }
            const controller = new ComponentController({ parent: this, refNode, node });
            components.push(controller)
            this.children.add(controller);
        }
        return components;
    }

    disconnectChildren() {
        for (const child of this.children) {
            this.disconnectChild(child);
        }
    }

    disconnectChild(child: ComponentController) {
        child.disconnect();
        this.children.delete(child);
    }

    append(nodes: DOMNodeLike[]) {
        for (const node of nodes) {
            this.refNode.before(node)
        }
    }

    private onDataChanges() {
        this.componentInstance.update('value', this.dataController.value);
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
        refNode: DOMNodeLike;
        node: T;
    };

export interface ComponentControllerContext<T extends ComponentASTNode> {
    application: ApplicationController;
    attributes: ComponentAttributesDictionary;
    data: DataController;
    node: T;
    parentNode: ElementNodeLike;

}