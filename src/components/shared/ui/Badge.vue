<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    color?: 'primary' | 'secondary' | 'warning' | 'danger' | 'park' | 'ivr' | 'new';
    variant?: 'solid' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    className?: string;
  }>(),
  {
    color: 'primary',
    variant: 'outline',
    size: 'md',
    className: '',
  }
);

const baseClasses = `
  inline-flex items-center rounded-full font-semibold
`;

const colorClasses = {
  solid: {
    primary: 'bg-sky-500 text-white',
    secondary: 'bg-emerald-500 text-white',
    warning: 'bg-yellow-500 text-white',
    danger: 'bg-red-500 text-white',
    park: 'bg-amber-950 text-gray-800',
    ivr: 'bg-purple-600 text-white',
    new: 'bg-gray-200 text-gray-800',
  },
  outline: {
    primary: 'border border-sky-200 bg-sky-50 text-sky-700',
    secondary: 'border border-emerald-200 bg-emerald-50 text-emerald-700',
    warning: 'border border-yellow-200 bg-yellow-50 text-yellow-700',
    danger: 'border border-red-200 bg-red-50 text-red-700',
    park: 'border border-amber-200 bg-amber-100 text-amber-950',
    ivr: 'border border-purple-200 bg-purple-50 text-purple-700',
    new: 'border border-gray-300 bg-white text-gray-700'
  },
};

const sizeClasses = {
  sm: 'px-2.5 py-0.5 text-[11px]',
  md: 'px-3 py-1 text-xs',
  lg: 'px-4 py-1.5 text-sm',
};

const computedClasses = () => {
  const variant = colorClasses[props.variant] ?? colorClasses.outline;
  const color = variant[props.color] ?? variant.primary;
  const size = sizeClasses[props.size] ?? sizeClasses.md;
  return `${baseClasses} ${color} ${size} ${props.className}`.trim();
};
</script>

<template>
  <span :class="computedClasses()">
    <slot />
  </span>
</template>
