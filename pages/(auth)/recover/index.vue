<script setup>
import {
  object as YupObject,
  string as YupString,
} from 'yup'

const { $api } = useNuxtApp()
const toast = useToast()

definePageMeta({
  name: 'recoverPassword',
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: 'index'
  }
})

const schema = YupObject({
  email: YupString().email('Por favor, ingresa un email válido').required('Este campo es requerido'),
})

const state = reactive({
  email: '',
})

const successRequest = ref(false)
const isLoading = ref(false)

const handleRecover = async () => {
  isLoading.value = true
  $api(`/auth/forgot`, {
    method: 'POST',
    body: JSON.stringify({ email: state.email })
  }).then(() => {
    console.log('Email enviado')
    toast.add({ title: 'Email enviado', description: 'Revisa tu correo para recuperar tu contraseña', color: 'green' })
    successRequest.value = true
    isLoading.value = false
  }).catch((error) => {
    console.error(error)
    toast.add({ title: 'Error', description: 'El servidor respondio con un error. Intentelo más tarde.', color: 'red' })
    isLoading.value = false
  })
}

const onError = (event) => {
  toast.add({ title: 'Error', description: 'Debe completar los campos requeridos', color: 'red' })
  console.log(event)
}

</script>


<template>
  <div class="flex flex-row justify-center items-center my-16">
    <div class="w-full sm:w-2/3 md:w-3/5 lg:w-1/3">
      <img src="/img/incidir-para-existir-logo.png" alt="Incidir para existir" class="mx-auto px-10 mb-10 max-w-[250px]" >
      <UCard v-if="!successRequest">
        <template #default>
          <p class="font-oswald font-normal mb-3 uppercase text-2xl text-[#D4F779]">RECUPERAR CONTRASEÑA</p>
          <UForm :schema="schema" :state="state" class="space-y-4" @submit.prevent="handleRecover" @error="onError">
            <UFormGroup class="" label="Email" name="email" >
              <UInput v-model="state.email" size="xl" icon="i-heroicons-envelope" placeholder="Ingresa tu email" />
            </UFormGroup>
            <UButton color="primary" variant="soft" type="submit" icon="i-heroicons-paper-airplane" size="xl" block trailing :loading="isLoading" :ui="{ rounded: 'rounded-full' }">Recuperar contraseña</UButton>
          </UForm>
        </template>
      </UCard>
      <UCard v-else class="text-center">
        <UIcon name="i-heroicons-check-circle" class="text-6xl text-green-500" />
        <p class="">Un correo de recuperación ha sido enviado a tu email.</p>
      </UCard>
      <br>
      <UButton to="login" variant="ghost" block color="white" ><UIcon name="i-heroicons-arrow-left-16-solid" />Volver al Login</UButton>
    </div>
  </div>
</template>
