<script lang="ts" setup>
import type { Context } from '../services/context';
import type { ComponentContext, ListConfig } from '../services/types';
import Multi from '../containers/multi.vue';
import Single from '../containers/single.vue';
import Tabbed from '../containers/tabbed.vue';
import { reactive } from 'vue';

const registry: { [key: string]: any } = {
    multi: Multi,
    single: Single,
    tabbed: Tabbed,
};

interface ComponentProps {
    config: ListConfig,
    context: Context
}
const props = defineProps<ComponentProps>();

const state = reactive({
    container: props.config?.container || { type: 'multi' },
    frames: [] as ComponentContext
})

props.context.watch('$', Refresh);
Refresh();

function Refresh() {
    state.frames = Convert(props.context.data);
}

function Convert(data: any): ComponentContext {
    if (!data) {
        return [];
    }
    if (Array.isArray(data)) {
        return data.map((_, i) => ({ label: i.toString(), context: props.context, bind: i.toString(), config: props.config.section }));
    }
    if (typeof data == 'object') {
        return Object.keys(data).map((v) => ({ label: v, context: props.context, bind: v, config: props.config.section }));
    }
    return [];
}
</script>

<template>
    <component :is=registry[state.container.type] :config=state.container :frames=state.frames />
</template>
