<script setup lang="ts">
import { definePageMeta, useAuth } from '#imports'

definePageMeta({
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: 'index'
  }
})

// const { signIn, token, data, status, lastRefreshedAt } = useAuth()
const { signIn } = useAuth()

const email = ref<string>('guillermo16@democracyos.io')
const password = ref<string>('123456')
const isLoading = ref<boolean>(false)

const handleLogin = async () => {
  isLoading.value = true
  console.log('Email:', email.value)
  console.log('Password:', password.value)
  console.log('Logging in...')
  
  await signIn({ email: email.value, password: password.value }, { callbackUrl: '/protected' })
  // console.log('Result:', result)

  // await navigateTo({name: 'index'})
} 


</script>


<template>
  <div class="flex flex-row justify-center items-center my-16">
    <div class="w-1/3">

      <img src="/img/incidir-para-existir-logo.png" alt="Incidir para existir" class="mx-auto px-10 mb-10 max-w-[250px]" >
      <p class="font-oswald text-center text-4xl mb-10 text-[#D4F779]">INGRESA A TU CUENTA</p>
      <UCard>
        <template #default>
          <form @submit.prevent="handleLogin">
            <div class="space-y-5">
              <UFormGroup class="" label="Email" name="email" >
                <UInput v-model="email" size="lg" icon="i-heroicons-envelope" />
              </UFormGroup>
              <UFormGroup class="" label="Password" name="password">
                <UInput v-model="password" size="lg" type="password"  />
                <template #help>
                  <UIcon name="i-heroicons-information-circle" /> <NuxtLink to="/" class="text-sm">¿Olvidaste tú contraseña?</NuxtLink>
                </template>
              </UFormGroup>
              <div class="text-right">
                <UButton color="orange" type="submit" icon="i-heroicons-paper-airplane" trailing>Iniciar sesión</UButton>
              </div>
            </div>
          </form>
        </template>
        <template #footer>
          <div class="flex flex-col items-center justify-center">
            <p class="font-medium mb-3 text-lg">¿Aun nó tienes cuenta?</p>
            <div>
              <UButton to="signup" color="orange"  variant="outline">Registrate</UButton>
            </div>
          </div>
        </template>
      </UCard>
      <!-- <br>
      <p>You are currently {{ status }}.</p>
    
      <p>---</p>
      
      <p class="">Data: {{ data || 'no session data present, are you logged in?' }}</p>
      <p class="">Last refreshed at: {{ lastRefreshedAt || 'no refresh happened' }}</p>
      <p class="">JWT token: {{ token || 'no token present, are you logged in?' }}</p> -->
    </div>
  </div>
</template>


<style scoped>
.login-container {
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>