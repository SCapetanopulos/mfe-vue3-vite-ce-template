<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    currentPage: number;
    totalPages: number;
    disabled?: boolean;
    showButtonText?: boolean;
    prevLabel?: string;
    nextLabel?: string;
    prevAriaLabel?: string;
    nextAriaLabel?: string;
    prevTitle?: string;
    nextTitle?: string;
    prevDisabled?: boolean;
    nextDisabled?: boolean;
    className?: string;
    buttonClass?: string;
    pageTextClass?: string;
    pageSizeSelectClass?: string;
    showPageSize?: boolean;
    pageSize?: number;
    pageSizeOptions?: number[];
    pageSizeLabel?: string;
    pageSizeSelectId?: string;
    pageSizeDisabled?: boolean;
    pageSizeOptionLabel?: (value: number) => string;
  }>(),
  {
    disabled: false,
    showButtonText: false,
    prevLabel: 'Anterior',
    nextLabel: 'Siguiente',
    prevAriaLabel: '',
    nextAriaLabel: '',
    prevTitle: '',
    nextTitle: '',
    prevDisabled: false,
    nextDisabled: false,
    className: '',
    buttonClass: '',
    pageTextClass: '',
    pageSizeSelectClass: '',
    showPageSize: false,
    pageSize: undefined,
    pageSizeOptions: () => [5, 10, 25, 50],
    pageSizeLabel: 'Filas:',
    pageSizeSelectId: '',
    pageSizeDisabled: false,
    pageSizeOptionLabel: undefined,
  }
);

const emit = defineEmits(['prev', 'next', 'page-size-change']);

const isPrevDisabled = computed(() => props.disabled || props.prevDisabled || props.currentPage <= 1);
const isNextDisabled = computed(() => props.disabled || props.nextDisabled || props.currentPage >= props.totalPages);
const isPageSizeDisabled = computed(() => props.disabled || props.pageSizeDisabled);

const resolvedPageSizeOptions = computed(() => {
  const options = props.pageSizeOptions?.filter((value) => Number(value) > 0) ?? [];
  return options.length ? options : [5, 10, 25, 50];
});

const resolvedPageSize = computed(() => {
  if (typeof props.pageSize === 'number' && !Number.isNaN(props.pageSize)) {
    return props.pageSize;
  }
  return resolvedPageSizeOptions.value[0] ?? 10;
});

const pageText = computed(() => {
  const total = props.totalPages > 0 ? props.totalPages : 1;
  return `Pagina ${props.currentPage} de ${total}`;
});

const containerClasses = `
  flex flex-wrap items-center justify-between gap-3
`;

const controlsClasses = `
  inline-flex items-center gap-2
`;

const buttonClasses = `
  inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-2
  text-xs font-semibold text-slate-700 transition
  hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50
`;

const handlePageSizeChange = (event: Event) => {
  const target = event.target as HTMLSelectElement | null;
  if (!target) return;
  const value = Number(target.value);
  if (!Number.isNaN(value)) {
    emit('page-size-change', value);
  }
};
</script>

<template>
  <div :class="`${containerClasses} ${className}`.trim()">
    <div v-if="showPageSize" class="flex items-center gap-2 text-sm text-slate-500">
      <label v-if="pageSizeSelectId" :for="pageSizeSelectId">{{ pageSizeLabel }}</label>
      <span v-else>{{ pageSizeLabel }}</span>
      <select
        :id="pageSizeSelectId || undefined"
        :value="resolvedPageSize"
        :disabled="isPageSizeDisabled"
        :class="`rounded-lg border border-slate-200 px-2 py-1 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 ${pageSizeSelectClass}`.trim()"
        @change="handlePageSizeChange"
      >
        <option v-for="option in resolvedPageSizeOptions" :key="option" :value="option">
          {{ pageSizeOptionLabel ? pageSizeOptionLabel(option) : option }}
        </option>
      </select>
    </div>

    <div :class="controlsClasses">
      <button
        type="button"
        :disabled="isPrevDisabled"
        :class="`${buttonClasses} ${buttonClass}`.trim()"
        :aria-label="prevAriaLabel || prevLabel"
        :title="prevTitle || prevLabel"
        @click="emit('prev')"
      >
        <slot name="prev-icon">
          <span aria-hidden="true">&lt;</span>
        </slot>
        <span v-if="showButtonText">{{ prevLabel }}</span>
      </button>

      <span :class="`text-sm text-slate-600 ${pageTextClass}`.trim()">
        <slot name="page-text">{{ pageText }}</slot>
      </span>

      <button
        type="button"
        :disabled="isNextDisabled"
        :class="`${buttonClasses} ${buttonClass}`.trim()"
        :aria-label="nextAriaLabel || nextLabel"
        :title="nextTitle || nextLabel"
        @click="emit('next')"
      >
        <span v-if="showButtonText">{{ nextLabel }}</span>
        <slot name="next-icon">
          <span aria-hidden="true">&gt;</span>
        </slot>
      </button>
    </div>
  </div>
</template>
