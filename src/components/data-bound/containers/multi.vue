<script lang="ts" setup>
import type { ComponentContext, ContainerMultiConfig } from "../services/types";
import Renderer from "../Renderer.vue";
interface ComponentProps {
    frames: ComponentContext,
    config: ContainerMultiConfig
}
withDefaults(
    defineProps<ComponentProps>(),
    {
        frames: () => [],
        config: () => ({ type: 'multi' }),
    }
) as unknown as ComponentProps;

</script>

<template>
    <div :id=config.id :class=config.class data-element="container" data-container="multi">
        <Renderer v-for="frame in frames" :config=frame.config :context=frame.context :bind=frame.bind />
    </div>
</template>