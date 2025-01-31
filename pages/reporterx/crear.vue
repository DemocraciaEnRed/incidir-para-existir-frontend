<script setup>
definePageMeta({
  middleware: ['auth', 'only-reporters'],
  layout: 'reporterx',
  auth: {
    unauthenticatedOnly: false,
    navigateUnauthenticatedTo: '/login'
  }
})



</script>

<template>
  <div>
    <div class="space-y-1">
      <h1 class="font-oswald uppercase text-4xl">Crear nuevo posteo</h1>
      <br>
      <ReporterxBlogForm />
    </div>
  </div>
</template>
