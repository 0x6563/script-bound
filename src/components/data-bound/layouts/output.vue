<script lang="ts" setup>
import type { OutputConfig } from "../services/types";
import type { Context } from "../services/context";
import Text from "../outputs/text.vue";

const registry: { [key: string]: typeof Text } = {
    text: Text,
};

interface ComponentProps {
    config: OutputConfig;
    context: Context;
}
const props = defineProps<ComponentProps>();

let value: any;
props.context.watch(props.config.bind, Refresh);
Refresh();

function Refresh() {
    value = props.context.get(props.config.bind);
}
</script>

<template>
    <component :is=registry[config.component.type] :value=value />
</template>
