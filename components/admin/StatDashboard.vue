<script setup> 

  const { $api } = useNuxtApp();
  const toast = useToast()

  const isLoading = ref(true)

  const stats = reactive({
    totalUsers: 0,
    usersVerified: 0,
    usersNotVerified: 0,
    usersWhoHaveNotLoggedInIn30Days: 0,
    usersWhoHaveNotLoggedInIn60Days: 0,
    totalEntries: 0,
    totalEntriesNotPublished: 0,
    totalEntriesPublished: 0,
    totalEntriesComments: 0,
    totalEntriesReplies: 0,
    totalChallenges: 0,
    totalChallengesPublished: 0,
    totalChallengesUnpublished: 0,
    totalChallengesWhatsapp: 0,
    totalChallengesWeb: 0,
    totalChallengesWhatsappPublished: 0,
    totalChallengesWebPublished: 0,
    totalChallengesWhatsappUnpublished: 0,
    totalChallengesWebUnpublished: 0,
    totalInitiatives: 0,
    totalInitiativesPublished: 0,
    totalInitiativesUnpublished: 0,
    totalInitiativesWhatsapp: 0,
    totalInitiativesWeb: 0,
    totalInitiativesWhatsappPublished: 0,
    totalInitiativesWebPublished: 0,
    totalInitiativesWhatsappUnpublished: 0,
    totalInitiativesWebUnpublished: 0,
    totalBotResponses: 0,
    totalBotResponsesSuccess: 0,
    totalBotResponsesError: 0,
  }) 

  const fetchData = async () => {
    isLoading.value = true
    try {
      const data = await $api('/admin/stats',{
        method: 'GET'
      })
      stats.totalUsers = data.totalUsers;
      stats.usersVerified = data.usersVerified;
      stats.usersNotVerified = data.usersNotVerified;
      stats.usersWhoHaveNotLoggedInIn30Days = data.usersWhoHaveNotLoggedInIn30Days;
      stats.usersWhoHaveNotLoggedInIn60Days = data.usersWhoHaveNotLoggedInIn60Days;
      stats.totalEntries = data.totalEntries;
      stats.totalEntriesNotPublished = data.totalEntriesNotPublished;
      stats.totalEntriesPublished = data.totalEntriesPublished;
      stats.totalEntriesComments = data.totalEntriesComments;
      stats.totalEntriesReplies = data.totalEntriesReplies;
      stats.totalChallenges = data.totalChallenges;
      stats.totalChallengesPublished = data.totalChallengesPublished;
      stats.totalChallengesUnpublished = data.totalChallengesUnpublished;
      stats.totalChallengesWhatsapp = data.totalChallengesWhatsapp;
      stats.totalChallengesWeb = data.totalChallengesWeb;
      stats.totalChallengesWhatsappPublished = data.totalChallengesWhatsappPublished;
      stats.totalChallengesWebPublished = data.totalChallengesWebPublished;
      stats.totalChallengesWhatsappUnpublished = data.totalChallengesWhatsappUnpublished;
      stats.totalChallengesWebUnpublished = data.totalChallengesWebUnpublished;
      stats.totalInitiatives = data.totalInitiatives;
      stats.totalInitiativesPublished = data.totalInitiativesPublished;
      stats.totalInitiativesUnpublished = data.totalInitiativesUnpublished;
      stats.totalInitiativesWhatsapp = data.totalInitiativesWhatsapp;
      stats.totalInitiativesWeb = data.totalInitiativesWeb;
      stats.totalInitiativesWhatsappPublished = data.totalInitiativesWhatsappPublished;
      stats.totalInitiativesWebPublished = data.totalInitiativesWebPublished;
      stats.totalInitiativesWhatsappUnpublished = data.totalInitiativesWhatsappUnpublished;
      stats.totalInitiativesWebUnpublished = data.totalInitiativesWebUnpublished;
      stats.totalBotResponses = data.totalBotResponses;
      stats.totalBotResponsesSuccess = data.totalBotResponsesSuccess;
      stats.totalBotResponsesError = data.totalBotResponsesError;
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
    <UCard class="my-3" v-if="isLoading">
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
        <!-- Web -->
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm">Iniciativas Web</p>
          </div>
          <p class="font-mono ml-5">{{ stats.totalInitiativesWeb }}</p>
        </div>
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm">Iniciativas Web Publicadas</p>
          </div>
          <p class="font-mono ml-5">{{ stats.totalInitiativesWebPublished }}</p>
        </div>
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm">Iniciativas Web No Publicadas</p>
          </div>
          <p class="font-mono ml-5">{{ stats.totalInitiativesWebUnpublished }}</p>
        </div>
        <hr class="border-gray-700 my-2">
        <!-- Whatsapp -->
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm">Iniciativas Whatsapp</p>
          </div>
          <p class="font-mono ml-5">{{ stats.totalInitiativesWhatsapp }}</p>
        </div>
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm">Iniciativas Whatsapp Publicadas</p>
          </div>
          <p class="font-mono ml-5">{{ stats.totalInitiativesWhatsappPublished }}</p>
        </div>
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm">Iniciativas Whatsapp No Publicadas</p>
          </div>
          <p class="font-mono ml-5">{{ stats.totalInitiativesWhatsappUnpublished }}</p>
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
          <p class="font-mono ml-5">{{ stats.totalEntriesNotPublished }}</p>
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
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm">Usuarios No Verificados</p>
          </div>
          <p class="font-mono ml-5">{{ stats.usersNotVerified }}</p>
        </div>
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm">Usuarios que no han iniciado sesión en 30 días</p>
          </div>
          <p class="font-mono ml-5">{{ stats.usersWhoHaveNotLoggedInIn30Days }}</p>
        </div>
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm">Usuarios que no han iniciado sesión en 60 días</p>
          </div>
          <p class="font-mono ml-5">{{ stats.usersWhoHaveNotLoggedInIn60Days }}</p>
        </div>
      </UCard>
      <div>
        <UDivider label="Bot" :ui="{ wrapper: { base: 'my-5' } }" />


        <UCard>
          <div class="flex justify-between items-center">
            <div>
              <p class="font-medium text-lg">Total interacciones completadas con el bot</p>
              <p class="text-gray-500 text-sm">Cada vez que llega al servidor una interacción finalizada con el bot</p>
            </div>
            <p class="font-mono text-3xl font-bold ml-5">{{ stats.totalBotResponses }}</p>
          </div>
          <hr class="border-gray-700 my-2">
          <div class="flex justify-between items-center">
            <div>
              <p class="text-sm">Procesamientos hecho con éxito</p>
            </div>
            <p class="font-mono ml-5">{{ stats.totalBotResponsesSuccess }}</p>
          </div>
          <div class="flex justify-between items-center">
            <div>
              <p class="text-sm">Procesamientos que fallaron</p>
            </div>
            <p class="font-mono ml-5">{{ stats.totalBotResponsesError }}</p>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>


