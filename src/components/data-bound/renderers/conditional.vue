<script lang="ts" setup>
import { onUnmounted, reactive } from "vue";
import { Context } from "../services/context";

const props = defineProps<{ context: Context }>();
const state = reactive({ hide: props.context.state.hide })

const stateChange = () => { state.hide = props.context.state.hide; };

props.context.addEventListener('state', stateChange)

onUnmounted(() => {
  props.context.removeEventListener('state', stateChange);
})

</script>

<template>
  <template v-if="!state.hide">
    <slot />
  </template>
</template>