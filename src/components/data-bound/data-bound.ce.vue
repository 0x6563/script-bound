<script lang="ts" setup>
import Renderer from './renderer.vue';
import type { DataBoundConfig } from './services/types';
import { Context } from './services/context';
import { DataBoundApplication } from './services/application';
import { watch } from 'vue';

interface ComponentProps {
  data: any;
  config: DataBoundConfig
}
const props = defineProps<ComponentProps>();
const emit = defineEmits<{ change: [any] }>()
let application = new DataBoundApplication(props.config, props.data);
let context = new Context({ data: application.data, application });

watch(props, () => {
  application = new DataBoundApplication(props.config, props.data);
  context = new Context({ data: application.data, application });
})
application.observer.watch(application.data, () => {
  emit('change', application.data);
});

</script>

<template>
  <div data-bound-application>
    <Renderer :config=config.layouts.main :parent=context />
  </div>
</template>

<style lang="scss">
@use "./style.scss" as *;
</style>
