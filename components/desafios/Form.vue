<script setup>
import {
  object as YupObject,
  string as YupString,
  boolean as YupBoolean,
  number as YupNumber,
} from 'yup'

const { $api } = useNuxtApp()


const isLoading = ref(false)
const dimensions = ref([])
const subdivisions = ref([])
const submitSuccess = ref(false)
const submitError = ref(false)
const submitLoading = ref(false)


const schema = YupObject({
  dimensionId: YupNumber().required('Este campo es requerido'),
  cityId: YupNumber().required('Este campo es requerido'),
  subdivisionId: YupNumber().required('Este campo es requerido'),
  needsAndChallenges: YupString().max(500, 'El máximo es hasta 500 caracteres').required('Este campo es requerido'),
  proposal: YupString().max(500, 'El máximo es hasta 500 caracteres').required('Este campo es requerido'),
  inWords: YupString().matches(/^\w+(\s\w+)?$/, { excludeEmptyString: true, message: 'Solo se permite una o dos palabras' }).required('Este campo es requerido'),
  acceptsTerms: YupBoolean().oneOf([true], 'Debes aceptar los términos y condiciones')
})

const state = reactive({
  dimensionId: null,
  cityId: null,
  subdivisionId: null,
  needsAndChallenges: null,
  proposal: null,
  inWords: null,
  acceptsTerms: false
})


onMounted(() => {
  console.log('Mounted')
  getInitData()
})

