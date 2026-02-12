import { ref } from 'vue'

export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
  actions?: {
    label: string
    action: () => void
    variant?: 'primary' | 'secondary'
  }[]
}

const notifications = ref<Notification[]>([])

export const useNotifications = () => {
  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const newNotification: Notification = {
      id,
      duration: 5000,
      ...notification
    }

    notifications.value.push(newNotification)

    // Auto-remove after duration (unless it has actions)
    if (newNotification.duration && !newNotification.actions) {
      setTimeout(() => {
        removeNotification(id)
      }, newNotification.duration)
    }

    return id
  }

  const removeNotification = (id: string) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  const clearAll = () => {
    notifications.value = []
  }

  // Helper methods for common notification types
  const success = (title: string, message?: string, duration: number = 5000) => {
    return addNotification({ type: 'success', title, message, duration })
  }

  const error = (title: string, message?: string, duration: number = 5000) => {
    return addNotification({ type: 'error', title, message, duration })
  }

  const warning = (title: string, message?: string, duration: number = 5000) => {
    return addNotification({ type: 'warning', title, message, duration })
  }

  const info = (title: string, message?: string, duration: number = 5000) => {
    return addNotification({ type: 'info', title, message, duration })
  }

  const confirm = (title: string, message?: string): Promise<boolean> => {
    return new Promise((resolve) => {
      addNotification({
        type: 'warning',
        title,
        message,
        actions: [
          {
            label: 'Cancelar',
            action: () => resolve(false),
            variant: 'secondary'
          },
          {
            label: 'Confirmar',
            action: () => resolve(true),
            variant: 'primary'
          }
        ]
      })
    })
  }

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    success,
    error,
    warning,
    info,
    confirm
  }
}