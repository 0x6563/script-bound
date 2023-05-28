<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    export let value = '';

    const dispatch = createEventDispatcher();

    function onChange(e) {
        dispatch('change', e.target.value);
    }

    function onInput(e) {
        dispatch('input', e.target.value);
    }
</script>

<input type="text" {value} on:change={onChange} on:input={onInput} />

<style lang="scss">
    input {
        width: 100%;
        padding: 8px;
        box-sizing: border-box;
    }
</style>
