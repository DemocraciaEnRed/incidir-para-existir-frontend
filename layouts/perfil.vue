<script setup lang="ts">
const links = [
  {
    label: 'Mi perfil',
    icon: 'i-heroicons-user',
    to: '/perfil'
  },
  {
    label: 'Editar perfil',
    icon: 'i-heroicons-pencil',
    to: '/perfil/editar'
  },
  ]
</script>


<template>
  <div class="min-h-screen">
    <TheNavbar />
    <UContainer class="my-9">
      <div class="flex gap-8">
        <div class="w-1/4">
          <UVerticalNavigation :links="links" class="sticky  top-5" />
        </div>
        <div class="w-3/4"> 
          <slot />
        </div>
      </div>
    </UContainer>
    <TheFooter />
  </div>
</template>