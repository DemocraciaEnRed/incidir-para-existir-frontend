<script setup>
definePageMeta({
  middleware: ['auth', 'only-admins'],
  layout: 'admin',
  auth: {
    unauthenticatedOnly: false,
    navigateUnauthenticatedTo: '/login'
  }
})

// const { $api } = useNuxtApp()

// const modal = useModal()
// const toast = useToast()

const posts = ref([])
const page = ref(1)
const pageCount = ref(20)
const totalPosts = ref(0)
const selectedSection = ref(null)
const selectedCategory = ref(null)

const selectedSectionId = computed(() => {
  return selectedSection.value ? selectedSection.value.id : undefined
})

const selectedCategoryId = computed(() => {
  return selectedCategory.value ? selectedCategory.value.id : undefined
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { data, refresh, status } = useAPI('/blog', {
  server: false,
  query: {
    page,
    limit: pageCount,
    category: selectedCategoryId,
    section: selectedSectionId,
  },
  watch: [page, selectedSectionId, selectedCategoryId],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onResponse({ request, response, options }) {
    posts.value = response._data.rows
    totalPosts.value = response._data.count
  }
})

const isLoading = computed(() => {
  return status.value === 'pending'
})

const itemsMenu = (row) => {
  const options = [
  [
    {
    label: 'Ver',
    icon: 'i-heroicons-eye-20-solid',
    click: () => navigateTo(`/actualidad/${row.slug}`)
  }], [{
    label: 'Editar',
    icon: 'i-heroicons-pencil-square-20-solid',
    disabled: true,
    click: () => navigateTo(`/admin/usuarios/${row.id}/editar`)
  }, {
    label: 'Eliminar',
    icon: 'i-heroicons-trash-20-solid',
    disabled: true,
    // click: () => openDeleteInitiativeModal(row)
  }]]
  return options
}

const columns = [
  {
    key:'title',
    label: 'Titulo',
    rowClass: 'text-wrap'
  },
  {
    key: 'category.name',
    label: 'Categoria',
    class: 'text-center',
    rowClass: 'text-xs text-center'
  },
  {
    key: 'section.name',
    label: 'Sección',
    class: 'text-center',
    rowClass: 'text-xs text-center'
  },
  {
    key: 'actions',
    rowClass: 'text-right',
  },
]

</script>

<template>
  <div>
    <h1 class="font-oswald uppercase text-4xl mb-2">Blog</h1>
    <br>
    <div class="flex gap-2">
      <AdminBlogSectionSelector v-model="selectedSection" class="w-full"/>
      <AdminBlogCategorySelector v-model="selectedCategory" class="w-full"/>
    </div>
    <br>
    <UTable :rows="posts" :columns="columns" :loading="isLoading">
      <template #loading-state>
        <div class="px-3 py-6">
          <LoadingBar class="text-gray-400" />
        </div>
      </template>
      <template #title-data="{ row }">
        <p class="font-medium">{{ row.title }}</p>
        <p class="text-xs text-gray-500">{{ row.subtitle }}</p>
      </template>
      <template #actions-data="{ row }">
        <UDropdown :items="itemsMenu(row)">
          <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
        </UDropdown>
      </template>
    </UTable>
    <br>
    <div class="flex justify-between items-center">
      <p class="text-gray-600 text-sm">Total: {{ totalPosts }}</p>
      <UPagination v-model="page" :page-count="pageCount" :total="totalPosts" />
    </div>
  </div>

</template>
