<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let value = false;
</script>

<input type="checkbox" {value} on:change={() => dispatch('change', value)} />
