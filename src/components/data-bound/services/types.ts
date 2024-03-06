import type { Context } from "./context";

export interface DataBoundConfig {
    layouts: { [key: string]: RenderConfig } & { main: RenderConfig };
}

export interface ComponentConfig {
    type: string;
}

export interface BaseElementConfig {
    id?: string;
    class?: string;
}
export interface BaseConfig extends BaseElementConfig {
    bind?: string;
    header?: string;
    footer?: string;
}

export interface SectionConfig extends BaseConfig, RenderFlow {
    type: 'section';
    sections: RenderConfig[];
}

export interface ListConfig extends BaseConfig, RenderFlow {
    type: 'list';
    bind: string;
    section: RenderConfig;
    container?: ContainerSingleConfig | ContainerMultiConfig | ContainerTabbedConfig;
}

export interface WorkspaceConfig extends BaseConfig, RenderFlow {
    type: 'workspace';
    initial: {
        bind: string;
        layout: string;
    }
    container?: ContainerSingleConfig | ContainerMultiConfig | ContainerTabbedConfig;
}

export interface ContainerSingleConfig extends BaseElementConfig {
    type: 'single';
}

export interface ContainerMultiConfig extends BaseElementConfig {
    type: 'multi'
}

export interface ContainerTabbedConfig extends BaseElementConfig {
    type: 'tabbed'
    direction?: FlowDirection;
}

export interface OutputConfig extends BaseConfig {
    type: 'output';
    bind: string;
    component: ComponentConfig;
}

export interface InputConfig extends BaseConfig {
    type: 'input';
    bind: string;
    component: ComponentConfig;
}

export interface OutputConfig extends BaseConfig {
    type: 'output';
    bind: string;
    component: ComponentConfig;
}


export interface RenderFlow {
    direction?: FlowDirection
    wrap?: FlowWrap;

}
export type FlowDirection = 'left-right' | 'right-left' | 'top-bottom' | 'bottom-top';
export type FlowWrap = 'nowrap' | 'wrap';

export type RenderConfig = SectionConfig | ListConfig | InputConfig;
export type ComponentContext = {
    label: string;
    context: Context;
    bind: string;
    config: RenderConfig
}[];
