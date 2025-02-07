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
    <h1 class="font-oswald uppercase text-4xl mb-2">Nueva entrada de blog</h1>
    <p>Aquí puede crear una nueva entrada para el blog. Debe completar los campos que son requeridos (<span class="text-red">*</span>) y, de querer, acompañar con una foto cuya relación de aspecto sea 16/9 aprox y se acepta JPG.</p>
    <br>
    <AdminBlogForm />
  </div>
</template>
