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
]

const carouselRef = ref()

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
    <UContainer>
      <div class="relative">
        <div class="overlay-content">
          <div class="w-9/12">
            <p class="font-inter font-bold text-2xl md:text-3xl lg:text-6xl mb-3 drop-shadow-lg">¡Les damos la bienvenida a Incidir para Existir!</p>
            <p class="font-inter font-bold lg:text-2xl">Al visitar esta página, estás uniéndote a una revolución de jóvenes que quieren cambiar el mundo.</p>
          </div>
        </div>
        <UCarousel ref="carouselRef" v-slot="{ item }" :items="imgCallToAction" :ui="{ item: 'basis-full', indicators: {base: 'z-10'} }" class="carrousel rounded-lg overflow-hidden relative mb-6" indicators>
          <div class="overlay" />
          <img :src="item" class="w-full" draggable="false">
        </UCarousel>
      </div>
      <div class="flex gap-5 justify-between items-center my-10 flex-col md:flex-row">
        <div class="w-full md:w-8/12 lg:w-1/2">
          <p class="font-oswald text-5xl  leading-tight text-mindaro mb-5">¡BIENVENIDOS A 
            INCIDIR PARA EXISTIR!</p>
            <div class="space-y-3">

              <p class="text-pumpkin-500 font-bold">En esta plataforma, podrás:</p>
              <ul class="list-disc">
                <li>Encontrar y conectar con una red de jóvenes apasionados por crear cambio.</li>
                <li>Ver y rastrear iniciativas juveniles, proyectos y acciones que buscan transformar la sociedad.</li>
                <li>Reportar y conocer los desafios de la juventud en Bogotá y Cali</li>
                <li>Descubir las voces y en qué anda la juventud Caleña y Bogotana.</li>
              </ul>
              <p>Únete a nuestra comunidad y sé parte del cambio que queremos ver en el mundo</p>
            </div>
          </div>
        <div class="w-full md:w-1/3 lg:w-1/2">
          <img src="/img/home-figure1.jpg" alt="Incidir para existir" class="w-full lg:w-4/5 mx-auto rounded-lg">
        </div>
      </div>
       
      <div class="flex gap-5 justify-between items-center my-10 flex-col md:flex-row">
        <div class="w-full md:w-8/12 lg:w-1/2">
          <div class="space-y-3">
            <p class="font-bold text-2xl">MOVILIZATORIO</p>
            <p>Es un laboratorio de impacto e innovación social que trabaja por promover la participación ciudadana de forma activa y consciente para una sociedad mejor. En este sentido, movilizamos a las personas para construir una sociedad mejor a través del diálogo, la negociación y la educación. Investigamos y aplicamos metodologías y tecnologías probadas e innovadoras.</p>
          </div>
        </div>
        <div class="w-full md:w-8/12 lg:w-1/2">
          <img src="/img/movilizatorio-logo.png" alt="Movilizatorio" class="w-4/5 mx-auto my-5">
        </div>
      </div>
      <UCarousel v-slot="{ item }" :items="imgPhotoCarrousel" :ui="{ wrapper: 'relative px-10',item: 'basis-full md:basis-1/2 lg:basis-1/4' }" arrows>
        <img :src="item" class="w-full px-6" draggable="false">
      </UCarousel>
      <h3 class="text-center font-black text-2xl lg:text-4xl text-pumpkin-500 my-20">¡WOW! ¡Gracias por creer en el poder de la juventud! Al visitar esta página, estás uniéndote a una revolución de jóvenes que quieren cambiar el mundo.</h3>
    </UContainer>
  </div>
</template>
