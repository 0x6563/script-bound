<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let value = false;
</script>

<select on:change={() => dispatch('change', value)}>
    <option value="" />
</select>
