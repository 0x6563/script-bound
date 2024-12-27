<script lang="ts" setup>
import type { ScriptBoundConfig  } from './services/types.ts';
import { Render } from './render.ts';
import { Context } from './services/context.ts';
import { DataBoundApplication } from './services/application.ts';
import { onMounted, ref } from 'vue';
import { config } from 'rxjs';

interface ComponentProps {
  data: any;
  config: ScriptBoundConfig
}

const props = defineProps<ComponentProps>();
const container = ref<HTMLElement | null>(null);
let application = new DataBoundApplication(props.config, props.data);
let context = new Context({ data: application.data, application });

onMounted(() => {
  console.log(application,config);
  container.value?.appendChild(Render(application, props.config.layouts.main as any, context) as HTMLElement)

});
</script>

<template>
  <div data-bound-application ref="container" />
</template>

<style lang="scss">
@use "./style.scss" as *;
</style>
