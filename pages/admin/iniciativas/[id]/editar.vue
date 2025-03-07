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
const existingInitiative = ref(null)

// Fetch
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { data, refresh, status } = useAPI(`/initiatives/${route.params.id}`,{
  onResponse({ response }) {
    existingInitiative.value = response._data
  }
})
</script>

<template>
<div>
    <h1 class="font-oswald uppercase text-4xl mb-2">Editar iniciativa</h1>
    <br>   
    <AdminInitiativesForm v-if="existingInitiative" :existing-initiative="existingInitiative" />
    <LoadingBar v-else />
  </div>
</template>
