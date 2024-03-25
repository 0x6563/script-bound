<script lang="ts" setup>
import { onUnmounted, reactive, watch } from "vue";
import type { Context } from "./services/context";
import { GetComponent } from "./services/registry";
import type { ControlStructure } from "./services/types";

interface ComponentProps {
  context: Context;
  bind?: string;
  config: ControlStructure
}

const props = defineProps<ComponentProps>();

const state = reactive({
  component: GetComponent('control', props.config?.type),
  hide: false,
  lock: false
})

watch(() => props.config.type, () => {
  state.component = GetComponent('control', props.config?.type)
})

const { hide, lock, bind } = props.config;
const context = props.context.fork({
  bind: props?.bind || bind,
  hide,
  lock
});

state.hide = context.state.hide;
const stateChange = () => {
  state.hide = context.state.hide;
  state.lock = context.state.lock;
};

context.addEventListener('state', stateChange)
onUnmounted(() => {
  context.removeEventListener('state', stateChange);
  context.onDestroy();
})
</script>

<template>
  <div v-if="!state.hide" :id="props.config.id" :class="props.config.class" data-renderer>
    <component :is="state.component" :config="config" :context="context" />
  </div>
</template>
