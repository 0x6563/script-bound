import { defineCustomElement } from 'vue'
import DataBoundComponent from './components/data-bound/DataBound.ce.vue'

const DataBound = defineCustomElement(DataBoundComponent)

customElements.define('data-bound', DataBound)