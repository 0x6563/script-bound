<script lang="ts" setup>
withDefaults(defineProps<{
    value: string;
    options: string[]
}>(), {
    value: ''
})
const emit = defineEmits<{ change: [string] }>()
function select(value: string) {
    emit('change', value);
}
</script>

<template>
    <button v-for="option in  options" :selected="option == value" @click="select(option)"> {{ option }} </button>
</template>
<style lang="scss">
button {
    border: none;
    background: none;
    border-radius: none;
    font: inherit;
    transition: all 200ms;
    border-bottom: solid 3px rgba(0, 0, 0, 0);
    opacity: .5;
    cursor: pointer;
}

button[selected="true"] {
    border-bottom: solid 3px black;
    opacity: 1;
}
</style>