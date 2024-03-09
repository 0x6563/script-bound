<script lang="ts" setup>
import { InputConfig } from '../../services/types';

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
        <div>{{ config.component?.label || '&nbsp;' }}</div>
        <input type="text" :value=value @change="OnChange($event)" />
    </label>
</template>