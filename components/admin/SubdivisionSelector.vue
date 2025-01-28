<script setup>
  const { $api } = useNuxtApp();

  const selected = defineModel({
    type: [Object, null],
    required: true,
    default: () => null
  })

  const toast = useToast()

  const isLoading = ref(true)
  const subdivisions = ref([]) 

  const fetchData = async () => {
    isLoading.value = true
    try {
      const data = await $api('/utils/subdivisions',{
        method: 'GET'
      })
      subdivisions.value = data
    } catch (error) {
      console.error(error)
      toast.add({ title: 'Error', description: 'Hubo un error al cargar las seccións de blog', color: 'red' })
    } finally {
      isLoading.value = false
    }
  }

  const clearFilter = () => {
    selected.value = null
  }

  const clearDisabled = computed(() => {
    return selected.value === null
  })

  // lifecycle hook
  onMounted(() => {
    fetchData()
  })

</script>

<template>
  <div>
    <div class="flex gap-2">
      <USelectMenu v-model="selected" class="w-full" :options="subdivisions" :loading="isLoading" placeholder="Seleccione una comuna, corregimiento o localidad de Cali o Bogota" >
        <template #option="{ option }">
          <div class="flex items-center">
            <span>{{ option.type }} {{ option.name }}, {{ option.city.name }}</span>
          </div>
        </template>
        <template #label>
          <span v-if="selected">{{ selected.type }} {{ selected.name }}, {{ selected.city.name }}</span>
          <span v-else>Seleccione una comuna, corregimiento o localidad de Cali o Bogota</span>
        </template>
      </USelectMenu>
      <UButton color="white" :disabled="clearDisabled" variant="outline" @click="clearFilter">
        <UIcon name="i-heroicons-backspace" class="text-lg"/>
      </UButton>
    </div>
  </div>
</template>