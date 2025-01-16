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
    <h1 class="font-oswald text-4xl">PANEL DE ADMINISTRACIÓN</h1>
    <UDivider class="my-3" />
    <h1 class="font-oswald text-2xl font-light">Algunas estadisticas...</h1>
    <AdminStatDashboard />
  </div>
</template>
