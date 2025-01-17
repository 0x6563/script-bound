import type { AttributeController } from "../controllers/attribute";
import type { ComponentController, ComponentControllerConstructor } from "../controllers/component";
import type { ContainerComponent } from "../../components/container";
import type { InputComponent } from "../../components/input";
import type { ListComponent } from "../../components/list";
import type { OutputComponent } from "../../components/output";
import type { ExpressionComponent } from "../../components/expression";
import type { HTMLElementComponent } from "../../components/html";
import type { HTMLTextComponent } from "../../components/text";

export interface ScriptBoundConfig {
    layout: ComponentASTNode[];
    events: Lifecycles;
    style: string;
    components?: ComponentsDictionary;
}

export type ComponentASTNode<T extends ComponentSettings = {}> = ContainerComponentASTNode<T> | ListComponentASTNode<T> | InputComponentASTNode<T> | OutputComponentASTNode<T> | ExpressionASTNode | TextASTNode | HTMLElementASTNode;

export interface ContainerComponentASTNode<T extends ComponentSettings = {}> {
    type: 'container';
    component: string;
    attributes: ComponentAttributes;
    events: Lifecycles;
    settings: T;
    content: ComponentASTNode[];
}

export interface ListComponentASTNode<T extends ComponentSettings = {}> {
    type: 'list';
    component: string;
    attributes: ComponentAttributes;
    events: Lifecycles;
    settings: T;
    template: ComponentASTNode;
}

export interface InputComponentASTNode<T extends ComponentSettings = {}> {
    type: 'input';
    component: string;
    attributes: ComponentAttributes;
    events: Lifecycles;
    settings: T;
}

export interface OutputComponentASTNode<T extends ComponentSettings = {}> {
    type: 'output';
    component: string;
    attributes: ComponentAttributes;
    events: Lifecycles;
    settings: T;
    content: ComponentASTNode[];
}

export interface ExpressionASTNode<T extends ComponentSettings = {}> {
    type: 'expression';
    attributes?: never;
    expression: ScriptTree;
    settings: T;
}

export interface HTMLElementASTNode<T extends ComponentSettings = {}> {
    type: 'html';
    tag: string;
    attributes: ComponentAttributes;
    content: ComponentASTNode[];
    settings: T;
    custom: ComponentAttributes;
}

export interface TextASTNode<T extends ComponentSettings = {}> {
    type: 'text';
    content: string;
    attributes?: never;
    settings: T;
}

export type ComponentAttributes = Bindable & ConditionalEdit & ConditionalShow & QuerySelectors;

export type ComponentSettings = {}

export interface Lifecycles {
    'load'?: ScriptTree;
    'update'?: ScriptTree;
    'unload'?: ScriptTree;
}

export interface Bindable {
    bind?: string;
}

export interface ConditionalShow {
    if?: boolean | string;
}

export interface ConditionalEdit {
    lock?: boolean | string;
    unlock?: boolean | string;
}

export interface QuerySelectors {
    id?: string;
    class?: string;
}

export interface LayoutFlow {
    direction?: FlowDirection
    wrap?: boolean;
}


export type FlowDirection = 'left-right' | 'right-left' | 'top-bottom' | 'bottom-top';
export type PositionalSide = 'left' | 'right' | 'bottom' | 'top';

export type Component = ContainerComponent | ListComponent | InputComponent | OutputComponent;
export type ComponentAttributesDictionary = {
    [key in keyof ComponentAttributes]: AttributeController;
};

export interface ComponentsDictionary {
    [key: string]: {
        Type: 'script' | 'style' | 'input' | 'output' | 'container' | 'list' | 'expression' | 'html' | 'text',
        new(component: ComponentController<any>): InputComponent<any> | OutputComponent<any> | ListComponent<any> | ContainerComponent<any> | ExpressionComponent | HTMLElementComponent | HTMLTextComponent;
        Controller<T extends ComponentSettings = {}>(config: ComponentControllerConstructor<T>): ComponentController<T>;
    };
}
export type ValueType<T> = T[keyof T]
export type ScriptTree = any;