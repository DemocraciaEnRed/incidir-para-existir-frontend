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
        label: 'Respuesta el ' + formatDate(entry.createdAt),
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
    <UAccordion v-if="!isLoading" :items="entries" color="white" variant="solid">
      <template #item="{ item }">
        <pre>{{ item.payload }}</pre>
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
