import type { AttributeController } from "../controllers/attribute";
import type { BaseComponent } from "../../components/base";
import type { ExpressionComponent } from "../../components/expression";
import type { HTMLElementComponent } from "../../components/html";
import type { HTMLTextComponent } from "../../components/text";
import type { ComponentController } from "../controllers/component";
import type { Expression, Statement } from "moderate-code-interpreter/dist/types";

export interface ScriptBoundConfig {
    layout: ComponentASTNode[];
    events: Lifecycles;
    style: string;
    components?: ComponentsDictionary;
}

export type ComponentASTNode = ExpressionASTNode | TextASTNode | ElementASTNode;

export interface ElementASTNode {
    type: 'element';
    tag: string;
    events: Lifecycles;
    expression?: Runnable;
    attributes: NodeAttributes;
    settings?: AttributeValue;
    content: ComponentASTNode[];
}

export interface ExpressionASTNode {
    type: 'expression';
    attributes?: never;
    expression: Runnable;
    settings?: AttributeValue;
}

export interface TextASTNode {
    type: 'text';
    attributes?: never;
    settings?: AttributeValue;
    text: string;
}

export type NodeAttributes = Bindable & QuerySelectors;

export type ComponentSettings = {}

export interface Lifecycles {
    'load'?: Runnable;
    'update'?: Runnable;
    'action'?: Runnable;
    'unload'?: Runnable;
}

export interface Bindable {
    $?: AttributeValue;
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

export type Component = BaseComponent;
export type ComponentAttributesDictionary = {
    [key in keyof NodeAttributes]: AttributeController;
} & {
    [key: string]: AttributeController;
};

export interface ComponentsDictionary {
    [key: string]: ComponentClass;
}

export interface ComponentClass {
    new(component: ComponentController<any>): BaseComponent<any> | ExpressionComponent | HTMLElementComponent | HTMLTextComponent;
}

export interface ComponentRegistry {
    byClass: { [key: string]: ComponentsDictionary }
    byName: ComponentsDictionary;
}
export type ValueType<T> = T[keyof T]

export type AttributeValue = { type: 'json', value: JSONLike } | { type: 'script', value: Runnable, binding?: boolean };


export type Runnable = { statements: Statement[] } | { expression: Expression };
export type BindExpression = { expression: Expression };
export type JSONLike = string | number | boolean | JSONLikeObject | JSONLike[];

export interface JSONLikeObject {
    [key: string]: JSONLike;
}


