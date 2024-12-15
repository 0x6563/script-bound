<script lang="ts" setup>
import type { InputConfig } from '../../services/types';

withDefaults(defineProps<{
    config: InputConfig<{ label?: string }>
    value: string
}>(), {
    value: ''
})
const emit = defineEmits<{ change: [string] }>()
function OnChange(e: any) {
    emit('change', e?.target?.value)
}
</script>

<template>
    <label>
        <input type="text" :value=value @change="OnChange($event)" placeholder=" " />
        <div data-bound-label>{{ config.settings?.label || '&nbsp;' }}</div>
    </label>
</template>