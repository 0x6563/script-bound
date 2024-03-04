<script lang="ts">
    import type { Context } from '../lib/context';
    import type { ComponentContext, ListConfig } from '../lib/types';
    import Multi from '../containers/multi.svelte';
    import Single from '../containers/single.svelte';
    import Tabbed from '../containers/tabbed.svelte';

    export let context: Context;
    export let config: ListConfig;
    let frames: ComponentContext = [];
    $: configContainer = config?.container || { type: 'multi' };

    context.watch('$', Refresh);
    Refresh();
    function Refresh() {
        frames = Convert(context.data);
    }

    function Convert(data: any): ComponentContext {
        if (!data) {
            return [];
        }
        if (Array.isArray(data)) {
            return data.map((v, i) => ({ label: i.toString(), context, bind: i.toString(), config: config.section }));
        }
        if (typeof data == 'object') {
            return Object.keys(data).map((v) => ({ label: v, context, bind: v, config: config.section }));
        }
        return [];
    }
    const registry = {
        multi: Multi,
        single: Single,
        tabbed: Tabbed,
    };
</script>

<svelte:component this={registry[configContainer.type]} config={configContainer} {frames} />
