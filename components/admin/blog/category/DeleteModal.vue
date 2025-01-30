<script setup>
const props = defineProps({
  categories: {
    type: Array,
    required: true
  },
  categoryToDelete: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['closeModal', 'deleteEntry'])

const toast = useToast()

const selectedCategory = ref(null)

function closeModal() {
  emit('closeModal')
}

function deleteEntry() {
  if(!selectedCategory.value){
    toast.add({ title: 'Error', description: 'Debe seleccionar una categoria', color: 'red' })
    return
  }
  if(selectedCategory.value.id && selectedCategory.value.id == props.categoryToDelete.id){
    toast.add({ title: 'Error', description: 'No puede seleccionar la categoria la cual va a eliminar', color: 'red' })
    return
  }
  emit('deleteEntry', selectedCategory.value)
}
</script>

<template>
  <UModal>
    <UCard>
      <div class="space-y-2">
      <h1 class="font-oswald uppercase text-2xl mb-2">Eliminar categoría</h1>
      <p>¿Desea eliminar la categoría <span class="font-bold">{{ props.categoryToDelete.name }}</span>?</p>
      <p class="text-sm text-gray-400">Nota: Debe elegir una categoria a la cual migrar las entradas del blog que pertenecen a la categoria que va a eliminar</p>
      <USelectMenu v-model="selectedCategory" class="w-full" :options="props.categories" placeholder="Seleccione una categoria" >
        <template #option="{ option }">
          <div class="flex items-center">
            <span>{{ option.name }}</span>
          </div>
        </template>
        <template #label>
          <span v-if="selectedCategory">{{ selectedCategory.name }}</span>
          <span v-else>Seleccione una categoria</span>
        </template>
      </USelectMenu>
        <div class="flex flex-row justify-between align-middle my-3">
          <UButton variant="outline" color="white" @click="closeModal">
            Cerrar
          </UButton>
          <UButton color="red" @click="deleteEntry">
            Eliminar y migrar
          </UButton>
        </div>
      </div>
    </UCard>
  </UModal>
</template>