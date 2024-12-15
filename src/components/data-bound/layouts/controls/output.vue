<script lang="ts" setup>
import { onUnmounted, reactive } from "vue";
import type { ConstrolStructureComponentProps } from "../../services/types";
import { GetComponent } from "../../services/registry";
const props = defineProps<ConstrolStructureComponentProps>();
const state = reactive({
    component: GetComponent('output', props.config?.component || 'html'),
    value: props.context.data
})
const stateChange = () => {
    state.value = props.context.data;
};

props.context.addEventListener('state', stateChange);
onUnmounted(() => {
    props.context.removeEventListener('state', stateChange);
})

</script>

<template>
    <component :is="state.component" :config="config" :value="state.value" />
</template>