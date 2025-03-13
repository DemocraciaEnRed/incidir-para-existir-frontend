<script setup>

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

const entries = ref([])
const page = ref(1)
const pageCount = ref(10)
const totalEntries = ref(0)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { data, refresh, status } = useAPI('/admin/bot-responses', {
  server: false,
  query: {
    page,
    limit: pageCount,
  },
  watch: [page],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onResponse({ request, response, options }) {
    entries.value = response._data.rows.map((entry) => {
      return {
        ...entry,
        label: `${entry.success ? 'Éxito' : 'Fallo'} | Tipo: ${entry.type.toUpperCase()} | Fecha ${formatDate(entry.createdAt)}`,
        icon: entry.success ? 'i-heroicons-check' : 'i-heroicons-x-mark',
        color: entry.success ? 'green' : 'red',
      }
    })
    totalEntries.value = response._data.count
  }
})

const isLoading = computed(() => {
  return status.value === 'pending'
})


// watch(() => page, (newValue, oldValue) => {
//   if (newValue != oldValue) {
//     refresh()
//   }
// })

</script>

<template>
  <div>
    <h1 class="font-oswald uppercase text-4xl mb-2">Respuestas de Bot</h1>
    <p>asd</p>
    <br>
    <UAccordion v-if="!isLoading" :items="entries" color="white" variant="solid" multiple>
      <template #item="{ item }">
        <div class="ml-3 border-l border-gray-700 pl-3 py-2">
          <p class="font-bold">Respuesta</p>
          <pre class="whitespace-pre-wrap">{{ item.payload }}</pre>
        </div>
        <div class="ml-3 border-l border-gray-700 pl-3 py-2">
          <p class="font-bold">Stack Error</p>
          <pre v-if="item.errorTrace" class="whitespace-pre-wrap">{{ item.errorTrace }}</pre>
          <p v-else class="text-gray-500">No hay información de error</p>
        </div>
        </template>
    </UAccordion>
    <div v-else class="space-y-2">
      <USkeleton class="h-8" />
      <USkeleton class="h-8" />
      <USkeleton class="h-8" />
      <USkeleton class="h-8" />
      <USkeleton class="h-8" />
      <USkeleton class="h-8" />
      <USkeleton class="h-8" />
      <USkeleton class="h-8" />
      <USkeleton class="h-8" />
      <USkeleton class="h-8" />
    </div>
    <br>
    <div class="flex justify-between items-center">
      <p class="text-gray-600 text-sm">Total: {{ totalEntries }}</p>
      <UPagination v-model="page" :page-count="pageCount" :total="totalEntries" />
    </div>
  </div>

</template>
