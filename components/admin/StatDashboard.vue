<script setup> 

  const { $api } = useNuxtApp();
  const toast = useToast()

  const isLoading = ref(true)

  const stats = reactive({
    totalUsers: 0,
    usersVerified: 0,
    usersNotVerified: 0,
    totalEntries: 0,
    totalChallenges: 0,
    totalInitiatives: 0,
    totalInitiativesPublished: 0,
    totalInitiativesUnpublished: 0,
  }) 

  const fetchData = async () => {
    isLoading.value = true
    try {
      const data = await $api('/admin/stats',{
        method: 'GET'
      })
      stats.totalUsers = data.totalUsers
      stats.usersVerified = data.usersVerified
      stats.usersNotVerified = data.usersNotVerified
      stats.totalEntries = data.totalEntries
      stats.totalChallenges = data.totalChallenges
      stats.totalInitiatives = data.totalInitiatives
      stats.totalInitiativesPublished = data.totalInitiativesPublished
      stats.totalInitiativesUnpublished = data.totalInitiativesUnpublished

    } catch (error) {
      console.error(error)
      toast.add({ title: 'Error', description: 'Hubo un error al cargar las estadisticas', color: 'red' })
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
    <UCard class="my-3" v-if="isLoading">
      <LoadingBar  />
    </UCard>
    <div class="space-y-3">
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
      </UCard>
      <UCard>
        <div class="flex justify-between items-center">
          <div>
            <p class="font-medium text-lg">Usuarios Verificados</p>
            <p class="text-gray-500 text-sm">Usuarios que han verificado su correo</p>
          </div>
          <p class="font-mono text-3xl font-bold ml-5">{{ stats.usersVerified }}</p>
        </div>
      </UCard>
      <UCard>
        <div class="flex justify-between items-center">
          <div>
            <p class="font-medium text-lg">Usuarios No Verificados</p>
            <p class="text-gray-500 text-sm">Usuarios que no han verificado su correo</p>
          </div>
          <p class="font-mono text-3xl font-bold ml-5">{{ stats.usersNotVerified }}</p>
        </div>
      </UCard>
      <div>
        <UDivider label="Desafios" :ui="{ wrapper: { base: 'my-5' } }" />
      </div>
      <UCard>
        <div class="flex justify-between items-center">
          <div>
            <p class="font-medium text-lg">Total Desafios</p>
            <p class="text-gray-500 text-sm">Desafios en la plataforma</p>
          </div>
          <p class="font-mono text-3xl font-bold ml-5">{{ stats.totalChallenges }}</p>
        </div>
      </UCard>
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
      </UCard>
      <UCard>
        <div class="flex justify-between items-center">
          <div>
            <p class="font-medium text-lg">Iniciativas Publicadas</p>
            <p class="text-gray-500 text-sm">Iniciativas publicadas en la plataforma</p>
          </div>
          <p class="font-mono text-3xl font-bold ml-5">{{ stats.totalInitiativesPublished }}</p>
        </div>
      </UCard>
      <UCard>
        <div class="flex justify-between items-center">
          <div>
            <p class="font-medium text-lg">Iniciativas No Publicadas</p>
            <p class="text-gray-500 text-sm">Iniciativas no publicadas en la plataforma</p>
          </div>
          <p class="font-mono text-3xl font-bold ml-5">{{ stats.totalInitiativesUnpublished }}</p>
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
      </UCard>
    </div>
  </div>
</template>


