<script lang="ts" setup>
import type { ScriptBoundConfig } from './services/types/types.ts';
import { DataController } from './services/controllers/data.ts';
import { ApplicationController } from './services/controllers/application.ts';
import { onMounted, ref } from 'vue';
import { ComponentController } from './services/controllers/component.ts';
import { AttributeController } from './services/controllers/attribute.ts';

interface ComponentProps {
  data: any;
  config: ScriptBoundConfig
}

const props = defineProps<ComponentProps>();
const container = ref<HTMLElement | null>(null);
const application = new ApplicationController(props.config, props.data);
const data = new DataController({ application, data: application.data });

onMounted(() => {
  const lock = new AttributeController({ application, data, condition: false, attribute: 'lock', lockingCondition: true });
  const component = new ComponentController({ application, data, config: props.config.layout[0], attributes: { lock } });
  const doms = component.connect();
  for (const dom of doms) {
    container.value?.appendChild(dom as any)
  }

});
</script>

<template>
  <div data-bound-application ref="container" />
</template>

<style lang="scss">
@use "./style.scss" as *;
</style>
