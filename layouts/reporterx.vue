<script setup lang="ts">
const links = [
  {
    label: 'Mis posteos',
    icon: 'i-heroicons-document-text',
    to: '/reporterx'
  },
  {
    label: 'Crear posteo',
    icon: 'i-heroicons-plus',
    to: '/reporterx/crear'
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