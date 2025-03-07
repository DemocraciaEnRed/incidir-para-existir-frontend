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
const existingMember = ref(null)

// Fetch
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { data, refresh, status } = useAPI(`/members/${route.params.id}`,{
  onResponse({ response }) {
    existingMember.value = response._data
  }
})


</script>

<template>
  <div>
    <h1 class="font-oswald uppercase text-4xl mb-2">Editar Miembro</h1>
    <p>Puede editar un miembro. Debe completar los campos que son requeridos (<span class="text-red">*</span>) y, de querer, cambiar la foto de perfil por una nueva (tiene que ser cuadrada y se acepta JPG. Recomendamos que sea JPG minimamente de 500x500 px).</p>
    <br>    
    <AdminMembersForm v-if="existingMember" :existing-member="existingMember" :refresh="refresh"/>
    <LoadingBar v-else />
  </div>
</template>

<style>

</style>