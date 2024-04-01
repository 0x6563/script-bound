import type { Context } from "./context";

export interface DataBoundConfig {
    layouts: {
        main: ControlStructure;
        [key: string]: ControlStructure;
    };
    rules?: {
        [key: string]: string;
    }
    style?: string
}

export type ControlStructure<T extends ComponentConfig = ComponentConfig> = WorkspaceConfig<T> | ContainerConfig<T> | ListConfig<T> | InputConfig<T> | OutputConfig<T>;

export interface ConstrolStructureComponentProps<T = ContainerConfig> {
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

export interface InputConfig<T = ComponentConfig> extends Bindable, Lockable, Hideable, QuerySelectors, PreProcessors, PostProcessors {
    type: 'input';
    component: string;
    settings: T;
}

export interface OutputConfig<T = ComponentConfig> extends Bindable, Lockable, Hideable, QuerySelectors, PreProcessors {
    type: 'output';
    layout?: string;
    component: string;
    settings: T;
}

export interface ContainerComponentProps<T extends ComponentConfig> {
    config: ContainerConfig<T>;
    context: Context;
}

export interface ListComponentProps<T extends ComponentConfig> {
    config: ListConfig<T>;
    items: ComponentContext;
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

export type ComponentConfig = {};

export interface PreProcessors {
    preprocessors?: string[]
}

export interface PostProcessors {
    postprocessors?: string[]
}

export interface Bindable {
    bind?: string;
    rebind?: boolean;
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
