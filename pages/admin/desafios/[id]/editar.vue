<script setup>
definePageMeta({
  middleware: ['auth', 'only-admins'],
  layout: 'admin',
  auth: {
    unauthenticatedOnly: false,
    navigateUnauthenticatedTo: '/login'
  }
})

const route = useRoute()
const existingChallenge = ref(null)

// Fetch
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { data, refresh, status } = useAPI(`/challenges/${route.params.id}`,{
  onResponse({ response }) {
    existingChallenge.value = response._data
  }
})

</script>

<template>
  <div>
    <h1 class="font-oswald uppercase text-4xl mb-2">Editar reporte de desafío</h1>
    <br>
    <AdminChallengesForm v-if="existingChallenge" :existing-challenge="existingChallenge" />
    <LoadingBar v-else />
  </div>
</template>

<style>

</style>