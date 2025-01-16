<script setup>

definePageMeta({
  layout: 'full-width'
})
useHead({
  title: '¿Quienes Somos?'
})

const showSection = ref(1)

</script>

<template>
  <div>
    <UContainer class="my-9">
      <p class="font-oswald text-5xl leading-tight text-[#D4F779]">JUVENTUDES QUE TRANSFORMAN</p>
      <p class="font-oswald font-thin text-2xl leading-tight mb-5">Somos una red de jóvenes activistas en Cali y Bogotá que buscan la construcción de realidades dignas para las juventudes</p>
      <p class="text-xl text-pumpkin-500 font-bold">MINI DOCUMENTAL</p>
      <!-- YouTube Video -->
      <div class="px-10 my-10">
        <div class="aspect-w-16 aspect-h-9 bg-gray-900 rounded-lg">
          <!-- <iframe src="https://www.youtube.com/embed/LvXX1St1Qac?si=cD-_eBMSGUarJLSi" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen/> -->
        </div>
      </div>
      <div class="flex gap-10 justify-between items-start my-10 flex-col md:flex-row">
        <div class="w-full  md:w-5/12 lg:w-1/3 space-y-4">
          <div
            class="px-5 py-3 rounded-full font-semibold text-xl w-full border-solid border-2 flex items-center justify-between cursor-pointer"
            :class="{
              'text-black bg-mindaro border-mindaro': showSection === 1,
              'text-white': showSection !== 1
            }" 
          @click="showSection = 1">
            <span>Nuestra historia</span>
            <UIcon :name="showSection === 1 ? 'i-heroicons-chevron-right-solid' : 'i-heroicons-chevron-left-solid'" />
          </div>
          <div
            class="px-5 py-3 rounded-full font-semibold text-xl w-full border-solid border-2 flex items-center justify-between cursor-pointer"
            :class="{
              'text-black bg-mindaro border-mindaro': showSection === 2,
              'text-white border-white': showSection !== 2
            }" 
          @click="showSection = 2">
            <span>¿Que hemos logrado?</span>
            <UIcon :name="showSection === 2 ? 'i-heroicons-chevron-right-solid' : 'i-heroicons-chevron-left-solid'" />
          </div>
          <div
            class="px-5 py-3 rounded-full font-semibold text-xl w-full border-solid border-2 flex items-center justify-between cursor-pointer"
            :class="{
              'text-black bg-mindaro border-mindaro': showSection === 3,
              'text-white': showSection !== 3
            }" 
          @click="showSection = 3">
            <span>¿Qué nos mueve?</span>
            <UIcon :name="showSection === 3 ? 'i-heroicons-chevron-right-solid' : 'i-heroicons-chevron-left-solid'" />
          </div>
        </div>
        <div class="w-full  md:w-7/12 lg:w-2/3 px-3">
          <div v-if="showSection === 1" class="space-y-3">
            <p>Durante los años 2019 y 2021 tuvo en lugar en Colombia estallidos sociales históricos, en ellos la inconformidad generalizada de diferentes gremios, sectores de la ciudadanía fue canalizada en multitudinarias movilizaciones, acciones simbólicas, tomas del espacio público, plantones y demás acciones colectivas dentro del campo online y también offline. El arte, la creatividad y resistencia gestaron grandes luchas, visibilizaron liderazgos tanto locales como nacionales y por ende, dieron un lugar a las diversas manifestaciones sociales y políticas.</p>
            <p>Sin duda la juventud tuvo un rol protagónico en los estallidos sociales, fue protagonista por su liderazgo, coraje y valentía; la juventud fue el motor de las acciones colectivas. Sin embargo, fueron los y las jóvenes uno de los sectores mayormente violentados y vulnerados en el marco de la protesta social u otras acciones de participación, sus liderazgos fueron opacados y diferentes hechos violentos contra la juventud tuvieron lugar: violencia física, sexual, desaparición forzada, tratos crueles e inhumanos.</p>
            <p>Bajo este contexto nace Incidir para Existir como un espacio para el encuentro de líderes y lideresas, como un lugar para promover el diálogo de la juventud hacia la institucionalidad y desde allí, facilitar la incidencia política desde la propuesta, la escucha y por supuesto, la exigencia de sus demandas para así, promover la dignificación de la vida y sentires de los y las jóvenes de las ciudades de Cali y Bogotá.</p>
            <p>Una vez finalizado el trabajo de definir de manera colectiva las demandas juveniles de Cali y de Bogotá, consignadas en las agendas ciudadanas a través de los bootcamps y las mentorías, dimos paso a un trabajo de incidencia y de organización interna de cada uno de los grupos establecidos en cada ciudad, pensados desde la complejidad de los procesos organizativos de trabajo ciudadano. Al observar la realidad sociopolítica de las ciudades, sumado a la intención de generar un trabajo organizado y participativo con las juventudes, el proyecto pasó a ser comprendido y ejecutado a partir de macro procesos que engloban todas las vertientes que implican nuestro objetivo inicial y nuestra teoría de cambio.</p>
          </div>
          <div v-if="showSection === 2">
            <ul class="list-disc space-y-3" >
              <li>Hemos consolidado una red de más de 60 jóvenes entre Cali y Bogotá, generando juntanza y trabajo en red.</li>
              <li>¡Nos hemos formado para incidir de manera efectiva! +50 horas de formación continua, +32 horas de mentoría que nos han llevado a fortalecer nuestras habilidades. ¡Incidir es comprender para accionar!</li>
              <li>Hemos co-creado  2 agendas ciudadanas (una para Cali y otra para Bogotá) donde se reflejan los sentires de las juventudes, sus problemáticas, exigencias y propuestas.</li>
              <li>Creemos fielmente en el diálogo y la creación de consensos. Por ello, nos hemos reunido con candidatos, tomadores de decisión, sociedad civil. ¡Nuestras demandas se mueven!</li>
              <li>Le hemos apostado por las acciones en calle y campañas online que promuevan la incidencia e involucramiento de juventudes. ¡Nuestra acción es poder! </li>
            </ul>
          </div>
          <div v-if="showSection === 3">
            <ul class="list-disc space-y-3" >
              <li>Nos mueve la pasión de tomar el control de nuestro futuro. Queremos liderar y ser parte de las decisiones que nos afectan, para construir un mundo que sea justo y cool para todos.</li>
              <li>Nos mueve la necesidad de ser escuchados. Queremos que los líderes de Bogotá y Cali se tomen en serio nuestras demandas y sentires, y los incluyan en sus planes, porque somos el presente y el futuro de estas ciudades.</li>
              <li>Nos mueve el deseo de unirnos y hacer que nuestra voz sea más fuerte. Queremos aliarnos con otros jóvenes y organizaciones para crear un movimiento que sea sostenible y que genere un impacto real en nuestras vidas y comunidades.</li>
            </ul>
          </div>
        </div>
      </div>
    </UContainer>
    <div class="bg-electricViolet-800 pt-10 rounded-tr-2xl rounded-tl-2xl">
      <img src="/img/quienes-somos-01.png" class="w-full" alt="">
      <UContainer class="py-10">
        <p class="font-oswald text-5xl leading-tight text-[#D4F779] text-center lg:text-left mb-5">AGENTES DE CAMBIO</p>
        <p class="text-3xl font-bold text-center lg:text-left my-5">CALI</p>
        <QuienesSomosReel team="cali" />
        <p class="text-3xl font-bold text-center lg:text-left my-5">BOGOTA</p>
        <QuienesSomosReel team="bogota" />
        <p class="text-3xl font-bold text-center lg:text-left my-5">STAFF MOVILIZATORIO</p>
        <QuienesSomosReel team="movilizatorio" />
      </UContainer>
    </div>
  </div>
</template>


<style>

</style>