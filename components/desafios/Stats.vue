<script setup>
const { $api } = useNuxtApp()

const isLoading = ref(false)

onMounted(async () => {
  getInitData()
})

const dimensions = ref([])
const cities = ref([])
const challengesStats = ref({})
const dataFetchDone = ref(false)

const getInitData = async () => {
  isLoading.value = true
  try {
    const [dimensionsData, citiesData, theStatsData] = await Promise.all([
      $api('/utils/dimensions'),
      $api('/utils/cities'),
      $api('/challenges/stats')
    ])
    dimensions.value = dimensionsData
    cities.value = citiesData
    challengesStats.value = theStatsData
    dataFetchDone.value = true
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

</script>

<template>
  <div>
    <UCard v-if="isLoading">
      <UProgress />
    </UCard>
    <div v-else>
      <div class="grid grid-cols-1 gap-1">
        <DesafiosChartsDimensions v-if="challengesStats.radarData" :graph-data="challengesStats.radarData"/>
      </div>
    </div>
  </div>
</template>