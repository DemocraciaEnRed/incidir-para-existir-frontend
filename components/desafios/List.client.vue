<script setup>

import { DesafiosDetail } from '#components'
import debounce from 'debounce'

const slideover = useSlideover()
const toast = useToast()

const page = ref(1)
const pageCount = ref(10)
const selectedDimensions = ref([])
const selectedCity = ref(null)
const selectedSubdivision = ref(null)
const nameQuery = ref('')
const undebouncedNameQuery = ref('')
const firstLoad = ref(false)

const dimensionsIds = computed(() => {
  if (selectedDimensions.value.length === 0) return undefined
  return selectedDimensions.value.map(d => d.id)
})

const cityId = computed(() => {
  if (!selectedCity.value) return undefined
  return selectedCity.value.id
})

const subdivisionId = computed(() => {
  if (!selectedSubdivision.value) return undefined
  return selectedSubdivision.value.id
})

const nameQueryFormatted = computed(() => {
  if(!nameQuery.value) return undefined
  return nameQuery.value
})


const { data, error, status, refresh } = await useAPI('/challenges', {
  query: {
    page,
    limit: pageCount,
    dimension: dimensionsIds,
    city: cityId,
    subdivision: subdivisionId,
    q: nameQueryFormatted,
  },
  onResponse() {
    firstLoad.value = true
  }
})

const isLoading = computed(() => status.value === 'pending');

const totalItems = computed(() => {
  if (!data) return 0
  return data.value.count
})

const goToDetail = (id) => {
  slideover.open(DesafiosDetail, {
    desafioId: id,
    onClose: slideover.close
  })
}

watch([selectedDimensions], () => {
  page.value = 1
  refresh()
})

watch([selectedCity, selectedSubdivision], () => {
  page.value = 1
  refresh()
})

/**
 * Debounce the name query
 */
 const changeNameQuery = debounce(() => {
  nameQuery.value = undebouncedNameQuery.value
  page.value = 1
  refresh()
}, 1000)

/**
 * Watch the undebounced name query
 */
watch(undebouncedNameQuery, (newValue, oldValue) => {
  if (newValue != oldValue) {
    changeNameQuery()
  }
})

const clearFilters = () => {
  selectedDimensions.value = []
  selectedCity.value = null
  selectedSubdivision.value = null
  undebouncedNameQuery.value = ''
  nameQuery.value = ''
  page.value = 1
  refresh()
}

</script>

<template>
  <div>
    <LoadingBar v-if="!firstLoad">Loading...</LoadingBar>
    <div v-else-if="error">{{ error.message }}</div>
    <div v-else>
      <p class="text-center text-sm my-3 font-medium">Filtrar por nombre</p>
      <UInput v-model="undebouncedNameQuery" placeholder="Escriba aqui..." size="lg" class="w-full md:w-4/12 md:mx-auto " />
      <p class="text-center text-sm my-3 font-medium">Filtrar por ubicación</p>
      <LocalizationSelector v-model:selected-city="selectedCity" v-model:selected-subdivision="selectedSubdivision" />
      <p class="text-center text-sm my-3 font-medium">Filtrar por eje temático (Hasta 1)</p>
      <DimensionesBadgesSelector v-model="selectedDimensions" :limit="1" />
      <UDivider class="my-7" />
      <div v-for="row in data.rows" :key="`desafio-id-${row.id}`" class="flex items-center gap-4 rounded-xl my-2 px-5 py-3 border bg-gray-900 hover:bg-gray-800 border-slate-800 transition-colors duration-200">
        <div class="grow w-9/12">
          <div class="flex-wrap flex flex-row items-center font-inter gap-x-2 mb-2">
            <p 
          class="text-xs text-white border-r pr-2 border-purple-500" 
          >#{{ addLeadingZeros(row.id) }}</p>
          <p
          class="text-xs uppercase text-white border-r pr-2 border-purple-500" 
          >
            {{ row.subdivision.city.name }}
          </p>
          <p
          class="text-xs text-white border-r pr-2 border-purple-500" 
          >
            {{ row.subdivision.type }} {{ row.subdivision.name }}
          </p>
          <p
            class="text-xs text-mindaro truncate" 
          >{{ row.dimension.name }}</p>
          </div>
          <p class="font-bold font-inter text-xl cursor-pointer hover:text-mindaro transition-colors duration-500"  @click="goToDetail(row.id)" >{{ row.inWords }}</p>
          <p class="text-sm font-inter text-gray-500 truncate">{{ row.needsAndChallenges }}</p>
        </div>
        <UButton  icon="i-heroicons-arrow-right-circle" variant="soft" :ui="{ rounded: 'rounded-full' }"  size="xl" class="ml-3" @click="goToDetail(row.id)" />
      </div>

      <div class="flex justify-between items-center">
        <p v-if="!isLoading" class="text-gray-600 text-sm">Total: {{ totalItems }}</p>
        <UProgress v-if="isLoading" class="mr-4" animation="carousel" color="mindaro" />
        <UPagination v-model="page" :page-count="pageCount" :total="totalItems" />
      </div>
    </div>
  </div>
</template>
