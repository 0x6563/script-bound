<script lang="ts">
    import { beforeUpdate } from "svelte";
    import type { Context } from "./lib/context";
    import type {
        InputConfig,
        ListConfig,
        OutputConfig,
        SectionConfig,
    } from "./lib/types";

    import Input from "./layout/input.svelte";
    import Output from "./layout/output.svelte";
    import Section from "./layout/section.svelte";
    import List from "./layout/list.svelte";

    export let config:
        | SectionConfig
        | ListConfig
        | InputConfig
        | OutputConfig
        | any;
    export let context: Context;
    export let bind: string | undefined = undefined;
    let layout: { enabled: boolean; visible: boolean } = {
        visible: true,
    } as any;

    let localContext;
    const registry = {
        section: Section,
        input: Input,
        list: List,
        output: Output,
    };
    const directions = ["left-right", "right-left", "top-bottom", "bottom-top"];
    const wraps = ["nowrap", "wrap", "wrap-reverse"];
    $: direction =
        config.type == "input"
            ? ""
            : directions.includes(config.direction?.toLowerCase() as string)
              ? config.direction!.toLowerCase()
              : "left-right";
    $: wrap =
        config.type == "input"
            ? ""
            : wraps.includes(config.wrap?.toLowerCase() as string)
              ? config.wrap!.toLowerCase()
              : "nowrap";

    beforeUpdate(() => {
        if (typeof bind != "undefined" && config.type != "input") {
            localContext = context.fork(bind);
        } else if (config.bind && config.type != "input") {
            localContext = context.fork(config.bind);
        } else {
            localContext = context;
        }
    });
</script>

{#if layout.visible && config}
    <div
        id={config.id}
        class={config.class}
        data-element="layout"
        data-layout={config.type}
    >
        <div data-element="header">{config.header || ""}</div>
        <div data-element="content" data-direction={direction} data-wrap={wrap}>
            <svelte:component
                this={registry[config.type]}
                {config}
                context={localContext}
                {layout}
            />
        </div>

        <div data-element="footer">{config.footer || ""}</div>
    </div>
{/if}

<style lang="scss">
    [data-layout="input"] {
        [data-element="header"],
        [data-element="footer"] {
            &:empty {
                &:before {
                    content: "\00a0\00a0";
                }
            }
        }
    }
    [data-element="footer"] {
        font-size: 0.75em;
    }
</style>
