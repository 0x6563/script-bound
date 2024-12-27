import { defineCustomElement } from 'vue'
import ScriptBoundComponent from '../components/script-bound-dom/script-bound.ce.vue'

const ScriptBound = defineCustomElement(ScriptBoundComponent);

customElements.define('script-bound', ScriptBound);