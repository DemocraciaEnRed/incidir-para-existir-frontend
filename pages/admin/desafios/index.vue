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
  return selectedDimension.value ? selectedDimension.value.id : undefined
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { data, refresh, status } = useAPI('/challenges', {
  server: false,
  query: {
    page,
    limit: pageCount,
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
  return text.length > count ? text.substring(0, count) + '...' : text
}

const itemsMenu = (row) => {
  const options = [
  {
    label: 'Editar',
    icon: 'i-heroicons-pencil-square-20-solid',
    disabled: true,
    click: () => navigateTo(`/admin/desafios/${row.id}/editar`)
  }, {
    label: 'Eliminar',
    icon: 'i-heroicons-trash-20-solid',
    click: () => openDeleteChallengeModal(row)
  }]
  return [options]
}

const columns = [
  {
    key:'title',
    label: 'Desafio',
    rowClass: 'text-wrap'
  },
  {
    key: 'subdivision',
    label: 'Subdivision',
    rowClass: 'text-xs',
    class: ''
  },
  {
    key: 'dimension.name',
    label: 'Dimensión',
    rowClass: 'text-xs text-center',
    class: 'text-center'
  },
  {
    key: 'actions',
    rowClass: 'text-right',
  },
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
    toast.add({ title: 'Exito', description: 'Desafio eliminado', color: 'green' })
  } catch (error) {
    console.log('Error', error)
    toast.add({ title: 'Error', description: 'Hubo un error al eliminar el desafio', color: 'red' })
  }
}

</script>

<template>
  <div>
    <h1 class="font-oswald uppercase text-4xl mb-2">DESAFIOS</h1>
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
      <template #title-data="{ row }">
        <p class="font-medium">{{ truncateText(row.needsAndChallenges, 50) }}</p>
        <p class="text-xs text-gray-500">Propuesta: {{ truncateText(row.proposal, 75) }}</p>
      </template>
      <template #subdivision-data="{ row }">
        <p>{{ row.subdivision.name }}</p>
        <p class="text-xs text-gray-500">
          {{ row.subdivision.city.name }}
        </p>
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
