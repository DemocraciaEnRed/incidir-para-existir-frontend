<script setup>

import { PerfilPostDeleteModal } from '#components'

useHead({
  title: 'Mis posteos'
})

definePageMeta({
  middleware: ['auth'],
  layout: 'user',
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
const { data, refresh, status } = useAPI('/users/posts', {
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
    label: 'Ver',
    icon: 'i-heroicons-eye-20-solid',
    click: () => navigateTo(`/actualidad/${row.slug}`),
    disabled: !row.publishedAt
  }], [{
    label: 'Editar',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => navigateTo(`/perfil/posts/${row.id}/editar`)
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
    key: 'publishedAt',
    label: {
      icon: 'i-heroicons-check-circle-20-solid',
    },
    class: "w-[1%]",
  },
  {
    key: 'actions',
    rowClass: 'text-right',
  },
]


const openDeleteEntryModal = (entry) => {
  modal.open(PerfilPostDeleteModal, {
    entry: entry,
    onDeleteEntry: () => {
      deleteEntry(entry)
    },
    onCloseModal: () => {
      modal.close()
    }
  })
}

const deleteEntry = async (entry) => {
  try {
    await $api(`/users/posts/${entry.id}`, {
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
    <div class="space-y-1">
      <h1 class="font-oswald uppercase text-4xl">Mis Posteos</h1>
      <br>
      <p>Aquí puede crear sus posteos para el blog de Incidir para Existir. Luego de crea un nuevo posteo, un administrador deberá aprobarlo para que sea publicado.</p>
      <p><UIcon name="i-heroicons-clock" class="text-mindaro text-lg" /> - Pendiente de aprobación para su publicación</p>
      <p><UIcon name="i-heroicons-check" class="text-green-500 text-lg" /> - Posteo publicado</p>
      <br>
      <div class="flex gap-2">
      <AdminBlogCategorySelector v-model="selectedCategory" class="w-full"/>
    </div>
    <br>
    <UTable :rows="posts" :columns="columns" :loading="isLoading">
      <template #publishedAt-header>
        <UTooltip text="¿Publicado?">
          <UIcon name="i-heroicons-eye" class="flex flex-row items-center text-lg" />
        </UTooltip>
      </template>
      <template #loading-state>
        <div class="px-3 py-6">
          <LoadingBar class="text-gray-400" />
        </div>
      </template>
      <template #title-data="{ row }">
        <p class="font-medium">{{ row.title }}</p>
        <p class="text-xs text-gray-500">{{ row.subtitle }}</p>
      </template>
      <template #publishedAt-data="{ row }">
        <div class="flex items-center justify-center">
          <UIcon v-if="row.publishedAt" name="i-heroicons-check" class="text-green-500 text-lg" />
          <UIcon v-else name="i-heroicons-clock" class="text-mindaro text-lg" />
        </div>
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
  </div>
</template>
