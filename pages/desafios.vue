<script setup>


useHead({
  title: 'Desafios de la juventud'
})
definePageMeta({
  layout: 'full-width'
})

const showDesafiosForm = ref(false)



// const toast = useToast()
// const modal = useModal()

// function openModal() {
//   console.log('openModal')
//   modal.open(DesafiosModalForm, {
//     onSuccess() {
//       toast.add({
//         title: 'Success !',
//         id: 'modal-success'
//       })
//     }
//   })
// }

</script>

<template>
  <div>
    <UContainer>
      <div class="flex gap-5 justify-between items-center my-10 flex-col md:flex-row">
        <div class="w-full lg:w-1/2 text-center">
          <p class="font-oswald text-5xl uppercase leading-tight text-mindaro mb-5">Entérate de los desafíos de las juventudes en tu ciudad y déjanos saber cuáles son tus propuestas</p>
          <p class="font-bold text-xl leading-tight mb-5">Los desafíos de las juventudes son las problemáticas y barreras que limitan su acceso a derechos, oportunidades y espacios seguros para participar y transformar su entorno.</p>

        </div>
        <div class="w-full lg:w-1/2">
          <img src="/img/desafios-01.png" alt="Incidir para existir" class="w-full lg:w-4/5 mx-auto rounded-lg">
        </div>
      </div>
      <div class="my-10 w-full md:w-4/5 mx-auto space-y-5">
        <UButton v-if="!showDesafiosForm" color="pumpkin" block size="xl" class="text-center text-xl sm:text-2x lg:text-3xl font-weight font-inter font-black rounded-full" @click="showDesafiosForm = true">Quiero reportar desafíos y propuestas de la juventud</UButton>
        <p class="font-center text-lg leading-tight text-center">Recuerda que los <b>datos tienen poder</b>. Las propuestas y reportes que compartas serán analizados y utilizados para visibilizar los desafíos de las juventudes. Esta información buscará sensibilizar a diferentes actores clave y promover una mayor atención a las necesidades planteadas</p>
      </div>
      <div v-if="showDesafiosForm" class="my-10 w-full md:w-2/3 mx-auto">
        <DesafiosForm />
      </div>
    </UContainer> 
    <div class="bg-electricViolet-800 py-10 rounded-tr-2xl rounded-tl-2xl">
      <UContainer class="">
        <p class="font-oswald text-5xl leading-tight text-mindaro text-center">MAPA DE DESAFIOS</p>
        <DesafiosMapList />
      </UContainer>
    </div>
    <UContainer class="my-12">
      <div class="space-y-7">
        <div class="text-center">
          <p class="font-oswald text-5xl leading-tight text-mindaro text-center my-10">REPORTES DE DESAFIOS</p>
        </div>
        <DesafiosList />
      </div>
    </UContainer>
    <div class="bg-electricViolet-800 py-1 my-12" />
    <UContainer class="my-12">
      <p class="font-oswald text-5xl leading-tight text-mindaro text-center my-10">ESTADISTICAS</p>
      <ClientOnly>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <DesafiosChartsDimensions class="md:col-span-2" />
          <DesafiosChartsSubdivisionsCali class="" />
          <DesafiosChartsSubdivisionsBogota class="" />
        </div>
        <template #fallback>
          <!-- this will be rendered on server side -->
          <UCard>
            <UProgress />
          </UCard>
        </template>
      </ClientOnly>
    </UContainer>
  </div>
</template>


<style>

</style>