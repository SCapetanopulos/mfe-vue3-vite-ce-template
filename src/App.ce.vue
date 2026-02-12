<script setup lang="ts">
// Props que el host le puede pasar como atributos del custom element.
// Ej: <__CE_TAG__ mfe-title="..." mfe-subtitle="..."></__CE_TAG__>
const props = defineProps<{
  mfeTitle?: string;
  mfeSubtitle?: string;
}>();
</script>

<template>
  <section class="p-4 rounded-lg border border-slate-200">
    <header class="mb-3">
      <h2 class="text-xl font-semibold">
        {{ props.mfeTitle ?? "MFE en blanco" }}
      </h2>
      <p class="text-sm text-slate-600">
        {{ props.mfeSubtitle ?? "Edita src/App.ce.vue para empezar" }}
      </p>
    </header>

    <div class="text-sm">
      <p>
        Tag: <code>__CE_TAG__</code>
      </p>
      <p class="mt-2">
        Este es un punto de partida limpio para crear MFEs de Usuarios, Servicios, etc.
      </p>
    </div>
  </section>
</template>
