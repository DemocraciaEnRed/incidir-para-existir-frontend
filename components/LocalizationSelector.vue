<script setup>

  const { $api } = useNuxtApp();

  const toast = useToast()

  const selectedCity = defineModel('selectedCity', {
    type: [Object, null],
    required: true,
    default: () => null
  })

  const selectedSubdivision = defineModel('selectedSubdivision', {
    type: [Object, null],
    required: true,
    default: () => null
  })

  const isLoading = ref(true)
  const cities = ref([]) 

  const fetchData = async () => {
    isLoading.value = true
    try {
      const data = await $api('/utils/cities',{
        method: 'GET'
      })
      cities.value = data
    } catch (error) {
      console.error(error)
      toast.add({ title: 'Error', description: 'Hubo un error al cargar las ciudades', color: 'red' })
    } finally {
      isLoading.value = false
    }
  }

  const subdivisionsOptions = computed(() => {
    if(!selectedCity.value) return []
    return selectedCity.value.subdivisions
  })

  const clearCityFilter = () => {
    selectedCity.value = null
    selectedSubdivision.value = null
  }

  const clearSubdivisionFilter = () => {
    selectedSubdivision.value = null
  }

  watch([selectedCity], () => {
    selectedSubdivision.value = null
  })

  const clearCityDisabled = computed(() => {
    return selectedCity.value === null
  })

  const clearSubdivisionDisabled = computed(() => {
    return selectedSubdivision.value === null || selectedCity.value === null
  })

  // lifecycle hook
  onMounted(() => {
    fetchData()
  })

</script>

<template>
  <div class="flex gap-2 w-full md:w-8/12 md:mx-auto">
  <div class="flex gap-2 mx-auto" :class="{ 'w-1/2': selectedCity, 'w-full': !selectedCity }">
    <USelectMenu v-model="selectedCity" :options="cities" option-attribute="name" :loading="isLoading" placeholder="Filtrar por ciudad" size="lg" class="w-full" :ui-menu="{ container: 'z-[1500] group' }"/>
    <UButton color="white" :disabled="clearCityDisabled" variant="ghost" @click="clearCityFilter">
      <UIcon name="i-heroicons-backspace" class="text-lg"/>
    </UButton>
  </div>
  <div v-if="selectedCity" class="flex gap-2 mx-auto">
      <USelectMenu v-model="selectedSubdivision" :options="subdivisionsOptions" :loading="isLoading" placeholder="Filtrar por ubicación" size="lg" class="w-full" :ui-menu="{ container: 'z-[1500] group' }">
        <template #option="{ option }">
          <span>{{ option.type }} {{ option.name }}</span>
        </template>
        <template #label>
          <span v-if="selectedSubdivision">{{ selectedSubdivision.type }} {{ selectedSubdivision.name }}</span>
          <span v-else>Filtrar por ubicación</span>
        </template>
      </USelectMenu>
      <UButton color="white" :disabled="clearSubdivisionDisabled" variant="ghost" @click="clearSubdivisionFilter">
        <UIcon name="i-heroicons-backspace" class="text-lg"/>
      </UButton>
  </div>
</div>

</template>