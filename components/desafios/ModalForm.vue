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

const schema = YupObject({
  dimension: YupNumber().required('Este campo es requerido'),
  city: YupNumber().required('Este campo es requerido'),
  subdivision: YupNumber().required('Este campo es requerido'),
  needsAndChallenges: YupString().max(500).required('Este campo es requerido'),
  proposal: YupString().max(500).required('Este campo es requerido'),
  inWords: YupString().matches(/^\w+(\s\w+)?$/, { excludeEmptyString: true }).required('Este campo es requerido'),
  acceptsTerms: YupBoolean().oneOf([true], 'Debes aceptar los términos y condiciones')
})

const state = reactive({
  dimension: null,
  city: null,
  subdivision: null,
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
  if(!state.city) return []
  // filtered subdivisions
  const filteredSubdivisions = subdivisions.value.filter(subdivision => {
    return subdivision.city.id === state.city
  })
  return filteredSubdivisions
})

const selectedLabelSubdivisions = computed(() => {
  if(state.city === 1) return "Cali: Selecciona tu corregimiento"
  if(state.city === 2) return "Bogotá: Selecciona tu comuna"
  return '-'
})

watch(() => state.city, (newValue, oldValue) => {
  if(newValue != oldValue) {
    state.subdivision = null
  }
})

const handleSubmit = async () => {
  try {
    await schema.validate(state, { abortEarly: false })
    console.log('Form is valid')
  } catch (error) {
    console.error(error)
  }
}


</script>

<template>
  <UModal>
  <UCard v-if="isLoading">
    <UProgress color="pumpkin" />
  </UCard>
  <UCard>
    <p class="text-2xl text-pumpkin-500 font-bold mb-5">REPORTA DESAFÍOS DE LA JUVENTUD</p>
    <UForm :state="state" :schema="schema" class="space-y-4" @submit="handleSubmit">
      <!-- <UFormGroup class="" label="Linea temática" name="dimension" required>
        <USelect v-model="state.dimension" :options="dimensions" value-attribute="id" option-attribute="name"/>
      </UFormGroup> -->
      <UFormGroup class="" label="Ciudad" name="city" required>
        <USelect v-model.number="state.city" :options="citiesOptions" value-attribute="id" option-attribute="name"/>
      </UFormGroup>
      <UFormGroup v-if="state.city" class="" :label="selectedLabelSubdivisions" name="subdivision" required>
        <USelect v-model.number="state.subdivision" :options="subdivisionsOptions" value-attribute="id" option-attribute="name" :disabled="!state.city"/>
      </UFormGroup>
      <UFormGroup class="" label="Necesidades y desafíos" name="needsAndChallenges" required>
        <template #description>
          Comparte tu necesidad y/o desafío <i class="text-pumpkin">Max. 500 caracteres.</i>
        </template>
        <UTextarea v-model="state.needsAndChallenges" />
      </UFormGroup>
      <UFormGroup class="" label="Propuesta" name="proposal" required>
        <template #description>
          ¿Tienes alguna propuesta frente a esta situación? <i class="text-pumpkin">Max. 500 caracteres.</i>
        </template>
        <template #help>
          <span v-if="state.proposal" class="text-xs">Caracteres: {{ state.proposal.length }}</span>
        </template>
        <UTextarea v-model="state.proposal" placeholder="Ingresá tu propuesta aquí" />
      </UFormGroup>
      <UFormGroup class="" label="En pocas palabras" name="inWords" required>
        <template #description>
          ¿Cómo describirías tu propuesta en pocas palabras?
        </template>
        <UInput v-model="state.inWords" />
      </UFormGroup>
      <UFormGroup class="flex items-center" name="acceptsTerms" required>
        <UCheckbox v-model="state.acceptsTerms">
          <template #label>
            Acepto los <ULink to="/terminos-y-condiciones" class="text-pumpkin-500">términos y condiciones</ULink>
          </template>
        </UCheckbox>
      </UFormGroup>
      <UDivider />
      <UButton color="pumpkin" block size="xl" type="submit">Enviar</UButton>
    </UForm>


  </UCard>
</UModal>

</template>