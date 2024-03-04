<script lang="ts">
    import type { ComponentContext, ContainerSingleConfig } from '../lib/types';
    import Renderer from '../renderer.svelte';

    export let frames: ComponentContext = [];
    export let config: ContainerSingleConfig = {} as ContainerSingleConfig;
    $: frame = frames[frames.length - 1];
</script>

<div id={config.id} class={config.class} data-element="container" data-container="single">
    {#if frame}
        <Renderer config={frame.config} context={frame.context} bind={frame.bind} />
    {/if}
</div>

<style lang="scss">
</style>
