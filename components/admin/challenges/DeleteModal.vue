<script setup>
defineProps({
  challenge: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['closeModal', 'deleteChallenge'])

function closeModal() {
  emit('closeModal')
}

function deleteChallenge() {
  emit('deleteChallenge')
}
</script>

<template>
  <UModal>
    <UCard>
      <div class="space-y-2">
      <h1 class="font-oswald uppercase text-2xl mb-2">Eliminar desafio</h1>
      <p>¿Desea eliminar el siguiente desafio?</p>
      <p class="text-xs text-gray-500 whitespace-pre-wrap">{{ challenge.needsAndChallenges }}</p>
        <div class="flex flex-row justify-between align-middle">
          <UButton variant="outline" color="white" @click="closeModal">
            Cerrar
          </UButton>
          <UButton color="red" @click="deleteChallenge">
            Eliminar
          </UButton>
        </div>
      </div>
    </UCard>
  </UModal>
</template>