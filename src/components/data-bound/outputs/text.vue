<script lang="ts" setup>
withDefaults(defineProps<{
    value: string
}>(), {
    value: ''
})

</script>

<template>
    {{ value }}
</template>
