<script setup>
definePageMeta({
  name: 'blog-post',
  layout: 'full-width-with-fb'
})

const route = useRoute()
const slug = route.params.slug

const { data } = await useAPI(`/blog/${slug}`)
const runtimeConfig = useRuntimeConfig()

useHead({
  script: [
    {
      src: `https://connect.facebook.net/es_LA/sdk.js#xfbml=1&version=v22.0&appId=${runtimeConfig.public.facebookAppId}`,
      crossorigin: 'anonymous',
      async: true,
      defer: true
    }
  ],
  meta: [
    {
      property: 'fb:app_id',
      content: runtimeConfig.public.facebookAppId
    }
  ]
})

// SEO
useSeoMeta({
  title: () => `${data.value.title}`,
  description: () => data.value.subtitle,
  lang: () => 'es',
  url: () => `${runtimeConfig.public.fullUrl}/actualidad/${data.value.slug}`,
  ogTitle: () => data.value.title,
  ogDescription: () => data.value.subtitle,
  ogImage: () => data.value.imageUrl || `${runtimeConfig.public.fullUrl}/img/quienes-somos-01.png`,
  ogUrl: () => `${runtimeConfig.public.fullUrl}/actualidad/${data.value.slug}`,
  twitterTitle: () => data.value.title,
  twitterDescription: () => data.value.subtitle,
  twitterImage: () => data.value.imageUrl || `${runtimeConfig.public.fullUrl}/img/quienes-somos-01.png`,
  twitterCard: () => 'summary_large_image',
})


const pageUrl = `${runtimeConfig.public.fullUrl}/actualidad/${data.value.slug}`

console.log(pageUrl)
console.log(runtimeConfig.public.facebookAppId)
</script>

<template>
  <div>
    <div class="my-4 md:my-10 text-center">
      <UContainer>
        <div v-if="data.section.name == 'Juventudes'">
          <p class="font-oswald font-light text-2xl md:text-3xl leading-tight text-[#D4F779] w-10/12 mx-auto">¿QUÉ PIENSA LA JUVENTUD SOBRE LA INCIDENCIA Y LA PARTICIPACIÓN?</p>
        </div>
        <div v-else class="space-y-1">
          <p class="text-[#D4F779] font-bold">NOTICIAS, EVENTOS Y ACTUALIDAD</p>
          <p class="font-oswald  font-light text-2xl md:text-3xl leading-tight text-[#ffffff]">¿EN QUE VÁ LA JUVENTUD?</p>
        </div>
      </UContainer>

    </div>
    <div class="bg-slate-100 text-black py-4 md:py-10 ">
      <UContainer>
        <div class="text-center w-full md:w-10/12 md:mx-auto">
          <div class="flex flex-row gap-2 my-5 w-full items-center justify-center">
            <UBadge color="pumpkin" size="lg" :ui="{ rounded: 'rounded-full'}">{{data.category.name}}</UBadge>
          </div>
          <p class="font-oswald text-3xl md:text-6xl uppercase text-justify md:text-center text-electricViolet my-2">{{ data.title }}</p>
          <p class="font-inter font-light text-justify md:text-center text-xl md:text-2xl my-3">{{ data.subtitle }}</p>
          <div class="flex md:flex-col items-center w-full my-5">
            <UAvatar :src="data.author.imageUrl" size="3xl" class="mr-3 mb-0 md:mr-3 md:mb-3" :alt="data.author.fullName" />
            <div class="flex flex-col items-start md:items-center w-full">
              <p class="text-lg">Por {{ data.author.fullName }}</p>
              <p class="text-gray-500 text-sm">Publicado {{ formatDate(data.createdAt) }}</p>
            </div>
          </div>
        </div>
        <div v-if="data.imageUrl" class="aspect-w-5 aspect-h-2 my-8">
          <img :src="data.imageUrl" class="object-cover w-full h-full rounded-xl border border-slate-300 shadow-lg">
        </div>
        <div class=" w-full md:w-8/12 md:mx-auto">
          <div class="px-3 py-5 rounded-lg w-full prose focus:outline-none max-w-none" v-html="data.text" />
        </div>
        {{ pageUrl }}
        <ClientOnly>
          <div class="fb-comments" :data-href="pageUrl" data-width="100%" data-lazy="true" data-numposts="10"/>
        </ClientOnly>
      </UContainer>
    </div>
  </div>

</template>