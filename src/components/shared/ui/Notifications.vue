<template>
  <div class="pointer-events-none fixed right-4 top-4 z-50 flex w-full max-w-sm flex-col gap-3">
    <div
      v-for="notification in notifications"
      :key="notification.id"
      class="pointer-events-auto rounded-2xl border p-4 shadow-xl"
      :class="typeStyles[notification.type]"
    >
      <div class="flex items-start justify-between gap-3">
        <div>
          <p class="text-sm font-semibold" :class="typeText[notification.type]">
            {{ notification.title }}
          </p>
          <p v-if="notification.message" class="mt-1 text-xs text-slate-600">
            {{ notification.message }}
          </p>
        </div>
        <button
          class="rounded-full p-1 text-slate-400 transition hover:text-slate-600"
          type="button"
          @click="removeNotification(notification.id)"
        >
          <span class="sr-only">Cerrar</span>
          ✕
        </button>
      </div>

      <div v-if="notification.actions?.length" class="mt-3 flex flex-wrap gap-2">
        <button
          v-for="action in notification.actions"
          :key="action.label"
          type="button"
          class="rounded-full px-3 py-1 text-xs font-semibold transition"
          :class="action.variant === 'secondary'
            ? 'border border-slate-200 text-slate-600 hover:border-slate-300'
            : 'bg-slate-900 text-white hover:bg-slate-800'"
          @click="handleAction(notification.id, action.action)"
        >
          {{ action.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useNotifications } from '../../../composables/useNotifications';

const { notifications, removeNotification } = useNotifications();

const typeStyles = computed(() => ({
  success: 'border-emerald-500 bg-emerald-50',
  error: 'border-red-500 bg-red-50',
  warning: 'border-yellow-500 bg-yellow-50',
  info: 'border-cyan-500 bg-cyan-50',
}));

const typeText = computed(() => ({
  success: 'text-emerald-700',
  error: 'text-red-700',
  warning: 'text-yellow-700',
  info: 'text-cyan-700',
}));

const handleAction = (id: string, action: () => void) => {
  action();
  removeNotification(id);
};
</script>
