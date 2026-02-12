<script setup lang="ts">
import ComponenteMuestra from './components/ComponenteMuestra.vue'
</script>

<template>
  <ComponenteMuestra
    titulo="Ejemplo dentro de App.ce.vue"
    mensaje-inicial="Este texto se envia desde App.ce.vue"
  />
</template>

<style>
@import './output.css';
</style>