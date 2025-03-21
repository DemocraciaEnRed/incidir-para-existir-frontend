<script setup lang="ts">
import { definePageMeta } from '#imports'
definePageMeta({
  name: 'index'
})

const imgCallToAction = [
  '/img/photos/home1.jpg',
  '/img/photos/home2.jpg',
  '/img/photos/home3.jpg',
  '/img/photos/home4.jpg',
]

const imgPhotoCarrousel = [
  '/img/photos/home-carrousel-01.jpg',
  '/img/photos/home-carrousel-02.jpg',
  '/img/photos/home-carrousel-03.jpg',
  '/img/photos/home-carrousel-04.jpg',
  '/img/photos/home-carrousel-05.jpg',
  '/img/photos/home-carrousel-06.jpg',
  '/img/photos/home-carrousel-07.jpg',
  '/img/photos/home-carrousel-08.jpg',
  '/img/photos/home-carrousel-09.jpg',
  '/img/photos/home-carrousel-10.jpg',
]

const carouselRef = ref()

const isSafari = computed(() => {
  if(!navigator || !navigator.userAgent) return false
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
})  

onMounted(() => {
  setInterval(() => {
    if (!carouselRef.value) return

    if (carouselRef.value.page === carouselRef.value.pages) {
      return carouselRef.value.select(0)
    }

    carouselRef.value.next()
  }, 5000)
})
</script>

<template>
  <div id="home-carrousel">
    <div class="relative">
      <div class="overlay-content">
        <div class="w-full md:w-9/12">
          <p class="font-oswald font-bold uppercase leading-tight text-3xl sm:text-4xl lg:text-6xl mb-3 drop-shadow-[0_1.4px_1.4px_rgba(0,0,0,0.8)]">¡Les damos la bienvenida a Incidir para Existir!</p>
          <p class="font-inter font-bold leading-tight sm:text-2xl drop-shadow-[0_1.4px_1.4px_rgba(0,0,0,0.8)]">Al visitar esta página, estás uniéndote a una revolución de jóvenes que quieren cambiar el mundo.</p>
          <UButton to="/iniciativas" color="pumpkin"  class="text-xl sm:text-3xl font-bold mt-5 px-6" :ui="{ rounded: 'rounded-full' }">Suma tu iniciativa</UButton>
        </div>
      </div>  
      <UCarousel ref="carouselRef" :items="imgCallToAction" :ui="{ item: 'basis-full min-h-[500px] max-h-[500px]', container: 'h-full', indicators: {base: 'z-10', wrapper: 'relative bg-gray-800 bottom-0 h-[40px]'} }" 
      class="carrousel rounded-lg overflow-hidden relative mb-6 min-h-[500px]" indicators>
        <template #default="{ item }">
          <div class="overlay" />
          <div class="w-full h-full">
            <img :src="item" class="w-full h-full object-cover" draggable="false">
          </div>
        </template>
        <template #indicator="{ onClick, page, active }">
          <UButton  color="mindaro" :variant="active ? 'solid' : 'outline'" size="2xs" class="rounded-full min-w-5 min-h-5 justify-center" @click="onClick(page)" />
        </template>
      </UCarousel>
    </div>
    <div class="flex gap-5 justify-between items-center my-10 flex-col md:flex-row">
      <div class="w-full md:w-8/12 lg:w-1/2">
          <div class="space-y-4">
            <p class="font-medium">Somos una red de jóvenes activistas en Cali y Bogotá que buscan la construcción de realidades dignas para las juventudes. <span class="text-pumpkin-500">En esta plataforma, podrás:</span></p>
            <div class="space-y-3">
              <div class="flex items-center">
                <UButton to="/quienes-somos" icon="i-heroicons-arrow-right-circle" variant="soft" :ui="{ rounded: 'rounded-full' }" size="lg" class="mr-4" />
                <p>Encontrar y conectar con una <NuxtLink v-if="!isSafari" to="/quienes-somos" class="text-mindaro-500 underline">red de jóvenes</NuxtLink><a v-else href="/quienes-somos" class="text-mindaro-500 underline">red de jóvenes</a> apasionados por crear cambio</p>
              </div>
              <div class="flex items-center">
                <UButton to="/iniciativas" icon="i-heroicons-arrow-right-circle" variant="soft" :ui="{ rounded: 'rounded-full' }" size="lg" class="mr-4" />
                <p>Ver y rastrear <NuxtLink v-if="!isSafari" to="/iniciativas" class="text-mindaro-500 underline">iniciativas</NuxtLink><a v-else href="/iniciativas" class="text-mindaro-500 underline">iniciativas</a> juveniles, proyectos y acciones que buscan transformar la sociedad</p>
              </div>
              <div class="flex items-center">
                <UButton to="/desafios" icon="i-heroicons-arrow-right-circle" variant="soft" :ui="{ rounded: 'rounded-full' }" size="lg" class="mr-4" />
                <p>Reportar y conocer los <NuxtLink v-if="!isSafari" to="/desafios" class="text-mindaro-500 underline">desafíos</NuxtLink><a v-else href="/desafios" class="text-mindaro-500 underline">desafíos</a> de la juventud en Bogotá y Cali</p>
              </div>
              <div class="flex items-center">
                <UButton to="/actualidad" icon="i-heroicons-arrow-right-circle" variant="soft" :ui="{ rounded: 'rounded-full' }" size="lg" class="mr-4" />
                <p><NuxtLink v-if="!isSafari" to="/actualidad" class="text-mindaro-500 underline">Descubrir</NuxtLink><a v-else href="/actualidad" class="text-mindaro-500 underline">Descubrir</a> las voces y en qué anda la juventud caleña y bogotana</p>
              </div>
            </div>
            <p class="font-medium italic">Únete a nuestra comunidad y sé parte del cambio que queremos ver en el mundo</p>
          </div>
        </div>
      <div class="w-full md:w-1/3 lg:w-1/2">
        <img src="/img/home-figure2.jpg" alt="Incidir para existir" class="w-full lg:w-4/5 mx-auto rounded-lg">
      </div>
    </div>
      
    <div class="space-y-7 my-16 lg:w-10/12 mx-auto">
      <div class="w-full text-center">
          <p class="font-bold text-xl md:text-2xl">Este es un proyecto de <NuxtLink to="https://movilizatorio.org" class="text-mindaro underline">Movilizatorio</NuxtLink> apoyado por el <NuxtLink to="https://www.un.org/democracyfund/" class="text-mindaro underline">Fondo de las Naciones Unidas para la Democracia</NuxtLink></p>
      </div>
    </div>
    <UCarousel v-slot="{ item }" :items="imgPhotoCarrousel" :ui="{ wrapper: 'relative px-10',item: 'basis-full md:basis-1/2 lg:basis-1/4 my-3 mx-4 rounded-lg' }" arrows>
      <img :src="item" class="w-full rounded-lg cursor-grab" draggable="false">
    </UCarousel>
    <h3 class="text-center font-black text-2xl lg:text-3xl text-pumpkin-500 my-20">¡WOW! ¡Gracias por creer en el poder de la juventud! Al visitar esta página, estás uniéndote a una revolución de jóvenes que quieren cambiar el mundo.</h3>
  </div>
</template>
