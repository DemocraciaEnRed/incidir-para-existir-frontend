<script setup>
import {
  string as YupString,
  object as YupObject
} from 'yup'
import { definePageMeta, useAuth } from '#imports'

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: 'index'
  }
})

// const { signIn, token, data, status, lastRefreshedAt } = useAuth()
const { signIn } = useAuth()

const schema = YupObject({
  email: YupString().email('Por favor, ingresa un email válido').required('Este campo es requerido'),
  password: YupString().min(6, 'La contraseña debe tener al menos 6 caracteres').required('Este campo es requerido'),
})

const state = reactive({
  email: '',
  password: ''
})

const isLoading = ref(false);
const showErrorAlert = ref(false);

const handleLogin = async () => {
  isLoading.value = true  
  try {
    await signIn({ email: state.email, password: state.password }, { callbackUrl: '/' })
  } catch (error) {
    console.log(error)
    showErrorAlert.value = true
  } finally {
    isLoading.value = false
  }
} 

const onError = (event) => {
  console.log(event)
  showErrorAlert.value = true
}
</script>


<template>
  <div class="flex flex-row justify-center items-center my-16">
    <div class="w-full md:w-1/3">
      <img src="/img/incidir-para-existir-logo.png" alt="Incidir para existir" class="mx-auto px-10 mb-10 max-w-[250px]" >
      <p class="font-oswald text-center text-4xl mb-10 text-[#D4F779]">INGRESA A TU CUENTA</p>
      <UCard v-if="showErrorAlert" color="red" class="mb-4">
        <p class="text-white text-center">Por favor, verifica los datos ingresados</p>
      </UCard>
      <UCard>
        <UForm ref="theForm" :schema="schema" :state="state" class="space-y-4" @error="onError" @submit.prevent="handleLogin" >
          <UFormGroup name="email" label="Email" required>
            <UInput v-model="state.email" size="lg" icon="i-heroicons-envelope" />
          </UFormGroup>
          <UFormGroup name="password" label="Password" required>
            <UInput v-model="state.password" size="lg" type="password"  />
            <template #help>
              <UIcon name="i-heroicons-information-circle" /> <ULink :to="{name: 'recoverPassword'}" class="text-sm" >¿Olvidaste tú contraseña?</ULink>
            </template>
          </UFormGroup>
          <div class="text-right">
            <UButton color="orange" type="submit" icon="i-heroicons-paper-airplane" block trailing>Iniciar sesión</UButton>
          </div>
        </UForm>
      </UCard>
      <div class="flex flex-col items-center justify-center mt-8">
        <p class="font-medium mb-3 text-lg">¿Aun nó tienes cuenta?</p>
        <div>
          <UButton to="signup" color="orange"  variant="outline">Registrate</UButton>
        </div>
      </div>
    </div>
  </div>
</template>
