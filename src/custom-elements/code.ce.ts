import { defineCustomElement } from 'vue'
import CodeComponent from '../components/Code.ce.vue';

const Code = defineCustomElement(CodeComponent);

customElements.define('code', Code);