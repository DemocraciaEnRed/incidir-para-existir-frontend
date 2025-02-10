<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  section: {
    type: Number,
    required: false,
    default: () => null
  },
});

const items = ref([])
const totalItems = ref(0)
const page = ref(1)
const limit = ref(3)
const isLoading = ref(true)

const { $api } = useNuxtApp()

const getBlogPosts = async () => {
  return await $api('/blog',{
    query:{
      section: props.section,
      limit: limit.value,
      page: page.value
    }
  });
  
}

const scrollHelper = useTemplateRef(`section${props.section.value}-scroll`)


onMounted(() => {
  console.log('Mounted')
  getBlogPosts().then((data) => {
    items.value = data.rows
    totalItems.value = data.count
    isLoading.value = false
  }).catch((error) => {
    console.error(error)
  })
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
watch(page, (newValue, oldValue) => {
  console.log('Page changed', newValue)
  getBlogPosts().then((data) => {
    items.value = data.rows
    totalItems.value = data.count
    isLoading.value = false
    scrollHelper.value.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }).catch((error) => {
    console.error(error)
  })
})

const refName = `section${props.section.value}-scroll`

const goTo = (slug) => navigateTo({
    name: 'blog-post',
    params: {slug: slug}
  })

</script>

<template>
  <UCard v-if="isLoading" class="my-5">
    <p class="text-center mb-4 text-sm">Cargando...</p>
    <UProgress animation="carousel" color="pumpkin"/>
  </UCard>
  <div v-else-if="totalItems > 0" class="my-5">
  
    <div :ref="refName" class="grid grid-cols-1 md:grid-cols-3 gap-3 my-10 flex-wrap md:flex-row">
      <div v-for="item in items" :key="item.id" class="w-full">
        <div class="aspect-h-2 aspect-w-5 bg-gray-600 w-full rounded-tl-xl rounded-tr-xl  border border-white cursor-pointer" @click="goTo(item.slug)">
          <img :src="item.imageUrl" class="object-cover w-full h-full rounded-tl-xl rounded-tr-xl">
        </div>
        <div class="flex flex-col md:min-h-[320px] text-black justify-between py-3 px-4 bg-white w-full rounded-bl-xl rounded-br-xl space-y-3 shadow-md shadow-slate-700">
          <div class="flex-1 space-y-2 cursor-pointer" @click="goTo(item.slug)">
            <div class="flex justify-between items-center mb-2"> 
              <UBadge color="pumpkin" size="sm" variant="solid" :ui="{ rounded: 'rounded-full' }">{{ item.category.name }}</UBadge>
              <p class="text-gray-500 text-sm">{{ formatDate(item.createdAt) }}</p>
            </div>
            <p class="font-oswald font-normal text-purple-500 text-xl uppercase leading-tight transition-colors hover:text-pumpkin-600 delay-100">{{ item.title }}</p>
            <p class="text-sm overflow-hidden">{{ item.subtitle }}</p>
          </div>
          <div class="flex items-center w-full my-5">
            <UAvatar :src="item.author.imageUrl" size="md" class="mr-3" :alt="item.author.fullName" />
            <div class="flex flex-col items-start w-full">
              <p class="font-medium">{{ item.author.fullName }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <UPagination v-model="page" :page-count="2" :total="totalItems" />
  </div>
  <div v-else>
    <p class="text-white text-sm my-10">No hay posts disponibles en esta sección</p>
  </div>
  
</template>

