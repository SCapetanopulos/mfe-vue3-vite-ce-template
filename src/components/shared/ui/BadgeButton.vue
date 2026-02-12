<script setup lang="ts">
import { computed, useSlots } from 'vue';

const props = withDefaults(
  defineProps<{
    type?: 'button' | 'reset' | 'submit';
    disabled?: boolean;
    active?: boolean;
    color?: 'primary' | 'secondary' | 'warning' | 'danger' | 'park' | 'ivr' | 'new';
    variant?: 'solid' | 'outline';
    size?: 'sm' | 'md';
    withFocusRing?: boolean;
    className?: string;
    count?: number | string | null;
    countLocale?: string;
    countClass?: string;
  }>(),
  {
    type: 'button',
    disabled: false,
    active: false,
    color: 'primary',
    variant: 'outline',
    size: 'md',
    withFocusRing: true,
    className: '',
    count: null,
    countLocale: 'es-CL',
    countClass: 'text-[11px] font-semibold opacity-80',
  }
);

const emit = defineEmits(['click']);
const slots = useSlots();

const baseClasses = `
  inline-flex items-center gap-2 rounded-full border
  font-semibold transition-all duration-150 ease-in-out
  active:scale-[0.97] active:translate-y-[1px]
  disabled:opacity-60 disabled:cursor-not-allowed
`;

const focusClasses = props.withFocusRing
  ? 'focus-visible:ring-2 focus-visible:ring-offset-2'
  : 'focus-visible:ring-0 ring-0';

const colorClasses = {
  solid: {
    primary: 'bg-sky-500 text-white border-transparent hover:bg-sky-600 focus-visible:ring-sky-50',
    secondary: 'bg-emerald-500 text-white border-transparent hover:bg-emerald-600 focus-visible:ring-emerald-50',
    warning: 'bg-yellow-500 text-white border-transparent hover:bg-yellow-600 focus-visible:ring-yellow-50',
    danger: 'bg-red-500 text-white border-transparent hover:bg-red-600 focus-visible:ring-red-50',
    park: 'bg-amber-950 text-gray-800 border-transparent hover:bg-amber-900 focus-visible:ring-amber-900/30',
    ivr: 'bg-purple-600 text-white border-transparent hover:bg-purple-700 focus-visible:ring-purple-50',
    new: 'bg-gray-200 text-gray-700 border-transparent hover:bg-gray-300 focus-visible:ring-gray-50',
  },
  outline: {
    primary: 'border-sky-500 bg-sky-50 text-sky-700 hover:bg-sky-100 focus-visible:ring-sky-200',
    secondary: 'border-emerald-500 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 focus-visible:ring-emerald-200',
    warning: 'border-yellow-500 bg-yellow-50 text-yellow-700 hover:bg-yellow-100 focus-visible:ring-yellow-200',
    danger: 'border-red-500 bg-red-50 text-red-700 hover:bg-red-100 focus-visible:ring-red-200',
    park: 'border-amber-900 bg-amber-100 text-amber-950 hover:bg-amber-200 focus-visible:ring-amber-900/30',
    ivr: 'border-purple-600 bg-purple-50 text-purple-700 hover:bg-purple-100 focus-visible:ring-purple-200',
    new: 'border-gray-500 bg-white text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-200',
  },
};

const sizeClasses = {
  sm: 'px-3 py-1 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-3 text-md',
};

const computedClasses = () => {
  const variantKey = props.active ? 'solid' : props.variant;
  const variant = colorClasses[variantKey] ?? colorClasses.outline;
  const color = variant[props.color] ?? variant.primary;
  const size = sizeClasses[props.size] ?? sizeClasses.md;
  return `${baseClasses} ${focusClasses} ${color} ${size} ${props.className}`.trim();
};

const formattedCount = computed(() => {
  if (props.count === null || props.count === undefined) return '';
  if (typeof props.count === 'number') {
    return props.count.toLocaleString(props.countLocale);
  }
  return String(props.count);
});

const hasTrailing = computed(() => props.count !== null && props.count !== undefined || !!slots.trailing);

const handleClick = (e: MouseEvent) => {
  if (props.type !== 'submit') e.preventDefault?.();
  e.stopPropagation?.();
  emit('click', e);
};
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="computedClasses()"
    @click="handleClick"
  >
    <span v-if="$slots.leading" class="inline-flex items-center">
      <slot name="leading" />
    </span>
    <span v-if="$slots.default" class="inline-flex items-center">
      <slot />
    </span>
    <span v-if="hasTrailing" :class="countClass">
      <slot name="trailing">{{ formattedCount }}</slot>
    </span>
  </button>
</template>
