<script lang="ts" setup>
import { onUnmounted, reactive, watch } from "vue";
import { Context } from "./services/context";
import { GetComponent } from "./services/registry";
import type { ControlStructure } from "./services/types";
type contexin = { parent: Context, bind?: string } | { context: Context };
type ComponentProps = { config: ControlStructure } & contexin;

const props = defineProps<ComponentProps>();
const state = reactive({
  component: GetComponent('control', props.config?.type),
  hide: false,
  lock: false
})

watch(() => props.config.type, () => {
  state.component = GetComponent('control', props.config?.type)
})
const context = (props as any)?.context || (props as any).parent.fork(props.config, props);
state.hide = context.state.hide;
const stateChange = () => {
  state.hide = context.state.hide;
  state.lock = context.state.lock;
};

context.addEventListener('state', stateChange)
onUnmounted(() => {
  context.removeEventListener('state', stateChange);
  if (! (props as any).context)
    context.onDestroy();
})
</script>

<template>
  <div v-if="!state.hide" :id="props.config.id" :class="props.config.class" data-renderer>
    <component :is="state.component" :config="config" :context="context" />
  </div>
</template>
