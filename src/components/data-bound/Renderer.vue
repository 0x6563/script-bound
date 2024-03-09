<script lang="ts" setup>
import { reactive, watch } from "vue";
import type { Context } from "./services/context";
import { GetComponent } from "./services/registry";
import type { ControlStructure } from "./services/types";

interface ComponentProps {
  context: Context;
  bind: string | undefined;
  config: ControlStructure
}

const props = withDefaults(defineProps<ComponentProps>(), { bind: undefined });

const state = reactive({
  component: GetComponent('control', props.config?.type || 'section'),
})

watch(() => props.config.type, () => {
  state.component = GetComponent('control', props.config?.type || 'section')
})
let localContext = props.context;

if (typeof props.bind != "undefined") {
  localContext = props.context.fork(props.bind);
} else if (props.config.bind) {
  localContext = props.context.fork(props.config.bind);
}

if (!localContext) {
  localContext = props.context;
}
</script>

<template>
  <div :id="props.config.id" :class="props.config.class" data-renderer>
    <component :is="state.component" :config="config" :context="localContext" />
  </div>
</template>
