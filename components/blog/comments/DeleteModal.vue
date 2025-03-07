<script setup>
defineProps({
  entry: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['closeModal', 'deleteEntry'])

function closeModal() {
  emit('closeModal')
}

function deleteEntry() {
  emit('deleteEntry')
}
</script>

<template>
  <UModal>
    <UCard>
      <div class="space-y-2">
      <h1 class="font-oswald uppercase text-2xl mb-2">Eliminar comentario</h1>
      <p>¿Desea eliminar el comentario?</p>

        <div class="flex flex-row justify-between align-middle">
          <UButton variant="outline" color="white" @click="closeModal">
            Cerrar
          </UButton>
          <UButton color="red" @click="deleteEntry">
            Eliminar
          </UButton>
        </div>
      </div>
    </UCard>
  </UModal>
</template>