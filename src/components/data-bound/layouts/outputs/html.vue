<script lang="ts" setup>
import { reactive, watch } from 'vue';
import { OutputConfig } from '../../services/types';
const props = withDefaults(defineProps<{
    value: string,
    config: OutputConfig<{}>
}>(), {
    value: ''
})

const state = reactive({
    content: props.config.layout || props.value
})

watch(props, () => {
    state.content = props.config.layout || props.value
})

</script>
<template>
    <div v-html=state.content> </div>
</template>
