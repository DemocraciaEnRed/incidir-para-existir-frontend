<script setup>
  const { $api } = useNuxtApp();

  const selectedDimension = defineModel({
    type: [Object, null],
    required: true,
    default: () => null
  })

  const toast = useToast()

  const isLoading = ref(true)
  const dimensions = ref([]) 

  const fetchData = async () => {
    isLoading.value = true
    try {
      const data = await $api('/utils/dimensions',{
        method: 'GET'
      })
      dimensions.value = data
    } catch (error) {
      console.error(error)
      toast.add({ title: 'Error', description: 'Hubo un error al cargar los ejes temáticos', color: 'red' })
    } finally {
      isLoading.value = false
    }
  }

  const clearFilter = () => {
    selectedDimension.value = null
  }

  const clearDisabled = computed(() => {
    return selectedDimension.value === null
  })

  // lifecycle hook
  onMounted(() => {
    fetchData()
  })

</script>

<template>
  <div>
    <div class="flex gap-2">
      <USelectMenu v-model="selectedDimension" class="w-full" :options="dimensions" :loading="isLoading" placeholder="Seleccione un eje temático" >
        <template #option="{ option }">
          <div class="flex items-center">
            <span>{{ option.name }}</span>
          </div>
        </template>
        <template #label>
          <span v-if="selectedDimension">{{ selectedDimension.name }}</span>
          <span v-else>Seleccione un eje temático</span>
        </template>
      </USelectMenu>
      <UButton color="white" :disabled="clearDisabled" variant="outline" @click="clearFilter">
        <UIcon name="i-heroicons-backspace" class="text-lg"/>
      </UButton>
    </div>
  </div>
</template>