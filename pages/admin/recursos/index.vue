<script setup>
import { AdminResourcesDeleteModal } from '#components'

definePageMeta({
  middleware: ['auth', 'only-admins'],
  layout: 'admin',
  auth: {
    unauthenticatedOnly: false,
    navigateUnauthenticatedTo: '/login'
  }
})

const { $api } = useNuxtApp()

const modal = useModal()
const toast = useToast()

const posts = ref([])
const page = ref(1)
const pageCount = ref(20)
const totalPosts = ref(0)
const selectedCategory = ref(null)

const selectedCategoryId = computed(() => {
  return selectedCategory.value ? selectedCategory.value.id : undefined
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { data, refresh, status } = useAPI('/resources', {
  server: false,
  query: {
    page,
    limit: pageCount,
    category: selectedCategoryId,
  },
  watch: [page, selectedCategoryId],
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
    label: 'Ir al enlace',
    icon: 'i-heroicons-arrow-top-right-on-square',
    click: () => openInNewTab(row.url)
  }], [{
    label: 'Editar',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => navigateTo(`/admin/recursos/${row.id}/editar`)
  }, {
    label: 'Eliminar',
    icon: 'i-heroicons-trash-20-solid',
    click: () => openDeleteEntryModal(row)
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
    key: 'createdAt',
    label: 'Creado',
    class: 'text-center',
    rowClass: 'text-xs text-center'
  },
  {
    key: 'updatedAt',
    label: 'Actualizado',
    class: 'text-center',
    rowClass: 'text-xs text-center'
  },
  {
    key: 'actions',
    rowClass: 'text-right',
  },
]


const openDeleteEntryModal = (entry) => {
  modal.open(AdminResourcesDeleteModal, {
    entry: entry,
    onDeleteEntry: () => {
      deleteEntry(entry)
    },
    onCloseModal: () => {
      modal.close()
    }
  })
}

const openInNewTab = (url) => {
  window.open(url, '_blank')
}

const deleteEntry = async (entry) => {
  try {
    await $api(`/resources/${entry.id}`, {
      method: 'DELETE'
    })
    refresh()
    // close the modal
    modal.close()
  } catch (error) {
    console.log('Error', error)
    toast.add({ title: 'Error', description: 'Hubo un error al eliminar el post', color: 'red' })
  }
}
</script>

<template>
  <div>
    <h1 class="font-oswald uppercase text-4xl mb-2">Enlaces de interes</h1>
    <br>
    <div class="flex gap-2">
      <AdminResourcesCategorySelector v-model="selectedCategory" class="w-full"/>
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
        <p class="text-xs text-gray-500">{{ row.description }}</p>
        <a class="font-inter text-xs text-sky-500 truncate" :href="row.url" target="_blank" >{{ row.url }}</a>
      </template>
      <template #updatedAt-data="{ row }">
        <p>{{ formatDate(row.updatedAt) }}</p>
      </template>
      <template #createdAt-data="{ row }">
        <p>{{ formatDate(row.createdAt) }}</p>
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
