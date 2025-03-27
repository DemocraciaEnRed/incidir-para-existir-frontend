<script setup>
useHead({
  title: 'Editar posteo'
})
definePageMeta({
  middleware: ['auth'],
  layout: 'user',
  auth: {
    unauthenticatedOnly: false,
    navigateUnauthenticatedTo: '/login'
  }
})


const route = useRoute()
const existingEntry = ref(null)

// Fetch
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { data, refresh, status } = useAPI(`/users/posts/${route.params.id}`,{
  onResponse({ response }) {
    console.log(response._data)
    existingEntry.value = response._data
  }
})

</script>

<template>
  <div>
    <h1 class="font-oswald uppercase text-4xl mb-2">Editar posteo</h1>
    <p>Aquí puede editar el posteo. Debe completar los campos que son requeridos (<span class="text-red">*</span>) y, de querer, acompañar con una foto cuya relación de aspecto sea 16/9 aprox y se acepta JPG.</p>
    <br>   
    <PerfilPostForm v-if="existingEntry" :existing-entry="existingEntry" />
    <LoadingBar v-else />
  </div>
</template>
