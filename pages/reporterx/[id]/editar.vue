<script setup>
definePageMeta({
  middleware: ['auth', 'only-reporters'],
  layout: 'reporterx',
  auth: {
    unauthenticatedOnly: false,
    navigateUnauthenticatedTo: '/login'
  }
})


const route = useRoute()
const existingEntry = ref(null)

// Fetch
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { data, refresh, status } = useAPI(`/reporter/blog/${route.params.id}`,{
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
    <ReporterxBlogForm v-if="existingEntry" :existing-entry="existingEntry" />
  </div>
</template>
