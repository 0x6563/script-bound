<script lang="ts" setup>
import { reactive, watch } from 'vue';
import type { ListComponentProps, ListTabbedConfig } from "../../services/types";
import Renderer from "../../Renderer.vue";
import { PickOne } from '../../services/layout-flow';
const props = defineProps<ListComponentProps<ListTabbedConfig>>();

const sides = new Set(['top', 'left', 'right', 'bottom', 'none'])

const state = reactive({ active: 0, side: PickOne(sides, props.config.component.side, 'top') });
watch(props, () => {
    state.side = PickOne(sides, props.config.component.side, 'top')
})

</script>

<template>
    <div :data-tab-side="state.side" data-control="list" data-component="tabs">
        <div data-element="labels">
            <div v-for="(item, index) in items" :data-visible="index == state.active" @click="state.active = index"
                data-element="label" v-html="item?.label" />
        </div>

        <div data-element="viewport">
            <div v-for="(item, index) in items" :data-visible="index == state.active" data-element="viewport-child">
                <Renderer :config=props.config.layout :context=item.context :bind=item.bind />
            </div>
        </div>
    </div>
</template>