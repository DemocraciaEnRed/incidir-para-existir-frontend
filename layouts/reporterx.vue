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
  <div class="flex h-screen flex-col">
    <div class="flex-grow flex-shrink basis-auto">
      <TheNavbar />
      <UContainer class="my-9">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="col-span-1">
            <UVerticalNavigation :links="links" class="sticky top-5 border rounded-lg border-slate-800 p-3" />
          </div>
          <div class="col-span-1 md:col-span-3"> 
            <slot />
          </div>
        </div>
      </UContainer>
      </div>
    <TheFooter />
  </div>
</template>