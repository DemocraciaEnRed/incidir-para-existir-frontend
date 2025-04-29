<script setup>
useHead({
  title: 'Actualidad de la juventud',
  description: 'En este espacio podrás interactuar con noticias, eventos, actualidad, opiniones y enlaces que te pueden interesar. ¡Explora y mantente al tanto de todo lo que le importa a la juventud!'
})
definePageMeta({
  layout: 'full-width'
})

const { status } = useAuth()
const isLoggedIn = computed(() => status.value === 'authenticated')

const handleAuthorsCallToAction = () => {
  if(isLoggedIn.value) {
    navigateTo("/perfil/posts/crear")
    return
  }
  navigateTo("/login")
  return;
}

</script>
<template>
  <div class="mt-10">
    <UContainer class="">
      <div class="flex gap-5 justify-between items-center my-10 flex-col md:flex-row">
        <div class="w-full lg:w-1/2 text-center">
          <p class="font-oswald text-5xl  leading-tight text-[#D4F779] mb-5">ACTUALIDAD DE LA JUVENTUD</p>
          <p class="font-bold text-xl leading-tight mb-5">En este espacio podrás interactuar con noticias, eventos, actualidad, opiniones y enlaces que te pueden interesar.<br><br>¡Explora y mantente al tanto de todo lo que le importa a la juventud!</p>
          <UButton size="lg" class="text-xl font-semibold px-5" color="pumpkin" :ui="{ rounded: 'rounded-full' }" icon="i-heroicons-megaphone" @click="handleAuthorsCallToAction">¡Publica aquí!</UButton>
        </div>
        <div class="w-full lg:w-1/2">
          <img src="/img/noticias02.jpg" class="w-full lg:w-4/5 mx-auto rounded-2xl" alt="">
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
      
      <div class="py-8 px-5 text-center bg-[#cacaca11] shadow-[0px_0px_10px_2px_rgba(212,_247,_121,_0.8)] my-20 rounded-2xl">
        <p class="text-xl">Si tienes algo que decir sobre incidencia y participación, <b class="uppercase text-mindaro">este es tu espacio</b>.<br>Comparte tu artículo, opinión o idea y haz que más juventudes te lean.</p>
        <p class="my-3 text-4xl text-mindaro font-oswald font-medium uppercase">Escribe, envía y haz la diferencia.</p>
        <UButton size="xl" class="mt-5 text-xl md:text-3xl font-semibold px-8" color="mindaro" :ui="{ rounded: 'rounded-full' }" icon="i-heroicons-megaphone" @click="handleAuthorsCallToAction">¡Haz que tu voz cuente!</UButton>
      </div>
    </UContainer>
    <div class="bg-electricViolet-800">
      <UContainer class="py-9">
        <p class="font-oswald text-5xl  leading-tight text-[#ffffff] mb-5">ENLACES DE INTERES</p>
        <ResourceListing />
      </UContainer>
    </div>
  </div>
</template>


<style>

</style>