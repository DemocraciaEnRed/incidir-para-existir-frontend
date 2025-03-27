<script lang="ts" setup>
useHead({
  title: 'Miembros - Panel de administración'
})
const links = [{
  label: 'Listado',
  icon: 'i-heroicons-list-bullet',
  to: '/admin/miembros',
  exact: true
}, {
  label: 'Crear',
  icon: 'i-heroicons-plus',
  to: '/admin/miembros/crear',
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
