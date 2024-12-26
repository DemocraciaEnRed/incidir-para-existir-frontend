<script setup>
definePageMeta({
  name: 'blog-post',
  layout: 'full-width'
})

const route = useRoute()
const slug = route.params.slug

const { data } = await useAPI(`/blog/${slug}`)

// SEO
useSeoMeta({
  title: () => `${data.value.title}`,
  description: () => data.value.subtitle,
  lang: () => 'es',
  url: () => `https://example.com/noticias/${data.value.slug}`,
  ogTitle: () => data.value.title,
  ogDescription: () => data.value.subtitle,
  ogImage: () => data.value.imageUrl,
  ogUrl: () => `https://example.com/noticias/${data.value.slug}`,
  twitterTitle: () => data.value.title,
  twitterDescription: () => data.value.subtitle,
  twitterImage: () => data.value.imageUrl,
  twitterCard: () => 'summary_large_image',
})


</script>

<template>
  <div class="bg-[#D9D9D9] text-black py-10">
    <UContainer>
      
      <p class="font-oswald text-5xl uppercase leading-tight text-electricViolet-500 my-3">{{ data.title }}</p>
      <p class="font-inter text-xl font-bold uppercase my-2">{{ data.subtitle }}</p>
      <div class="aspect-w-5 aspect-h-2 my-8">
        <img v-if="data.imageUrl" :src="data.imageUrl" class="object-cover w-full h-full rounded-xl">
      </div>
      <div class="border-gray-400 border-2 rounded-xl px-3 py-4 whitespace-pre-wrap" v-html="data.text" />
      <div class="flex flex-row gap-2 my-5">
      <UBadge color="gray">{{data.category.name}}</UBadge>
      <UBadge color="gray">{{data.section.name}}</UBadge>
      </div>
    </UContainer>
  </div>
</template>