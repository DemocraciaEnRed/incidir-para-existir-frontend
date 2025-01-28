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
    <div v-if="existingUser">
      <AdminUserFormEdit :existing-user="existingUser" :refresh="refresh"/>
    </div>
    <UDivider label="Foto de perfil" class="my-8" />

    <UDivider label="Datos del usuario" class="my-8" />

  </div>

</template>

<style>

</style>