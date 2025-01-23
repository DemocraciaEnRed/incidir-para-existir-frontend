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
      <p class="font-oswald text-5xl uppercase leading-tight text-electricViolet-600 my-2">{{ data.title }}</p>
      <p class="font-oswald font-extralight text-2xl my-2">{{ data.subtitle }}</p>
      <p class="italic text-sm text-gray-500">Publicado el {{ formatDate(data.createdAt) }}</p>
      <div class="aspect-w-5 aspect-h-2 my-8">
        <img v-if="data.imageUrl" :src="data.imageUrl" class="object-cover w-full h-full rounded-xl">
      </div>
      <div class="border-gray-400 border px-3 py-5 rounded-lg w-full prose focus:outline-none max-w-none" v-html="data.text" />
      <div class="flex flex-row gap-2 my-5">
      <UBadge color="gray">{{data.category.name}}</UBadge>
      <UBadge color="gray">{{data.section.name}}</UBadge>
      </div>
    </UContainer>
  </div>
</template>