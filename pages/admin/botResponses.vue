<script lang="ts" setup>
useHead({
  title: 'Envios al bot - Panel de administración'
})
const links = [{
  label: 'Listado',
  icon: 'i-heroicons-list-bullet',
  to: '/admin/botResponses',
  exact: true
}]
</script>

<template>
  <div>
    <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800" />
    <br>
    <NuxtPage />
  </div>
</template>

<style>

</style>
