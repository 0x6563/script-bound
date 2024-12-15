<script lang="ts" setup>
import { onUnmounted, reactive } from 'vue';
import { GetComponent } from '../../services/registry';
import type { ComponentContext, ConstrolStructureComponentProps, ListConfig } from '../../services/types';
import { Context } from '../../services/context';

const props = defineProps<ConstrolStructureComponentProps<ListConfig>>();

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
        return data.map((_, i) => ConvertToComponentContext(props.context, i.toString()));
    }
    if (typeof data == 'object') {
        return Object.keys(data).map((v) => ConvertToComponentContext(props.context, v));
    }
    return [];
}
function ConvertToComponentContext(context: Context, bind: string) {
    return { label: bind, context: context.fork(props.config.layout, { bind }), bind }
}

</script>

<template>
    <component :is="state.component" :config="props.config" :items="state.items" />
</template>