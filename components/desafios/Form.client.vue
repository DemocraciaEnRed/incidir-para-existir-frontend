<script setup>
import {
  object as YupObject,
  string as YupString,
  boolean as YupBoolean,
  number as YupNumber,
} from 'yup'

import { RecaptchaModal } from '#components'

const { $api } = useNuxtApp()
const { gtag } = useGtag()
const toast = useToast()
const modal = useModal()


// form state
const isLoading = ref(false)
const submitSuccess = ref(false)
const submitError = ref(false)
const submitLoading = ref(false)
// data 
const dimensions = ref([])
const cities = ref([])
// complexData
const selectedCoordinates = ref(null)
const recaptchaResponse = ref(null)

const successMessageDiv = useTemplateRef('success-message')

const schema = YupObject({
  dimensionId: YupNumber().required('Este campo es requerido'),
  city: YupObject().required('Este campo es requerido'),
  subdivision: YupObject().required('Este campo es requerido'),
  needsAndChallenges: YupString().max(500, 'El máximo es hasta 500 caracteres').required('Este campo es requerido'),
  proposal: YupString().max(500, 'El máximo es hasta 500 caracteres').required('Este campo es requerido'),
  inWords: YupString().matches(/^\w+(\s\w+)?$/, { excludeEmptyString: true, message: 'Solo se permite una o dos palabras' }).required('Este campo es requerido'),
  acceptsTerms: YupBoolean().oneOf([true], 'Debes aceptar los términos y condiciones')
})

const state = reactive({
  dimensionId: null,
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
    const [dimensionsData, citiesData] = await Promise.all([
      $api('/utils/dimensions'),
      $api('/utils/cities')
    ])
    dimensions.value = dimensionsData
    cities.value = citiesData

  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const subdivisionsOptions = computed(() => {
  if(!state.city) return []
  // filtered subdivisions
  return state.city.subdivisions
})

watch(() => state.city, () => {
  state.subdivision = null
  selectedCoordinates.value = null
})

const startRecaptchaChallenge = async () => {
  modal.open(RecaptchaModal, {
    onSubmitRecaptcha: (response) => {
      recaptchaResponse.value = response 
      handleSubmit()
      modal.close()
    },
    onCloseModal: () => {
      modal.close()
    }
  })
}

const handleSubmit = async () => {
  try {
    const payload = {
      dimensionId: state.dimensionId,
      subdivisionId: state.subdivision.id,
      needsAndChallenges: state.needsAndChallenges,
      latitude: undefined,
      longitude: undefined,
      proposal: state.proposal,
      inWords: state.inWords,
    }

    if(selectedCoordinates.value) {
      payload.latitude = selectedCoordinates.value[0]
      payload.longitude = selectedCoordinates.value[1]
    }

    if(recaptchaResponse.value) {
      payload.recaptchaResponse = recaptchaResponse.value
    } else {
      toast.add({
        title: 'Error',
        description: 'Por favor, completa el captcha',
        color: 'red'
      })
      return
    }

    submitLoading.value = true

    await $api('/challenges', {
      method: 'POST',
      body: JSON.stringify(payload)
    })

    gtag('event', 'form_submit_reporte', {
      event_category: 'engagement',
      event_label: 'challenge_form',
      value: 1
    });
    
    submitSuccess.value = true
    submitError.value = false
    setTimeout(() => {
      successMessageDiv.value.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  } catch (error) {
    console.error(error)
    submitError.value = true
    submitSuccess.value = false
    toast.add({
      title: 'Error',
      description: 'Hubo un error al enviar el formulario',
      color: 'red'
    })
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
      <UForm :state="state" :schema="schema" class="space-y-4" @submit="startRecaptchaChallenge">
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
            size="lg"
            :ui="{ rounded: 'rounded-full' }"
            @click="selectDimension(dimension)">
              {{ dimension.name }}
            </UBadge>
          </div>
        </UFormGroup>
        <UFormGroup label="Seleccione la ciudad del desafio" name="city" required>
          <USelectMenu v-model="state.city" :options="cities" option-attribute="name" placeholder="Seleccione una ciudad" size="lg" :ui-menu="{ container: 'z-[1500] group' }"/>
        </UFormGroup>
        <UFormGroup v-if="state.city" class="" label="Seleccione la ubicación del desafio" name="subdivision" required>
          <USelectMenu v-model="state.subdivision" :options="subdivisionsOptions" placeholder="Seleccione la ubicación" size="lg" :ui-menu="{ container: 'z-[1500] group' }">
            <template #option="{ option }">
              <span>{{ option.type }} {{ option.name }}</span>
            </template>
            <template #label>
              <span v-if="state.subdivision">{{ state.subdivision.type }} {{ state.subdivision.name }}</span>
              <span v-else>Seleccione la ubicación</span>
            </template>
          </USelectMenu>
        </UFormGroup>
        <UFormGroup label="Ubicación del desafio en el mapa" class="w-full">
          <template #description>
            <p><b class="text-pumpkin">Opcional</b>. Haga clic para marcar la ubicación del desafio en el mapa. Si el desafio no tiene una ubicación específica, puede dejar el mapa sin marcar.</p>
          </template>
          <MapSelectPosition v-if="state.subdivision" :key="`map-city-${state.city.id}-subdivision-${state.subdivision.id}`" v-model="selectedCoordinates" :selected-subdivision="state.subdivision" />
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
    <div v-else ref="success-message" class="text-center">
      <UIcon name="i-heroicons-check-circle" class="text-6xl text-green-500" />
      <p class="text-green-500 font-oswald uppercase text-3xl mb-3">¡GRACIAS POR REPORTAR TU DESAFIO!</p>
      <p>Tu reporte ha sido guardado en nuestra base de datos</p>
    </div>

  </UCard>
</template>