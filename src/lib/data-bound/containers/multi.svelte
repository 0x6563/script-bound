<script lang="ts">
    import type { FrameSet } from '../lib/types';
    import Renderer from '../renderer.svelte';
    export let frames: FrameSet = [];
    export let config: any = {};
</script>

<div id={config.id} class={config.class} data-element="container" data-container="multi">
    {#each frames as frame}
        <Renderer config={frame.config} context={frame.context} bind={frame.bind} />
    {/each}
</div>

<style lang="scss">
</style>
