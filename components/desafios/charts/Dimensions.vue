
<script setup>
provide(THEME_KEY, 'dark');
const props = defineProps({
  graphData: {
    type: Object,
    required: true
  }
});

console.log(props.graphData);

const option = ref({
  backgroundColor: 'transparent',
  title: {
    text: 'Cantidad de desafíos por dimensiones',
    subtext: 'Cada serie representa una ciudad',
    top: 0,
    left: 0
  },
  legend: {
    data: props.graphData.legendData,
    right: 0,
    bottom: 0
  },
  tooltip: {
    trigger: 'item'
  },
  radar: {
    // shape: 'circle',
    indicator: props.graphData.radarIndicator
  },
  series: [
    {
      name: 'Budget vs spending',
      type: 'radar',
      data: props.graphData.radar.data
    }
  ]
});

</script>

<template>
  <UCard>
    <VChart class="chart" :option="option" />
  </UCard>
</template>

<style scoped>
.chart {
  height: 500px;
}
</style>