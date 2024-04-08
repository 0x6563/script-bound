<script lang="ts" setup>
import type { ControlStructure } from "./services/types";

import { onUnmounted } from "vue";
import { Context } from "./services/context";
import ConditionalRender from './renderers/conditional.vue';
import ComponentRender from './renderers/component.vue';

type ComponentProps = { config: ControlStructure } & ({ parent: Context, bind?: string } | { context: Context });

const props = defineProps<ComponentProps>();
const context = (props as any)?.context || (props as any).parent.fork(props.config, props);

onUnmounted(() => {
  if (!(props as any).context)
    context.onDestroy();
})
</script>

<template>
  <ConditionalRender :context="context">
    <div :id="props.config.id" :class="props.config.class" data-renderer>
      <ComponentRender :config="config" :context="context" />
    </div>
  </ConditionalRender>
</template>