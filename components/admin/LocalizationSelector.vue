<script setup>
  const selectedCity = defineModel({
    type: [Object, null],
    required: true,
    default: () => null
  })

  const selectedSubdivision = defineModel({
    type: [Object, null],
    required: true,
    default: () => null
  })

  const selectedCoordinates = defineModel({
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
      toast.add({ title: 'Error', description: 'Hubo un error al cargar las seccións de blog', color: 'red' })
    } finally {
      isLoading.value = false
    }
  }

  const subdivisionsOptions = computed(() => {
    if(!selectedCity.value) return []
    return selectedCity.value.subdivisions
  })

  // lifecycle hook
  onMounted(() => {
    fetchData()
  })

</script>

<template>
  <div>

  <UFormGroup label="Seleccione la ciudad" name="city" required>
    <USelectMenu v-model="selectedCity" :options="cities" option-attribute="name" placeholder="Seleccione una ciudad" size="lg" :ui-menu="{ container: 'z-[1500] group' }"/>
  </UFormGroup>
  <UFormGroup v-if="selectedCity" class="" label="Seleccione la ubicación" name="subdivision" required>
    <USelectMenu v-model="selectedSubdivision" :options="subdivisionsOptions" placeholder="Seleccione la ubicación" size="lg" :ui-menu="{ container: 'z-[1500] group' }">
      <template #option="{ option }">
        <span>{{ option.type }} {{ option.name }}</span>
      </template>
      <template #label>
        <span v-if="selectedSubdivision">{{ selectedSubdivision.type }} {{ selectedSubdivision.name }}</span>
        <span v-else>Seleccione la ubicación</span>
      </template>
    </USelectMenu>
  </UFormGroup>
  <UFormGroup label="Ubicación en el mapa" class="w-full">
    <template #description>
      <p><b class="text-pumpkin">Opcional</b>. Haga clic para marcar la ubicación en el mapa. Si no tiene una ubicación específica, puede dejar el mapa sin marcar.</p>
    </template>
    <MapSelectPosition v-if="selectedSubdivision" :key="`map-city-${selectedCity.id}-subdivision-${selectedSubdivision.id}`" v-model="selectedCoordinates" :selected-subdivision="selectedSubdivision" />
  </UFormGroup>
  </div>

</template>