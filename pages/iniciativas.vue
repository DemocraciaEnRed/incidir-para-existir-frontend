<script setup>
useHead({
  title: 'Iniciativas de la juventud'
})
definePageMeta({
  layout: 'full-width'
})

// const { signIn, token, data, status, lastRefreshedAt } = useAuth()
const { status, data: sessionData } = useAuth()

const topicDescription = ref(1)
const showInitiativeForm = ref(false)

const handleShowForm = async () => {
  showInitiativeForm.value = true
}

const isUserAuthenticated = computed(() => {
  return status.value === 'authenticated'
})

const canUserCompleteForm = computed(() => {
  // the condition is that the user requires to have a subdivisionId in his user data
  return sessionData.value.user && sessionData.value.user.subdivision && sessionData.value.user.subdivision.id
})

const showTopicDescription = (sectionNumber) => {
  topicDescription.value = sectionNumber
  // scroll to the description
  const element = document.getElementById('theDescription')
  element.scrollIntoView({ behavior: 'smooth' })
}

</script>

<template>
  <div>
    <UContainer>
      <div class="flex gap-5 justify-between items-center my-10 flex-col md:flex-row">
        <div class="w-full lg:w-1/2 text-center">
          <p class="font-oswald text-5xl  leading-tight text-mindaro mb-5">¿QUIERES UNIRTE Y SER UN AGENTE DE CAMBIO?</p>
          <p class="font-bold text-xl leading-tight mb-5">¿Tienes una iniciativa, parche y/o movimiento, proyecto que se enmarca en las líneas temáticas de esta feria de causas?</p>
          <UButton color="pumpkin" block size="xl" class="text-center text-3xl font-weight font-inter font-black rounded-full" @click="handleShowForm">¡Súmate!</UButton>
        </div>
        <div class="w-full lg:w-1/2">
          <img src="/img/iniciativas-01.png" alt="Incidir para existir" class="w-full lg:w-4/5 mx-auto rounded-lg">
        </div>
      </div>
      <ClientOnly>
      <div v-if="showInitiativeForm" class="w-full">
        <UCard v-if="!isUserAuthenticated" class="my-10 text-center">
          <p class="font-bold text-2xl text-pumpkin leading-tight mb-3 uppercase">Inicia sesión para sumar tu iniciativa</p>
          <p>Para poder sumar tu iniciativa, necesitas <ULink to="/login" class="text-pumpkin">Iniciar sesión</ULink> en tu cuenta. Si no tienes una cuenta, puedes <ULink to="/signup" class="text-pumpkin">registrarte aquí</ULink></p>
        </UCard>
        <UCard v-else-if="!canUserCompleteForm" class="my-10 text-center">
          <p class="font-bold text-2xl text-pumpkin leading-tight mb-3 uppercase">Solo se aceptan iniciativas de Cali o Bogota</p>
          <p>Contactate con nuestro equipo si deseas tener asistencia</p>
        </UCard>
        <div v-else>
          <IniciativasForm />
        </div>
      </div>
      </ClientOnly>
      <p class="font-bold text-2xl text-mindaro text-center leading-tight my-10">Explorá las líneas temáticas</p>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 my-10">
        <div
          class="px-5 py-3 rounded-full text-xl w-full border-solid border flex items-center justify-between cursor-pointer"
          :class="topicDescription === 1 ? 'text-black bg-mindaro border-mindaro' : 'text-white'"
          @click="showTopicDescription(1)"
          >
          <div>
            <p class="font-medium">Educación de calidad</p>
            <p class="text-sm italic ">Merecemos aprender sin límites</p>
          </div>
        </div>
        <div
          class="px-5 py-3 rounded-full text-xl w-full border-solid border flex items-center justify-between cursor-pointer"
          :class="topicDescription === 2 ? 'text-black bg-mindaro border-mindaro' : 'text-white'"
          @click="showTopicDescription(2)"
          >
          <div>
            <p class="font-medium">Empleo Digno</p>
            <p class="text-sm italic ">Trabajar bien, vivir mejor</p>
          </div>
        </div>
        <div
          class="px-5 py-3 rounded-full text-xl w-full border-solid border flex items-center justify-between cursor-pointer"
          :class="topicDescription === 3 ? 'text-black bg-mindaro border-mindaro' : 'text-white'"
          @click="showTopicDescription(3)"
          >
          <div>
            <p class="font-medium">Espacios Públicos Seguros</p>
            <p class="text-sm italic ">Calles sin miedo</p>
          </div>
        </div>
        <div
          class="px-5 py-3 rounded-full text-xl w-full border-solid border flex items-center justify-between cursor-pointer"
          :class="topicDescription === 4 ? 'text-black bg-mindaro border-mindaro' : 'text-white'"
          @click="showTopicDescription(4)"
          >
          <div>
            <p class="font-medium">Participación Política Juvenil</p>
            <p class="text-sm italic ">Alzar la voz, ser parte del cambio</p>
          </div>
        </div>
        <div
          class="px-5 py-3 rounded-full text-xl w-full border-solid border flex items-center justify-between cursor-pointer"
          :class="topicDescription === 5 ? 'text-black bg-mindaro border-mindaro' : 'text-white'"
          @click="showTopicDescription(5)"
          >
          <div>
            <p class="font-medium">Transporte Público Digno</p>
            <p class="text-sm italic ">Movilidad sin barreras</p>
          </div>
        </div>
        <div
          class="px-5 py-3 rounded-full text-xl w-full border-solid border flex items-center justify-between cursor-pointer"
          :class="topicDescription === 6 ? 'text-black bg-mindaro border-mindaro' : 'text-white'"
          @click="showTopicDescription(6)"
          >
          <div>
            <p class="font-medium">Salud Integral</p>
            <p class="text-sm italic ">Cuerpo y mente en equilibrio</p>
          </div>
        </div>
        <div
          class="px-5 py-3 rounded-full text-xl w-full border-solid border flex items-center justify-between cursor-pointer"
          :class="topicDescription === 7 ? 'text-black bg-mindaro border-mindaro' : 'text-white'"
          @click="showTopicDescription(7)"
          >
          <div>
            <p class="font-medium">Ambiente Sano</p>
            <p class="text-sm italic ">El planeta es nuestro hogar</p>
          </div>
        </div>
        <div
          class="px-5 py-3 rounded-full text-xl w-full border-solid border flex items-center justify-between cursor-pointer"
          :class="topicDescription === 8 ? 'text-black bg-mindaro border-mindaro' : 'text-white'" 
          @click="showTopicDescription(8)"
          >
          <div>
            <p class="font-medium">Ocio y Cultura</p>
            <p class="text-sm italic ">Espacios para crear y soñar</p>
          </div>
        </div>
      </div>
      <div class="my-10 px-5 text-center">
        <UCard id="theDescription">
          <div v-if="topicDescription === 1">
            <p class="font-medium text-3xl text-pumpkin-500 uppercase leading-tight mb-3">Educación de calidad</p>
            <p>Tenemos derecho a una educación que realmente nos prepare para el mundo, sin importar dónde vivamos o qué recursos tengamos. Apostamos por una educación que valore nuestras historias y que sea accesible para todas las personas.</p>
          </div>
          <div v-if="topicDescription === 2">
            <p class="font-medium text-3xl text-pumpkin-500 uppercase leading-tight mb-3">Empleo Digno</p>
            <p>Sabemos lo difícil que es encontrar un trabajo estable y justo. Exigimos empleos formales que incluyan seguridad social y pensiones, sin contratos basura. Además, queremos que se apoyen los emprendimientos juveniles para que seamos quienes generemos empleo, con oportunidades reales de crecimiento económico y personal.</p>
          </div>
          <div v-if="topicDescription === 3">
            <p class="font-medium text-3xl text-pumpkin-500 uppercase leading-tight mb-3">Espacios Públicos Seguros</p>
            <p>Las calles y los espacios públicos deberían ser seguros para todas las personas, sin importar su género o identidad. Necesitamos lugares donde podamos caminar sin miedo, con botones de pánico y acciones para prevenir la violencia de género y basada en el prejuicio. Creemos en espacios seguros, inclusivos y llenos de vida.</p>
          </div>
          <div v-if="topicDescription === 4">
            <p class="font-medium text-3xl text-pumpkin-500 uppercase leading-tight mb-3">Participación Política Juvenil</p>
            <p>Queremos ser parte activa en las decisiones que afectan nuestras vidas. Exigimos espacios donde nuestra voz se escuche y tenga impacto real. Desde los Consejos de Juventud hasta las mesas de dialogo, estamos listos para liderar y transformar la política con ideas frescas y una perspectiva juvenil.</p>
          </div>
          <div v-if="topicDescription === 5">
            <p class="font-medium text-3xl text-pumpkin-500 uppercase leading-tight mb-3">Transporte Público Digno</p>
            <p>Moverse por la ciudad no debería ser un lujo. Queremos tarifas justas para estudiantes, transporte accesible y seguro las 24 horas, y que sea sostenible con el ambiente. El transporte público debería estar pensado para nuestras necesidades, sin importar si es de día o de noche.</p>
          </div>
          <div v-if="topicDescription === 6">
            <p class="font-medium text-3xl text-pumpkin-500 uppercase leading-tight mb-3">Salud Integral</p>
            <p>La salud va más allá de lo físico. Necesitamos servicios de salud mental y sexual que no nos juzguen ni nos estigmaticen. Queremos acceso a programas que nos hablen de autocuidado, consentimiento y desarrollo libre de nuestra sexualidad, con profesionales que entiendan nuestras realidades y necesidades.</p>
          </div>
          <div v-if="topicDescription === 7">
            <p class="font-medium text-3xl text-pumpkin-500 uppercase leading-tight mb-3">Ambiente Sano</p>
            <p>El cambio climático es nuestro problema, y queremos soluciones reales. Exigimos ser parte de las decisiones que afectan el ambiente, desde la conservación de humedales hasta políticas climáticas internacionales. La juventud está lista para liderar la protección del planeta.</p>
          </div>
          <div v-if="topicDescription === 8">
            <p class="font-medium text-3xl text-pumpkin-500 uppercase leading-tight mb-3">Ocio y Cultura</p>
            <p>Necesitamos más lugares donde podamos expresarnos libremente. Queremos acceso a actividades culturales, deportivas y recreativas que nos ayuden a crecer y a desarrollar nuestras pasiones. El ocio y la cultura también son esenciales para vivir una vida plena y conectada con nuestras comunidades.</p>
          </div>
        </UCard>
      </div>
    </UContainer>
    <div class="bg-electricViolet-800 pt-10 rounded-tr-2xl rounded-tl-2xl">
      <UContainer>
        <p class="font-oswald text-5xl leading-tight text-mindaro text-center my-10">MAPA DE INICIATIVAS</p>
        <p class="font-oswald font-thin text-3xl leading-tight text-mindaro text-center my-10">Próximamente</p>
        <br>
      </UContainer>
    </div>
  </div>

</template>


<style>

</style>