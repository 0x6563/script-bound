<script lang="ts" setup>
import { reactive } from 'vue';
import type { ComponentContext, ContainerTabbedConfig } from "../services/types";
import Renderer from "../Renderer.vue";
interface ComponentProps {
    frames: ComponentContext,
    config: ContainerTabbedConfig
}
withDefaults(
    defineProps<ComponentProps>(),
    {
        frames: () => [],
        config: () => ({ type: 'tabbed' }),
    }
) as unknown as ComponentProps;

const state = reactive({ active: 0 });
</script>

<template>
    <div :id="config.id" :class="config.class" :data-direction="(config.direction || 'top-bottom')"
        data-element="container" data-container="tabbed">

        <div data-element="labels">
            <div v-for="(frame, index) in frames" :data-visible="index == state.active" @click="state.active = index"
                data-element="label">
                {{ frame?.label || index }}
            </div>
        </div>

        <div data-element="viewport">
            <div v-for="(frame, index) in frames" :data-visible="index == state.active" data-element="viewport-child">
                <Renderer :config=frame.config :context=frame.context :bind=frame.bind />
            </div>
        </div>
    </div>
</template>