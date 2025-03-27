<script setup>
useHead({
  title: 'Crear nuevo posteo'
})
definePageMeta({
  middleware: ['auth'],
  layout: 'user',
  auth: {
    unauthenticatedOnly: false,
    navigateUnauthenticatedTo: '/login'
  }
})



</script>

<template>
  <div>
    <div class="space-y-1">
      <h1 class="font-oswald uppercase text-4xl">Crear nuevo posteo</h1>
      <br>
      <PerfilPostForm />
    </div>
  </div>
</template>
