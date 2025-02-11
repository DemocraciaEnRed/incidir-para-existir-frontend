<script setup>
useHead({
  title: 'Contacto'
})
definePageMeta({
  layout: 'full-width'
})



</script>

<template>
  <div>
    <div class="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-10 my-5">
      <div :style="{backgroundImage: 'url(/img/contacto-01.jpg)'}" class="absolute inset-0 bg-cover bg-center z-0 my-10 blur-xl"></div>
      <UContainer class="z-10">
        <div class="w-full md:w-8/12 md:mx-auto">
          <p class="text-center font-oswald text-5xl uppercase leading-tight text-mindaro mb-5">¡Contactanos!</p>
          <p class="text-center font-bold text-xl leading-tight mb-5">¿Queres ponerte en contacto con los agentes de cambio y con el equipo de movilizatorio? Mandanos un mensaje</p>
          <br>
          <ContactoForm />
          <br>
          <p class="text-center text-sm">Movilizatorio<br>Oficina principal: Carrera 12a #78-40. 110221. Bogotá, Colombia. </p>
          <p class="text-center text-sm">hola@movilizatorio.org</p>
          <br>
          <p class="text-center text-sm">Tambien podes encontrarnos en nuestro <ULink class="font-semibold" to="https://linktr.ee/incidirparaexistir">Linktree</ULink></p>
          <div class="flex justify-center items-center gap-5 my-2">
            <ULink to="https://linktr.ee/incidirparaexistir" target="_blank" class="text-center text-sm"><img src="/svg/linktree-logo-icon.svg" class="h-7" alt="Linktree"/></ULink>
          </div>

        </div>
      </UContainer>
    </div>     
  </div>
</template>