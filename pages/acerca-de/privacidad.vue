<script setup>
  const { data: configs, error: errorFetch } = await useAPI(`/utils/configs?keys=tos`)

</script>
<template>
  <UContainer>
    <h3 class="text-center font-oswald text-2xl lg:text-5xl text-mindaro my-20">Terminos y condiciones</h3>
    <div class="text-white">
      {{ configs.tos }}
    </div>
  </UContainer>
</template>


<style>

</style>