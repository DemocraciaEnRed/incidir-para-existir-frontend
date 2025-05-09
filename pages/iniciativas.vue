<script setup>
useHead({
  title: 'Iniciativas de la juventud'
})
definePageMeta({
  layout: 'full-width'
})

// const { signIn, token, data, status, lastRefreshedAt } = useAuth()

const accordionItems = [
  {
    label: 'Educación de calidad',
    subtitle: 'Merecemos aprender sin límites',
    slot: 'educacion-de-calidad',
  },
  {
    label: 'Empleo digno',
    subtitle: 'Trabajar bien, vivir mejor',
    slot: 'empleo-digno',
  },
  {
    label: 'Espacios públicos seguros',
    subtitle: 'Calles sin miedo',
    slot: 'espacios-publicos-seguros',
  },
  {
    label: 'Participación política juvenil',
    subtitle: 'Alzar la voz, ser parte del cambio',
    slot: 'participacion-politica-juvenil',
  },
  {
    label: 'Transporte público digno',
    subtitle: 'Movilidad sin barreras',
    slot: 'transporte-publico-digno',
  },
  {
    label: 'Salud integral',
    subtitle: 'Cuerpo y mente en equilibrio',
    slot: 'salud-integral',
  },
  {
    label: 'Ambiente sano',
    subtitle: 'El planeta es nuestro hogar',
    slot: 'ambiente-sano',
  },
  {
    label: 'Ocio y cultura',
    subtitle: 'Espacios para crear y soñar',
    slot: 'ocio-y-cultura',
  }
]

</script>

