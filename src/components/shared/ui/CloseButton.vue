<script setup lang="ts">
import { Icon } from '@iconify/vue';

const props = withDefaults(
  defineProps<{
    type?: 'button' | 'reset' | 'submit';
    disabled?: boolean;
    size?: 'sm' | 'md';
    withFocusRing?: boolean;
    className?: string;
    ariaLabel?: string;
  }>(),
  {
    type: 'button',
    disabled: false,
    size: 'md',
    withFocusRing: true,
    className: '',
    ariaLabel: 'Cerrar modal',
  }
);

const emit = defineEmits<{ (e: 'click', event: MouseEvent): void }>();

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-9 w-9',
};

const focusClasses = props.withFocusRing
  ? 'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-200'
  : 'focus-visible:ring-0 ring-0';

const computedClasses = () =>
  [
    'inline-flex items-center justify-center rounded-lg transition-all duration-150 ease-in-out',
    'shadow-sm hover:shadow-md hover:scale-[1.03]',
    'active:shadow-sm active:scale-[0.96]',
    'bg-sky-50 text-sky-500 ring-1 ring-slate-200 hover:bg-sky-100',
    'active:bg-red-50 active:text-red-600 active:ring-red-200',
    'disabled:opacity-60 disabled:cursor-not-allowed',
    sizeClasses[props.size] ?? sizeClasses.md,
    focusClasses,
    props.className,
  ]
    .filter(Boolean)
    .join(' ');
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :aria-label="ariaLabel"
    :class="computedClasses()"
    @click="emit('click', $event)"
  >
    <Icon icon="mdi:close" class="h-8 w-8" />
  </button>
</template>
