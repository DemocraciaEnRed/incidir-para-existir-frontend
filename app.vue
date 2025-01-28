<script setup>
useHead({
  title: null,
  titleTemplate: (title) => title ? `${title} - Incidir para Existir` : 'Incidir para Existir',
  description: 'Unite a la revolución de jóvenes que quieren cambiar el mundo.',
  htmlAttrs: {
    lang: 'es'
  },
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }
  ]
})
useSeoMeta({
  ogTitle: 'Incidir para existir',
  description: 'Unite a la revolución de jóvenes que quieren cambiar el mundo.',
  ogDescription: 'Unite a la revolución de jóvenes que quieren cambiar el mundo.',
  ogImage: '/sharer.jpg',
  twitterTitle: 'Incidir para existir',
  twitterDescription: 'Unite a la revolución de jóvenes que quieren cambiar el mundo.',
  twitterImage: '/sharer.jpg',
  twitterCard: 'summary_large_image',
})

const colorMode = useColorMode()

console.log(colorMode.preference)
</script>

<template>
  <div>
    <NuxtLoadingIndicator color="#fb923c" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UNotifications />
    <USlideovers />
    <UModals />
  </div>
</template>
