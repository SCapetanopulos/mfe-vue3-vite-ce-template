<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    type?: 'button' | 'reset' | 'submit';
    disabled?: boolean;
    color?: 'primary' | 'secondary' | 'warning' | 'danger' | 'park' | 'ivr';
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
  inline-flex items-center justify-center rounded-full
  font-medium transition-all duration-150 ease-in-out
  outline-none focus:outline-none focus-visible:outline-none
  disabled:opacity-50 disabled:pointer-events-none
  border-2
  shadow-md
  hover:shadow-lg hover:scale-[1.03]
  active:shadow-sm active:scale-[0.96] active:translate-y-[1px]
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
  },
  outline: {
    primary: 'text-sky-600 border-sky-500 bg-sky-50 hover:bg-sky-100 focus-visible:ring-sky-200',
    secondary: 'text-emerald-600 border-emerald-500 bg-emerald-50 hover:bg-emerald-100 focus-visible:ring-emerald-200',
    warning: 'text-yellow-600 border-yellow-500 bg-yellow-50 hover:bg-yellow-100 focus-visible:ring-yellow-200',
    danger: 'text-red-600 border-red-500 bg-red-50 hover:bg-red-100 focus-visible:ring-red-200',
    park: 'text-amber-950 border-amber-900 bg-amber-100 hover:bg-amber-200 focus-visible:ring-amber-900/30',
    ivr: 'text-purple-700 border-purple-600 bg-purple-50 hover:bg-purple-100 focus-visible:ring-purple-200',
  },
};

const sizeClasses = {
  sm: 'p-2 text-xs aspect-square',
  md: 'p-3 text-sm aspect-square',
  lg: 'p-4 text-base aspect-square',
};

const computedClasses = () => {
  const variant = colorClasses[props.variant] ?? colorClasses.solid;
  const color = variant[props.color] ?? variant.primary;
  const size = sizeClasses[props.size] ?? sizeClasses.md;
  return `${baseClasses} ${focusClasses} ${color} ${size} ${props.className}`.trim();
};

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
    <slot />
  </button>
</template>
