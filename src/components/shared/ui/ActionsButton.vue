<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    type?: 'button' | 'reset' | 'submit';
    disabled?: boolean;
    color?: 'primary' | 'secondary' | 'warning' | 'info' | 'danger' | 'park' | 'ivr' | 'new';
    variant?: 'solid' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    withFocusRing?: boolean;
    className?: string;
  }>(),
  {
    type: 'button',
    disabled: false,
    color: 'primary',
    variant: 'solid',
    size: 'md',
    withFocusRing: true,
    className: '',
  }
);

const emit = defineEmits(['click']);

const baseClasses = `
  inline-flex items-center justify-center font-semibold rounded-lg
  transition-all duration-150 ease-in-out
  outline-none focus:outline-none focus-visible:outline-none
  disabled:opacity-60 disabled:cursor-not-allowed
  shadow-md
  hover:shadow-lg hover:scale-[1.03]
  active:shadow-sm active:scale-[0.96] active:translate-y-[1px]
`;

const focusClasses = props.withFocusRing
  ? 'focus-visible:ring-2 focus-visible:ring-offset-2'
  : 'focus-visible:ring-0 ring-0';

const colorClasses = {
  solid: {
    primary: 'bg-sky-500 text-white hover:bg-sky-600 focus-visible:ring-sky-50',
    secondary: 'bg-emerald-500 text-white hover:bg-emerald-600 focus-visible:ring-emerald-50',
    warning: 'bg-yellow-500 text-white hover:bg-yellow-600 focus-visible:ring-yellow-50',
    info: 'bg-cyan-500 text-white hover:bg-cyan-700 focus-visible:ring-cyan-50',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-50',
    park: 'bg-amber-950 text-gray-800 hover:bg-amber-900 focus-visible:ring-amber-900/30',
    ivr: 'bg-purple-600 text-white hover:bg-purple-700 focus-visible:ring-purple-50',
    new: 'bg-gray-700 text-white hover:bg-gray-900 focus-visible:ring-gray-50',
  },
  outline: {
    primary: 'border border-sky-500 bg-sky-50 text-sky-700 hover:bg-sky-100 focus-visible:ring-sky-200',
    secondary: 'border border-emerald-500 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 focus-visible:ring-emerald-200',
    warning: 'border border-yellow-500 bg-yellow-50 text-yellow-700 hover:bg-yellow-100 focus-visible:ring-yellow-200',
    info: 'border border-cyan-500 bg-cyan-50 text-cyan-700 hover:bg-cyan-100 focus-visible:ring-cyan-200',
    danger: 'border border-red-500 bg-red-50 text-red-700 hover:bg-red-100 focus-visible:ring-red-200',
    park: 'border border-amber-900 bg-amber-100 text-amber-950 hover:bg-amber-200 focus-visible:ring-amber-900/30',
    ivr: 'border border-purple-600 bg-purple-50 text-purple-700 hover:bg-purple-100 focus-visible:ring-purple-200',
    new: 'border border-gray-700 bg-gray-100 text-gray-700 hover:bg-gray-200 focus-visible:ring-gray-200',
  },
};

const sizeClasses = {
  sm: 'px-3 py-1 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-3 text-md',
};

const computedClasses = () => {
  const variant = colorClasses[props.variant] ?? colorClasses.solid;
  const color = variant[props.color] ?? variant.primary;
  const size = sizeClasses[props.size] ?? sizeClasses.md;
  return `${baseClasses} ${focusClasses} ${color} ${size} ${props.className}`.trim();
};

const handleClick = (e: { preventDefault: () => void; stopPropagation: () => void; }) => {
  if (props.type !== 'submit') {
    e.preventDefault?.();
  }
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
    <slot />
  </button>
</template>
