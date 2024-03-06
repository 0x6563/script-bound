<script lang="ts" setup>
import type { Context } from "./services/context";
import type {
  InputConfig,
  ListConfig,
  OutputConfig,
  SectionConfig,
} from "./services/types";

import Input from "./layouts/input.vue";
import Output from "./layouts/output.vue";
import Section from "./layouts/section.vue";
import List from "./layouts/list.vue";
import { computed } from "vue";

interface ComponentProps {
  context: Context;
  bind: string | undefined;
  config:
  | SectionConfig
  | ListConfig
  | InputConfig
  | OutputConfig
  | any
}
const props = withDefaults(
  defineProps<ComponentProps>(),
  {
    bind: undefined,
  }
) as unknown as ComponentProps;


let layouts: { enabled: boolean; visible: boolean } = {
  visible: true,
} as any;

let localContext = props.context;
const registry: { [key: string]: any } = {
  section: Section,
  input: Input,
  list: List,
  output: Output,
};
const directions = ["left-right", "right-left", "top-bottom", "bottom-top"];
const wraps = ["nowrap", "wrap", "wrap-reverse"];
const direction = computed(() =>
  props.config.type == "input"
    ? ""
    : directions.includes(props.config.direction?.toLowerCase() as string)
      ? props.config.direction!.toLowerCase()
      : "left-right");
const wrap = computed(() =>
  props.config.type == "input"
    ? ""
    : wraps.includes(props.config.wrap?.toLowerCase() as string)
      ? props.config.wrap!.toLowerCase()
      : "nowrap");

if (typeof props.bind != "undefined" && props.config.type != "input") {
  localContext = props.context.fork(props.bind);
} else if (props.config.bind && props.config.type != "input") {
  localContext = props.context.fork(props.config.bind);
} else {
  localContext = props.context;
}
</script>

<template>
  <div v-if="layouts.visible && config" :id=config.id :class=config.class :data-layout=config.type
    data-element="layout">
    <div data-element="header">{{ config.header || "" }}</div>
    <div data-element="content" :data-direction=direction :data-wrap=wrap>
      <component :is=registry[config.type] :config=config :context=localContext :layout=layouts />
    </div>

    <div data-element="footer">{{ config.footer || "" }}</div>
  </div>
</template>

<style lang="scss"></style>
