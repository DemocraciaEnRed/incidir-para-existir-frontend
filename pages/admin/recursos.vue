<script lang="ts" setup>
useHead({
  title: 'Enlaces de interés - Panel de administración'
})
const links = [{
  label: 'Listado',
  icon: 'i-heroicons-list-bullet',
  to: '/admin/recursos',
  exact: true
}, {
  label: 'Crear',
  icon: 'i-heroicons-plus',
  to: '/admin/recursos/crear',
  exact: true
},{
  label: 'Administrar categorias',
  icon: 'i-heroicons-list-bullet',
  to: '/admin/recursos/categorias',
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
