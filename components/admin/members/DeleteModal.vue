<script setup>
defineProps({
  member: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['closeModal', 'deleteMember'])

function closeModal() {
  emit('closeModal')
}

function deleteMember() {
  emit('deleteMember')
}
</script>

<template>
  <UModal>
    <UCard>
      <div class="space-y-2">
      <h1 class="font-oswald uppercase text-2xl mb-2">Eliminar miembro</h1>
      <p>¿Desea eliminar a <span class="font-bold">{{ member.fullname }}</span>?</p>

        <div class="flex flex-row justify-between align-middle">
          <UButton variant="outline" color="white" @click="closeModal">
            Cerrar
          </UButton>
          <UButton color="red" @click="deleteMember">
            Eliminar
          </UButton>
        </div>
      </div>
    </UCard>
  </UModal>
</template>