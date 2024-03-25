<script lang="ts" setup>
import { watch, ref, reactive } from 'vue';
import DataBound from './components/data-bound/data-bound.ce.vue';
import Code from './components/code.ce.vue';
import SampleData from './samples/data.json';
import SampleXML from './samples/sample.xml?raw';
import { ParseConfigString } from './services/config';
import { DataBoundConfig } from './components/data-bound/services/types';
import { Subject, debounceTime } from 'rxjs';

const $cinterval = new Subject<string>();
const styletag = ref<HTMLStyleElement>();
const state = reactive<{
  config?: DataBoundConfig,
  data: any,
  mode: string,
}>({
  config: undefined,
  data: SampleData,
  mode: 'form'
})

let configString = ref(SampleXML);
let dataString = ref(JSON.stringify(SampleData, null, 2));

$cinterval.pipe(debounceTime(2000)).subscribe((value) => {
  state.config = ParseConfigString(value);
  (styletag.value as any).innerHTML = state.config?.style;
})

watch(configString, () => ($cinterval.next(configString.value)), { immediate: true })

watch(dataString, () => {
  state.data = TryJson(dataString.value, state.data);
})
function NextItem(current: string, items: string[]) {
  return items[(items.indexOf(current) + 1) % items.length]
}

function TryJson(json: string, fallback?: any) {
  try {
    return JSON.parse(json);
  } catch (error) {

  }
  return fallback;
}
function OnChange() {
  dataString.value = JSON.stringify(state.data, null, 2);
} 
</script>

<template>
  <div class="body flx">
    <component is="style" ref=styletag> </component>
    <div class="flx">
      <div class="flx top-bottom">
        <h1 class="shrink">Config</h1>
        <Code :value=configString language="html" width="fill" height="fill" @edit="configString = $event" />
      </div>
    </div>

    <div class="flx top-bottom">
      <h1 v-on:click="state.mode = NextItem(state.mode, ['form', 'data', 'config'])"> {{ state.mode }}</h1>
      <DataBound v-if="state.mode == 'form' && state.config" :data=state.data :config=state.config @change=OnChange>
      </DataBound>
      <Code v-if="state.mode == 'data'" :value=dataString width="fill" height="fill" @edit="dataString = $event" />
      <Code v-if="state.mode == 'config'" :value=state.config width="fill" height="fill" />
    </div>
  </div>
</template>

<style lang="scss">
@import "./components/data-bound/style.scss";
</style>