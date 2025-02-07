
<script setup>


const { data, status } = await useAPI('/challenges/stats/bar/count-by-dimension')

const isLoading = computed(() => status.value === 'pending');

const dataCali = computed(() => {
  if(data.value) {
    return data.value.filter((item) => item.cityId === 1)
  }
  return []
})

const totalCali = computed(() => {
  if(dataCali.value) {
    return dataCali.value.reduce((acc, item) => acc + item.value, 0)
  }
  return 0
})

const dataBogota = computed(() => {
  if(data.value) {
    return data.value.filter((item) => item.cityId === 2)
  }
  return []
})

const totalBogota = computed(() => {
  if(dataBogota.value) {
    return dataBogota.value.reduce((acc, item) => acc + item.value, 0)
  }
  return 0
})

const colorScale = [
  // "orange",
  // "amber",
  // "yellow",
  // "lime",
  // "green",
  // "emerald",
  // "teal",
  // "cyan",
  // "sky",
  // "blue",
  // "indigo",
  // "violet",
  // "purple",
  // "fuchsia",
  // "pink",
  // "rose",
  // "pumpkin",
  // "electric-violet",
  // "mindaro",
  // "primary"  
  
  "yellow",
  "green",
  "primary",
  "red",
  "sky",
]


</script>

<template>
  <UCard v-if="!isLoading">
    <UMeterGroup v-if="dataCali.length > 0" size="md" :min="0" :max="100" icon="i-heroicons-arrow-right-20-solid" :ui="{ list: 'flex flex-wrap justify-center gap-x-5 gap-y-1' }">
      <template #indicator="{ percent }">
        <div class="flex gap-1.5 justify-between text-sm">
          <p class="text-lg font-medium uppercase">Cali</p>
          <p class="text-gray-500 dark:text-gray-400">
            {{totalCali}} de {{ totalCali + totalBogota }} Reportes
          </p>
        </div>
      </template>
      <UMeter v-for="(item, index) in dataCali" :key="`cali-${index}`" :value="item.percentage" :label="item.dimensionName" indicator :color="colorScale[index % colorScale.length]"/>
    </UMeterGroup>

    <UDivider class="my-6" />
    <UMeterGroup v-if="dataBogota.length > 0" size="md" :min="0" :max="100" icon="i-heroicons-arrow-right-20-solid" :ui="{ list: 'flex flex-wrap justify-center gap-x-5 gap-y-1' }">
      <template #indicator="{ percent }">
        <div class="flex gap-1.5 justify-between text-sm">
          <p class="text-lg font-medium uppercase">Bogotá</p>
          <p class="text-gray-500 dark:text-gray-400">
            {{totalBogota}} de {{ totalCali + totalBogota }} Reportes
          </p>
        </div>
      </template>
      <UMeter v-for="(item, index) in dataBogota" :key="`bogota-${index}`" :value="item.percentage" :label="item.dimensionName" :color="colorScale[index % colorScale.length]"/>
    </UMeterGroup>
  </UCard>
</template>

<style scoped>
.chart {
  height: 500px;
  width: 100%;
}
</style>