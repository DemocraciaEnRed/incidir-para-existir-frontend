<script setup>
// import { definePageMeta } from '#imports'
useHead({
  title: 'Verificar cuenta'
})
definePageMeta({
  name: 'signup-verify'
})

const { $api } = useNuxtApp()

const failedValidation = ref(false)
const route = useRoute()
const successValidation = ref(false)
const noToken = ref(false)
const isLoading = ref(true)
const errorMessage = ref('')

onMounted(async () => {
  // get the query param token
  const token = route.query.token
  if(!token) {
    noToken.value = true
    isLoading.value = false
    return 
  }
  $api(`/auth/verify/${token}`).then(() => {
    successValidation.value = true
    isLoading.value = false
  }).catch((error) => {
    console.error(error)
    errorMessage.value = error.data.message
    failedValidation.value = true
    isLoading.value = false
  })
})
</script>

<template>
  <!-- A grid of 2 columns with tailwind -->
  <div class="flex flex-row justify-center items-center my-16">
    <div class="w-full md:w-3/5">
          <!-- First column -->
        <div class="text-center my-auto">
          <img src="/img/incidir-para-existir-logo.png" alt="Incidir para existir" class="mx-auto px-10 mb-10 max-w-[250px]" >
        </div>
        <!-- Second column -->
        <div class="content-stretch mt-8 lg:mt-0">

       
          <UCard class="text-center">
            <UProgress v-if="isLoading" animation="carousel" color="pumpkin"/>
            <div v-else-if="noToken" class="space-y-3">
              <UIcon name="i-heroicons-information-circle" class="text-6xl text-pumpkin-500" />
              <p class="text-pumpkin-500 font-oswald uppercase text-3xl mb-3">¡Token inválido!</p>
              <p>Por favor, revisa en el link que esté presente el token.</p>
            </div>
            <div v-else-if="successValidation" class="space-y-3">
              <UIcon name="i-heroicons-check-circle" class="text-6xl text-green-500" />
              <p class="text-green font-oswald uppercase text-3xl mb-3">¡Validación exitosa!</p>
              <p>Ya puedes ingresar a tu cuenta.</p>
            </div>
            <div v-else-if="failedValidation" class="space-y-3">
              <UIcon name="i-heroicons-x-circle" class="text-6xl text-red-500" />
              <p class="text-red-500 font-oswald uppercase text-3xl mb-3">¡Validación fallida!</p>
              <p>Ocurrió un error al validar tu cuenta.</p>
              <p class="text-xs text-gray-500">Mensaje del servidor:<br><span class="font-mono">{{ errorMessage }}</span></p>
            </div>
          </UCard>
        </div>
      </div>
  </div>
</template>
