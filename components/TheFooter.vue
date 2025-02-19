<script setup>
const { status } = useAuth()
const loggedIn = computed(() => status.value === 'authenticated')
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
  <footer class="the-footer flex-shrink-0" :class="rounded ? 'rounded-tl-xl rounded-tr-xl' : null">
    <div class="starbg"/>
    <NuxtLink v-if="!loggedIn" to="/login" class="absolute opacity-25 bottom-1 text-xs z-50">Login</NuxtLink>
    <UContainer class="the-content">
      <div class="hidden sm:flex justify-center items-center my-5 flex-col sm:flex-row space-y-5 gap-4 sm:space-y-0">
        <NuxtLink to="/"><img src="/img/incidir-para-existir-logo.png" alt="Incidir Para Existir" class="max-h-10"></NuxtLink>
        <NuxtLink to="https://www.un.org/democracyfund/" target="_blank"><img src="/img/undef-logo.png" alt="UNDEF" class="max-h-11"></NuxtLink>
        <NuxtLink to="https://movilizatorio.org/" target="_blank"><img src="/img/movilizatorio-logo.png" alt="Movilizatorio" class="max-h-8"></NuxtLink>
        <NuxtLink to="https://elavispero.org/" target="_blank"><img src="/img/avispero-logo.png" alt="El Avispero<" class="max-h-8"></NuxtLink>
      </div>
      <div class="grid grid-cols-2 gap-5 align-middle justify-center sm:hidden my-5">
        <NuxtLink to="/"><img src="/img/incidir-para-existir-logo.png" alt="Incidir Para Existir" class="max-h-10 mx-auto"></NuxtLink>
        <NuxtLink to="https://www.un.org/democracyfund/" target="_blank"><img src="/img/undef-logo.png" alt="UNDEF" class="max-h-11 mx-auto"></NuxtLink>
        <NuxtLink to="https://movilizatorio.org/" target="_blank"><img src="/img/movilizatorio-logo.png" alt="Movilizatorio" class="max-h-8 mx-auto"></NuxtLink>
        <NuxtLink to="https://elavispero.org/" target="_blank"><img src="/img/avispero-logo.png" alt="El Avispero<" class="max-h-8 mx-auto"></NuxtLink>
      </div>
      <hr class="opacity-30">
      <div class="my-10 space-y-5">

        <div class="flex flex-col justify-center gap-5 sm:flex-row font-oswald uppercase items-center">
          <NuxtLink to="/" active-class="text-mindaro" class="text-center leading-none hover:text-mindaro">Inicio</NuxtLink>
          <NuxtLink to="/quienes-somos" active-class="text-mindaro" class="text-center leading-none hover:text-mindaro">¿Quiénes somos?</NuxtLink>
          <NuxtLink to="/iniciativas"  active-class="text-mindaro" class="text-center leading-none hover:text-mindaro">Iniciativas <br class="hidden sm:block"><span class="sm:text-sm font-normal">de la juventud</span></NuxtLink>
          <NuxtLink to="/desafios"  active-class="text-mindaro" class="text-center leading-none hover:text-mindaro">Desafios <br class="hidden sm:block"><span class="sm:text-sm font-normal">de la juventud</span></NuxtLink>
          <NuxtLink to="/actualidad"  active-class="text-mindaro" class="text-center leading-none hover:text-mindaro">Actualidad <br class="hidden sm:block"><span class="sm:text-sm font-normal">de la juventud</span></NuxtLink>
          <NuxtLink to="/contacto" active-class="text-mindaro" class="text-center leading-none hover:text-mindaro">Contacto</NuxtLink>
          <ULink to="https://linktr.ee/incidirparaexistir" target="_blank" class="text-center text-sm"><img src="/svg/linktree-logo-icon.svg" class="h-5" alt="Linktree"></ULink>
        </div>
        <div class="flex flex-col justify-center gap-2 sm:flex-row font-inter items-center text-xs">
          <NuxtLink to="/acerca-de/terminos-y-condiciones" class="text-center leading-none hover:text-mindaro">Términos y condiciones</NuxtLink>
          <p class="hidden sm:block">|</p>
          <NuxtLink to="/acerca-de/politica-de-privacidad" class="text-center leading-none hover:text-mindaro">Política de privacidad</NuxtLink>
        </div>
      </div>
      <hr class="opacity-30">
      <p class="font-inter my-8 text-center text-xs">Desarrollado por <ULink to="https://democraciaenred.org" class="font-semibold hover:text-pumpkin-300" target="_blank">Democracia en Red</ULink></p>
    </UContainer>
  </footer>
</template>

<style>

</style>