<script lang="ts" setup>
definePageMeta({
  layout: 'full-width'
})
</script>

<template>
  <div>
    <UContainer class="my-9">
      <p class="font-oswald text-5xl  leading-tight text-[#D4F779] mb-5">¿QUÉ HEMOS HECHO? NUESTRO TRABAJO</p>
      <p class="text-pumpkin-500 font-bold">MINI DOCUMENTAL:</p>
      <!-- YouTube Video -->
      <div class="px-10 my-10">
        <div class="aspect-w-16 aspect-h-9">
          <iframe src="https://www.youtube.com/embed/LvXX1St1Qac?si=cD-_eBMSGUarJLSi" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen/>
        </div>
      </div>
    </UContainer>
    <div class="bg-electricViolet-800 pt-10 rounded-tr-2xl rounded-tl-2xl">
      <img src="/img/quienes-somos-01.png" class="w-full" alt="">
      <UContainer class="py-10">
        <p class="font-oswald text-5xl leading-tight text-[#D4F779] mb-5">NUESTRO EQUIPO</p>
        <p class="text-xl font-bold my-5">CALI</p>
        <p class="text-xl font-bold my-5">BOGOTA</p>
        <p class="text-xl font-bold my-5">STAFF MOVILIZATORIO</p>
      </UContainer>
    </div>
  </div>
</template>


<style>

</style>