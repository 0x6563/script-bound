import type { AttributeController } from "../controllers/attribute";
import type { BaseComponent } from "../../components/base";
import type { ExpressionComponent } from "../../components/expression";
import type { HTMLElementComponent } from "../../components/html";
import type { HTMLTextComponent } from "../../components/text";
import type { ComponentController, ComponentControllerConstructor } from "../controllers/component";
import type { Expression, Statement } from "moderate-code-interpreter/dist/types";

export interface ScriptBoundConfig {
    layout: ComponentASTNode[];
    events: Lifecycles;
    style: string;
    components?: ComponentsDictionary;
}

export type ComponentASTNode = ListComponentASTNode | BaseComponentASTNode | ExpressionASTNode | TextASTNode | HTMLElementASTNode;

export interface BaseComponentASTNode {
    type: 'base';
    component: ComponentClass;
    attributes: NodeAttributes;
    events: Lifecycles;
    settings?: AttributeValue;
    content: ComponentASTNode[];
}

export interface ListComponentASTNode {
    type: 'list';
    component: ComponentClass;
    attributes: NodeAttributes;
    events: Lifecycles;
    settings?: AttributeValue;
    content: ComponentASTNode;
    repeat: true;
}

export interface ExpressionASTNode {
    type: 'expression';
    attributes?: never;
    expression: Runnable;
    settings?: AttributeValue;
    component: ComponentClass;
}

export interface HTMLElementASTNode {
    type: 'html';
    tag: string;
    attributes: NodeAttributes;
    settings?: AttributeValue;
    content: ComponentASTNode[];
    additional: NodeAttributes;
    component: ComponentClass;
}

export interface TextASTNode {
    type: 'text';
    attributes?: never;
    settings?: AttributeValue;
    text: string;
    component: ComponentClass;
}

export type NodeAttributes = Bindable & ConditionalEdit & ConditionalShow & QuerySelectors & Settings;

export type ComponentSettings = {}

export interface Lifecycles {
    'load'?: Runnable;
    'update'?: Runnable;
    'action'?: Runnable;
    'unload'?: Runnable;
}

export interface Bindable {
    scope?: AttributeValue;
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

export interface Settings {
    settings?: ComponentSettings;
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
};

export interface ComponentsDictionary {
    [key: string]: ComponentClass;
}

export interface ComponentClass {
    Attributes: {
        group?: string;
        default?: boolean;
        repeat?: boolean;
    }
    new(component: ComponentController<any>): BaseComponent<any> | ExpressionComponent | HTMLElementComponent | HTMLTextComponent;
}

export interface ComponentRegistry {
    byClass: { [key: string]: ComponentsDictionary }
    byName: ComponentsDictionary;
}
export type ValueType<T> = T[keyof T]

export type AttributeValue = { type: 'json', value: JSONLike } | { type: 'script', value: Runnable };


export type Runnable = { statements: Statement[] } | { expression: Expression };

export type JSONLike = string | number | boolean | JSONLikeObject | JSONLike[];

export interface JSONLikeObject {
    [key: string]: JSONLike;
}


