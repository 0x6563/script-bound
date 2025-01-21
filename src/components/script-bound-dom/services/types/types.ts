import type { AttributeController } from "../controllers/attribute";
import type { ComponentController, ComponentControllerConstructor } from "../controllers/component";
import type { ContainerComponent } from "../../components/container";
import type { InputComponent } from "../../components/input";
import type { ListComponent } from "../../components/list";
import type { OutputComponent } from "../../components/output";
import type { ExpressionComponent } from "../../components/expression";
import type { HTMLElementComponent } from "../../components/html";
import type { HTMLTextComponent } from "../../components/text";
import type { Expression, Statement } from "moderate-code-interpreter/dist/types";

export interface ScriptBoundConfig {
    layout: ComponentASTNode[];
    events: Lifecycles;
    style: string;
    components?: ComponentsDictionary;
}

export type ComponentASTNode = ContainerComponentASTNode | ListComponentASTNode | InputComponentASTNode | OutputComponentASTNode | ExpressionASTNode | TextASTNode | HTMLElementASTNode;

export interface ContainerComponentASTNode {
    type: 'container';
    component: string;
    attributes: NodeAttributes;
    events: Lifecycles;
    settings?: AttributeValue;
    content: ComponentASTNode[];
}

export interface ListComponentASTNode {
    type: 'list';
    component: string;
    attributes: NodeAttributes;
    events: Lifecycles;
    settings?: AttributeValue;
    template: ComponentASTNode;
}

export interface InputComponentASTNode {
    type: 'input';
    component: string;
    attributes: NodeAttributes;
    events: Lifecycles;
    settings?: AttributeValue;
}

export interface OutputComponentASTNode {
    type: 'output';
    component: string;
    attributes: NodeAttributes;
    events: Lifecycles;
    settings?: AttributeValue;
    content: ComponentASTNode[];
}

export interface ExpressionASTNode {
    type: 'expression';
    attributes?: never;
    expression: ScriptTree;
    settings?: AttributeValue;
}

export interface HTMLElementASTNode {
    type: 'html';
    tag: string;
    attributes: NodeAttributes;
    content: ComponentASTNode[];
    settings?: AttributeValue;
    additional: NodeAttributes;
}

export interface TextASTNode {
    type: 'text';
    content: string;
    attributes?: never;
    settings?: AttributeValue;
}

export type NodeAttributes = Bindable & ConditionalEdit & ConditionalShow & QuerySelectors;

export type ComponentSettings = {}

export interface Lifecycles {
    'load'?: ScriptTree;
    'update'?: ScriptTree;
    'unload'?: ScriptTree;
}

export interface Bindable {
    bind?: AttributeValue;
}

export interface ConditionalShow {
    if?: AttributeValue;
}

export interface ConditionalEdit {
    lock?: AttributeValue;
    unlock?: AttributeValue;
}

export interface QuerySelectors {
    id?: AttributeValue;
    class?: AttributeValue;
}

export interface LayoutFlow {
    direction?: FlowDirection
    wrap?: boolean;
}


export type FlowDirection = 'left-right' | 'right-left' | 'top-bottom' | 'bottom-top';
export type PositionalSide = 'left' | 'right' | 'bottom' | 'top';

export type Component = ContainerComponent | ListComponent | InputComponent | OutputComponent;
export type ComponentAttributesDictionary = {
    [key in keyof NodeAttributes]: AttributeController;
};

export interface ComponentsDictionary {
    [key: string]: {
        Type: 'script' | 'style' | 'input' | 'output' | 'container' | 'list' | 'expression' | 'html' | 'text',
        new(component: ComponentController<any>): InputComponent<any> | OutputComponent<any> | ListComponent<any> | ContainerComponent<any> | ExpressionComponent | HTMLElementComponent | HTMLTextComponent;
        Controller<T extends ComponentASTNode = ComponentASTNode>(config: ComponentControllerConstructor<T>): ComponentController<T>;
    };
}
export type ValueType<T> = T[keyof T]
export type ScriptTree = any;

export type AttributeValue = { type: 'json', value: JSONLike } | { type: 'script', value: Runnable };


export type Runnable = { statements: Statement[] } | { expression: Expression };

export type JSONLike = string | number | boolean | JSONLikeObject | JSONLike[];

export interface JSONLikeObject {
    [key: string]: JSONLike;
}


