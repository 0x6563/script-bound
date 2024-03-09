<script lang="ts" setup>
withDefaults(defineProps<{
    value: string
}>(), {
    value: ''
})

</script>
<template>
    <div v-html=value> </div>
</template>
