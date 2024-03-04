<script lang="ts">
    import type { InputConfig } from "../lib/types";
    import type { Context } from "../lib/context";
    import Text from "../outputs/text.svelte";

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
    };
</script>

<svelte:component this={registry[config.component.type]} {value} />
