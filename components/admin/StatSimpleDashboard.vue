<script setup> 

  const { $api } = useNuxtApp();
  const toast = useToast()

  const isLoading = ref(true)

  const stats = reactive({
    totalUsers: 0,
    usersVerified: 0,
    totalEntries: 0,
    totalEntriesPublished: 0,
    totalEntriesUnpublished: 0,
    totalChallenges: 0,
    totalChallengesPublished: 0,
    totalChallengesUnpublished: 0,
    totalInitiatives: 0,
    totalInitiativesPublished: 0,
    totalInitiativesUnpublished: 0,
    totalBotResponses: 0,
    totalBotResponsesSuccess: 0,
  }) 

  const fetchData = async () => {
    isLoading.value = true
    try {
      const data = await $api('/admin/simple-stats',{
        method: 'GET'
      })
      stats.totalUsers = data.totalUsers;
      stats.usersVerified = data.usersVerified;
      stats.totalEntries = data.totalEntries;
      stats.totalEntriesPublished = data.totalEntriesPublished;
      stats.totalEntriesUnpublished = data.totalEntriesUnpublished;
      stats.totalChallenges = data.totalChallenges;
      stats.totalChallengesPublished = data.totalChallengesPublished;
      stats.totalChallengesUnpublished = data.totalChallengesUnpublished;
      stats.totalInitiatives = data.totalInitiatives;
      stats.totalInitiativesPublished = data.totalInitiativesPublished;
      stats.totalInitiativesUnpublished = data.totalInitiativesUnpublished;
      stats.totalBotResponses = data.totalBotResponses;
      stats.totalBotResponsesSuccess = data.totalBotResponsesSuccess;
    } catch (error) {
      console.error(error)
      toast.add({ title: 'Error', description: 'Hubo un error al cargar las estadísticas', color: 'red' })
    } finally {
      isLoading.value = false
    }
  }

  // lifecycle hook
  onMounted(() => {
    fetchData()
  })

</script>

<template>
  <div>
    <UCard v-if="isLoading" class="my-3">
      <LoadingBar  />
    </UCard>
    <div class="space-y-3">
      <div>
        <UDivider label="Iniciativas" :ui="{ wrapper: { base: 'my-5' } }" />
      </div>
      <UCard>
        <div class="flex justify-between items-center">
          <div>
            <p class="font-medium text-lg">Total Iniciativas</p>
            <p class="text-gray-500 text-sm">Iniciativas publicadas en la plataforma</p>
          </div>
          <p class="font-mono text-3xl font-bold ml-5">{{ stats.totalInitiatives }}</p>
        </div>
        <hr class="border-gray-700 my-2">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm">Iniciativas Publicadas</p>
          </div>
          <p class="font-mono ml-5">{{ stats.totalInitiativesPublished }}</p>
        </div>
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm">Iniciativas No Publicadas</p>
          </div>
          <p class="font-mono ml-5">{{ stats.totalInitiativesUnpublished }}</p>
        </div>
        <hr class="border-gray-700 my-2">
        <div class="flex justify-end">
          <UButton to="/admin/estadisticas" class="mt-3 inline-flex items-center px-4 py-1 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">
            Ver más estadisticas
            <svg class="w-6 h-6 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
          </UButton>
        </div>
      </UCard>
      <div>
        <UDivider label="Desafíos" :ui="{ wrapper: { base: 'my-5' } }" />
      </div>
      <UCard>
        <div class="flex justify-between items-center">
          <div>
            <p class="font-medium text-lg">Total Desafíos</p>
            <p class="text-gray-500 text-sm">Desafíos en la plataforma</p>
          </div>
          <p class="font-mono text-3xl font-bold ml-5">{{ stats.totalChallenges }}</p>
        </div>
        <hr class="border-gray-700 my-2">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm">Desafíos Publicados</p>
          </div>
          <p class="font-mono ml-5">{{ stats.totalChallengesPublished }}</p>
        </div>
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm">Desafíos No Publicados</p>
          </div>
          <p class="font-mono ml-5">{{ stats.totalChallengesUnpublished }}</p>
        </div>
        <hr class="border-gray-700 my-2">
        <div class="flex justify-end">
          <UButton to="/admin/estadisticas" class="mt-3 inline-flex items-center px-4 py-1 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">
            Ver más estadisticas
            <svg class="w-6 h-6 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
          </UButton>
        </div>
      </UCard>
      <div>
        <UDivider label="Blog" :ui="{ wrapper: { base: 'my-5' } }" />
      </div>
      <UCard>
        <div class="flex justify-between items-center">
          <div>
            <p class="font-medium text-lg">Total Entradas de blog</p>
            <p class="text-gray-500 text-sm">Entradas publicadas en la plataforma</p>
          </div>
          <p class="font-mono text-3xl font-bold ml-5">{{ stats.totalEntries }}</p>
        </div>
        <hr class="border-gray-700 my-2">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm">Entradas Publicadas</p>
          </div>
          <p class="font-mono ml-5">{{ stats.totalEntriesPublished }}</p>
        </div>
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm">Entradas No Publicadas</p>
          </div>
          <p class="font-mono ml-5">{{ stats.totalEntriesUnpublished }}</p>
        </div>
        <hr class="border-gray-700 my-2">
        <div class="flex justify-end">
          <UButton to="/admin/estadisticas" class="mt-3 inline-flex items-center px-4 py-1 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">
            Ver más estadisticas
            <svg class="w-6 h-6 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
          </UButton>
        </div>
      </UCard>
      <div>
        <UDivider label="Usuarios" :ui="{ wrapper: { base: 'my-5' } }" />
      </div>
      <UCard>
        <div class="flex justify-between items-center">
          <div>
            <p class="font-medium text-lg">Total Usuarios</p>
            <p class="text-gray-500 text-sm">Usuarios registrados en la plataforma</p>
          </div>
          <p class="font-mono text-3xl font-bold ml-5">{{ stats.totalUsers }}</p>
        </div>
        <hr class="border-gray-700 my-2">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm">Usuarios Verificados</p>
          </div>
          <p class="font-mono ml-5">{{ stats.usersVerified }}</p>
        </div>
        <hr class="border-gray-700 my-2">
        <div class="flex justify-end">
          <UButton to="/admin/estadisticas" class="mt-3 inline-flex items-center px-4 py-1 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-100 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">
            Ver más estadisticas
            <svg class="w-6 h-6 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
          </UButton>
        </div>
      </UCard>
    </div>
  </div>
</template>


