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

const carouselItems = [
  {
    id: 'timeline01',
    title: '2019 - 2021: Los estallidos sociales históricos en Colombia',
    text: [
      'En estos años, Colombia vivió una serie de estallidos sociales sin precedentes. Multitudinarias movilizaciones, plantones, tomas del espacio público y acciones simbólicas tanto online como offline canalizaron la inconformidad ciudadana.',
      'La juventud se destacó por su liderazgo, creatividad y valentía, siendo el motor de estas luchas colectivas. Sin embargo, también enfrentó graves vulneraciones como violencia física, desapariciones forzadas y tratos crueles e inhumanos.'
    ]
  },
  {
    id: 'timeline02',
    title: '2023: El nacimiento de "Incidir para Existir"',
    text: [
      'Surge como un espacio para el encuentro de líderes y lideresas juveniles, promoviendo la formación y el diálogo con la institucionalidad.',
      'Con el objetivo de facilitar la incidencia política desde la escucha, la propuesta y la exigencia de demandas juveniles, con un enfoque en la dignificación de la vida y los sentires de los jóvenes de Cali y Bogotá.',
    ]
  },
  {
    id: 'timeline03',
    title: '2023: Creación de las agendas ciudadanas',
    text: [
      'A través de bootcamps y mentorías, se definieron colectivamente las demandas juveniles de ambas ciudades. Estas fueron consignadas en agendas ciudadanas que sirvieron como hoja de ruta para la incidencia política.'
    ]
  },
  {
    id: 'timeline04',
    title: '2024: Organización interna y trabajo colectivo',
    text: [
      'Se fortalecieron los grupos juveniles en Cali y Bogotá, adaptando los procesos organizativos a las realidades sociopolíticas locales.',
      'La red comenzó a estructurarse bajo una lógica de macroprocesos, integrando diferentes vertientes necesarias para alcanzar los objetivos iniciales y materializar su teoría de cambio.',
    ]
  },
  {
    id: 'timeline05',
    title: '2024: Dialogo y transformación',
    text: [
      'Funcionarios de las Alcaldias de Cali y Bogotá conocieron las agendas juveniles y se incluyeron propuestas importantes en los Planes de Desarrollo Locales.',
      '"Incidir para Existir" se posiciona como una plataforma de liderazgo juvenil, promoviendo la participación organizada y transformadora de los jóvenes en los contextos urbanos.'
    ]
  },
  {
    id: 'timeline06',
    title: '2024: Campañas de Incidencia',
    text: [
      'Como RED desarrollamos tres campañas importantes: La primera exigiendonoslas Tarifa diferencial en el transporte público para estudiantes en la ciudad de Cali, la segunda exigiendo condiciones de Trabajo Digno para las juventudes en Bogotá y la tercera en el marco de la COP-16 relacionada con la exigencia de defensa de la vida de los lideres socioambientales.'
    ]
  },
  {
    id: 'timeline07',
    title: '2025 (y más allá): Seguimos construyendo',
    text: [
      'Seguiremos construyendo ciudades más justas y dignas para las juventudes.'
    ]
  },
]

</script>

