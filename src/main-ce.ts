import { defineCustomElement } from "vue";
import App from "./App.ce.vue";

// Tag principal del MFE (convención fija)
const tag = "__CE_TAG__";

// Registramos el custom element una sola vez
if (!customElements.get(tag)) {
  customElements.define(tag, defineCustomElement(App));
}
