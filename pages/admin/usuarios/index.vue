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
    disabled: true,
    click: () => navigateTo(`/admin/usuarios/${row.id}/editar`)
  }, {
    label: 'Eliminar',
    icon: 'i-heroicons-trash-20-solid',
    disabled: true,
    // click: () => openDeleteInitiativeModal(row)
  }]
  
  // if(row.emailVerified) {
  //   // push at the beginning
  //   options.unshift({
  //     label: 'Inhabilitar',
  //     icon: 'i-heroicons-eye-slash-20-solid',
  //     click: () => disableUser(row)
  //   })
  // } else {
  //   options.unshift({
  //     label: 'Habilitar',
  //     icon: 'i-heroicons-eye-20-solid',
  //     click: () => enableUser(row)
  //   })
  // }

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
          <UAvatar size="xs" :alt="row.fullName" />{{ row.fullName }}
        </div>
      </template>
      <template #emailVerified-data="{ row }">
          <UIcon v-if="row.emailVerified" name="i-heroicons-check" class="text-green-500 text-lg " />
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
