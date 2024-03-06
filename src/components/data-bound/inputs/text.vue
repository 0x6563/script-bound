<script lang="ts" setup>
withDefaults(defineProps<{
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
    <input type="text" :value=value @change="OnChange($event)" />
</template>