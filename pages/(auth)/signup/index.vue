<script setup>
// import { definePageMeta } from '#imports'
definePageMeta({
  name: 'signup'
})

const { data: cities, error: errorFetch } = await useAPI(`/utils/cities`)

</script>

<template>
  <!-- A grid of 2 columns with tailwind -->
  <div class="flex flex-row justify-center items-center my-16">
    <div class="w-full md:w-3/5 lg:w-1/2">
          <!-- First column -->
        <div class="text-center my-auto">
          <img src="/img/incidir-para-existir-logo.png" alt="Incidir para existir" class="mx-auto px-10 mb-10 max-w-[250px]" >
          <p class="font-oswald text-4xl mb-10 text-[#D4F779]">¡CREA TU CUENTA!</p>
        </div>
        <!-- Second column -->
        <div class="content-stretch mt-8 lg:mt-0">
          <UAlert 
          v-if="errorFetch"
          class="my-8"
          icon="i-heroicons-command-line"
          color="red"
          variant="soft"
          title="Ocurrió un error!"
          description="Por favor, intentalo más tarde."
          />
          <div v-else>
            <ClientOnly>
              <AuthSignUpForm :cities="cities" />
            </ClientOnly>
          </div>
        </div>
      </div>
  </div>
</template>
