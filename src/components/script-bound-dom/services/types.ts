import type { DataBoundApplication as ScriptBoundApplication } from "./application";
import type { Context } from "./context";
import type { DOMNodeLike } from "./element";

export interface ScriptBoundConfig {
    layouts: {
        main: ControlStructure;
        [key: string]: ControlStructure;
    };
    scripts?: {
        [key: string]: string;
    }
    style?: string
}

export type ControlStructure<T extends ComponentConfig = ComponentConfig> = WorkspaceConfig<T> | ContainerConfig<T> | ListConfig<T> | InputConfig<T> | OutputConfig<T>;

export interface ConstrolStructureComponentProps<T = ContainerConfig> {
    application: ScriptBoundApplication;
    config: T;
    context: Context;
}

export interface WorkspaceConfig<T = ComponentConfig> extends Bindable, Lockable, Hideable, QuerySelectors {
    type: 'workspace';
    initial: {
        bind: string;
        layout: string;
    }
    component: string;
    settings: T;
}
export interface ContainerConfig<T = ComponentConfig> extends Bindable, Lockable, Hideable, QuerySelectors {
    type: 'container';
    layouts: ControlStructure[];
    component: string;
    settings: T;
}

export interface ListConfig<T = ComponentConfig> extends Bindable, Lockable, Hideable, QuerySelectors {
    type: 'list';
    layout: ControlStructure;
    component: string;
    settings: T;
}

export interface InputConfig<T = ComponentConfig> extends Bindable, Lockable, Hideable, QuerySelectors, Lifecycles {
    type: 'input';
    component: string;
    settings: T;
}

export interface OutputConfig<T = ComponentConfig> extends Bindable, Lockable, Hideable, QuerySelectors, Lifecycles {
    type: 'output';
    layout?: string;
    component: string;
    settings: T;
}

export interface ContainerComponentProps<T extends ComponentConfig> {
    application: ScriptBoundApplication;
    config: ContainerConfig<T>;
    context: Context;
}

export interface ListComponentProps<T extends ComponentConfig> {
    application: ScriptBoundApplication;
    config: ListConfig<T>;
    contexts: ComponentContext;
}

export interface ContainerFlowConfig extends LayoutFlow {
    name: 'flow';
}

export interface ListSingleConfig {
    name: 'single';
}

export interface ListMultiConfig extends LayoutFlow {
    name: 'multi';
}

export interface ListTabbedConfig {
    name: 'tabs';
    side?: PositionalSide;
}

export type ComponentConfig = {
};

export interface Lifecycles {
    lifecycle: {
        'load'?: string[];
        'update'?: string[];
        'trigger'?: string[];
        'unload'?: string[];
    }
}

export interface Bindable {
    bind?: string;
}

export interface QuerySelectors {
    id?: string;
    class?: string;
}

export interface LayoutFlow {
    flow?: FlowDirection
    wrap?: boolean;
}

export interface Lockable {
    lock?: boolean | string;
}

export interface Hideable {
    hide?: boolean | string;
}

export type FlowDirection = 'left-right' | 'right-left' | 'top-bottom' | 'bottom-top';
export type PositionalSide = 'left' | 'right' | 'bottom' | 'top';

export type ComponentContext = {
    label: string;
    context: Context;
    bind: string;
}[];

export interface ComponentRegistry {
    [key: string]: (...args: any[]) => DOMNodeLike;
}