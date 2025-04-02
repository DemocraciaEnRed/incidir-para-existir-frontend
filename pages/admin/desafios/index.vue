<script setup>
import { AdminChallengesDeleteModal } from '#components'

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

const challenges = ref([])
const page = ref(1)
const pageCount = ref(20)
const totalChallenges = ref(0)
const selectedDimension = ref(null)

const selectedDimensionId = computed(() => {
  return selectedDimension.value ? [selectedDimension.value.id] : null
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { data, refresh, status } = useAPI('/challenges', {
  server: false,
  query: {
    page,
    limit: pageCount,
    includeUnpublished: true,
    dimension: selectedDimensionId,
  },
  watch: [page, selectedDimensionId],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onResponse({ request, response, options }) {
    challenges.value = response._data.rows
    totalChallenges.value = response._data.count
  }
})

const isLoading = computed(() => {
  return status.value === 'pending'
})

// function to truncate to 100 characters
const truncateText = (text, count) => {
  if(!text) return '- Sin completar -'
  return text.length > count ? text.substring(0, count) + '...' : text
}

const itemsMenu = (row) => {
  const options = [
  {
    label: 'Editar',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => navigateTo(`/admin/desafios/${row.id}/editar`)
  }, {
    label: 'Eliminar',
    icon: 'i-heroicons-trash-20-solid',
    click: () => openDeleteChallengeModal(row)
  }]

  if(row.publishedAt) {
    // push at the beginning
    options.unshift({
      label: 'Despublicar',
      icon: 'i-heroicons-eye-slash-20-solid',
      click: () => unpublishChallenge(row)
    })
  } else {
    options.unshift({
      label: 'Publicar',
      icon: 'i-heroicons-eye-20-solid',
      click: () => publishChallenge(row)
    })
  }

  return [options]
}


const publishChallenge = async (entry) => {
  try {
    await $api(`/challenges/${entry.id}/publish`, {
      method: 'PUT'
    })
    refresh()
    toast.add({ title: 'Exito', description: 'Desafío publicado', color: 'green' })
  } catch (error) {
    console.log('Error', error)
    toast.add({ title: 'Error', description: 'Hubo un error al publicar el desafío', color: 'red' })
  }
}

const unpublishChallenge = async (entry) => {
  try {
    await $api(`/challenges/${entry.id}/unpublish`, {
      method: 'PUT'
    })
    refresh()
    toast.add({ title: 'Exito', description: 'El desafío se ha ocultado correctamente', color: 'green' })
  } catch (error) {
    console.log('Error', error)
    toast.add({ title: 'Error', description: 'Hubo un error al ocultar el desafío', color: 'red' })
  }
}

const columns = [
  {
    key:'title',
    label: 'Desafío',
    rowClass: 'text-wrap'
  },
  {
    key: 'subdivision',
    label: 'Ubicación',
    rowClass: 'text-xs',
    class: 'text-center'
  },
  {
    key: 'dimension.name',
    label: 'Eje temático',
    rowClass: 'text-xs text-center',
    class: 'text-center'
  },
  {
    key: 'publishedAt',
    label: {
      icon: 'i-heroicons-check-circle-20-solid',
    },
    class: "w-[1%]",
  },
  {
    key: 'source',
    label: {
      icon: 'i-fa6-brands-whatsapp'
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
    class: "w-[1%]",  },
]


const openDeleteChallengeModal = (challenge) => {
  modal.open(AdminChallengesDeleteModal, {
    challenge: challenge,
    onDeleteChallenge: () => {
      deleteChallenge(challenge)
    },
    onCloseModal: () => {
      modal.close()
    }
  })
}

const deleteChallenge = async (challenge) => {
  try {
    await $api(`/challenges/${challenge.id}`, {
      method: 'DELETE'
    })
    refresh()
    // close the modal
    modal.close()
    toast.add({ title: 'Exito', description: 'Desafío eliminado', color: 'green' })
  } catch (error) {
    console.log('Error', error)
    toast.add({ title: 'Error', description: 'Hubo un error al eliminar el desafío', color: 'red' })
  }
}

</script>

<template>
  <div>
    <h1 class="font-oswald uppercase text-4xl mb-2">REPORTES DE DESAFÍOS</h1>
    <br>
    <div class="flex gap-2">
      <AdminDimensionSelector v-model="selectedDimension" class="w-full"/>
    </div>
    <br>
    <UTable :rows="challenges" :columns="columns" :loading="isLoading">
      <template #loading-state>
        <div class="px-3 py-6">
          <LoadingBar class="text-gray-400" />
        </div>
      </template>
      <template #publishedAt-header>
        <UTooltip text="¿Publicado?">
          <UIcon name="i-heroicons-eye" class="flex flex-row items-center text-lg" />
        </UTooltip>
      </template>
      <template #source-header>
        <UTooltip text="Fuente">
          <UIcon name="i-heroicons-rss-16-solid" class="flex flex-row items-center text-lg" />
        </UTooltip>
      </template>
      <template #map-header>
        <UTooltip text="Con ubicación">
          <UIcon name="i-heroicons-map-pin" class="flex flex-row items-center text-lg" />
        </UTooltip>
      </template>
      <template #title-data="{ row }">
        <p class="font-medium">{{ truncateText(row.needsAndChallenges, 50) }}</p>
        <p class="font-inter text-xs">#{{addLeadingZeros(row.id)}} | <span class="text-gray-600">Propuesta: {{ truncateText(row.proposal, 75) }}</span></p>
      </template>
      <template #subdivision-data="{ row }">
        <div class="text-center">
          <p v-if="row.city" class="font-medium">
            {{ row.city.name }}
          </p>
          <p v-if="row.subdivision"  class="text-xs text-gray-500">{{ row.subdivision.name }}</p>
        </div>
      </template>
      <template #source-data="{ row }">
        <div>
          <UIcon v-if="row.source == 'web'" name="i-heroicons-computer-desktop" class="text-sky-400 text-lg" />
          <UIcon v-else name="i-fa6-brands-whatsapp" class="text-green-500 text-lg" />
        </div>
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
      <p class="text-gray-600 text-sm">Total: {{ totalChallenges }}</p>
      <UPagination v-model="page" :page-count="pageCount" :total="totalChallenges" />
    </div>
  </div>

</template>
