<script lang="ts">
    import { onMount } from "svelte";
    import type { ComponentContext, ContainerTabbedConfig } from "../lib/types";
    import Renderer from "../renderer.svelte";
    export let frames: ComponentContext = [];
    export let config: ContainerTabbedConfig = {} as ContainerTabbedConfig;

    let visible: ComponentContext[number];

    onMount(() => {
        visible = frames[0];
        console.log(config);
    });
</script>

<div
    id={config.id}
    class={config.class}
    data-element="container"
    data-container="tabbed"
    data-direction={config.direction || "top-bottom"}
>
    <div data-element="labels">
        {#each frames as frame, i}
            <div
                data-element="label"
                data-visible={frame == visible}
                on:click={() => (visible = frame)}
            >
                {frame.label || `Item ${i}`}
            </div>
        {/each}
    </div>
    <div data-element="viewport">
        {#each frames as frame}
            <div data-element="viewport-child" data-visible={frame == visible}>
                <Renderer
                    config={frame.config}
                    context={frame.context}
                    bind={frame.bind}
                />
            </div>
        {/each}
    </div>
</div>

<style lang="scss">
    [data-container="tabbed"] {
        display: flex;
        &[data-direction="left-right"],
        &[data-direction="right-left"] {
            align-items: start;
            [data-element="labels"] {
                display: flex;
                flex-flow: column;
            }
        }

        &[data-direction="left-right"] {
            [data-element="label"] {
                border-right: solid 2px rgba(0, 0, 0, 0);
                &[data-visible="true"] {
                    border-right: solid 2px black;
                }
            }
        }
        &[data-direction="right-left"] {
            [data-element="label"] {
                border-left: solid 2px rgba(0, 0, 0, 0);
                &[data-visible="true"] {
                    border-left: solid 2px black;
                }
            }
        }
        &[data-direction="top-bottom"] {
            [data-element="label"] {
                border-bottom: solid 2px rgba(0, 0, 0, 0);
                &[data-visible="true"] {
                    border-bottom: solid 2px black;
                }
            }
        }
        &[data-direction="bottom-top"] {
            [data-element="label"] {
                border-top: solid 2px rgba(0, 0, 0, 0);
                &[data-visible="true"] {
                    border-top: solid 2px black;
                }
            }
        }
    }
    [data-element="labels"] {
        flex: 0 1 auto;
        [data-element="label"] {
            cursor: pointer;
            display: inline-block;
            padding: 4px 8px;
        }
    }
    [data-element="viewport"] {
        flex: 1 1 auto;
        [data-element="viewport-child"] {
            display: none;
            &[data-visible="true"] {
                display: block;
            }
        }
    }
</style>
