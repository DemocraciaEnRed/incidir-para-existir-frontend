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
    totalBotResponsesUnknown: 0,
    totalBotResponsesInitiative: 0,
    totalBotResponsesInitiativeSuccess: 0,
    totalBotResponsesInitiativeError: 0,
    totalBotResponsesChallenge: 0,
    totalBotResponsesChallengeSuccess: 0,
    totalBotResponsesChallengeError: 0,
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
      stats.totalBotResponsesUnknown = data.totalBotResponsesUnknown;
      stats.totalBotResponsesInitiative = data.totalBotResponsesInitiative;
      stats.totalBotResponsesInitiativeSuccess = data.totalBotResponsesInitiativeSuccess;
      stats.totalBotResponsesInitiativeError = data.totalBotResponsesInitiativeError;
      stats.totalBotResponsesChallenge = data.totalBotResponsesChallenge;
      stats.totalBotResponsesChallengeSuccess = data.totalBotResponsesChallengeSuccess;
      stats.totalBotResponsesChallengeError = data.totalBotResponsesChallengeError;
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
        <hr class="border-gray-700 my-2">
        <!-- Web -->
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm">Desafíos Web</p>
          </div>
          <p class="font-mono ml-5">{{ stats.totalChallengesWeb }}</p>
        </div>
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm">Desafíos Web Publicados</p>
          </div>
          <p class="font-mono ml-5">{{ stats.totalChallengesWebPublished }}</p>
        </div>
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm">Desafíos Web No Publicados</p>
          </div>
          <p class="font-mono ml-5">{{ stats.totalChallengesWebUnpublished }}</p>
        </div>
        <hr class="border-gray-700 my-2">
        <!-- Whatsapp -->
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm">Desafíos Whatsapp</p>
          </div>
          <p class="font-mono ml-5">{{ stats.totalChallengesWhatsapp }}</p>
        </div>
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm">Desafíos Whatsapp Publicados</p>
          </div>
          <p class="font-mono ml-5">{{ stats.totalChallengesWhatsappPublished }}</p>
        </div>
        <div class="flex justify-between items-center">
          <div>
            <p class="text-sm">Desafíos Whatsapp No Publicados</p>
          </div>
          <p class="font-mono ml-5">{{ stats.totalChallengesWhatsappUnpublished }}</p>
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
              <p class="text-sm">Procesados existosamente</p>
            </div>
            <p class="font-mono ml-5">{{ stats.totalBotResponsesSuccess }}</p>
          </div>
          <div class="flex justify-between items-center">
            <div>
              <p class="text-sm">Procesados fallidamente</p>
            </div>
            <p class="font-mono ml-5">{{ stats.totalBotResponsesError }}</p>
          </div>
          <hr class="border-gray-700 my-2" >
          <div class="flex justify-between items-center">
            <div>
              <p class="text-sm">Procesados desconocidos</p>
            </div>
            <p class="font-mono ml-5">{{ stats.totalBotResponsesUnknown }}</p>
          </div>
          <hr class="border-gray-700 my-2" >
          <div class="flex justify-between items-center">
            <div>
              <p class="text-sm">Iniciativas</p>
            </div>
            <p class="font-mono ml-5">{{ stats.totalBotResponsesInitiative }}</p>
          </div>
          <div class="flex justify-between items-center">
            <div>
              <p class="text-sm">Iniciativas Procesadas exitosamente</p>
            </div>
            <p class="font-mono ml-5">{{ stats.totalBotResponsesInitiativeSuccess }}</p>
          </div>
          <div class="flex justify-between items-center">
            <div>
              <p class="text-sm">Iniciativas Procesadas fallidamente</p>
            </div>
            <p class="font-mono ml-5">{{ stats.totalBotResponsesInitiativeError }}</p>
          </div>
          <hr class="border-gray-700 my-2" >
          <div class="flex justify-between items-center">
            <div>
              <p class="text-sm">Desafíos</p>
            </div>
            <p class="font-mono ml-5">{{ stats.totalBotResponsesChallenge }}</p>
          </div>
          <div class="flex justify-between items-center">
            <div>
              <p class="text-sm">Desafíos Procesados exitosamente</p>
            </div>
            <p class="font-mono ml-5">{{ stats.totalBotResponsesChallengeSuccess }}</p>
          </div>
          <div class="flex justify-between items-center">
            <div>
              <p class="text-sm">Desafíos Procesados fallidamente</p>
            </div>
            <p class="font-mono ml-5">{{ stats.totalBotResponsesChallengeError }}</p>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>


