<script lang="ts" setup>
import type { ListComponentProps, ListSingleConfig } from "../../services/types";
import Renderer from "../../renderer.vue";
import { computed } from "vue";
const props = defineProps<ListComponentProps<ListSingleConfig>>();
let item = computed(() => props.items[props.items.length - 1]);

</script>

<template>
    <div data-control="list" data-component="single">
        <Renderer v-if="item" :config="props.config.layout" :context="item.context" />
    </div>
</template>