<script setup>
  const { $api } = useNuxtApp();

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



  const toast = useToast()

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
      toast.add({ title: 'Error', description: 'Hubo un error al cargar las localidades', color: 'red' })
    } finally {
      isLoading.value = false
    }
  }

  
  const getNullOption = () => {
    let nameString = 'Cualquier ubicación / No aplica'
    if(selectedCity.value && selectedCity.value.name === 'Cali') {
      nameString = 'Cualquier comuna o corregimiento / No aplica'
    } else if(selectedCity.value && selectedCity.value.name === 'Bogotá') {
      nameString = 'Cualquier localidad / No aplica'
    }
    const nullOption = {
      id: null,
      name: nameString,
      type: '(No ubicable)'
    }
    return nullOption
  }
  
  // const clearDisabled = computed(() => {
  //   return selected.value === null
  // })
  // const clearFilter = () => {
  //   selected.value = null
  // }
    
  const subdivisionsOptions = computed(() => {
    if(!selectedCity.value) return []
    // filtered subdivisions
    const nullOption = getNullOption()
    const cityWithSubdivisions = cities.value.find(city => city.id === selectedCity.value.id)
    if(!cityWithSubdivisions) return [nullOption]
    return [nullOption, ...cityWithSubdivisions.subdivisions]
  })

  watch(() => selectedCity.value, () => {
    const nullOption = getNullOption()
    selectedSubdivision.value = nullOption
  })


  // lifecycle hook
  onMounted(() => {
    fetchData()
  })

  onBeforeMount(() => {
    console.log('selectedCity', selectedCity.value)
    console.log('selectedSubdivision', selectedSubdivision.value)
    if(!selectedSubdivision.value){
      const nullOption = getNullOption()
      selectedSubdivision.value = nullOption
    }
  })

</script>

<template>
  <div v-if="!isLoading" class="flex flex-col gap-2">
    <div>
      <p class="text-xs text-gray-400">Seleccione la ciudad</p>
      <USelectMenu v-model="selectedCity" :options="cities" class="w-full" option-attribute="name" placeholder="Seleccione una ciudad" :ui-menu="{ container: 'z-[1500] group' }" />
    </div>
    <div v-if="selectedCity">
    <p class="text-xs text-gray-400">Seleccione, si corresponde, la comuna, corregimiento, o localidad</p>
      <USelectMenu v-model="selectedSubdivision" class="w-full" :options="subdivisionsOptions" placeholder="Seleccione una comuna, corregimiento o localidad de Cali o Bogotá" :ui-menu="{ container: 'z-[1500] group' }" >
        <template #option="{ option }">
          <div class="flex items-center">
            <span>{{ option.type }} {{ option.name }} </span>
          </div>
        </template>
        <template #label>
          <span v-if="selectedSubdivision">{{ selectedSubdivision.type }} {{ selectedSubdivision.name }}</span>
          <span v-else>Seleccione una comuna, corregimiento o localidad de Cali o Bogotá</span>
        </template>
      </USelectMenu>
      <!-- <UButton color="white" :disabled="clearDisabled" variant="outline" @click="clearFilter">
        <UIcon name="i-heroicons-backspace" class="text-lg"/>
      </UButton> -->
    </div>
  </div>
  <LoadingBar v-else />
</template>