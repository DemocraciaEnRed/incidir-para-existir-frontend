<script setup>
import { AdminUserDisableModal, AdminUserEnableModal  } from '#components'


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

const users = ref([])
const page = ref(1)
const pageCount = ref(20)
const totalUsers = ref(0)


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { data, refresh, status } = useAPI('/users', {
  server: false,
  query: {
    page,
    limit: pageCount,
  },
  watch: [page],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onResponse({ request, response, options }) {
    users.value = response._data.rows
    totalUsers.value = response._data.count
  }
})

const isLoading = computed(() => {
  return status.value === 'pending'
})

const itemsMenu = (row) => {
  const options = [{
    label: 'Editar',
    icon: 'i-heroicons-pencil-square-20-solid',
    click: () => navigateTo(`/admin/usuarios/${row.id}/editar`)
  }]
  if(row.emailVerified) {
    // push at the beginning
    options.unshift({
      label: 'Inhabilitar',
      icon: 'i-heroicons-eye-slash-20-solid',
      click: () => openDisableUserModal(row)
    })
  } else {
    options.unshift({
      label: 'Habilitar',
      icon: 'i-heroicons-eye-20-solid',
      click: () => openEnableUserModal(row)
    })
  }

  return [options]
}

const columns = [
  {
    key:'name',
    label: 'Nombre y Apellido',
    rowClass: 'truncate'
  },
  {
    key: 'email',
    label: 'Correo electronico',
    rowClass: 'truncate'
  },
  {
    key: 'role',
    label: 'Rol',
    class: 'text-center',
    rowClass: 'capitalize text-xs text-center',
  },
  {
    key: 'emailVerified',
    label: 'Verificado',
    class: 'text-center',
    rowClass: 'text-center',
  },
  {
    key: 'disabled',
    label: 'Habilitado',
    class: 'text-center',
    rowClass: 'text-center',
  },
  {
    key: 'actions',
    rowClass: 'text-right',
    class: "w-0"
  },
]

const openDisableUserModal = (user) => {
  modal.open(AdminUserDisableModal, {
    user: user,
    onDisableUser: () => {
      disableUser(user)
    },
    onCloseModal: () => {
      modal.close()
    }
  })
}

const openEnableUserModal = (user) => {
  modal.open(AdminUserEnableModal, {
    user: user,
    onEnableUser: () => {
      enableUser(user)
    },
    onCloseModal: () => {
      modal.close()
    }
  })
}

const disableUser = async (user) => {
  try {
    await $api(`/users/${user.id}/disable`, {
      method: 'PUT'
    })
    refresh()
    // close the modal
    modal.close()
  } catch (error) {
    console.log('Error', error)
    toast.add({ title: 'Error', description: 'Hubo un error al eliminar el miembro', color: 'red' })
  }
}

const enableUser = async (user) => {
  try {
    await $api(`/users/${user.id}/enable`, {
      method: 'PUT'
    })
    refresh()
    // close the modal
    modal.close()
  } catch (error) {
    console.log('Error', error)
    toast.add({ title: 'Error', description: 'Hubo un error al habilitar el miembro', color: 'red' })
  }
}
</script>

<template>
  <div>
    <h1 class="font-oswald uppercase text-4xl mb-2">USUARIOS</h1>
    <br>
    <UTable :rows="users" :columns="columns" :loading="isLoading">
      <template #loading-state>
        <div class="px-3 py-6">
          <LoadingBar class="text-gray-400" />
        </div>
      </template>
      <template #name-data="{ row }">
        <div class="flex items-center gap-2">
          <UAvatar size="xs" :alt="row.fullName" :src="row.imageUrl ?? null" />{{ row.fullName }}
        </div>
      </template>
      <template #emailVerified-data="{ row }">
          <UIcon v-if="row.emailVerified" name="i-heroicons-check" class="text-green-500 text-lg " />
          <UIcon v-else name="i-heroicons-x-mark" class="text-red-500 text-lg " />
      </template>
      <template #disabled-data="{ row }">
          <UIcon v-if="!row.disabled" name="i-heroicons-check" class="text-green-500 text-lg " />
          <UIcon v-else name="i-heroicons-x-mark" class="text-red-500 text-lg " />
      </template>
      <template #actions-data="{ row }">
        <UDropdown :items="itemsMenu(row)">
          <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
        </UDropdown>
      </template>
    </UTable>
    <br>
    <div class="flex justify-between items-center">
      <p class="text-gray-600 text-sm">Total: {{ totalUsers }}</p>
      <UPagination v-model="page" :page-count="pageCount" :total="totalUsers" />
    </div>
  </div>

</template>
