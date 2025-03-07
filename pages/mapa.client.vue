<script setup>
const { data } = useAPI('/utils/cities') 

const selectedCoordinates = ref(null)
const selectedCity = ref(null)
const selectedSubdivision = ref(null)

const citySubdivisions = computed(() => {
  if(!selectedCity.value) return []
  return selectedCity.value.subdivisions
})

watch([selectedCity], () => {
  selectedSubdivision.value = null
  selectedCoordinates.value = null
})

</script>

<template>
  <!-- <IniciativasMapList /> -->
   <div>
    <USelectMenu v-model="selectedCity" :options="data" option-attribute="name" placeholder="Seleccione una ciudad" />
    <USelectMenu v-if="selectedCity" v-model="selectedSubdivision" :options="citySubdivisions" placeholder="Seleccione una comuna, corregimiento o localidad">
      <template #option="{ option }">
        <div class="flex items-center">
          <span>{{ option.type }} {{ option.name }}</span>
        </div>
      </template>
      <template #label>
        <span v-if="selectedSubdivision">{{ selectedSubdivision.type }} {{ selectedSubdivision.name }}</span>
        <span v-else>Seleccione una comuna, corregimiento o localidad</span>
      </template>
    </USelectMenu>
    <MapSelectPosition v-if="selectedSubdivision" :key="`map-city${selectedCity.id}-subdivision-${selectedSubdivision.id}`" v-model="selectedCoordinates" :selected-subdivision="selectedSubdivision" />
   </div>
</template>