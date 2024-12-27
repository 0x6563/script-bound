import { defineCustomElement } from 'vue'
import ScriptBoundComponent from '../components/script-bound-v2/script-bound.ce.vue'

const ScriptBound = defineCustomElement(ScriptBoundComponent);

customElements.define('script-bound', ScriptBound);