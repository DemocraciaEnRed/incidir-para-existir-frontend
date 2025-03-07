<template>
  <div>
    <ClientOnly>
      <UCard>
        <VChart class="chart" :option="optionCali" autoresize />
        <UDivider class="my-5" />
        <VChart class="chart" :option="optionBogota" autoresize />
      </UCard>
      <template #fallback>
        <!-- this will be rendered on server side -->
        <UCard>
          <UProgress animation="carousel" />
        </UCard>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup>
import { registerMap } from 'echarts/core';
import CaliMap from '~/assets/svg/cali.svg?raw'
import BogotaMap from '~/assets/svg/bogota.svg?raw'

const { data } = await useAPI('/challenges/stats')

provide(THEME_KEY, 'dark');
registerMap('cali_map', {svg: CaliMap})
registerMap('bogota_map', {svg: BogotaMap})


const maxCali = Math.max(...data.value.challengesPerSubdivisionOfCali.map((item) => item.value))
const maxBogota = Math.max(...data.value.challengesPerSubdivisionOfBogota.map((item) => item.value))

const optionCali = ref({
  backgroundColor: 'transparent',
  title: {
    text: 'Desafíos por localidad de Cali',
    subtext: 'Descargar',
    sublink: 'http://www.census.gov/popest/data/datasets.html',
    left: 'right'
  },
  tooltip: {
    trigger: 'item',
    showDelay: 0,
    transitionDuration: 0.2
  },
  visualMap: {
    left: 'right',
    min: 0,
    max: maxCali,
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
    name: 'Desafíos',
    type: 'map',
    map: 'cali_map',
    emphasis: {
      label: {
        show: false
      }
    },
    // data: [
    //   { name: 'Corregimiento El Hormiguero', value: 6 },
    //   { name: 'Corregimiento El Saladito', value: 6 },
    //   { name: 'Corregimiento Felidia', value: 6 },
    //   { name: 'Corregimiento Golondrinas', value: 6 },
    //   { name: 'Corregimiento La Buitrera', value: 6 },
    //   { name: 'Corregimiento La Castilla', value: 6 },
    //   { name: 'Corregimiento La Elvira', value: 6 },
    //   { name: 'Corregimiento La Leonera', value: 6 },
    //   { name: 'Corregimiento La Paz', value: 6 },
    //   { name: 'Corregimiento Los Andes', value: 6 },
    //   { name: 'Corregimiento Montebello', value: 6 },
    //   { name: 'Corregimiento Navarro', value: 6 },
    //   { name: 'Corregimiento Pance', value: 6 },
    //   { name: 'Corregimiento Pichindé', value: 6 },
    //   { name: 'Corregimiento Villacarmelo', value: 6 },
    // ]
    data: data.value.challengesPerSubdivisionOfCali
  }]
})

const optionBogota = ref({
  backgroundColor: 'transparent',
  title: {
    text: 'Desafíos por localidad de Cali',
    subtext: 'Descargar',
    sublink: 'http://www.census.gov/popest/data/datasets.html',
    left: 'right'
  },
  tooltip: {
    trigger: 'item',
    showDelay: 0,
    transitionDuration: 0.2
  },
  visualMap: {
    left: 'right',
    min: 0,
    max: maxBogota,
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
    name: 'Desafíos',
    type: 'map',
    map: 'bogota_map',
    emphasis: {
      label: {
        show: false
      }
    },
    // data: [
    //   { name: 'Corregimiento El Hormiguero', value: 6 },
    //   { name: 'Corregimiento El Saladito', value: 6 },
    //   { name: 'Corregimiento Felidia', value: 6 },
    //   { name: 'Corregimiento Golondrinas', value: 6 },
    //   { name: 'Corregimiento La Buitrera', value: 6 },
    //   { name: 'Corregimiento La Castilla', value: 6 },
    //   { name: 'Corregimiento La Elvira', value: 6 },
    //   { name: 'Corregimiento La Leonera', value: 6 },
    //   { name: 'Corregimiento La Paz', value: 6 },
    //   { name: 'Corregimiento Los Andes', value: 6 },
    //   { name: 'Corregimiento Montebello', value: 6 },
    //   { name: 'Corregimiento Navarro', value: 6 },
    //   { name: 'Corregimiento Pance', value: 6 },
    //   { name: 'Corregimiento Pichindé', value: 6 },
    //   { name: 'Corregimiento Villacarmelo', value: 6 },
    // ]
    data: data.value.challengesPerSubdivisionOfBogota
  }]
})


// const option = ref({
//   backgroundColor: 'transparent',
//   title: {
//     text: 'Traffic Sources',
//     left: 'center',
//   },
//   tooltip: {
//     trigger: 'item',
//     formatter: '{a} <br/>{b} : {c} ({d}%)',
//   },
//   legend: {
//     orient: 'vertical',
//     left: 'left',
//     data: ['Direct', 'Email', 'Ad Networks', 'Video Ads', 'Search Engines'],
//   },
//   series: [
//     {
//       name: 'Traffic Sources',
//       type: 'pie',
//       radius: '55%',
//       center: ['50%', '60%'],
//       data: [
//         { value: 335, name: 'Direct' },
//         { value: 310, name: 'Email' },
//         { value: 234, name: 'Ad Networks' },
//         { value: 135, name: 'Video Ads' },
//         { value: 1548, name: 'Search Engines' },
//       ],
//       emphasis: {
//         itemStyle: {
//           shadowBlur: 10,
//           shadowOffsetX: 0,
//           shadowColor: 'rgba(0, 0, 0, 0.5)',
//         },
//       },
//     },
//   ],
// });
</script>
<style scoped>
.chart {
  height: 700px;
}
</style>