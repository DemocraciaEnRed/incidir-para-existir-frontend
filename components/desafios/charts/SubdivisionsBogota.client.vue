<!-- eslint-disable @typescript-eslint/no-unused-vars -->

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
        text: 'Reportes por localidad en Bogotá',
      },
      tooltip: {
        trigger: 'item',
        showDelay: 0,
        transitionDuration: 0.2,
        formatter: function (params) {
          return `<div><p><b>${params.name}</b></p><p>${params.value} reportes</p><div>`;
        },
        textStyle: {
          fontFamily: 'Inter',
          color: 'white',
          lineHeight: 14,
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
            name: 'cant-reportes-desafios-bogota'
          },
          restore: {
            show: true,
            title: 'Restaurar'
          },
        }
      },
      visualMap: {
        left: 'right',
        min: 0,
        max: maxValue,
        inRange: {
          color: [
            '#000000ff',
            '#ff7109ff',
          ]
        },
        text: ['Alto', 'Bajo'],
        orient: 'horizontal',
        realtime: true,
        calculable: true
      },
      series: [{
        name: 'Desafios',
        type: 'map',
        roam: true,
        map: 'bogota_map',
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
      <p class="text-xs text-gray-400"><b>Este mapa es interactivo</b>: Puedes hacer zoom y ver en detalle la cantidad de desafíos reportados. Las áreas demarcadas reflejan la concentración de reportes y la intensidad de los desafíos según los colores</p>
    </template>
  </UCard>
</template>

<style scoped>
.chart {
  height: 500px;
  width: 100%;
}
</style>