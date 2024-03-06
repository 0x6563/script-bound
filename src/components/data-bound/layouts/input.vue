<script lang="ts" setup>
import type { InputConfig } from '../services/types';
import type { Context } from '../services/context';
import Text from '../inputs/text.vue';
import Checkbox from '../inputs/checkbox.vue';
import { ref } from 'vue';

interface ComponentProps {
    config: InputConfig,
    context: Context
}
const props = defineProps<ComponentProps>();

let value = ref();
props.context.watch(props.config.bind, Refresh);
Refresh();

function Refresh() {
    value.value = props.context.get(props.config.bind);
}

function onChange(value: any) {
    props.context.set(props.config.bind, value);
}

const registry: { [key: string]: typeof Text | typeof Checkbox } = {
    text: Text,
    checkbox: Checkbox,
}; 
</script>

<template>
    <component :is=registry[config.component.type] :value=value @change=onChange />
</template>
