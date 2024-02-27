<script lang="ts">
    import type { ComponentContext, ContainerMultiConfig } from "../lib/types";
    import Renderer from "../renderer.svelte";
    export let frames: ComponentContext = [];
    export let config: ContainerMultiConfig = {} as ContainerMultiConfig;
</script>

<div
    id={config.id}
    class={config.class}
    data-element="container"
    data-container="multi"
>
    {#each frames as frame}
        <Renderer
            config={frame.config}
            context={frame.context}
            bind={frame.bind}
        />
    {/each}
</div>

<style lang="scss">
</style>
