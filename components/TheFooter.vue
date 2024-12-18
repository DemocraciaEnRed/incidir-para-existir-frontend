<script setup lang="ts">

</script>

<template>
  <footer class="the-footer">
    <div class="starbg"/>
    <UContainer class="the-content">
      <div class="flex justify-center items-center my-5 flex-col md:flex-row space-y-5 md:space-y-0">
        <img src="/img/incidir-para-existir-logo.png" alt="Incidir Para Existir" class="h-10 px-6">
        <img src="/img/undef-logo.png" alt="UNDEF" class="h-11 px-6">
        <img src="/img/movilizatorio-logo.png" alt="Movilizatorio" class="h-8 px-6">
      </div>
      <hr>
      <div class="grid grid-cols-1 sm:grid-cols-4 gap-5 my-10 font-oswald uppercase">
        <NuxtLink to="/quienes-somos" class="text-center hover:text-mindaro">¿Quiénes somos?</NuxtLink>
        <NuxtLink to="/iniciativas" class="text-center hover:text-mindaro">Iniciativas de la juventud</NuxtLink>
        <NuxtLink to="/desafios" class="text-center hover:text-mindaro">Desafios de la juventud</NuxtLink>
        <NuxtLink to="/noticias" class="text-center hover:text-mindaro">¿En qué está la juventud?</NuxtLink>
      </div>
    </UContainer>
  </footer>
</template>

<style>

</style>