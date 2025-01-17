<script lang="ts" setup>
import type { ScriptBoundConfig } from './components/script-bound-dom/services/types/types';
import { watch, ref, reactive } from 'vue';
import ScriptBound from './components/script-bound-dom/script-bound.ce.vue';
import Code from './components/monaco.ce.vue';
import Toggle from './components/toggle.vue';
import SampleData from './samples/data.json';
import SampleXML from './samples/sample.xml?raw';
import { Subject, debounceTime } from 'rxjs';
import { ParseConfigString } from './components/script-bound-dom/services/config';
import './services/syntax-highlight';

const $cinterval = new Subject<string>();
const styletag = ref<HTMLStyleElement>();
const state = reactive<{
  config?: ScriptBoundConfig,
  data: any,
  render: string,
  editor: string;
}>({
  config: undefined,
  data: SampleData,
  render: 'Form',
  editor: 'XML'
})

let configString = ref(SampleXML);
let dataString = ref(JSON.stringify(SampleData, null, 2));

$cinterval.pipe(debounceTime(2000)).subscribe((value) => {
  state.config = undefined;
  setTimeout(() => {
    state.config = ParseConfigString(value);
    (styletag.value as any).innerHTML = state.config?.style;
  }, 50)
})

watch(configString, () => ($cinterval.next(configString.value)), { immediate: true })

watch(dataString, () => {
  state.data = TryJson(dataString.value, state.data);
})

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
        <h1>
          <Toggle :value="state.editor" :options="['XML', 'JSON']" @change="state.editor = $event" />
        </h1>
        <Code v-if="state.editor == 'XML'" :value=configString language="xmlplus" width="fill" height="fill"
          @edit="configString = $event" />
        <Code v-if="state.editor == 'JSON'" :value=state.config width="fill" height="fill" :readonly=true />
      </div>
    </div>

    <div class="flx top-bottom">
      <h1>
        <Toggle :value="state.render" :options="['Form', 'JSON']" @change="state.render = $event" />
      </h1>
      <ScriptBound v-if="state.render == 'Form' && state.config" :data=state.data :config=state.config @change=OnChange />
      <Code v-if="state.render == 'JSON'" :value=dataString width="fill" height="fill" @edit="dataString = $event" />
    </div>
  </div>
</template>

<style lang="scss">
@use "./components/script-bound-dom/style.scss" as *;
</style>./components/monaco.ce.vue./components/code.ce.vue