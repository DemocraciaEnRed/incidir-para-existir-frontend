<script setup>

import {
  string as YupString,
  object as YupObject
} from 'yup'
import { definePageMeta, useAuth } from '#imports'

useHead({
  title: 'Iniciar sesión'
})
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
const showErrorFormAlert = ref(false);
const showErrorLoginAlert = ref(false);

const handleLogin = async () => {
  showErrorFormAlert.value = false
  showErrorLoginAlert.value = false;
  isLoading.value = true  
  try {
    await signIn({ email: state.email, password: state.password }, { callbackUrl: '/' })
    isLoading.value = false
  } catch (error) {
    console.log(error)
    showErrorLoginAlert.value = true;
  } finally {
    isLoading.value = false
  }
} 

const onError = (event) => {
  console.log(event)
  showErrorLoginAlert.value = false;
  showErrorFormAlert.value = true
}
</script>


<template>
  <div class="flex flex-row justify-center items-center my-16">
    <div class="w-full sm:w-2/3 md:w-3/5 lg:w-1/3">
      <img src="/img/incidir-para-existir-logo.png" alt="Incidir para existir" class="mx-auto px-10 mb-10 max-w-[250px]" >
      <UAlert 
        v-if="showErrorFormAlert"
        class="my-8"
        icon="i-heroicons-command-line"
        color="mindaro"
        variant="soft"
        title="Hay un error en el formulario"
        description="Por favor, verifica que los campos estén completos y sin errores"
        :close-button="{ 
          icon: 'i-heroicons-x-mark-20-solid',
          padded: false,
          color: 'mindaro',
          variant: 'link',
          onClick: () => showErrorFormAlert = false
        }"
      />
      <UAlert 
        v-if="showErrorLoginAlert"
        class="my-8"
        icon="i-heroicons-command-line"
        color="red"
        variant="soft"
        title="Error al iniciar sesión"
        description="Por favor, verifica que tu email y contraseña sean correctos. Si el problema persiste, contacte a Movilizatorio."
        :close-button="{ 
          icon: 'i-heroicons-x-mark-20-solid',
          padded: false,
          color: 'red',
          variant: 'link',
          onClick: () => showErrorLoginAlert = false
        }"
      />
      <UCard>
        <p class="font-oswald font-normal mb-3 uppercase text-2xl text-[#D4F779]">INGRESA A TU CUENTA</p>
        <UForm ref="theForm" :schema="schema" :state="state" class="space-y-4" @error="onError" @submit.prevent="handleLogin" >
          <UFormGroup name="email" label="Email" required>
            <UInput v-model="state.email" icon="i-heroicons-envelope" size="xl" placeholder="Ingrese su email" :disabled="isLoading" />
          </UFormGroup>
          <UFormGroup name="password" label="Password" required>
            <UInput v-model="state.password" icon="i-heroicons-lock-closed" size="xl" type="password" placeholder="Ingrese su contraseña"  :disabled="isLoading"/>
            <template #help>
              <UIcon name="i-heroicons-information-circle" /> <ULink :to="{name: 'recoverPassword'}" class="text-sm" >¿Olvidaste tú contraseña?</ULink>
            </template>
          </UFormGroup>
          <div class="text-right">
            <UButton color="primary" variant="soft" type="submit" :loading="isLoading" icon="i-heroicons-paper-airplane" size="xl" block trailing :ui="{ rounded: 'rounded-full' }">Iniciar sesión</UButton>
          </div>
        </UForm>
      </UCard>
      <div class="flex flex-col items-center justify-center mt-8">
        <p class="font-medium mb-3 text-lg">¿Aun nó tienes cuenta?</p>
        <UButton to="signup" color="orange" variant="outline" size="xl" class="text-xl" block trailing :ui="{ rounded: 'rounded-full' }">Registrate</UButton>
      </div>
      <br>
      <UButton to="/" variant="ghost" block color="white" ><UIcon name="i-heroicons-arrow-left-16-solid" />Volver al Inicio</UButton>
    </div>
  </div>
</template>
