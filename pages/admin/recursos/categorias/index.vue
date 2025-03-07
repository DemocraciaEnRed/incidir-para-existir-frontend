<script setup>
import { 
  AdminBlogCategoryCreateModal,
  AdminBlogCategoryEditModal,
  AdminBlogCategoryDeleteModal,
  UDivider,
} from '#components'

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

const categories = ref([])
const page = ref(1)
const pageCount = ref(20)
const totalCategories = ref(0)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { data, refresh, status } = useAPI('/resources/category', {
  server: false,
  query: {
    page,
    limit: pageCount,
  },
  watch: [page],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onResponse({ request, response, options }) {
    categories.value = response._data
    totalCategories.value = response._data.length
  }
})

const isLoading = computed(() => {
  return status.value === 'pending'
})

const columns = [
  // {
  //   key: 'id',
  //   label: 'ID'
  // },
  {
    key: 'name',
    label: 'Nombre'
  },
  {
    key: 'actions',
    rowClass: 'text-right'
  }
]

const itemsMenu = row => [
  [{
    label: 'Editar',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => openEditCategoryModal(row)
  }, {
    label: 'Eliminar',
    icon: 'i-heroicons-trash-20-solid',
    click: () => openDeleteCategoryModal(row)
  }]
]


const openCreateCategoryModal = () => {
  modal.open(AdminBlogCategoryCreateModal, {
    onCloseModal: () => {
      modal.close()
    },
    onSubmit: (name) => createCategory(name)
  })
}

const openEditCategoryModal = (row) => {
  modal.open(AdminBlogCategoryEditModal, {
    entry: row,
    onCloseModal: () => {
      modal.close()
    },
    onSubmit: (newName) => updateCategory(row, newName)
  })
}

const openDeleteCategoryModal = (row) => {
  if(categories.value.length <= 1) {
    toast.add({ title: 'Error', description: 'No puede eliminar ya que si o si tiene que haber una categoría como mínimo', color: 'red' })
    return
  }

  modal.open(AdminBlogCategoryDeleteModal, {
    categories: categories.value,
    categoryToDelete: row,
    onCloseModal: () => {
      modal.close()
    },
    onDeleteEntry: (categoryToMigrate) => deleteCategory(row, categoryToMigrate)
  })
}


const createCategory = async (name) => {
  try {
    await $api(`/resources/category`, {
      method: 'POST',
      body: {
        name: name
      }
    })
    refresh()
    // close the modal
    modal.close()
    toast.add({ title: 'Exito', description: 'Categoria creada', color: 'green' })
  } catch (error) {
    console.log('Error', error)
    toast.add({ title: 'Error', description: 'Hubo un error al crear el desafío', color: 'red' })
  }
}


const updateCategory = async (category, name) => {
  try {
    await $api(`/resources/category/${category.id}`, {
      method: 'PUT',
      body: {
        name: name
      }
    })
    refresh()
    // close the modal
    modal.close()
    toast.add({ title: 'Exito', description: 'Categoria actualizada', color: 'green' })
  } catch (error) {
    console.log('Error', error)
    toast.add({ title: 'Error', description: 'Hubo un error al eliminar el desafío', color: 'red' })
  }
}

const deleteCategory = async (category, categoryToMigrate) => {
  try {
    await $api(`/resources/category/${category.id}`, {
      method: 'DELETE',
      body: {
        categoryId: categoryToMigrate.id
      }
    })
    refresh()
    // close the modal
    modal.close()
    toast.add({ title: 'Exito', description: 'Categoria eliminada', color: 'green' })
  } catch (error) {
    console.log('Error', error)
    toast.add({ title: 'Error', description: 'Hubo un error al eliminar el desafío', color: 'red' })
  }
}





</script>

<template>
  <div>
    <h1 class="font-oswald uppercase text-4xl mb-2">Categorias</h1>
    <p>Las categorias son utilizadas para organizar los enlaces de interés en la plataforma. Puede crear, editar el nombre, y eliminar categorias existentes. Note que siempre tiene que haber al menos una categoría presente.</p>
    <UDivider class="my-4" />
    
    <UTable :rows="categories" :columns="columns" :loading="isLoading">
      <template #loading-state>
        <div class="px-3 py-6">
          <LoadingBar class="text-gray-400" />
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
      <div>
        <p class="text-gray-600 text-sm">Total: {{ totalCategories }}</p>
      </div>
      <UButton @click="openCreateCategoryModal" variant="outline" color="pumpkin" class=""><UIcon name="i-heroicons-plus" />Nueva categoría</UButton>  
      <UPagination v-model="page" :page-count="pageCount" :total="totalCategories" />
    </div>
  </div>
</template>