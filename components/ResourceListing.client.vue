<script setup>

const { $api } = useNuxtApp();
const { gtag } = useGtag();
const selectedCategory = ref(null);
const isLoadingCategories = ref(true);
const categories = ref([]);
const page = ref(1);
const pageCount = ref(5);
const totalEntries = ref(0);
const firstLoad = ref(false);

const categoryId = computed(() => selectedCategory.value ? selectedCategory.value.id : undefined);

const { data: resources, status } = await useAPI('/resources',{
  query: {
    page,
    limit: pageCount,
    category: categoryId
  },
  watch: [page, categoryId],
  onResponse({ request, response, options }) {
    firstLoad.value = true
    totalEntries.value = response._data.count;
  }
})


onMounted(() => {
  fetchCategories();
})

const fetchCategories = async () => {
  const response = await $api('/resources/category');
  categories.value = response
  isLoadingCategories.value = false;
}

const isLoading = computed(() => status.value === 'pending'); 

const getVariant = (category) => {
  if(selectedCategory.value === category) {
    return 'solid'
  }
  return 'solid'
}

const getBadgeColor = (category) => {
  if(selectedCategory.value === category) {
    return 'mindaro'
  }
  return 'white'
}

const openResourceNewTab = (resource) => {
  gtag('event', 'click_enlace_interes', {
    event_category: 'enlace_de_interes',
    event_label: `enlace-${resource.id}`,
    value: 1
  })
  window.open(resource.url, '_blank');
}
</script>

<template>
  <UCard v-if="!firstLoad" class="my-5">
    <p class="text-center mb-4 text-sm">Cargando...</p>
    <UProgress animation="carousel" color="pumpkin"/>
  </UCard>
  <div v-else class="md:grid md:grid-cols-3 gap-5">
    <div v-if="categories.length > 0" class="md:col-span-1 space-y-5 mb-5">
      <h1 class="font-oswald uppercase text-3xl mb-2">Categorías</h1>
      <p>Explorá los recursos por categoría</p>
      <div class="flex justify-start flex-wrap items-center gap-2">
        <UBadge size="lg" :ui="{ rounded: 'rounded-full' }" class="cursor-pointer select-none" :color="getBadgeColor(null)" :variant="getVariant(null)" @click="selectedCategory = null">
          Todas las categorías
        </UBadge> <!-- Closed the UBadge tag here -->
        <UBadge
v-for="(category, index) in categories" :key="`category-${category.id}`" size="lg" 
          :ui="{ rounded: 'rounded-full' }"
          class="cursor-pointer select-none"
          :color="getBadgeColor(category)" :variant="getVariant(category)" @click="selectedCategory = category">
          {{ category.name }}
        </UBadge>
      </div>
    </div>
    <div class="md:col-span-2">
      <div v-for="resource in resources.rows" :key="resource.id" class="flex items-center gap-4 rounded-xl my-2 px-5 py-3 border bg-electricViolet-950 hover:bg-electricViolet-900 border-electricViolet-400 transition-colors duration-200">
        <div class="grow w-9/12">
          <div class="flex-wrap flex flex-row items-center font-inter gap-x-2 mb-2">
            <!-- <p 
            class="text-xs text-white border-r pr-2 border-purple-500" 
            >#{{ addLeadingZeros(resource.id) }}</p> -->
            <p
            class="text-xs uppercase text-white border-r pr-2 border-white-500" 
            >
              {{ resource.category.name }}
            </p>
            <p
            class="text-xs opacity-70 pr-2 " 
            >
              Ultima actualización {{ formatDate(resource.updatedAt) }}
            </p>
            </div>
          <h2 class="font-inter font-semibold text-2xl">{{ resource.title }}</h2>
          <p v-if="resource.description" class="font-inter text-gray-200 text-sm">{{ resource.description }}</p>
        <p class="font-inter text-sm truncate"><a class="cursor-pointer text-blue-300" @click.prevent="openResourceNewTab(resource)"><UIcon name="i-heroicons-arrow-top-right-on-square" /> Ir al recurso</a> - <span class="opacity-60"> {{ resource.url }}</span></p>
        </div>
        <UButton color="mindaro" icon="i-heroicons-arrow-top-right-on-square" variant="soft" :ui="{ rounded: 'rounded-full' }" size="xl" class="ml-3" @click="openResourceNewTab(resource)" />
      </div>
      <div class="flex justify-between items-center">
        <p v-if="!isLoading" class="text-sm">Total: {{ totalEntries }}</p>
        <UProgress v-if="isLoading" class="mr-4" animation="carousel" color="mindaro" />
        <UPagination v-model="page" :page-count="pageCount" :total="totalEntries" />
      </div>
    </div>
  </div>
</template>