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
const limit = ref(2)
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
  }).catch((error) => {
    console.error(error)
  })
})

</script>

<template>
  <UCard v-if="isLoading" class="my-5">
    <p class="text-center mb-4 text-sm">Cargando...</p>
    <UProgress animation="carousel" color="pumpkin"/>
  </UCard>
  <div v-else>
    <div class="flex gap-5  my-10 flex-col md:flex-row">
      <div v-for="item in items" :key="item.id" class="w-full lg:w-1/2">
        <div class="aspect-h-2 aspect-w-5 bg-gray-600 w-full rounded-tl-xl rounded-tr-xl" >
          <img :src="item.imageUrl" class="object-cover w-full h-full rounded-tl-xl rounded-tr-xl">
        </div>
        <div class="flex flex-row justify-between items-stretch py-3 px-4 bg-gray-800 w-full rounded-bl-xl rounded-br-xl">
          <div class="w-2/3 gap-3 space-y-3">
            <p class="font-oswald text-2xl text-[#D4F779]">{{ item.title }}</p>
            <p class="font-inter text-sm truncate">{{ item.subtitle }}</p>
            <UButton :to="{name: 'blog-post', params: {slug: item.slug}}">Ir al post</UButton>
          </div>
          <div class="w-1/3 text-right space-y-3">
            <UBadge color="pumpkin" variant="solid">{{ item.category.name }}</UBadge>
            <p class="text-sm">{{ item.createdAt.split('T')[0] }}</p>
          </div>
        </div>
      </div>
    </div>
    <UPagination v-model="page" :page-count="2" :total="totalItems" />
  </div>
</template>

