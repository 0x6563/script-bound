import type { AttributeController } from "../controllers/attribute";
import type { ContainerComponent } from "./container";
import type { InputComponent } from "./input";
import type { ListComponent } from "./list";
import type { OutputComponent } from "./output";

export interface ScriptBoundConfig {
    layouts: {
        main: ComponentDefinition;
        [key: string]: ComponentDefinition;
    };
    scripts?: {
        [key: string]: string;
    }
    style?: string
}

export type ComponentDefinition<T extends ComponentSettings = ComponentSettings> = ContainerConfig<T> | ListConfig<T> | InputConfig<T> | OutputConfig<T>;

export interface ContainerConfig<T = ComponentSettings> {
    type: 'container';
    component: string;
    attributes: ComponentAttributes;
    settings: T;
    content: ComponentDefinition[];
}

export interface ListConfig<T = ComponentSettings> {
    type: 'list';
    component: string;
    attributes: ComponentAttributes;
    settings: T;
    template: ComponentDefinition;
}

export interface InputConfig<T = ComponentSettings> {
    type: 'input';
    component: string;
    attributes: ComponentAttributes;
    events: Lifecycles;
    settings: T;
}

export interface OutputConfig<T = ComponentSettings> {
    type: 'output';
    component: string;
    attributes: ComponentAttributes;
    settings: T;
    content?: string;
}

export type ComponentAttributes = Bindable & ConditionalEdit & ConditionalShow & QuerySelectors;

export type ComponentSettings = {}

export interface Lifecycles {
    'load'?: string[];
    'update'?: string[];
    'trigger'?: string[];
    'unload'?: string[];
}

export interface Bindable {
    bind?: string;
}

export interface ConditionalEdit {
    lock?: boolean | string;
    unlock?: boolean | string;
}

export interface ConditionalShow {
    if?: boolean | string;
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
 
export type Dictionary<T> = {
    [key: string]: T
}

export type Component = ContainerComponent | ListComponent | InputComponent | OutputComponent;
export type ComponentAttributesDictionary = {
    [key in keyof ComponentAttributes]: AttributeController;
};