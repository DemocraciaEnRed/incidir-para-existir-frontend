<script setup>
  const { $api } = useNuxtApp();
  
  const selected = defineModel({
    type: [Object, null],
    required: true,
    default: () => null
  })

  const toast = useToast()

  const isLoading = ref(true)
  const users = ref([]) 

  const fetchData = async () => {
    isLoading.value = true
    try {
      const data = await $api('/users/all',{
        method: 'GET'
      })
      users.value = data
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
      <USelectMenu v-model="selected" class="w-full" :options="users" :loading="isLoading" placeholder="Seleccione un usuario" >
        <template #option="{ option }">
          <div class="flex items-center gap-2">
            <UAvatar size="xs" :alt="option.fullName" :src="option.imageUrl ?? null" />{{ option.fullName }} <span class="text-slate-600 text-xs capitalize">({{ option.role }})</span>
          </div>
        </template>
        <template #label>
          <div v-if="selected" class="flex items-center gap-2">
            <UAvatar size="xs" :alt="selected.fullName" :src="selected.imageUrl ?? null" />{{ selected.fullName }} <span class="text-slate-600 text-xs capitalize">({{ selected.role }})</span>
          </div>
          <span v-else>Seleccione un usuario</span>
        </template>
      </USelectMenu>
      <UButton color="white" :disabled="clearDisabled" variant="outline" @click="clearFilter">
        <UIcon name="i-heroicons-backspace" class="text-lg"/>
      </UButton>
    </div>
  </div>
</template>