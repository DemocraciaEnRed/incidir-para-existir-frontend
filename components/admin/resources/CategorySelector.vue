<script setup>
  const { $api } = useNuxtApp();

  const selectedCategory = defineModel({
    type: [Object, Number, null],
    required: true,
    default: () => null
  })

  const toast = useToast()

  const isLoading = ref(true)
  const categories = ref([]) 

  const fetchCategories = async () => {
    isLoading.value = true
    try {
      const data = await $api('/resources/category',{
        query: {
          page: 1,
          limit: 10000,
        },
        method: 'GET'
      })
      categories.value = data
      // if selectedCategory is a number, find the object in the array
      if(typeof selectedCategory.value === 'number'){
        selectedCategory.value = data.rows.find(category => category.id === selectedCategory.value)
      }
    } catch (error) {
      console.error(error)
      toast.add({ title: 'Error', description: 'Hubo un error al cargar las categorias de blog', color: 'red' })
    } finally {
      isLoading.value = false
    }
  }

  const clearFilter = () => {
    selectedCategory.value = null
  }

  const clearDisabled = computed(() => {
    return selectedCategory.value === null
  })

  // lifecycle hook
  onMounted(() => {
    fetchCategories()
  })

</script>

<template>
  <div>
    <div class="flex gap-2">
      <USelectMenu v-model="selectedCategory" class="w-full" :options="categories" :loading="isLoading" placeholder="Seleccione una categoria" >
        <template #option="{ option }">
          <div class="flex items-center">
            <span>{{ option.name }}</span>
          </div>
        </template>
        <template #label>
          <span v-if="selectedCategory">{{ selectedCategory.name }}</span>
          <span v-else>Seleccione una categoria</span>
        </template>
      </USelectMenu>
      <UButton color="white" :disabled="clearDisabled" variant="outline" @click="clearFilter">
        <UIcon name="i-heroicons-backspace" class="text-lg"/>
      </UButton>
    </div>
  </div>
</template>