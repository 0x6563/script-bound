<script lang="ts" setup>
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
const state = reactive<{
  config?: any,
  data: any,
  render: string
}>({
  config: undefined,
  data: SampleData,
  render: 'Rendered'
})

let configString = ref(SampleXML);
let dataString = ref(JSON.stringify(SampleData, null, 2));

$cinterval.pipe(debounceTime(2000)).subscribe((value) => {
  state.config = undefined;
  setTimeout(() => {
    state.config = ParseConfigString(value);
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
    <div class="flx">
      <div class="flx top-bottom">
        <h1>Editor</h1>
        <Code :value=configString language="xmlplus" width="fill" height="fill" @edit="configString = $event" />
      </div>
    </div>

    <div class="flx top-bottom">
      <h1>
        <Toggle :value="state.render" :options="['CST', 'AST', 'Data', 'Rendered',]" @change="state.render = $event" />
      </h1>
      <ScriptBound v-if="state.render == 'Rendered' && state.config?.ast" :data=state.data :config=state.config.ast
        @change=OnChange />
      <Code v-if="state.render == 'AST'" :value=state.config?.ast width="fill" height="fill" :readonly=true />
      <Code v-if="state.render == 'CST'" :value=state.config?.cst width="fill" height="fill" :readonly=true />
      <Code v-if="state.render == 'Data'" :value=dataString width="fill" height="fill" @edit="dataString = $event" />
    </div>
  </div>
</template>

<style lang="scss">
@use "./components/script-bound-dom/style.scss" as *;
</style>