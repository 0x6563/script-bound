<script lang="ts" setup>
import { reactive, ref, watch } from 'vue';
import type { ConstrolStructureComponentProps } from '../../services/types';
import { GetComponent } from '../../services/registry';

const props = defineProps<ConstrolStructureComponentProps>();

let value = ref();
watch(props, Refresh);
Refresh();

function Refresh() {
    value.value = props.context.data;
}

function onChange(value: any) {
    props.context.data = value;
}

const state = reactive({
    component: GetComponent('input', props.config?.component || 'flow'),
})
</script>

<template>
    <component :is="state.component" :config="config" :value="value" @change="onChange" />
</template>