<script setup>
useHead({
  title: 'Actualidad de la juventud',
  description: 'En este espacio podrás interactuar con noticias, eventos, actualidad, opiniones y enlaces que te pueden interesar. ¡Explora y mantente al tanto de todo lo que le importa a la juventud!'
})
definePageMeta({
  layout: 'full-width'
})
</script>
<template>
  <div class="mt-10">
    <UContainer class="">
      <div class="flex gap-5 justify-between items-center my-10 flex-col md:flex-row">
        <div class="w-full lg:w-1/2 text-center">
          <p class="font-oswald text-5xl  leading-tight text-[#D4F779] mb-5">ACTUALIDAD DE LA JUVENTUD</p>
          <p class="font-bold text-xl leading-tight mb-5">En este espacio podrás interactuar con noticias, eventos, actualidad, opiniones y enlaces que te pueden interesar.<br><br>¡Explora y mantente al tanto de todo lo que le importa a la juventud!</p>
        </div>
        <div class="w-full lg:w-1/2">
          <img src="/img/noticias01.png" class="w-full lg:w-4/5 mx-auto rounded-2xl" alt="">
        </div>
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
      <p class="font-oswald text-5xl  leading-tight text-[#D4F779] mb-5">¿QUÉ PIENSA LA JUVENTUD SOBRE LA INCIDENCIA Y LA PARTICIPACIÓN?</p>
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