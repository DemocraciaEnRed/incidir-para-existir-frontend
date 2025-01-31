<script setup>

import { IniciativasDetail } from '#components'

const slideover = useSlideover()
const toast = useToast()

const page = ref(1)
const pageCount = ref(10)
const selectedDimensions = ref([])
const nameQuery = ref('')
const firstLoad = ref(false)

const dimensionsIds = computed(() => {
  if (selectedDimensions.value.length === 0) return null
  return selectedDimensions.value.map(d => d.id)
})

const { data, error, status, refresh } = await useAPI('/initiatives', {
  query: {
    page,
    limit: pageCount,
    dimension: dimensionsIds,
    q: nameQuery
  },
  onResponse() {
    firstLoad.value = true
  }
})

const isLoading = computed(() => status.value === 'pending');

const lastPage = computed(() => {
  if (!data) return 0
  return Math.ceil(data.count / pageCount.value)
})

const goToDetail = (id) => {
  slideover.open(IniciativasDetail, {
    iniciativaId: id,
    onClose: slideover.close
  })
}

watch([selectedDimensions], () => {
  page.value = 1
  refresh()
})

</script>

<template>
  <div>
    <LoadingBar v-if="!firstLoad">Loading...</LoadingBar>
    <div v-else-if="error">{{ error.message }}</div>
    <div v-else>
      <p class="text-center text-sm mb-3 font-medium">Filtrar por eje temático (Hasta 2)</p>
      <DimensionesBadgesSelector v-model="selectedDimensions" :limit="2"/>
      <br>
      <div class="flex justify-between gap-4 mt-5">    
        <UButton variant="outline" size="xl" color="mindaro" :disabled="page === 1" @click="page--">Anterior</UButton>
        <UButton variant="outline" size="xl" color="mindaro" :disabled="page === lastPage" @click="page++">Siguiente</UButton>
      </div>
      <div v-for="row in data.rows" :key="`iniciativa-id-${row.id}`" class="flex items-center gap-4 rounded-xl my-2 px-5 py-3 border border-slate-800">
        <div class="grow w-9/12">
          <div class="space-x-2 flex flex-row items-center font-inter">
            <!-- <UBadge 
            v-for="(dimension, index) in row.dimensions" 
            :key="`iniciativa-${row.id}-dimension-${dimension.id}`"
            color="mindaro"
            variant="subtle"
            :ui="{ rounded: 'rounded-full' }">
            {{ dimension.name }}
          </UBadge> -->
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
            v-for="(dimension, index) in row.dimensions"
            :key="`iniciativa-${row.id}-dimension-${dimension.id}`"
            class="text-xs text-mindaro truncate" 
            :class="{ 'border-r pr-2 border-purple-500' : index !== row.dimensions.length - 1 }"
          >{{ dimension.name }}</p>
          </div>
          <p class="font-bold font-inter text-xl cursor-pointer hover:text-mindaro transition-colors duration-500"  @click="goToDetail(row.id)" >{{ row.name }}</p>
          <p class="text-sm font-inter text-gray-500 truncate">{{ row.description }}</p>
        </div>
        <UButton  icon="i-heroicons-arrow-right-circle" variant="soft" :ui="{ rounded: 'rounded-full' }"  size="xl" class="ml-3" @click="goToDetail(row.id)" />
      </div>
      <div class="flex justify-between gap-4 mt-5">    
        <UButton variant="outline" size="xl" color="mindaro" :disabled="page === 1" @click="page--">Anterior</UButton>
        <UButton variant="outline" size="xl" color="mindaro" :disabled="page === lastPage" @click="page++">Siguiente</UButton>
      </div>
      <div v-if="isLoading" class="mt-3">
        <LoadingBar>Loading...</LoadingBar>
      </div>
    </div>
  </div>
</template>
