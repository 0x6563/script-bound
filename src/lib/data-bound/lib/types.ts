import type { Context } from "./context";

export interface DataBoundConfig {
    layouts: { [key: string]: RenderConfig } & { main: RenderConfig };
}

export interface SectionConfig extends BaseConfig, RenderFlow {
    type: 'section';
    sections: RenderConfig[];
}

export interface ListConfig extends BaseConfig, RenderFlow {
    type: 'list';
    bind: string;
    section: RenderConfig;
    container?: {
        type: 'single' | 'multi' | 'tabbed' | 'navigator';
        keep?: 'initial' | 'first' | 'last' | 'all';
    }
}
export interface WorkspaceConfig extends BaseConfig, RenderFlow {
    type: 'workspace';
    initial: {
        bind: string;
        layout: string;
    }
    container?: {
        type: 'single' | 'multi' | 'tabbed' | 'navigator';
        keep?: 'initial' | 'first' | 'last' | 'all';
    }
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

export interface ComponentConfig {
    type: string;
}

export interface BaseConfig {
    id?: string;
    class?: string;
    bind?: string;
    header?: string;
    footer?: string;
}

export interface RenderFlow {
    direction?: FlowDirection
    wrap?: FlowWrap;

}
export type FlowDirection = 'left-right' | 'right-left' | 'top-bottom' | 'bottom-top';
export type FlowWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

export type RenderConfig = SectionConfig | ListConfig | InputConfig;
export type FrameSet = {
    label: string;
    context: Context;
    bind: string;
    config: RenderConfig
}[];
