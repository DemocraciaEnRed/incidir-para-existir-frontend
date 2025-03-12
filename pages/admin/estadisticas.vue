<script setup>
definePageMeta({
  middleware: ['auth', 'only-admins'],
  layout: 'admin',
  auth: {
    unauthenticatedOnly: false,
    navigateUnauthenticatedTo: '/login'
  }
})



</script>

<template>
  <div>
    <div class="space-y-1">
      <h1 class="font-oswald text-4xl">ESTADISTICAS</h1>
      <h1 class="font-oswald text-2xl font-light text-gray-500">Estadísticas detalladas del sistema</h1>
    </div>
    <AdminStatDashboard />
  </div>
</template>
