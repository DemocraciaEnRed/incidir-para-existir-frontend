<script setup>
definePageMeta({
  middleware: ['auth'],
  layout: 'perfil',
  auth: {
    unauthenticatedOnly: false,
    navigateUnauthenticatedTo: '/login'
  }
})



</script>

<template>
  <div>
    <div class="space-y-1">
      <h1 class="font-oswald uppercase text-4xl">Cambiar foto de perfil</h1>
      <br>
      <PerfilFormAvatar />
    </div>
  </div>
</template>
