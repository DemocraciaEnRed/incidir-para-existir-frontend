<script setup>
defineProps({
  user: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['closeModal', 'enableUser'])

function closeModal() {
  emit('closeModal')
}

function enableUser() {
  emit('enableUser')
}
</script>

<template>
  <UModal>
    <UCard>
      <div class="space-y-2">
      <h1 class="font-oswald uppercase text-2xl mb-2">Habilitar usuario</h1>
      <p>¿Desea habilitar el siguiente usuario?</p>
      <p class="text-xs text-gray-500 whitespace-pre-wrap">{{ user.fullName }}</p>
        <div class="flex flex-row justify-between align-middle">
          <UButton variant="outline" color="white" @click="closeModal">
            Cerrar
          </UButton>
          <UButton color="red" @click="enableUser">
            Habilitar
          </UButton>
        </div>
      </div>
    </UCard>
  </UModal>
</template>