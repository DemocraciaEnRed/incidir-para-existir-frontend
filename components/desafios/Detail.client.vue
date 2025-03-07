<script setup>


const props = defineProps({
  desafioId: {
    type: [String, Number],
    required: true,
  },
  onClose: {
    type: Function,
    required: true,
  },
})

const isOpen = ref(false)

const { data, error, status, refresh } = await useAPI(`/challenges/${props.desafioId}`)

console.log(data.value)

const isLoading = computed(() => status.value === 'pending');

</script>

<template>
  <USlideover v-model="isOpen" prevent-close>
    <UCard
      class="h-full flex flex-col flex-1"
      :ui="{
        body: { base: 'flex-1 overflow-y-auto' },
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3
            class="font-inter text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            Reporte N° {{ addLeadingZeros(props.desafioId) }}
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="props.onClose"
          />
        </div>
      </template>

      <div class="">
        <div v-if="isLoading">Loading...</div>
        <div v-else-if="error">{{ error.message }}</div>
        <div v-else>
          <div class="space-y-8">
            <p class="font-bold text-3xl">{{ data.inWords }}</p>
            <div class="space-y-2">
              <p class="text-sm text-gray-500">Eje Temático</p>
              <div class="flex gap-2">
                <UBadge 
                color="mindaro"
                variant="subtle"
                size="lg" 
                :ui="{ rounded: 'rounded-full' }">
                  {{ data.dimension.name }}
                </UBadge>
              </div>
            </div>
            <div class="space-y-2">
              <p class="text-sm text-gray-500">Ubicación</p>
              <p class="">{{ data.subdivision.type }} {{ data.subdivision.name }}, {{ data.subdivision.city.name }}</p>
            </div>
            <div class="space-y-2">
              <p class="text-sm text-gray-500">Descripción del desafío de la juventud</p>
              <p class="">{{ data.needsAndChallenges }}</p>
            </div>
            <div class="space-y-2">
              <p class="text-sm text-gray-500">Propuesta frente al desafíoo</p>
              <p class="">{{ data.proposal }}</p>
            </div>

          </div>
        </div>
      </div>
      <template #footer>
        <div class="">
          <UButton color="primary" variant="soft" block :ui="{ rounded: 'rounded-full' }" @click="props.onClose">
            Cerrar</UButton>
        </div>
      </template>
    </UCard>
  </USlideover>
</template>
