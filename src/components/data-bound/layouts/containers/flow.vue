<script lang="ts" setup>
import Renderer from "../../Renderer.vue";
import { type ContainerFlowConfig, ContainerComponentProps } from "../../services/types";
import { GetLayoutFlow } from "../../services/layout-flow";
import { reactive, watch } from "vue";

const props = defineProps<ContainerComponentProps<ContainerFlowConfig>>();
const state = reactive(GetLayoutFlow(props.config.component));
watch(props, () => {
    const { wrap, flow } = GetLayoutFlow(props.config.component);
    state.wrap = wrap;
    state.flow = flow;
})

</script>

<template>
    <div :data-flow="state.flow" :data-wrap="state.wrap" data-control="container" data-component="flow">
        <Renderer v-for="layout in props.config.layouts" :config="layout" :context="context" />
    </div>
</template>