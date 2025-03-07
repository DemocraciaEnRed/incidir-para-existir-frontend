<script setup>
import { AdminBlogDeleteModal } from '#components'

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
const selectedSection = ref(null)
const selectedCategory = ref(null)

const selectedSectionId = computed(() => {
  return selectedSection.value ? selectedSection.value.id : undefined
})

const selectedCategoryId = computed(() => {
  return selectedCategory.value ? selectedCategory.value.id : undefined
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { data, refresh, status } = useAPI('/blog?includeUnpublished=true', {
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
  const options = [[
    {
    label: 'Ver',
    icon: 'i-heroicons-arrow-top-right-on-square',
    click: () => navigateTo(`/actualidad/${row.slug}`),
    disabled: !row.publishedAt
  }], [{
    label: 'Editar',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => navigateTo(`/admin/blog/${row.id}/editar`)
  }, {
    label: 'Eliminar',
    icon: 'i-heroicons-trash-20-solid',
    click: () => openDeleteEntryModal(row)
  }]]

  if(row.publishedAt) {
    // push at the beginning
    options.unshift([{
      label: 'Despublicar',
      icon: 'i-heroicons-eye-slash-20-solid',
      click: () => unpublishPost(row)
    }])
  } else {
    options.unshift([{
      label: 'Publicar',
      icon: 'i-heroicons-eye-20-solid',
      click: () => publishPost(row)
    }])
  }

  return options
}



const columns = [
  {
    key:'title',
    label: 'Titulo',
    rowClass: 'text-wrap'
  },
  {
    key: 'author',
    label: 'Autor',
    class: 'text-center w-[1%]',
    rowClass: 'text-xs text-center'
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
    key: 'totalComments',
    label: {
      icon: 'i-heroicons-chat-bubble-bottom-center-text',
    },
    rowClass: 'text-xs text-center',
    class: "w-[1%]",
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
  modal.open(AdminBlogDeleteModal, {
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
    await $api(`/blog/${entry.id}`, {
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


const publishPost = async (entry) => {
  try {
    await $api(`/blog/${entry.id}/publish`, {
      method: 'PUT'
    })
    refresh()
    toast.add({ title: 'Exito', description: 'Posteo publicado', color: 'green' })
  } catch (error) {
    console.log('Error', error)
    toast.add({ title: 'Error', description: 'Hubo un error al publicar el posteo', color: 'red' })
  }
}

const unpublishPost = async (entry) => {
  try {
    await $api(`/blog/${entry.id}/unpublish`, {
      method: 'PUT'
    })
    refresh()
    toast.add({ title: 'Exito', description: 'El posteo se ha ocultado correctamente', color: 'green' })
  } catch (error) {
    console.log('Error', error)
    toast.add({ title: 'Error', description: 'Hubo un error al ocultar el posteo', color: 'red' })
  }
}


</script>

<template>
  <div>
    <h1 class="font-oswald uppercase text-4xl mb-2">Actualidad (Blog)</h1>
    <br>
    <div class="flex gap-2">
      <AdminBlogSectionSelector v-model="selectedSection" class="w-full"/>
      <AdminBlogCategorySelector v-model="selectedCategory" class="w-full"/>
    </div>
    <br>
    <UTable :rows="posts" :columns="columns" :loading="isLoading">
      <template #publishedAt-header>
        <UTooltip text="¿Publicado?">
          <UIcon name="i-heroicons-eye" class="flex flex-row items-center text-lg" />
        </UTooltip>
      </template>
      <template #totalComments-header>
        <UTooltip text="Cantidad de comentarios y respuestas">
          <UIcon name="i-heroicons-chat-bubble-bottom-center-text" class="flex flex-row items-center text-lg" />
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
      <template #author-data="{ row }">
        <p class="flex items-center justify-center gap-2">
          <UAvatar size="xs" :alt="row.author.fullName" :src="row.author.imageUrl ?? null" />{{ row.author.fullName }}
          <span class="text-blue-500 text-xs capitalize"><UIcon v-if="row.author.role == 'admin'" name="i-heroicons-shield-check" /></span>
        </p>
      </template>
      <template #publishedAt-data="{ row }">
        <div>
          <UIcon v-if="row.publishedAt" name="i-heroicons-check" class="text-green-500 text-lg" />
          <UIcon v-else name="i-heroicons-x-mark" class="text-red-500 text-lg" />
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

</template>
