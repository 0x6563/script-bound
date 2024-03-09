<script lang="ts" setup>
import { reactive } from 'vue';
import { GetComponent } from '../../services/registry';
import type { ComponentContext, ConstrolStructureComponentProps } from '../../services/types';

const props = defineProps<ConstrolStructureComponentProps>();


const state = reactive({
    component: GetComponent('list', props.config?.component?.name || 'multi'),
    items: [] as ComponentContext
})

props.context.onDataChange(Refresh);
Refresh();

function Refresh() {
    state.items = Convert(props.context.data);
}

function Convert(data: any): ComponentContext {
    if (Array.isArray(data)) {
        return data.map((_, i) => ({ label: i.toString(), context: props.context, bind: i.toString() }));
    }
    if (typeof data == 'object') {
        return Object.keys(data).map((v) => ({ label: v, context: props.context, bind: v }));
    }
    return [];
}

</script>

<template>
    <component :is="state.component" :config="props.config" :items="state.items" />
</template>