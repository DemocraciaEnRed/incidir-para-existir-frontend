<script setup>
  const { $api } = useNuxtApp();

  const selectedSection = defineModel({
    type: [Object, Number, null],
    required: true,
    default: () => null
  })

  const toast = useToast()

  const isLoading = ref(true)
  const sections = ref([]) 

  const fetchSections = async () => {
    isLoading.value = true
    try {
      const data = await $api('/blog/section',{
        query: {
          page: 1,
          limit: 10000,
        },
        method: 'GET'
      })
      sections.value = data.rows
      // if selectedSection is a number, find the object in the array
      if(typeof selectedSection.value === 'number'){
        selectedSection.value = data.find(section => section.id === selectedSection.value)
      }
    } catch (error) {
      console.error(error)
      toast.add({ title: 'Error', description: 'Hubo un error al cargar las seccións de blog', color: 'red' })
    } finally {
      isLoading.value = false
    }
  }

  const clearFilter = () => {
    selectedSection.value = null
  }

  const clearDisabled = computed(() => {
    return selectedSection.value === null
  })

  // lifecycle hook
  onMounted(() => {
    fetchSections()
  })

</script>

<template>
  <div>
    <div class="flex gap-2">
      <USelectMenu v-model="selectedSection" class="w-full" :options="sections" :loading="isLoading" placeholder="Seleccione una sección" >
        <template #option="{ option }">
          <div class="flex items-center">
            <span>{{ option.name }}</span>
          </div>
        </template>
        <template #label>
          <span v-if="selectedSection">{{ selectedSection.name }}</span>
          <span v-else>Seleccione una sección</span>
        </template>
      </USelectMenu>
      <UButton color="white" :disabled="clearDisabled" variant="outline" @click="clearFilter">
        <UIcon name="i-heroicons-backspace" class="text-lg"/>
      </UButton>
    </div>
  </div>
</template>