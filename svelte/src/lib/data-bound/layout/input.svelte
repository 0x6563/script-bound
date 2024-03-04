<script lang="ts">
    import type { InputConfig } from '../lib/types';
    import type { Context } from '../lib/context';
    import Text from '../inputs/text.svelte';
    import Checkbox from '../inputs/checkbox.svelte';

    export let config: InputConfig;
    export let context: Context;

    let value;
    context.watch(config.bind, Refresh);
    Refresh(null);

    function Refresh(e: any) {
        console.log(e);
        value = context.get(config.bind);
        value = value;
    }

    const registry = {
        text: Text,
        checkbox: Checkbox,
    };
    function onChange(value) {
        context.set(config.bind, value.detail);
    }
</script>

<svelte:component this={registry[config.component.type]} on:change={onChange} {value} />
