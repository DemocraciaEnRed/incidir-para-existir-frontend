<script setup>
useHead({
  title: 'Términos y condiciones - Panel de administración'
})
definePageMeta({
  middleware: ['auth', 'only-admins'],
  layout: 'admin',
  auth: {
    unauthenticatedOnly: false,
    navigateUnauthenticatedTo: '/login'
  }
}) 

const existingData = ref(null)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { data, refresh, status } = useAPI(`/utils/configs?key=tos`,{
  onResponse({ response }) {
    existingData.value = response._data.tos
  }
})
</script>

<template>
   <div>
    <h1 class="font-oswald uppercase text-4xl mb-2">Términos y Condiciones</h1>
    <br>
    <AdminTosForm v-if="existingData" :existing-data="existingData" />
    <LoadingBar v-else />
  </div>
</template>