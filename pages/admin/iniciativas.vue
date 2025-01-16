<script lang="ts" setup>
const links = [{
  label: 'Ver Iniciativas',
  icon: 'i-heroicons-document-text',
  to: '/admin/iniciativas',
  exact: true
}, {
  label: 'Crear',
  icon: 'i-heroicons-plus',
  to: '/admin/iniciativas/crear',
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
