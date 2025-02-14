<script setup>
  const { data: configs } = await useAPI(`/utils/configs?keys=privacy`)

</script>
<template>
  <UContainer>
    <h3 class="text-left font-oswald text-2xl lg:text-5xl text-mindaro uppercase">Pólitica de Privacidad</h3>
    <hr class="my-10" />
    <div class="prose dark:prose-invert focus:outline-none max-w-none" v-html="configs.privacy"/>
  </UContainer>
</template>


<style>

</style>