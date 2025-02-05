<script setup>
import { AdminInitiativesDeleteModal } from '#components'
import debounce from 'debounce';

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

const initiatives = ref([])
const page = ref(1)
const pageCount = ref(20)
const totalInitiatives = ref(0)
const selectedDimensions = ref([])
const nameQuery = ref('')
const undebouncedNameQuery = ref('')

const dimensionsIds = computed(() => {
  if(selectedDimensions.value.length === 0) return null
  return selectedDimensions.value.map(d => d.id)
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { data, refresh, status } = useAPI('/initiatives', {
  server: false,
  query: {
    page,
    limit: pageCount,
    includeUnpublished: true,
    dimension: dimensionsIds,
    q: nameQuery
  },
  watch: [page, dimensionsIds],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onResponse({ request, response, options }) {
    initiatives.value = response._data.rows
    totalInitiatives.value = response._data.count
  }
})


const itemsMenu = (row) => {
  const options = [{
    label: 'Editar',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => navigateTo(`/admin/iniciativas/${row.id}/editar`)
  }, {
    label: 'Eliminar',
    icon: 'i-heroicons-trash-20-solid',
    click: () => openDeleteInitiativeModal(row)
  }]
  
  if(row.publishedAt) {
    // push at the beginning
    options.unshift({
      label: 'Despublicar',
      icon: 'i-heroicons-eye-slash-20-solid',
      click: () => unpublishInitiative(row)
    })
  } else {
    options.unshift({
      label: 'Publicar',
      icon: 'i-heroicons-eye-20-solid',
      click: () => publishInitiative(row)
    })
  }

  return [options]
}

/**
 * Watch the page and refresh the data
 */
watch(() => page, (newValue, oldValue) => {
  if (newValue != oldValue) {
    refresh()
  }
})

/**
 * Debounce the name query
 */
const changeNameQuery = debounce(() => {
  nameQuery.value = undebouncedNameQuery.value
}, 1000)

/**
 * Watch the undebounced name query
 */
watch(undebouncedNameQuery, (newValue, oldValue) => {
  if (newValue != oldValue) {
    changeNameQuery()
  }
})

const isLoading = computed(() => {
  return status.value === 'pending'
})

const columns = [
  {
    key:'name',
    label: 'Nombre',
    class: "",
    rowClass: 'text-wrap'
  },
  {
    key: 'subdivision',
    label: 'Ubicación',
    class: "w-[20%]",
    rowClass: 'text-xs',
  },
  {
    key: 'publishedAt',
    label: {
      icon: 'i-heroicons-check-circle-20-solid',
    },
    class: "w-[1%]",
  },
  {
    key: 'map',
    label: {
      icon: 'i-heroicons-map-pin',
    },
    class: "w-[1%]",
  },
  {
    key: 'actions',
    rowClass: 'text-right',
    class: "w-[1%]",
  },
]

const openDeleteInitiativeModal = (initiative) => {
  modal.open(AdminInitiativesDeleteModal, {
    initiative: initiative,
    onDeleteInitiative: () => {
      deleteInitiative(initiative)
    },
    onCloseModal: () => {
      modal.close()
    }
  })
}

const deleteInitiative = async (member) => {
  try {
    await $api(`/initiatives/${member.id}`, {
      method: 'DELETE'
    })
    refresh()
    // close the modal
    modal.close()
    toast.add({ title: 'Exito', description: 'Iniciativa eliminada', color: 'green' })
  } catch (error) {
    console.log('Error', error)
    toast.add({ title: 'Error', description: 'Hubo un error al eliminar la iniciativa', color: 'red' })
  }
}

const publishInitiative = async (initiative) => {
  try {
    await $api(`/initiatives/${initiative.id}/publish`, {
      method: 'PUT'
    })
    refresh()
    toast.add({ title: 'Exito', description: 'Iniciativa publicada', color: 'green' })
  } catch (error) {
    console.log('Error', error)
    toast.add({ title: 'Error', description: 'Hubo un error al publicar la iniciativa', color: 'red' })
  }
}

const unpublishInitiative = async (initiative) => {
  try {
    await $api(`/initiatives/${initiative.id}/unpublish`, {
      method: 'PUT'
    })
    refresh()
    toast.add({ title: 'Exito', description: 'Iniciativa despublicada', color: 'green' })
  } catch (error) {
    console.log('Error', error)
    toast.add({ title: 'Error', description: 'Hubo un error al despublicar la iniciativa', color: 'red' })
  }
}

</script>

<template>
  <div>
    <h1 class="font-oswald uppercase text-4xl mb-2">INICIATIVAS</h1>
    <p>Lista de iniciativas</p>
    <br>
    <UInput v-model="undebouncedNameQuery" placeholder="Buscar por nombre" class="mb-3" />
    <AdminMultipleDimensionSelector v-model="selectedDimensions" :show-badges="true" />
    <br>
    <UTable :rows="initiatives" :columns="columns" :loading="isLoading" :ui="{}">
      <template #publishedAt-header>
        <UTooltip text="¿Publicado?">
          <UIcon name="i-heroicons-eye" class="flex flex-row items-center text-lg" />
        </UTooltip>
      </template>
      <template #map-header>
        <UTooltip text="Con ubicación">
          <UIcon name="i-heroicons-map-pin" class="flex flex-row items-center text-lg" />
        </UTooltip>
      </template>
      <template #loading-state>
        <div class="px-3 py-6">
          <LoadingBar class="text-gray-400 w-full" />
        </div>
      </template>
      <template #name-data="{ row }">
        <p class="font-medium">{{ row.name }}</p>
        <div class="flex-wrap flex items-center font-inter text-xs text-gray-500">
          <p>#{{ addLeadingZeros(row.id) }} |&nbsp;</p>
          <div v-for="(dimension, index) in row.dimensions" :key="`ini-${row.id}-dim-${dimension.id}`" class="">
            {{ dimension.name }}{{ index < row.dimensions.length - 1 ? '&nbsp;|&nbsp;' : '' }}
          </div>
        </div>
      </template>
      <template #subdivision-data="{ row }">
        <p>{{ row.subdivision.name }}</p>
        <p class="text-xs text-gray-500">
          {{ row.subdivision.city.name }}
        </p>
      </template>
      <template #publishedAt-data="{ row }">
        <div>
          <UIcon v-if="row.publishedAt" name="i-heroicons-check" class="text-green-500 text-lg" />
          <UIcon v-else name="i-heroicons-x-mark" class="text-red-500 text-lg" />
        </div>
      </template>
      <template #map-data="{ row }">
        <div>
          <UIcon v-if="row.latitude && row.longitude" name="i-heroicons-map-pin" class="text-green-500 text-lg" />
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
      <p class="text-gray-600 text-sm">Total: {{ totalInitiatives }}</p>
      <UPagination v-model="page" :page-count="pageCount" :total="totalInitiatives" />
    </div>
  </div>
</template>
