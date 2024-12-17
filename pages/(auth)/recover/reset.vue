<script setup>
// import { definePageMeta } from '#imports'
import {
  object as YupObject,
  string as YupString,
  ref as YupRef,
} from 'yup'

definePageMeta({
  name: 'resetPassword'
})

const { $api } = useNuxtApp()

const route = useRoute()
const failedValidation = ref(false)
const successValidation = ref(false)
const sent = ref(false)
const noToken = ref(false)
const isLoading = ref(true)
const errorMessage = ref('')

const state = reactive({
  password: null,
  passwordConfirmation: null,
})

const schema = YupObject({
  password: YupString().label('Contraseña').min(6, 'La contraseña debe tener al menos 6 caracteres').required('Este campo es requerido'),
  passwordConfirmation: YupString().label('Confirmar Contraseña').oneOf([YupRef('password'), null], 'Las contraseñas deben coincidir').required('Este campo es requerido'),
})

onMounted(async () => {
  // get the query param token
  const token = route.query.token
  if(!token) {
    noToken.value = true
    isLoading.value = false
    return 
  }
})

const handleReset = async () => {
  successValidation.value = false
  failedValidation.value = false
  isLoading.value = true
  const token = route.query.token
  $api(`/auth/reset/${token}`, {
    method: 'POST',
    data: {
      password: state.password
    }
  }).then(() => {
    successValidation.value = true
    isLoading.value = false
  }).catch((error) => {
    console.error(error)
    errorMessage.value = error.data.message
    failedValidation.value = true
    isLoading.value = false
  })
}

</script>

<template>
  <!-- A grid of 2 columns with tailwind -->
  <div class="flex flex-row justify-center items-center my-16">
    <div class="w-3/5">
          <!-- First column -->
        <div class="text-center my-auto">
          <img src="/img/incidir-para-existir-logo.png" alt="Incidir para existir" class="mx-auto px-10 mb-10 max-w-[250px]" >
        </div>
        <!-- Second column -->
        <div class="content-stretch mt-8 lg:mt-0">
          <UCard class="text-center">
            <div v-if="noToken" class="space-y-3">
              <UIcon name="i-heroicons-information-circle" class="text-6xl text-pumpkin-500" />
              <p class="text-pumpkin-500 font-oswald uppercase text-3xl mb-3">¡Token inválido!</p>
              <p>Por favor, revisa en el link que esté presente el token.</p>
            </div>
            <div v-else>
              <UForm v-if="sent" :schema="schema" :state="state" @submit.prevent="handleReset">
                <UFormGroup class="" label="Password" name="password">
                  <UInput v-model="password" size="lg" type="password"  />
                </UFormGroup>
                <div class="flex justify-end">
                  <UButton color="pumpkin" size="lg" block type="submit" :loading="isLoading" :disabled="isLoading">{{ isLoading ? 'Cargando...' : 'Registrarme' }}</UButton>
                </div>
              </UForm>
              <div v-else-if="successValidation" class="space-y-3">
                <UIcon name="i-heroicons-check-circle" class="text-6xl text-green-500" />
                <p class="text-green font-oswald uppercase text-3xl mb-3">¡Contraseña actualizada!</p>
                <p>¡Tu contraseña ha sido actualizada!</p>
              </div>
              <div v-else-if="failedValidation" class="space-y-3">
                <UIcon name="i-heroicons-x-circle" class="text-6xl text-red-500" />
                <p class="text-red-500 font-oswald uppercase text-3xl mb-3">¡Error!</p>
                <p>Ocurrió un error al resetear tu contraseña tu cuenta.</p>
                <p class="text-xs text-gray-500">Mensaje del servidor:<br><span class="font-mono">{{ errorMessage }}</span></p>
              </div>
            </div>
          </UCard>
        </div>
      </div>
  </div>
</template>
