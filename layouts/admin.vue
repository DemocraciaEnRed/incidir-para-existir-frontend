<script setup lang="ts">
const links = [
  {
    label: 'Dashboard',
    icon: 'i-heroicons-home',
    to: '/admin'
  },
  {
    label: 'Iniciativas',
    icon: 'i-heroicons-document-text',
    to: '/admin/iniciativas'
  },
  {
    label: 'Desafios',
    icon: 'i-heroicons-document-text',
    to: '/admin/desafios'
  }, 
  {
    label: 'Miembros',
    icon: 'i-heroicons-user-group',
    to: '/admin/miembros'
  }, 
  {
    label: 'Blog',
    icon: 'i-heroicons-document-text',
    to: '/admin/blog',
  }, 
  {
    label: 'Terminos y Condiciones',
    icon: 'i-heroicons-document-text',
    to: '/admin/tos',
  }, 
  {
    label: 'Usuarios',
    icon: 'i-heroicons-user',
    to: '/admin/usuarios',
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