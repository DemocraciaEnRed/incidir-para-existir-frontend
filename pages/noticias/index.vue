<script setup>
definePageMeta({
  layout: 'full-width'
})
</script>
<template>
  <div class="mt-10">
    <UContainer class="py-9">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <p class="font-oswald text-5xl  leading-tight text-[#D4F779] mb-5">NOTICIAS, EVENTOS Y ACTUALIDAD</p>
        </div>
        <img src="/img/noticias01.png" class="w-full rounded-2xl" alt="">
      </div>
    </UContainer>
    <div class="bg-electricViolet-800">
      <UContainer class="py-9">
        <p class="text-[#D4F779] font-bold">NOTICIAS, EVENTOS Y ACTUALIDAD</p>
        <p class="font-oswald text-5xl  leading-tight text-[#ffffff] mb-5">¿EN QUE VÁ LA JUVENTUD?</p>
        <BlogScroller :section="1" />
      </UContainer>
    </div>
    <UContainer class="py-9">
      <p class="font-oswald text-5xl  leading-tight text-[#D4F779] mb-5">BLOG: ¿QUÉ PIENSA LA JUVENTUD SOBRE LA INCIDENCIA Y LA PARTICIPACIÓN?</p>
      <BlogScroller :section="2" />
    </UContainer>
    <div class="bg-electricViolet-800">
      <UContainer class="py-9">
        <p class="font-oswald text-5xl  leading-tight text-[#ffffff] mb-5">ENLACES DE INTERES</p>
        <h3 class="text-center font-oswald text-xl lg:text-4xl text-mindaro my-20">PROXIMAMENTE</h3>

      </UContainer>
    </div>
  </div>
</template>


<style>

</style>