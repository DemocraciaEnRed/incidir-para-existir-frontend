
<script setup>

const chartOption = ref(null);

const { data, error, status, refresh } = await useAPI('/initiatives/stats/chart/count-by-dimension',{
  onResponse({ request, response, options }) {
    const chartData = response._data;
    chartOption.value = {
      backgroundColor: 'transparent',
      title: {
        text: 'Cantidad de iniciativas por dimensiones',
        subtext: 'Cada serie representa una ciudad',
        top: 0,
        left: 0
      },
      legend: {
        data: chartData.legendData,
        right: 0,
        bottom: 0
      },
      tooltip: {
        trigger: 'item',
        showDelay: 0,
        transitionDuration: 0.2,
        textStyle: {
          fontFamily: 'Inter',
          color: 'white',
          lineHeight: 10,
          fontSize: 14
        },
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {
            show: true,
            title: 'Descargar',
            name: 'Iniciativas por localidad en Bogotá'
          },
        }
      },
      radar: {
        // shape: 'circle',
        indicator: chartData.radarIndicator,

      },
      series: [
        {
          name: 'Ejes tematicos Cali Vs. Bogotá',
          type: 'radar',
          data: chartData.radar.data
        }
      ]
    }
  }
})

provide(THEME_KEY, 'dark');

const isLoading = computed(() => status.value === 'pending');

</script>

<template>
  <UCard>
    <UProgress v-if="isLoading" />
    <VChart class="chart" :option="chartOption" autoresize />
    <UDivider class="my-6" />
    <p class="text-gray-600 text-sm text-center">Nota: Hay iniciativas que pueden estar clasificadas en más de un eje temático</p>
  </UCard>
</template>

<style scoped>
.chart {
  height: 500px;
  width: 100%;
}
</style>