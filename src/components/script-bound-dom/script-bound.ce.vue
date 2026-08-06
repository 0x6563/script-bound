<script lang="ts" setup>
import type { ScriptBoundConfig } from './services/types/types.ts';
import { DataController } from './services/controllers/data.ts';
import { ApplicationController } from './services/controllers/application.ts';
import { onMounted, ref } from 'vue';
import { ComponentController } from './services/controllers/component.ts';
import { AttributeController } from './services/controllers/attribute.ts';
import type { ElementNodeLike } from './services/elements.ts';

interface ComponentProps {
  data: any;
  config: ScriptBoundConfig
}

const props = defineProps<ComponentProps>();
const container = ref<HTMLElement | null>(null);
const styletag = ref<HTMLStyleElement>();

const application = new ApplicationController(props.config, props.data);
const data = new DataController({ application, data: application.data });
onMounted(() => {
  const lock = new AttributeController({ data, attribute: { type: 'json', value: false } });
  const component = new ComponentController({ application, data, node: props.config.layout[0], attributes: { lock }, parentNode: container.value as unknown as ElementNodeLike});
  (styletag.value as any).innerHTML = props.config?.style;
});
</script>

<template>
  <div data-bound-application ref="container" />
  <component is="style" ref=styletag> </component>
</template>

<style lang="scss">
@use "./style.scss" as *;
</style>
