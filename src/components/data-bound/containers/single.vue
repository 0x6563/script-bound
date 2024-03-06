<script lang="ts" setup>
import type { ComponentContext, ContainerSingleConfig } from "../services/types";
import Renderer from "../Renderer.vue";
import { computed } from "vue";
interface ComponentProps {
    frames: ComponentContext,
    config: ContainerSingleConfig
}
const props = withDefaults(
    defineProps<ComponentProps>(),
    {
        frames: () => [],
        config: () => ({ type: 'single' }),
    }
) as unknown as ComponentProps;
let frame = computed(() => props.frames[props.frames.length - 1]);
</script>

<template>
    <div :id=config.id :class=config.class data-element="container" data-container="single">
        <Renderer v-if="frame" :config=frame.config :context=frame.context :bind=frame.bind />
    </div>
</template>