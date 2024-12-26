<script setup>

const route = useRoute()

const rounded = computed(() => {
  // based on the path, if it includes the followings, return false
  const disableRoundedFooterForPaths = [
    '/quienes-somos',
    '/iniciativas',
    '/actualidad',
  ]

  return !disableRoundedFooterForPaths.includes(route.path)
})
</script>

<template>
  <footer class="the-footer" :class="rounded ? 'rounded-tl-xl rounded-tr-xl' : null">
    <div class="starbg"/>
    <UContainer class="the-content">
      <div class="flex justify-center items-center my-5 flex-col md:flex-row space-y-5 md:space-y-0">
        <img src="/img/incidir-para-existir-logo.png" alt="Incidir Para Existir" class="h-10 px-6">
        <img src="/img/undef-logo.png" alt="UNDEF" class="h-11 px-6">
        <img src="/img/movilizatorio-logo.png" alt="Movilizatorio" class="h-8 px-6">
      </div>
      <hr>
      <div class="flex flex-col justify-center gap-5 md:flex-row my-10 font-oswald uppercase items-center">
        <NuxtLink to="/quienes-somos" class="text-center leading-none hover:text-mindaro">¿Quiénes somos?</NuxtLink>
        <NuxtLink to="/iniciativas" class="text-center leading-none hover:text-mindaro">Iniciativas <br class="hidden sm:block"><span class="sm:text-sm font-normal">de la juventud</span></NuxtLink>
        <NuxtLink to="/desafios" class="text-center leading-none hover:text-mindaro">Desafios <br class="hidden sm:block"><span class="sm:text-sm font-normal">de la juventud</span></NuxtLink>
        <NuxtLink to="/actualidad" class="text-center leading-none hover:text-mindaro">Actualidad <br class="hidden sm:block"><span class="sm:text-sm font-normal">de la juventud</span></NuxtLink>
      </div>
    </UContainer>
  </footer>
</template>

<style>

</style>