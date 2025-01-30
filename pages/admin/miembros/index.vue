<script setup>
import { AdminMembersDeleteModal } from '#components'

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

const members = ref([])
const page = ref(1)
const pageCount = ref(10)
const totalMembers = ref(0)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { data, refresh, status } = useAPI('/members', {
  server: false,
  query: {
    page,
    limit: pageCount,
  },
  watch: [page],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onResponse({ request, response, options }) {
    members.value = response._data.rows
    totalMembers.value = response._data.count
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
    key: 'fullname',
    label: 'Nombre y apellido'
  },
  {
    key: 'team',
    label: 'Equipo'
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
    click: () => navigateTo(`/admin/miembros/${row.id}/editar`)
  }, {
    label: 'Eliminar',
    icon: 'i-heroicons-trash-20-solid',
    click: () => openDeleteMemberModal(row)
  }]
]

const openDeleteMemberModal = (member) => {
  modal.open(AdminMembersDeleteModal, {
    member: member,
    onDeleteMember: () => {
      deleteMember(member)
    },
    onCloseModal: () => {
      modal.close()
    }
  })
}

const deleteMember = async (member) => {
  try {
    await $api(`/members/${member.id}`, {
      method: 'DELETE'
    })
    refresh()
    // close the modal
    modal.close()
  } catch (error) {
    console.log('Error', error)
    toast.add({ title: 'Error', description: 'Hubo un error al eliminar el miembro', color: 'red' })
  }
}

// watch(() => page, (newValue, oldValue) => {
//   if (newValue != oldValue) {
//     refresh()
//   }
// })

</script>

<template>
  <div>
    <h1 class="font-oswald uppercase text-4xl mb-2">MIEMBROS</h1>
    <p>El listado de miembros aparece en la sección <b>¿Quienes somos?</b></p>
    <br>
    <UTable :rows="members" :columns="columns" :loading="isLoading">
      <template #loading-state>
        <div class="px-3 py-6">
          <LoadingBar class="text-gray-400" />
        </div>
      </template>
      <template #fullname-data="{ row }">
        <div class="flex items-center gap-2">
          <UAvatar :src="row.imageUrl" size="xs" :alt="row.fullname" /> {{ row.fullname }}
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
      <p class="text-gray-600 text-sm">Total: {{ totalMembers }}</p>
      <UPagination v-model="page" :page-count="pageCount" :total="totalMembers" />
    </div>
  </div>

</template>
