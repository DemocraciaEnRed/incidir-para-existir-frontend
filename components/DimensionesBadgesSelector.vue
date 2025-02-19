<script setup>
  const { $api } = useNuxtApp();

  const selectedDimensions = defineModel({
    type: Array,
    required: true,
    default: () => []
  })

  const props = defineProps({
    limit: {
      type: Number,
      default: () => 1
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

  const getBadgeColor = (dimension) => {
    if(selectedDimensions.value.includes(dimension)) {
      return 'mindaro'
    }
    return 'mindaro'
  }

  const getVariant = (dimension) => {
    if(selectedDimensions.value.includes(dimension)) {
      return 'solid'
    }
    return 'soft'
  }

  const addDimension = (dimension) => {
    if(selectedDimensions.value.includes(dimension)) {
      selectedDimensions.value = selectedDimensions.value.filter(d => d !== dimension)
    } else {
      selectedDimensions.value = [...selectedDimensions.value, dimension]
    }
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
    if(newValue.length > props.limit) {
      toast.add({ title: 'Error', description: `Solo puedes filtrar hasta ${props.limit} ${props.limit > 1 ? 'ejes temáticos' : 'eje temático'}`, color: 'red' })
      selectedDimensions.value = oldValue
    }
  })
</script>

<template>
  <div>
    <div class="flex justify-center flex-wrap items-center gap-2">
      <UBadge v-for="(dimension, index) in dimensions" size="lg" :key="`dimension-${dimension.id}`" 
      :ui="{ rounded: 'rounded-full' }"
      class="cursor-pointer select-none"
      :color="getBadgeColor(dimension)" :variant="getVariant(dimension)" @click="addDimension(dimension)">
        {{ dimension.name }}
      </UBadge>
      <!-- <UButton color="white" :disabled="clearDisabled" variant="outline" @click="clearFilter">
        <UIcon name="i-heroicons-backspace" class="text-lg"/>
      </UButton> -->
    </div>
  
  </div>
</template>