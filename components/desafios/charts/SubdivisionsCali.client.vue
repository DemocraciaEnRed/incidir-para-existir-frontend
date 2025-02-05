<!-- eslint-disable @typescript-eslint/no-unused-vars -->

<script setup>
import { registerMap } from 'echarts/core';
import CaliMap from '~/assets/svg/cali.svg?raw'

provide(THEME_KEY, 'dark');
registerMap('cali_map', {svg: CaliMap});

const chartOption = ref(null);

const { data, error, status, refresh } = await useAPI('/challenges/stats/chart/count-by-subdivision/1',{
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
        text: 'Desafios por localidad en Cali',
        subtext: 'Nota: No se incluye Area Urbana'
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
            name: 'Desafios por localidad en Cali'
          }
        }
      },
      visualMap: {
        left: 'right',
        min: 0,
        max: maxValue,
        inRange: {
          color: [
          '#00000000',
          '#ff7109ff',
          ]
        },
        text: ['High', 'Low'],
        calculable: true
      },
      series: [{
        name: 'Desafios',
        type: 'map',
        roam: true,
        map: 'cali_map',
        emphasis: {
          itemStyle: {
            areaColor: null,
            borderColor: "#FFFFFF",
            borderWidth: 3,
            label: {
              show: false
            }
          },
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
    <template #footer>
      <p class="text-xs text-gray-400"><b>Este mapa es interactivo</b>: Selecciona una ciudad para explorar los desafíos reportados en detalle. Las áreas demarcadas reflejan la concentración de reportes y la intensidad de los desafíos según los colores</p>
    </template>
  </UCard>
</template>

<style scoped>
.chart {
  height: 500px;
  width: 100%;
}
</style>