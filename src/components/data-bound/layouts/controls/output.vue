<script lang="ts" setup>
import { reactive } from "vue";
import type { ConstrolStructureComponentProps } from "../../services/types";
import { GetComponent } from "../../services/registry";
const props = defineProps<ConstrolStructureComponentProps>();

let value: any;
props.context.onDataChange(Refresh);
Refresh();

function Refresh() {
    value = props.context.data;
}

const state = reactive({
    component: GetComponent('output', props.config?.component?.name || 'html'),
})
</script>

<template>
    <component :is="state.component" :value="value" />
</template>