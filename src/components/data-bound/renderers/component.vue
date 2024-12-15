<script lang="ts" setup>
import type { ControlStructure } from "../services/types";

import { Context } from "../services/context";
import { GetComponent } from "../services/registry";

const props = defineProps<{ config: ControlStructure; context: Context }>();
const component = GetComponent('control', props.config?.type)

</script>

<template>
  <component :is="component" :config="config" :context="context" />
</template>
