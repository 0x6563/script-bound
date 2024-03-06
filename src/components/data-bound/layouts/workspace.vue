<script lang="ts" setup>
import type { ComponentContext, WorkspaceConfig } from "../services/types";
import Multi from "../containers/multi.vue";
import Single from "../containers/single.vue";
import Tabbed from "../containers/tabbed.vue";
import type { Context } from "../services/context";

interface ComponentProps {
    config: WorkspaceConfig;
    context: Context;
}
const props = defineProps<ComponentProps>();

let frames: ComponentContext = [];
let type = "single";



export function OpenFrame(label: string, layout: string, bind: string) {
    const frame = {
        label,
        context: props.context,
        bind,
        config: props.context.application.layout(layout),
    };
    frames.push(frame);
    return frame;
}
export function CloseFrame(frame: (typeof frames)[number]) {
    const i = frames.indexOf(frame);
    if (i >= 0) {
        frames.splice(i, 1);
    }
}

const registry: { [key: string]: any } = {
    multi: Multi,
    single: Single,
    tabbed: Tabbed,
};
</script>

<template>
    <component :is=registry[type] :config=null :frames=frames />
</template>
