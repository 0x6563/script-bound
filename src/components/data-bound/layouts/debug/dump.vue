<script lang="ts" setup>
import type { OutputConfig } from "../../services/types";
import type { Context } from "../../services/context";

interface ComponentProps {
    config: OutputConfig;
    context: Context;
}
defineProps<ComponentProps>();
</script>

<template>
    <div>
        <pre>{{ JSON.stringify(config, null, 2) }}</pre>
    </div>
</template>
