<script lang="ts">
    import { onMount } from 'svelte';
    import type { FrameSet } from '../lib/types';
    import Renderer from '../renderer.svelte';
    export let frames: FrameSet = [];
    export let config: any = {};
    const map = new WeakMap();
    function ShowTab(frame: FrameSet[number]) {
        for (const f of frames) {
            map.set(f, f == frame);
        }
    }
    onMount(() => {
        ShowTab(frames[0]);
    });
</script>

<div id={config.id} class={config.class} data-element="container" data-container="tabbed">
    <div data-element="labels">
        {#each frames as frame, i}
            <div data-element="label" on:click={() => ShowTab(frame)}>
                {frame.label || `Item ${i}`}
            </div>
        {/each}
    </div>
    <div data-element="viewport">
        {#each frames as frame}
            <div data-element="viewport-child" data-visible={map.get(frame)}>
                <Renderer config={frame.config} context={frame.context} bind={frame.bind} />
            </div>
        {/each}
    </div>
</div>

<style lang="scss">
    [data-container='tabbed'] {
        display: flex;
        flex-flow: column;
    }
    [data-element='labels'] {
        flex: 0 1 auto;
        height: 25px;
        [data-element='label'] {
            display: inline-block;
            height: 25px;
            line-height: 25px;
        }
    }
</style>
