<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    loading?: boolean;
    disabled?: boolean;
    ariaLabel?: string;
    title?: string;
    className?: string;
    iconClass?: string;
  }>(),
  {
    loading: false,
    disabled: false,
    ariaLabel: 'Recargar',
    title: '',
    className: '',
    iconClass: 'w-4 h-4',
  }
);

const emit = defineEmits(['click']);

const isDisabled = computed(() => props.disabled || props.loading);
const buttonClass = computed(() => `management-refresh-btn ${props.className}`.trim());

const handleClick = (event: MouseEvent) => {
  if (isDisabled.value) return;
  emit('click', event);
};
</script>

<template>
  <button
    type="button"
    :disabled="isDisabled"
    :class="buttonClass"
    :aria-label="ariaLabel"
    :title="title || ariaLabel"
    @click="handleClick"
  >
    <svg
      :class="iconClass + (loading ? ' animate-spin' : '')"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  </button>
</template>
