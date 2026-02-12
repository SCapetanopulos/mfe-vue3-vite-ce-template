<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  titulo?: string
  mensajeInicial?: string
}

const props = withDefaults(defineProps<Props>(), {
  titulo: 'Componente de muestra',
  mensajeInicial: 'Hola desde ComponenteMuestra.vue'
})

const contador = ref(0)

const mensajeComputado = computed(() => {
  return `${props.mensajeInicial} | clicks: ${contador.value}`
})

const incrementar = () => {
  contador.value += 1
}
</script>

<template>
  <section class="mt-4 rounded-lg border border-slate-300 bg-slate-50 p-4">
    <h2 class="mb-2 text-xl font-semibold">{{ titulo }}</h2>

    <p class="text-sm text-slate-700">
      Este componente recibe props, usa estado local (<code>ref</code>) y una propiedad derivada (<code>computed</code>).
    </p>

    <p class="mt-2 text-slate-900">{{ mensajeComputado }}</p>

    <button
      type="button"
      class="mt-2 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm hover:bg-slate-100"
      @click="incrementar"
    >
      Sumar 1
    </button>
  </section>
</template>

<style>
@import '../output.css';
</style>