<template>
  <div>
    <UContainer>
      <div class="flex gap-5 justify-between items-center my-10 flex-col md:flex-row">
        <div class="w-full lg:w-1/2 text-center">
          <p class="font-oswald text-4xl leading-tight text-mindaro mb-5">¿QUIERES UNIRTE Y SER UN AGENTE DE CAMBIO?
          </p>
          <p class="font-bold text-xl leading-tight mb-5">Explora nuestras líneas temáticas y conoce cómo trabajamos colectivamente por un cambio transformador en Cali y Bogotá.</p>
        </div>
        <div class="w-full lg:w-1/2">
          <img src="/img/iniciativas-02.jpg" alt="Incidir para existir" class="w-full lg:w-4/5 mx-auto rounded-lg">
        </div>
      </div>
      <UDivider class="my-6"/>

      <p class="font-oswald text-4xl uppercase text-center text-mindaro leading-tight my-10">Explora las líneas temáticas</p>

      <UAccordion :items="accordionItems"
        :ui="{ wrapper: 'w-full grid grid-cols-1 md:grid-cols-2 gap-5 my-10' }">
        <template #default="{ item, index, open }">
          <UButton color="white" variant="outline" class="rounded-full text-xl border-white px-6"
            :class="{ 'bg-mindaro text-black': open }" :ui="{ rounded: 'rounded-full', padding: { sm: 'p-3' } }">
            <div class="pl-2 text-left">
              <p class="font-semibold">{{ item.label }}</p>
              <p class="font-normal text-base italic">{{ item.subtitle }}</p>
            </div>

            <template #trailing>
              <UIcon name="i-heroicons-chevron-right-20-solid"
                class="w-8 h-8 ms-auto transform transition-transform duration-200" :class="[open && 'rotate-90']" />
            </template>
          </UButton>
        </template>
        <template #educacion-de-calidad>
          <div class="text-base text-white space-y-3 text-justify my-1 px-6">
            <p>Tenemos derecho a una educación que realmente nos prepare para el mundo, sin importar dónde vivamos o qué
              recursos tengamos. Apostamos por una educación que valore nuestras historias y que sea accesible para
              todas las personas.</p><p>Hemos creado una campaña exigiendo tarifa diferencial para estudiantes en la ciudad de
              Cali, en donde se han recogido más de 2.000 firmas, todo un exito.</p>
          </div>
        </template>
        <template #empleo-digno>
          <div class="text-base text-white space-y-3 text-justify my-1 px-6">
            <p>Sabemos lo difícil que es encontrar un trabajo estable y justo. Exigimos empleos formales que incluyan seguridad social y pensiones, sin contratos basura. Además, queremos que se apoyen los emprendimientos juveniles para que seamos quienes generemos empleo, con oportunidades reales de crecimiento económico y personal.</p>
            <p>Esto mediante nuestra campaña por el Trabajo Digno hemos compartido nuestras exigencias y nuestras apuestas con las juventudes de Bogotá y los tomadores de decisiones de la ciudad.</p>
          </div>
        </template>
        <template #espacios-publicos-seguros>
          <div class="text-base text-white space-y-3 text-justify my-1 px-6">
            <p>Las calles y los espacios públicos deberían ser seguros para todas las personas, sin importar su género o
              identidad.</p><p>Necesitamos lugares donde podamos caminar sin miedo, con botones de pánico y acciones para
              prevenir la violencia de género y basada en el prejuicio. Creemos en espacios seguros, inclusivos y llenos
              de vida.</p>
          </div>
        </template>
        <template #participacion-politica-juvenil>
          <div class="text-base text-white space-y-3 text-justify my-1 px-6">
            <p>Queremos ser parte activa en las decisiones que afectan nuestras vidas.</p><p>Exigimos espacios donde nuestra
              voz se escuche y tenga impacto real. Desde los Consejos de Juventud hasta las mesas de dialogo, estamos
              listos para liderar y transformar la política con ideas frescas y una perspectiva juvenil.</p>
          </div>
        </template>
        <template #transporte-publico-digno>
          <div class="text-base text-white space-y-3 text-justify my-1 px-6">
            <p>Moverse por la ciudad no debería ser un lujo.</p><p>Queremos tarifas justas para estudiantes, transporte
              accesible y seguro las 24 horas, y que sea sostenible con el ambiente. El transporte público debería estar
              pensado para nuestras necesidades, sin importar si es de día o de noche.</p>
          </div>
        </template>
        <template #salud-integral>
          <div class="text-base text-white space-y-3 text-justify my-1 px-6">
            <p>La salud va más allá de lo físico.</p><p>Necesitamos servicios de salud mental y sexual que no nos juzguen ni
              nos estigmaticen. Queremos acceso a programas que nos hablen de autocuidado, consentimiento y desarrollo
              libre de nuestra sexualidad, con profesionales que entiendan nuestras realidades y necesidades.</p>
          </div>
        </template>
        <template #ambiente-sano>
          <div class="text-base text-white space-y-3 text-justify my-1 px-6">
            <p>El cambio climático es nuestro problema, y queremos soluciones reales.</p>
            <p>Exigimos ser parte de las decisiones que afectan el ambiente, desde la conservación de humedales hasta políticas climáticas internacionales. La juventud está lista para liderar la protección del planeta.</p>
            <p>Participamos en la COP-16 y exigimos la defensa de la vida de quienes cuidan y protegen el ambiente porque no podemos seguir permitiendo que defender la vida nos cueste la nuestra.</p>
          </div>
        </template>
        <template #ocio-y-cultura>
          <div class="text-base text-white space-y-3 text-justify my-1 px-6">
            <p>Necesitamos más lugares donde podamos expresarnos libremente.</p>
            <p>Queremos acceso a actividades culturales,
              deportivas y recreativas que nos ayuden a crecer y a desarrollar nuestras pasiones. El ocio y la cultura
              también son esenciales para vivir una vida plena y conectada con nuestras comunidades.</p>
          </div>
        </template>
      </UAccordion>
      <UDivider class="my-6"/>
      <div class="space-y-5 my-6">
        <p class="text-xl sm:text-2xl font-medium text-center leading-tight">¿Tienes una iniciativa, parche, movimiento y/o proyecto que se enmarca en las líneas temáticas de esta feria de causas?</p>
        <div class="flex justify-center items-center gap-5 text-2xl sm:text-5xl text-pumpkin">
          <UIcon name="i-heroicons-arrow-small-down" />
          <p class="font-oswald uppercase font-medium text-center text-pumpkin leading-tight">
             ¡Suma tu iniciativa aquí!
             </p>
          <UIcon name="i-heroicons-arrow-small-down" />
        </div>
        <IniciativasForm/>
      </div>

    </UContainer>
    <div class="bg-electricViolet-800 py-12 rounded-tr-2xl rounded-tl-2xl">
      <UContainer class="">
        <p class="font-oswald text-4xl sm:text-5xl leading-tight text-mindaro text-center">MAPA DE INICIATIVAS</p>
        <IniciativasMapList />
      </UContainer>
    </div>
    <UContainer class="my-12">
      <div class="space-y-7">
        <div class="text-center">
          <p class="font-oswald text-4xl sm:text-5xl leading-tight text-mindaro text-center my-10">LISTADO DE INICIATIVAS</p>
        </div>
        <IniciativasList />
      </div>
    </UContainer>
    <div class="bg-electricViolet-800 py-1 my-12" />
    <UContainer class="my-12">
      <p class="font-oswald text-4xl sm:text-5xl leading-tight text-mindaro text-center my-10">ESTADÍSTICAS</p>
      <ClientOnly>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <IniciativasChartsDimensions class="md:col-span-2" />
          <IniciativasChartsDimensionsBars class="md:col-span-2" />
          <IniciativasChartsSubdivisionsCali class="" />
          <IniciativasChartsSubdivisionsBogota class="" />
        </div>
        <template #fallback>
          <!-- this will be rendered on server side -->
          <UCard>
            <UProgress />
          </UCard>
        </template>
      </ClientOnly>
      <div class="my-12 text-center">
        <p class="font-oswald text-4xl sm:text-5xl leading-tight text-mindaro text-center my-4">¿TE INTERESAN LOS DATOS ABIERTOS?</p>
        <div class="my-4">
          <p>Descarga los datos completos aquí para conocer más detalles sobre las iniciativas reportadas en cada ciudad. Esta información puede ser útil para investigaciones, propuestas y acciones de incidencia de juventudes y tomadores de decisión.</p>
        </div>
        <div class="w-6/12 mx-auto">
          <IniciativasDownloadCsv />
        </div>
      </div>
    </UContainer>
  </div>

</template>


<style></style>