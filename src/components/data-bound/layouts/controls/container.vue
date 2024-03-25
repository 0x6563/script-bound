<script lang="ts" setup>
import { reactive } from "vue";
import type { ConstrolStructureComponentProps } from "../../services/types";
import { GetComponent } from "../../services/registry";

const props = defineProps<ConstrolStructureComponentProps>();

const state = reactive({
    component: GetComponent('container', props.config?.component || 'flow'),
})
</script>

<template>
    <component :is="state.component" :config="config" :context="context" />
</template>