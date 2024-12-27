
<script setup>
import { registerMap } from 'echarts/core';
import BogotaMap from '~/assets/svg/bogota.svg?raw'

registerMap('bogota_map', {svg: BogotaMap})

provide(THEME_KEY, 'dark');

const chartOption = ref(null);

const { data, error, status, refresh } = await useAPI('/challenges/stats/chart/count-by-subdivision/2',{
  onResponse({ request, response, options }) {
    const graphData = response._data;
    const graphDataAux = graphData.map((item) => { 
      return {
        name: item.subdivisionName,
        value: item.count
      }
    })
    const maxValue = Math.max(...graphDataAux.map((item) => item.value))
    chartOption.value = {
      backgroundColor: 'transparent',
      title: {
        text: 'Desafios por localidad en Bogota',
      },
      tooltip: {
        trigger: 'item',
        showDelay: 0,
        transitionDuration: 0.2
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {
            show: true,
            title: 'Descargar',
            name: 'Desafios por localidad en Bogota'
          },
        }
      },
      visualMap: {
        left: 'right',
        min: 0,
        max: maxValue,
        inRange: {
          color: [
            '#fff7ed',
            '#ffeed4',
            '#ffd8a8',
            '#ffbc70',
            '#ff9437',
            '#ff7109',
            '#f05906',
            '#c74207',
            '#9e340e',
            '#7f2d0f',
          ]
        },
        text: ['High', 'Low'],
        calculable: true
      },
      series: [{
        name: 'Desafios',
        type: 'map',
        map: 'bogota_map',
        emphasis: {
          label: {
            show: false
          }
        },

        data: graphDataAux
      }]
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
  </UCard>
</template>

<style scoped>
.chart {
  height: 500px;
  width: 100%;
}
</style>