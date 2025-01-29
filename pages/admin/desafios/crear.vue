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
    <h1 class="font-oswald uppercase text-4xl mb-2">Nuevo desafio</h1>
    <br>
    <AdminChallengesForm />   
  </div>
</template>

<style>

</style>