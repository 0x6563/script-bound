<script lang="ts" setup>
import type { ComponentContext, ConstrolStructureComponentProps } from "../../services/types";
import Multi from "../lists/multi.vue";
import Single from "../lists/single.vue";
import Tabbed from "../lists/tabs.vue";

const props = defineProps<ConstrolStructureComponentProps>();

let items: ComponentContext = [];
let type = "single";



export function OpenFrame(label: string, layout: string, bind: string) {
    const item = {
        label,
        context: props.context,
        bind,
        layout: props.context.application.layout(layout),
    };
    items.push(item);
    return item;
}
export function CloseFrame(item: (typeof items)[number]) {
    const i = items.indexOf(item);
    if (i >= 0) {
        items.splice(i, 1);
    }
}

const registry: { [key: string]: any } = {
    single: Single,
    multi: Multi,
    tabs: Tabbed,
};
</script>

<template>
    <component :is=registry[type] :config=null :items=items />
</template>