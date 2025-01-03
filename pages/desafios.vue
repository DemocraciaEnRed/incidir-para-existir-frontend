<script setup>


useHead({
  title: 'Desafios de la juventud'
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
  <UContainer>
    <div class="flex gap-5 justify-between items-center my-10 flex-col md:flex-row">
      <div class="w-full lg:w-1/2 text-center md:text-left">
        <p class="font-oswald text-5xl uppercase leading-tight text-mindaro mb-5">Entérate de los desafíos de las juventudes en tu ciudad y déjanos saber cuáles son tus propuestas</p>
      </div>
      <div class="w-full lg:w-1/2">
        <img src="/img/desafios-01.png" alt="Incidir para existir" class="w-full lg:w-4/5 mx-auto rounded-lg">
      </div>
    </div>
    <div class="my-10 w-full md:w-2/3 mx-auto">
      <p class="font-center text-xl leading-tight mb-5 text-center">Recuerda que los datos tienen poder y en la medida que nos compartas más reportes, esta información podrá seguir movilizandose para que llegue a los tomadores de decisión de tu ciudad</p>
      <UButton color="pumpkin" block size="xl" class="text-center text-xl sm:text-2x lg:text-3xl font-weight font-inter font-black rounded-full" @click="showDesafiosForm = true">Quiero reportar desafíos y propuestas de la juventud</UButton>
      <!-- <UButton color="pumpkin" block size="xl" class="text-center text-3xl font-weight font-inter font-black rounded-full">Quiero reportar desafios de la juventud</UButton> -->
    </div>
    <div class="my-10 w-full md:w-2/3 mx-auto" v-if="showDesafiosForm">
      <DesafiosForm />
    </div>
  <UDivider size="md" class="my-5" />
    <p class="font-oswald text-4xl text-center uppercase leading-tight text-mindaro mb-5">Estadisticas</p>
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
</template>


<style>

</style>