<script lang="ts" setup>
const links = [{
  label: 'Ver miembros',
  icon: 'i-heroicons-users',
  to: '/admin/miembros',
  exact: true
}, {
  label: 'Crear',
  icon: 'i-heroicons-user-plus',
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
