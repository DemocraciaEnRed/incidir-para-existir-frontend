<script setup>
useHead({
  title: 'Términos y condiciones'
})
  const { data: configs } = await useAPI(`/utils/configs?keys=tos`)

</script>
<template>
  <UContainer>
    <h3 class="text-left font-oswald text-2xl lg:text-5xl text-mindaro uppercase">Términos y condiciones</h3>
    <hr class="my-10" >
    <div class="prose dark:prose-invert focus:outline-none max-w-none" v-html="configs.tos"/>
  </UContainer>
</template>


<style>

</style>