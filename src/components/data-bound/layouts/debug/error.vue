<script lang="ts" setup>
import type { Context } from "../../services/context";

interface ComponentProps {
    config: any;
    context: Context;
}
defineProps<ComponentProps>();
</script>

<template>
    <div style="color:red">
        <h1>Error</h1>
        <pre>{{ JSON.stringify(config, null, 2) }}</pre>
    </div>
</template>
