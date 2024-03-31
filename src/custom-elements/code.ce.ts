import { defineCustomElement } from 'vue'
import CodeComponent from '../components/monaco.ce.vue';

const Code = defineCustomElement(CodeComponent);

customElements.define('code', Code);