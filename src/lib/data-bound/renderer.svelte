<script lang="ts">
    import { beforeUpdate } from 'svelte';
    import type { Context } from './lib/context';
    import type { InputConfig, ListConfig, SectionConfig } from './lib/types';

    import Input from './layout/input.svelte';
    import Section from './layout/section.svelte';
    import List from './layout/list.svelte';

    export let config: SectionConfig | ListConfig | InputConfig | any;
    export let context: Context;
    export let bind: string | undefined = undefined;
    let layout: { enabled: boolean; visible: boolean } = { visible: true } as any;

    let localContext;
    const registry = {
        section: Section,
        input: Input,
        list: List,
    };
    const directions = ['left-right', 'right-left', 'top-bottom', 'bottom-top'];
    const wraps = ['nowrap', 'wrap', 'wrap-reverse'];
    $: direction = config.type == 'input' ? '' : directions.includes(config.direction?.toLowerCase() as string) ? config.direction!.toLowerCase() : 'left-right';
    $: wrap = config.type == 'input' ? '' : wraps.includes(config.wrap?.toLowerCase() as string) ? config.wrap!.toLowerCase() : 'nowrap';

    beforeUpdate(() => {
        if (typeof bind != 'undefined' && config.type != 'input') {
            localContext = context.fork(bind);
        } else if (config.bind && config.type != 'input') {
            localContext = context.fork(config.bind);
        } else {
            localContext = context;
        }
    });
</script>

{#if layout.visible && config}
    <div id={config.id} class={config.class} data-element="layout" data-layout={config.type}>
        {#if 'header' in config}
            <div data-element="header">{config.header}</div>
        {/if}
        <div data-element="content" data-direction={direction} data-wrap={wrap}>
            <svelte:component this={registry[config.type]} {config} context={localContext} {layout} />
        </div>

        {#if 'footer' in config}
            <div data-element="footer">{config.footer}</div>
        {/if}
    </div>
{/if}
