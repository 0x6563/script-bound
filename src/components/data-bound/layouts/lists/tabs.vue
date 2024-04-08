<script lang="ts" setup>
import { reactive, watch } from 'vue';
import type { ListComponentProps, ListTabbedConfig } from "../../services/types";
import Renderer from "../../renderer.vue";
import ConditionalRenderer from '../../renderers/conditional.vue';
import { PickOne } from '../../services/layout-flow';

const sides = new Set(['top', 'left', 'right', 'bottom', 'none'])

const props = defineProps<ListComponentProps<ListTabbedConfig>>();

const state = reactive({
    active: props.items.findIndex(v => !v.context.state.hide),
    side: PickOne(sides, props.config.settings.side, 'top')
});

watch(props, () => {
    state.side = PickOne(sides, props.config.settings.side, 'top')
});

</script>

<template>
    <div :data-tab-side="state.side" data-control="list" data-component="tabs">
        <div data-element="labels">
            <ConditionalRenderer v-for="(item, index) in items" :context="item.context">
                <div :data-active="index == state.active" @click="state.active = index" data-element="label"
                    v-html="item?.label" />
            </ConditionalRenderer>
        </div>

        <div data-element="viewport">
            <div v-for="(item, index) in items" :data-active="index == state.active" data-element="viewport-child">
                <Renderer :config=props.config.layout :context=item.context />
            </div>
        </div>
    </div>
</template>