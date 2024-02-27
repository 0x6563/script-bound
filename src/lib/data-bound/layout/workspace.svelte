<script lang="ts">
    import { onMount } from "svelte";
    import type { ComponentContext, WorkspaceConfig } from "../lib/types";
    import Multi from "../containers/multi.svelte";
    import Single from "../containers/single.svelte";
    import Tabbed from "../containers/tabbed.svelte";
    import type { Context } from "../lib/context";

    export let config: WorkspaceConfig;
    export let context: Context;
    let frames: ComponentContext = [];
    $: type = "single";

    onMount(() => {
        // OpenFrame('', config.initial, data);
    });

    export function OpenFrame(label: string, layout: string, bind: string) {
        const frame = {
            label,
            context,
            bind,
            config: context.application.layout(layout),
        };
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
    };
</script>

<svelte:component this={registry[type]} config={null} {frames} />
