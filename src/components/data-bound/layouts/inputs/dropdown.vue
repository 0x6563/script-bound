<script lang="ts" setup>
withDefaults(defineProps<{
    value: string
}>(), {
    value: ''
})
const emit = defineEmits<{ change: [string] }>()
</script>

<template>
    <select :value=value @change="emit('change', value)">
        <option value="" />
    </select>
</template>
