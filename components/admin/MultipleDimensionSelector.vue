<script setup>
  const { $api } = useNuxtApp();

  const selectedDimensions = defineModel({
    type: Array,
    required: true,
    default: () => []
  })

  const props = defineProps({
    showBadges: {
      type: Boolean,
      default: () => true
    }
  })

  const toast = useToast()

  const isLoading = ref(true)
  const dimensions = ref([]) 

  const fetchDimensions = async () => {
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
    selectedDimensions.value = []
  }

  const clearDisabled = computed(() => {
    return selectedDimensions.value.length === 0
  })

  // lifecycle hook
  onMounted(() => {
    fetchDimensions()
  })

  // make a watcher that avoids selecting more than 2 dimensions
  watch(selectedDimensions, (newValue, oldValue) => {
    if(newValue.length > 2) {
      toast.add({ title: 'Error', description: 'Solo puedes seleccionar hasta 2 ejes temáticos', color: 'red' })
      selectedDimensions.value = oldValue
    }
  })
</script>

<template>
  <div>
    <div class="flex gap-2">
      <USelectMenu v-model="selectedDimensions" class="w-full" :options="dimensions" :loading="isLoading" placeholder="Seleccione uno o dos ejes temáticos" multiple>
        <template #option="{ option }">
          <div class="flex items-center">
            <span>{{ option.name }}</span>
          </div>
        </template>
        <template #label>
          <span v-if="selectedDimensions.length">{{ selectedDimensions.length }} Ejes seleccionados</span>
          <span v-else>Seleccione uno o dos ejes temáticos</span>
        </template>
      </USelectMenu>
      <UButton color="white" :disabled="clearDisabled" variant="outline" @click="clearFilter">
        <UIcon name="i-heroicons-backspace" class="text-lg"/>
      </UButton>
    </div>
    <div v-if="props.showBadges" class="flex flex-wrap gap-2 mt-2 items-center">
      <p class="text-xs text-gray-400">Ejes temáticos</p>
      <UBadge v-for="dimension in selectedDimensions" :key="dimension.id" variant="soft" color="amber">
        <UIcon name="i-heroicons-x-mark" class="text-red-500 cursor-pointer" @click="selectedDimensions = selectedDimensions.filter(d => d.id !== dimension.id)" />
        {{ dimension.name }} 
      </UBadge>
    </div>
  </div>
</template>