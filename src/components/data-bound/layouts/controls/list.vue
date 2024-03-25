<script lang="ts" setup>
import { onUnmounted, reactive } from 'vue';
import { GetComponent } from '../../services/registry';
import type { ComponentContext, ConstrolStructureComponentProps } from '../../services/types';

const props = defineProps<ConstrolStructureComponentProps>();


const state = reactive({
    component: GetComponent('list', props.config?.component || 'multi'),
    items: Convert(props.context.data) as ComponentContext
})


const dataChange = () => {
    state.items = Convert(props.context.data);
};
props.context.addEventListener('data', dataChange);
onUnmounted(() => {
    props.context.removeEventListener('data', dataChange);

})

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