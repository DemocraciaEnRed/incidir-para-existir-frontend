<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
  // eslint-disable-next-line vue/require-default-prop
  error: Object as () => NuxtError
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <UContainer class="flex flex-col items-center justify-center h-screen text-center">
    <img src="/img/incidir-para-existir-logo.png" alt="Incidir para existir" class="mx-auto px-10 mb-10 max-w-[250px]" >
    <h2 class="font-oswald text-6xl font-medium text-mindaro">{{ error?.statusCode }}</h2>
    <UCard class="my-5" >
      <p class="italic">{{ error?.message }}</p>
    </UCard>
    Ocurrio un error!<br>Por favor, intenta nuevamente.
    <br>
    <br>
    <UButton variant="outline" @click="handleError">
      Volver al inicio
    </UButton>
  </UContainer>
</template>