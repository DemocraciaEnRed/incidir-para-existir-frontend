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
            <p class="font-inter font-bold text-3xl md:text-5xl lg:text-7xl mb-3 drop-shadow-lg">Suma tus iniciativas</p>
            <p class="font-inter font-bold lg:text-2xl">Un pequeño texto que hable sobre lo que hacemos y como ayudar para que el usuario quiera contactarse con Movilizatorio o sumar su iniciativa.</p>
          </div>
        </div>
        <UCarousel ref="carouselRef" v-slot="{ item }" :items="imgCallToAction" :ui="{ item: 'basis-full', indicators: {base: 'z-10'} }" class="carrousel rounded-lg overflow-hidden relative mb-6" indicators>
          <div class="overlay" />
          <img :src="item" class="w-full" draggable="false">
        </UCarousel>
      </div>
      <div class="flex gap-5 justify-between items-center my-10 flex-col md:flex-row">
        <div class="w-full md:w-8/12 lg:w-1/2">
          <p class="font-oswald text-5xl  leading-tight text-[#D4F779] mb-5">¡BIENVENIDOS A 
            INCIDIR PARA EXISTIR!</p>
            <div class="space-y-3">

              <p class="text-pumpkin-500 font-bold">En esta plataforma, descubrirás:</p>
              <ul class="list-disc">
                <li>Una red de jóvenes apasionados por crear cambio.</li>
                <li>Iniciativas juveniles, proyectos y acciones que buscan transformar la sociedad.</li>
                <li>Damos voz a las demandas de la juventud.</li>
                <li>Estado de la participación juvenil con datos sobre la incidencia de los jóvenes en Bogotá y Cali</li>
              </ul>
              <p>Únete a nuestra comunidad y sé parte del cambio que queremos ver en el mundo.</p>
            </div>
          </div>
        <div class="w-full md:w-1/3 lg:w-1/2">
          <img src="/img/home-figure1.jpg" alt="Incidir para existir" class="w-full lg:w-4/5 mx-auto rounded-lg">
        </div>
      </div>
      <div class="flex gap-5 justify-between items-center my-10 flex-col-reverse md:flex-row">
        <div class="w-full md:w-8/12 lg:w-1/2">
          <img src="/img/undef-logo.png" alt="UNDEF" class="w-4/5 mx-auto my-5">
        </div>
        <div class="w-full md:w-8/12 lg:w-1/2">
          <div class="space-y-3">
            <p class="font-bold text-2xl">UNDEF</p>
            <p>El Fondo Fiduciario de las Naciones Unidas para la Democracia (UNDEF) apoya proyectos que empoderan a la sociedad civil, promueven los derechos humanos y alientan la participación de todos los grupos en los procesos democráticos.</p>
          </div>
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
