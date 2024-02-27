<script lang="ts">
    import { onMount } from 'svelte';
    import { SampleConfig, SampleCSS, SampleData } from '@services/sample';
    import { TryJson } from '@services/ut';
    import DataBound from '../lib/data-bound/data-bound.svelte';
    import Code from '../lib/data-bound/inputs/code.svelte';

    const data = SampleData;
    let config = SampleConfig;
    let configString = JSON.stringify(config, null, 2);
    let dataString = JSON.stringify(SampleData, null, 2);
    let styleString = SampleCSS;
    let styletag: HTMLStyleElement;
    $: {
        config = TryJson(configString, config);
        if (styletag) {
            styletag.innerHTML = styleString;
        }
    }
    let layout = { visible: true, enabled: true };
    console.log(SampleConfig);
    console.log(SampleData);

    function OnChange(e: any) {
        dataString = JSON.stringify(e.detail, null, 2);
        // console.log(e);
    }
    onMount(() => {});
</script>

<div id="swatch">
    <span class="background" />
    <span class="diffuse" />
    <span class="basic" />
    <span class="primary" />
    <span class="secondary" />
    <span class="warning" />
    <span class="positive" />
    <span class="negative" />
</div>

<div class="body flx">
    <style bind:this={styletag}></style>
    <div class="flx top-bottom">
        <div class="flx top-bottom">
            <h1 class="shrink">Config</h1>
            <Code bind:value={configString} width="fill" height="fill" />
        </div>
        <div class="flx top-bottom">
            <h1 class="shrink">CSS</h1>
            <Code bind:value={styleString} language="css" width="fill" height="fill" />
        </div>
    </div>

    <div class="flx top-bottom">
        <div class="flx top-bottom">
            <h1>Form</h1>
            <DataBound {config} {data} on:change={OnChange} />
        </div>
        <div class="flx top-bottom">
            <h1 class="shrink">Data</h1>
            <Code bind:value={dataString} width="fill" height="fill" />
        </div>
    </div>
</div>

<style lang="scss">
    .body {
        height: 100%;
        width: 100%;
    }

    h1 {
        margin: 0;
        padding: 8px 16px;
        border-bottom: solid 1px black;
        flex: 0 1 auto;
        height: auto !important;
    }

    .flx {
        display: flex;
        overflow: auto;
        margin: 0;
        padding: 0;
        & > * {
            width: 100%;
            height: 100%;
        }
        & > .shrink {
            flex: 0 1 auto;
            height: auto;
            box-sizing: border-box;
        }
        &.left-right {
            flex-direction: row;
        }

        &.right-left {
            flex-direction: row-reverse;
        }

        &.top-bottom {
            flex-direction: column;
        }

        &.bottom-top {
            flex-direction: column-reverse;
        }

        &.wrap {
            flex-wrap: wrap;
        }

        &.wrap-reverse {
            flex-wrap: wrap-reverse;
        }
    }
</style>
