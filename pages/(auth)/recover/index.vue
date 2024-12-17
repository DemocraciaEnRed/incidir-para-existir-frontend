<script setup>
import Yup from 'yup'
import { definePageMeta } from '#imports'
const { $api } = useNuxtApp()

definePageMeta({
  name: 'recoverPassword',
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: 'index'
  }
})

const schema = Yup.object({
  email: Yup.string().email('Por favor, ingresa un email válido').required('Este campo es requerido'),
})

const state = reactive({
  email: '',
})


// const { signIn, token, data, status, lastRefreshedAt } = useAuth()

const isLoading = ref(false)

const handleRecover = async () => {
  isLoading.value = true
  console.log('Email:', state.email)
  $api(`/auth/recover`, {
    method: 'POST',
    body: JSON.stringify({ email: state.email })
  }).then(() => {
    console.log('Email enviado')
    isLoading.value = false
  }).catch((error) => {
    console.error(error)
    isLoading.value = false
  })
}

const onError = (event) => {
  console.log(event)
}

</script>


<template>
  <div class="flex flex-row justify-center items-center my-16">
    <div class="w-1/3">

      <img src="/img/incidir-para-existir-logo.png" alt="Incidir para existir" class="mx-auto px-10 mb-10 max-w-[250px]" >
      <p class="font-oswald text-center text-4xl mb-10 text-[#D4F779]">RECUPERAR CONSTRASEÑA</p>
      <UCard>
        <template #default>
          <UForm :schema="schema" :state="state" @submit.prevent="handleRecover">
            <UForm class="space-y-4" :validate-on="['blur']" @error="onError" @submit.prevent="handleRecover">
              <UFormGroup class="" label="Email" name="email" >
                <UInput v-model="email" size="lg" icon="i-heroicons-envelope" />
              </UFormGroup>
              <UButton color="pumpkin" size="lg" block type="submit" :loading="isLoading" :disabled="isLoading" icon="i-heroicons-paper-airplane" trailing>Recuperar contraseña</UButton>
            </UForm>
          </UForm>
        </template>
        <template #footer>
          <div class="flex flex-col items-center justify-center">
            <div>
              <UButton to="login" color="orange"  variant="text"><UIcon name="i-heroicons-arrow-left-16-solid" />Volver al Login</UButton>
            </div>
          </div>
        </template>
      </UCard>
    </div>
  </div>
</template>
