<script setup>

definePageMeta({
  layout: 'full-width'
})
useHead({
  title: '¿Quienes Somos?'
})

const accordionItems = [{
  label: 'Nuestra historia',
  defaultOpen: true,
  slot: 'nuestra-historia'
}, {
  label: '¿Que hemos logrado?',
  slot: 'que-hemos-logrado',
}, {
  label: '¿Que nos mueve?',
  slot: 'que-nos-mueve'
}]

</script>

<template>
  <div>
    <UContainer class="my-9">
      <p class="text-center font-oswald text-4xl leading-tight text-mindaro mb-5">JUVENTUDES QUE TRANSFORMAN</p>
      <p class="text-center font-bold text-xl leading-tight mb-5">Somos una red de jóvenes activistas en Cali y Bogotá que buscan
        la construcción de realidades dignas para las juventudes</p>
        <!-- YouTube Video -->
        <div class="sm:px-10 sm:my-10">
          <!--<div class="aspect-w-16 aspect-h-9 bg-electricViolet-900 rounded-lg overflow-hidden border border-gray-800">-->
          <div class="aspect-w-16 aspect-h-9 bg-electricViolet-900 rounded-lg overflow-hidden border border-gray-800">
            <div class="flex flex-col items-center justify-center h-full">
              <p class="font-oswald text-3xl text-mindaro md:text-6xl">MUY PRONTO</p>
              <p class="text-md font-medium md:text-2xl text-pumpkin-500 md:font-bold">Un nuevo DOCUMENTAL</p>
            </div>
            <!-- <iframe src="https://www.youtube.com/embed/LvXX1St1Qac?si=cD-_eBMSGUarJLSi" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen/> -->
          </div>
        </div>
      <div>
        <!-- <UAccordion color="white" variant="outline" size="xl" multiple :items="accordionItems"
          :ui="{ default: { class: 'text-xl font-semibold my-3 rounded-full px-6' } }"> -->
        <UAccordion multiple :items="accordionItems">
          <template #default="{ item, index, open }">
            <UButton color="white" variant="outline" class="rounded-full text-xl font-semibold border-white my-3 px-6" :class="{'bg-mindaro text-black': open}" :ui="{ rounded: 'rounded-full', padding: { sm: 'p-3' } }">
              <span class="truncate">{{ item.label }}</span>

              <template #trailing>
                <UIcon
                  name="i-heroicons-chevron-right-20-solid"
                  class="w-6 h-6 ms-auto transform transition-transform duration-200"
                  :class="[open && 'rotate-90']"
                />
              </template>
            </UButton>
          </template>
          <template #nuestra-historia>
            <h1 class="text-center text-2xl sm:text-left sm:text-4xl uppercase font-oswald text-white">Línea de tiempo:<br>El nacimiento y evolución de "Incidir para Existir"</h1>
            <QuienesSomosTimeline/>
          </template>
          <template #que-hemos-logrado>
            <div class="text-base dark:text-white space-y-3 sm:text-justify my-3 px-6">
              <ul class="list-disc space-y-3 py-1">
                <li>Hemos consolidado una red de más de 60 jóvenes entre Cali y Bogotá, generando juntanza y trabajo en red.</li>
                <li>Nos hemos formado para incidir de manera efectiva! +50 horas de formación continua, +32 horas de mentoría que nos han llevado a fortalecer nuestras habilidades. ¡Incidir es comprender para accionar!</li>
                <li>Hemos co-creado 2 agendas ciudadanas (una para <NuxtLink to="https://drive.google.com/file/d/1llrOZtZeeN6PQo9QOayvNtVniI2eYLb9/view" target="blank" class="text-mindaro">Cali <UIcon name="i-heroicons-arrow-top-right-on-square" /></NuxtLink> y otra para <NuxtLink to="https://drive.google.com/file/d/1w2kIddGQ-1NfjzF1d0yUI-gP3FQx66Nn/view" target="blank" class="text-mindaro">Bogotá <UIcon name="i-heroicons-arrow-top-right-on-square" /></NuxtLink>) donde se reflejan los sentires de las juventudes, sus problemáticas, exigencias y propuestas.</li>
                <li>Creemos fielmente en el diálogo y la creación de consensos. Por ello, nos hemos reunido con candidatos, tomadores de decisión, sociedad civil. ¡Nuestras demandas se mueven!</li>
                <li>Le hemos apostado por las acciones en calle y campañas en linea que promuevan la incidencia e involucramiento de juventudes. ¡Nuestra acción es poder!</li>
              </ul>
            </div>
          </template>
          <template #que-nos-mueve>
            <div class="text-base text-white space-y-3 sm:text-justify my-3 px-6">
              <ul class="list-disc space-y-3 py-1">
                  <li>Nos mueve la pasión de tomar el control de nuestro futuro. Queremos liderar y ser parte de las decisiones que nos afectan, para construir un mundo que sea justo y cool para todos.</li>
                  <li>Nos mueve la necesidad de ser escuchados. Queremos que los líderes de Bogotá y Cali se tomen en serio nuestras demandas y sentires, y los incluyan en sus planes, porque somos el presente y el futuro de estas ciudades.</li>
                  <li>Nos mueve el deseo de unirnos y hacer que nuestra voz sea más fuerte. Queremos aliarnos con otros jóvenes y organizaciones para crear un movimiento que sea sostenible y que genere un impacto real en nuestras vidas y comunidades.</li>
              </ul>
            </div>
          </template>
        </UAccordion>
      </div>
    </UContainer>
    <div class="bg-electricViolet-800 pt-10 rounded-tr-2xl rounded-tl-2xl">
      <img src="/img/quienes-somos-01.png" class="w-full" alt="">
      <UContainer class="py-10">
        <p class="font-oswald text-5xl leading-tight text-[#D4F779] text-center lg:text-left mb-5">AGENTES DE CAMBIO</p>
        <p class="text-3xl font-bold text-center lg:text-left my-5">CALI</p>
        <QuienesSomosReel team="cali" />
        <p class="text-3xl font-bold text-center lg:text-left my-5">BOGOTÁ</p>
        <QuienesSomosReel team="bogota" />
        <p class="text-3xl font-bold text-center lg:text-left my-5">EQUIPO MOVILIZATORIO</p>
        <QuienesSomosReel team="movilizatorio" />
      </UContainer>
    </div>
  </div>
</template>


<style></style>