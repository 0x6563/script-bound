<script lang="ts">
    import type { Context } from "../lib/context";
    import type { SectionConfig } from "../lib/types";
    import Renderer from "../renderer.svelte";

    export let config: SectionConfig;
    export let context: Context;
</script>

{#each config.sections as section}
    <Renderer config={section} {context} />
{/each}
