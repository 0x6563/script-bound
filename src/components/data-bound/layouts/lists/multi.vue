<script lang="ts" setup>
import type { ListComponentProps, ListMultiConfig } from "../../services/types";
import Renderer from "../../Renderer.vue";
import { GetLayoutFlow } from "../../services/layout-flow";
import { reactive, watch } from "vue";
const props = defineProps<ListComponentProps<ListMultiConfig>>();
const state = reactive(GetLayoutFlow(props.config?.component));

watch(props, () => {
    const { wrap, flow } = GetLayoutFlow(props.config?.component);
    state.wrap = wrap;
    state.flow = flow;
})
</script>

<template>
    <div :data-flow="state.flow" :data-wrap="state.wrap" data-control="list" data-component="multi">
        <Renderer v-for="item in items" :config="config.layout" :context="item.context" :bind="item.bind" />
    </div>
</template>