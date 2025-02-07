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
    <h1 class="font-oswald uppercase text-4xl mb-2">Nuevo Miembro</h1>
    <p>Puede crear un nuevo miembro. Debe completar los campos que son requeridos (<span class="text-red">*</span>) y, de querer, subir y recortar una foto de perfil (tiene que ser cuadrada y se acepta JPG. Recomendamos que sea JPG minimamente de 500x500 px).</p>
    <br>   
    <AdminMembersForm />
  </div>
</template>

<style>

</style>