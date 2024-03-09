<script lang="ts" setup>
import { watch, ref } from 'vue';
import DataBound from './components/data-bound/DataBound.ce.vue';
import Code from './components/Code.ce.vue';
import SampleData from './samples/data.json';
import SampleConfig from './samples/config.json';
import SampleCSS from './samples/style.css?raw';
import { DataBoundConfig } from './components/data-bound/services/types';

const styletag = ref<HTMLStyleElement>();

let config = ref(SampleConfig as DataBoundConfig);
let data = ref(SampleData);
let configString = ref(JSON.stringify(SampleConfig, null, 2));
let dataString = ref(JSON.stringify(SampleData, null, 2));
let style = ref(SampleCSS);

watch([styletag, style], () => {
  if (styletag) {
    (styletag.value as any).innerHTML = style.value;
  }
})

watch(configString, () => {
  config.value = TryJson(configString.value, config.value);
})

watch(dataString, () => {
  data.value = TryJson(dataString.value, data.value);
})

function TryJson(json: string, fallback?: any) {
  try {
    return JSON.parse(json);
  } catch (error) {

  }
  return fallback;
}
function OnChange() {
  dataString.value = JSON.stringify(data.value, null, 2);
} 
</script>

<template>
  <div class="body flx">
    <component is="style" ref=styletag> </component>
    <div class="flx top-bottom">
      <div class="flx top-bottom">
        <h1 class="shrink">Config</h1>
        <Code :value=configString width="fill" height="fill" @edit="configString = $event" />
      </div>
      <div class="flx top-bottom">
        <h1 class="shrink">CSS</h1>
        <Code :value=style language="scss" width="fill" height="fill" @edit="style = $event" />
      </div>
    </div>

    <div class="flx top-bottom">
      <div class="flx top-bottom">
        <h1>Form</h1>
        <data-bound>
          <DataBound :data=data :config=config @change=OnChange></DataBound>
        </data-bound>
      </div>
      <div class="flx top-bottom">
        <h1 class="shrink">Data</h1>
        <Code :value=dataString width="fill" height="fill" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "./components/data-bound/style.scss";
</style>