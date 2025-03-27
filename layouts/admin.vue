<script setup lang="ts">
useHead({
  title: 'Panel de administración'
})
const links = [
  {
    label: 'Dashboard',
    icon: 'i-heroicons-home',
    to: '/admin'
  },
  {
    label: 'Estadisticas detalladas',
    icon: 'i-heroicons-presentation-chart-bar',
    to: '/admin/estadisticas'
  },
  {
    label: 'Iniciativas',
    icon: 'i-heroicons-document-text',
    to: '/admin/iniciativas'
  },
  {
    label: 'Reportes de desafíos',
    icon: 'i-heroicons-document-text',
    to: '/admin/desafios'
  }, 
  {
    label: 'Miembros',
    icon: 'i-heroicons-user-group',
    to: '/admin/miembros'
  }, 
  {
    label: 'Actualidad de la juventud',
    icon: 'i-heroicons-document-text',
    to: '/admin/blog',
  }, 
  {
    label: 'Enlaces de interés',
    icon: 'i-heroicons-document-text',
    to: '/admin/recursos',
  }, 
  {
    label: 'Términos y condiciones',
    icon: 'i-heroicons-document-text',
    to: '/admin/tos',
  }, 
  {
    label: 'Política de privacidad',
    icon: 'i-heroicons-document-text',
    to: '/admin/privacidad',
  }, 
  {
    label: 'Envios al bot',
    icon: 'i-heroicons-chat-bubble-bottom-center-text',
    to: '/admin/botResponses',
  }, 
  {
    label: 'Usuarios',
    icon: 'i-heroicons-user',
    to: '/admin/usuarios',
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