<template>
  <div>
    <UContainer class="my-9">
      <p class="font-oswald text-5xl leading-tight text-[#D4F779]">JUVENTUDES QUE TRANSFORMAN</p>
      <p class="font-medium text-2xl leading-tight mb-5">Somos una red de jóvenes activistas en Cali y Bogotá que buscan
        la construcción de realidades dignas para las juventudes</p>
      <p class="text-xl text-pumpkin-500 font-bold">MINI DOCUMENTAL</p>
      <!-- YouTube Video -->
      <div class="px-10 my-10">
        <div class="aspect-w-16 aspect-h-9 bg-gray-900 rounded-lg">
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
            <div class="text-base text-white space-y-3 text-justify my-3 px-6">
              <p>Durante los años 2019 y 2021 tuvo en lugar en Colombia estallidos sociales históricos, en ellos la
                inconformidad generalizada de diferentes gremios, sectores de la ciudadanía fue canalizada en
                multitudinarias movilizaciones, acciones simbólicas, tomas del espacio público, plantones y demás
                acciones colectivas dentro del campo online y también offline. El arte, la creatividad y resistencia
                gestaron grandes luchas, visibilizaron liderazgos tanto locales como nacionales y por ende, dieron un
                lugar a las diversas manifestaciones sociales y políticas.</p>
              <p>Sin duda la juventud tuvo un rol protagónico en los estallidos sociales, fue protagonista por su
                liderazgo, coraje y valentía; la juventud fue el motor de las acciones colectivas. Sin embargo, fueron
                los y las jóvenes uno de los sectores mayormente violentados y vulnerados en el marco de la protesta
                social u otras acciones de participación, sus liderazgos fueron opacados y diferentes hechos violentos
                contra la juventud tuvieron lugar: violencia física, sexual, desaparición forzada, tratos crueles e
                inhumanos.</p>
              <p>Bajo este contexto nace <b>Incidir para Existir</b> como un espacio para el encuentro de líderes y lideresas,
                como un lugar para promover el diálogo de la juventud hacia la institucionalidad y desde allí, facilitar
                la incidencia política desde la propuesta, la escucha y por supuesto, la exigencia de sus demandas para
                así, promover la dignificación de la vida y sentires de los y las jóvenes de las ciudades de Cali y
                Bogotá.</p>
              <p>Una vez finalizado el trabajo de definir de manera colectiva las demandas juveniles de Cali y de
                Bogotá, consignadas en las agendas ciudadanas a través de los bootcamps y las mentorías, dimos paso a un
                trabajo de incidencia y de organización interna de cada uno de los grupos establecidos en cada ciudad,
                pensados desde la complejidad de los procesos organizativos de trabajo ciudadano. Al observar la
                realidad sociopolítica de las ciudades, sumado a la intención de generar un trabajo organizado y
                participativo con las juventudes, el proyecto pasó a ser comprendido y ejecutado a partir de macro
                procesos que engloban todas las vertientes que implican nuestro objetivo inicial y nuestra teoría de
                cambio.</p>
            </div>
            <br>  
            <h1 class="text-3xl uppercase font-oswald text-mindaro text-center">Línea de tiempo:<br>El nacimiento y evolución de "Incidir para Existir"</h1>
            <UCarousel
              :items="carouselItems"
              :ui="{
                item: 'basis-full',
                container: 'rounded-lg'
              }"
              arrows
              class="w-8/12 mx-auto my-5"
            >
              <template #default="{ item }">
                <UCard class="w-full m-3 flex flex-col items-center justify-center text-center">
                  <h3 class="font-oswald text-2xl uppercase text-pumpkin-300 mb-5">{{ item.title }}</h3> 
                  <p v-for="(text, index) in item.text" :key="`p-${item.id}-${index}`" class="text-base text-white mb-3">
                    {{ text }}
                  </p>
                </UCard>
              </template>

              <template #prev="{ onClick, disabled }">
                <button :disabled="disabled" @click="onClick">
                  Anterior
                </button>
              </template>

              <template #next="{ onClick, disabled }">
                <button :disabled="disabled" @click="onClick">
                  Siguiente
                </button>
              </template>
            </UCarousel>
          </template>
          <template #que-hemos-logrado>
            <div class="text-base text-white space-y-3 text-justify my-3 px-6">
              <ul class="list-disc space-y-3">
                <li>Hemos consolidado una red de más de 60 jóvenes entre Cali y Bogotá, generando juntanza y trabajo en
                  red.</li>
                <li>¡Nos hemos formado para incidir de manera efectiva! +50 horas de formación continua, +32 horas de
                  mentoría que nos han llevado a fortalecer nuestras habilidades. ¡Incidir es comprender para accionar!
                </li>
                <li>Hemos co-creado 2 agendas ciudadanas (una para Cali y otra para Bogotá) donde se reflejan los
                  sentires de las juventudes, sus problemáticas, exigencias y propuestas.</li>
                <li>Creemos fielmente en el diálogo y la creación de consensos. Por ello, nos hemos reunido con
                  candidatos, tomadores de decisión, sociedad civil. ¡Nuestras demandas se mueven!</li>
                <li>Le hemos apostado por las acciones en calle y campañas online que promuevan la incidencia e
                  involucramiento de juventudes. ¡Nuestra acción es poder! </li>
              </ul>
            </div>
          </template>
          <template #que-nos-mueve>
            <div class="text-base text-white space-y-3 text-justify my-3 px-6">
              <ul class="list-disc space-y-3">
                <li>Nos mueve la pasión de tomar el control de nuestro futuro. Queremos liderar y ser parte de las
                  decisiones que nos afectan, para construir un mundo que sea justo y cool para todos.</li>
                <li>Nos mueve la necesidad de ser escuchados. Queremos que los líderes de Bogotá y Cali se tomen en
                  serio nuestras demandas y sentires, y los incluyan en sus planes, porque somos el presente y el futuro
                  de estas ciudades.</li>
                <li>Nos mueve el deseo de unirnos y hacer que nuestra voz sea más fuerte. Queremos aliarnos con otros
                  jóvenes y organizaciones para crear un movimiento que sea sostenible y que genere un impacto real en
                  nuestras vidas y comunidades.</li>
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
        <p class="text-3xl font-bold text-center lg:text-left my-5">STAFF MOVILIZATORIO</p>
        <QuienesSomosReel team="movilizatorio" />
      </UContainer>
    </div>
  </div>
</template>


<style></style>