const getInitData = async () => {
  isLoading.value = true
  try {
    const [dimensionsData, subdivisionsData] = await Promise.all([
      $api('/utils/dimensions'),
      $api('/utils/subdivisions')
    ])
    dimensions.value = dimensionsData
    subdivisions.value = subdivisionsData
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const citiesOptions = computed(() => {
  const cities = []
  if(!subdivisions.value) return cities
  if(!subdivisions.value.length) return cities
  subdivisions.value.forEach(subdivision => {
    // check if city is already in the list
    const city = cities.find(city => city.id === subdivision.city.id)
    if(!city) {
      cities.push(subdivision.city)
    }
  })
  return cities
})

const subdivisionsOptions = computed(() => {
  if(!state.cityId) return []
  // filtered subdivisions
  const filteredSubdivisions = subdivisions.value.filter(subdivision => {
    return subdivision.city.id === state.cityId
  })
  return filteredSubdivisions
})

const selectedLabelSubdivisions = computed(() => {
  if(state.cityId === 1) return "Cali: Selecciona tu corregimiento"
  if(state.cityId === 2) return "Bogota: Selecciona tu comuna"
  return '-'
})

watch(() => state.cityId, (newValue, oldValue) => {
  if(newValue != oldValue) {
    state.subdivisionId = null
  }
})

const handleSubmit = async () => {
  const payload = {
    dimensionId: state.dimensionId,
    subdivisionId: state.subdivisionId,
    needsAndChallenges: state.needsAndChallenges,
    proposal: state.proposal,
    inWords: state.inWords,
  }

  submitLoading.value = true
  try {
    await $api('/challenges', {
      method: 'POST',
      body: JSON.stringify(payload)
    })
    submitSuccess.value = true
    submitError.value = false
  } catch (error) {
    submitError.value = true
    submitSuccess.value = false
    console.error(error)
  } finally {
    submitLoading.value = false
  }
  
}

const selectDimension = (dimension) => {
  state.dimensionId = dimension.id
}


</script>

<template>
  <UCard v-if="isLoading">
    <UProgress color="pumpkin" />
  </UCard>
  <UCard v-else>
    <UAlert
      v-if="submitError"
      icon="i-heroicons-exclamation-triangle"
      color="red"
      variant="subtle"
      :close-button="{ 
        icon: 'i-heroicons-x-mark-20-solid',
        padded: false,
        color: 'red',
        variant: 'link',
        onClick: () => submitError = false
      }"
      class="mb-5"
      title="Ocurrion un error">
      <template #description>
        <p>No hemos podido guardar tu reporte, por favor intentalo de nuevo o contacta a soporte</p>
      </template>
    </UAlert>
    <div v-if="!submitSuccess">
      <p class="text-2xl text-mindaro font-bold mb-5 uppercase">Reportar un nuevo desafío</p>
      <UForm :state="state" :schema="schema" class="space-y-4" @submit="handleSubmit">
        <!-- <UFormGroup class="" label="Linea temática" name="dimensionId" required>
          <USelect v-model.number="state.dimensionId" :options="dimensions" value-attribute="id" option-attribute="name" :disabled="submitLoading"/>
        </UFormGroup> -->
        <UFormGroup name="dimensionId" label="Eje tematico del desafio" required>
          <div class="flex flex-wrap gap-2 pt-1">
            <UBadge 
            v-for="dimension in dimensions"
            :key="`dimension-${dimension.id}`"
            :color="state.dimensionId  == dimension.id ? 'mindaro' : 'white'"
            :variant="state.dimensionId == dimension.id ? 'solid' : 'outline'"
            class="cursor-pointer px-3"
            :ui="{ rounded: 'rounded-full' }"
            @click="selectDimension(dimension)">
              {{ dimension.name }}
            </UBadge>
          </div>
        </UFormGroup>
        <UFormGroup class="" label="Ciudad" name="cityId" required>
          <USelect v-model.number="state.cityId" :options="citiesOptions" value-attribute="id" option-attribute="name" :disabled="submitLoading"/>
        </UFormGroup>
        <UFormGroup v-if="state.cityId" class="" :label="selectedLabelSubdivisions" name="subdivisionId" required>
          <USelect v-model.number="state.subdivisionId" :options="subdivisionsOptions" value-attribute="id" option-attribute="name" :disabled="!state.cityId || submitLoading"/>
        </UFormGroup>
        <UFormGroup class="" label="Necesidades y desafíos" name="needsAndChallenges" required>
          <template #description>
            Comparte el desafio de la juventud en tu territorio <i class="text-pumpkin">(Máximo 500 caracteres)</i>
          </template>
          <UTextarea v-model="state.needsAndChallenges"  :disabled="submitLoading" />
        </UFormGroup>
        <UFormGroup class="" label="Propuesta" name="proposal" required>
          <template #description>
            ¿Tienes alguna propuesta frente a esta situación? <i class="text-pumpkin">(Máximo 500 caracteres)</i>
          </template>
          <template #help>
            <span v-if="state.proposal" class="text-xs">Caracteres: {{ state.proposal.length }}</span>
          </template>
          <UTextarea v-model="state.proposal" placeholder="Ingresá tu propuesta aquí"  :disabled="submitLoading"/>
        </UFormGroup>
        <UFormGroup class="" label="En máximo dos palabras ¿Cómo resumirias el desafio que enfrenta la juventud?" name="inWords" required>
          <UInput v-model="state.inWords" :disabled="submitLoading" />
        </UFormGroup>
        <UFormGroup class="flex items-center" name="acceptsTerms" required>
          <UCheckbox v-model="state.acceptsTerms" :disabled="submitLoading">
            <template #label>
              Acepto los <ULink to="/acerca-de/terminos-y-condiciones" class="text-pumpkin-500">términos y condiciones</ULink>
            </template>
          </UCheckbox>
        </UFormGroup>
        <UDivider />
        <UButton class="text-xl font-medium" :loading="submitLoading" type="submit" color="pumpkin" block size="lg" :ui="{ rounded: 'rounded-full' }">Reportar</UButton>
      </UForm>
    </div>
    <div v-else class="text-center">
      <UIcon name="i-heroicons-check-circle" class="text-6xl text-green-500" />
      <p class="text-green-500 font-oswald uppercase text-3xl mb-3">¡GRACIAS POR REPORTAR TU DESAFIO!</p>
      <p>Tu reporte ha sido guardado en nuestra base de datos</p>
    </div>

  </UCard>
</template>