<script lang="ts" setup>
import type { Context } from "../services/context";
import type { SectionConfig } from "../services/types";
import Renderer from "../Renderer.vue";

interface ComponentProps {
    config: SectionConfig;
    context: Context;
}
defineProps<ComponentProps>();

</script>

<template>
    <Renderer v-for="section in config.sections" :config=section :context=context />
</template>
