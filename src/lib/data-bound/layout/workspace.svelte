<script lang="ts">
    import { onMount } from 'svelte';
    import type { FrameSet, WorkspaceConfig } from '../lib/types';
    import Multi from '../containers/multi.svelte';
    import Single from '../containers/single.svelte';
    import Tabbed from '../containers/tabbed.svelte';
    import Navigator from '../containers/navigator.svelte';
    import type { Context } from '../lib/context';

    export let data: any;
    export let config: WorkspaceConfig;
    export let context: Context;
    let frames: FrameSet = [];
    $: type = 'single';

    onMount(() => {
        // OpenFrame('', config.initial, data);
    });

    export function OpenFrame(label: string, frameName: string, data: any) {
        const frame = { label, data, config: context.application.layout(frameName) };
        frames.push(frame);
        frames = frames;
        return frame;
    }
    export function CloseFrame(frame: (typeof frames)[number]) {
        const i = frames.indexOf(frame);
        if (i >= 0) {
            frames.splice(i, 1);
        }
    }

    const registry = {
        multi: Multi,
        single: Single,
        tabbed: Tabbed,
        navigator: Navigator,
    };
</script>

<svelte:component this={registry[type]} config={null} {frames} />
