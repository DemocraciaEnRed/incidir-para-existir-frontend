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
const existingUser = ref(null)

// Fetch
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { data, refresh, status } = useAPI(`/users/${route.params.id}`,{
  onResponse({ response }) {
    existingUser.value = response._data
  }
})

</script>

<template>
  <div>
    <h1 class="font-oswald uppercase text-4xl mb-2">Editar Usuario</h1>
    <UDivider label="Datos " class="my-8" />
    <AdminUserFormEdit v-if="existingUser" :existing-user="existingUser" :refresh="refresh"/>
    <LoadingBar v-else />

  </div>

</template>

<style>

</style>