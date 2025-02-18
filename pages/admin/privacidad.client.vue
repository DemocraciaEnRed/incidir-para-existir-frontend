<script setup>
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
const { data, refresh, status } = useAPI(`/utils/configs?key=privacy`,{
  onResponse({ response }) {
    existingData.value = response._data.privacy
  }
})
</script>

<template>
   <div>
    <h1 class="font-oswald uppercase text-4xl mb-2">Política de Privacidad</h1>
    <br>
    <AdminPrivacyForm v-if="existingData" :existing-data="existingData" />
  </div>
</template>