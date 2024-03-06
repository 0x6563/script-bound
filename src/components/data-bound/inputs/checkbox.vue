<script lang="ts" setup>
withDefaults(defineProps<{
    value: boolean
}>(), {
    value: false
})
const emit = defineEmits<{ change: [boolean] }>()
</script>

<template>
    <input type="checkbox" :value=value @change="emit('change', value)" />
</template>