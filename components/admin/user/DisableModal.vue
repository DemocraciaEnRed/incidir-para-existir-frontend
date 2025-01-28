<script setup>
defineProps({
  user: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['closeModal', 'disableUser'])

function closeModal() {
  emit('closeModal')
}

function disableUser() {
  emit('disableUser')
}
</script>

<template>
  <UModal>
    <UCard>
      <div class="space-y-2">
      <h1 class="font-oswald uppercase text-2xl mb-2">Deshabilitar usuario</h1>
      <p>¿Desea deshabilitar el siguiente usuario?</p>
      <p class="text-xs text-gray-500 whitespace-pre-wrap">{{ user.fullName }}</p>
        <div class="flex flex-row justify-between align-middle">
          <UButton variant="outline" color="white" @click="closeModal">
            Cerrar
          </UButton>
          <UButton color="red" @click="disableUser">
            Deshabilitar
          </UButton>
        </div>
      </div>
    </UCard>
  </UModal>
</template>