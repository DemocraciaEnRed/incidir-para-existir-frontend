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
const existingEntry = ref(null)

// Fetch
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { data, refresh, status } = useAPI(`/resources/${route.params.id}`,{
  onResponse({ response }) {
    existingEntry.value = response._data
  }
})


</script>

<template>
  <div>
    <h1 class="font-oswald uppercase text-4xl mb-2">Editar Enlace de interes</h1>
    <br>    
    <AdminResourcesForm v-if="existingEntry" :existing-entry="existingEntry" :refresh="refresh"/>
  </div>
</template>

<style>

</style>