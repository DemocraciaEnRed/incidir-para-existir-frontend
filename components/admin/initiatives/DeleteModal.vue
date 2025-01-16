<script setup>
defineProps({
  initiative: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['closeModal', 'deleteInitiative'])

function closeModal() {
  emit('closeModal')
}

function deleteInitiative() {
  emit('deleteInitiative')
}
</script>

<template>
  <UModal>
    <UCard>
      <div class="space-y-2">
      <h1 class="font-oswald uppercase text-2xl mb-2">Eliminar iniciativa</h1>
      <p>¿Desea eliminar la iniciativa <span class="font-bold">{{ initiative.name }}</span>?</p>

        <div class="flex flex-row justify-between align-middle">
          <UButton variant="outline" color="white" @click="closeModal">
            Cerrar
          </UButton>
          <UButton color="red" @click="deleteInitiative">
            Eliminar
          </UButton>
        </div>
      </div>
    </UCard>
  </UModal>
</template>