<script setup>
import {
  object as YupObject,
  string as YupString,
  boolean as YupBoolean,
  // number as YupNumber,
  array as YupArray
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
const showContactForm = ref(true)
const showInitiativeForm = ref(false)
const contactFormIsValid = ref(false)
// data 
const dimensions = ref([])
const cities = ref([])
// complexData
const selectedCoordinates = ref(null)
const recaptchaResponse = ref(null)

const successMessageDiv = useTemplateRef('success-message')

const contactSchema = YupObject({
  fullname: YupString().required('Este campo es requerido'),
  email: YupString().email('Por favor, ingresa un email válido').required('Este campo es requerido'),
  phone: YupString().required('Este campo es requerido'),
  keepEmailPrivate: YupBoolean().required('Este campo es requerido'),
  keepPhonePrivate: YupBoolean().required('Este campo es requerido')
})

const contactState = reactive({
  fullname: 'Guillemro',
  email: 'guillermo@democracy.io',
  phone: '45242451',
  keepEmailPrivate: true, // privacy by default
  keepPhonePrivate: true // privacy by default
})

const initiativeSchema = YupObject({
  name: YupString().required('Este campo es requerido'),
  description: YupString().max(500).required('Este campo es requerido'),
  needsAndOffers: YupString().max(500).required('Este campo es requerido'),
  city: YupObject().required('Este campo es requerido'),
  subdivision: YupObject().required('Este campo es requerido'),
  // dimensionsIds must be an array and there must be one or two dimension IDs 
  dimensionIds: YupArray().min(1, 'Debes seleccionar uno o dos ejes temáticos').max(2, 'Solo puedes seleccionar hasta dos ejes tematicos').required('Este campo es requerido')
})

const initiativeState = reactive({
  name: '',
  description: '',
  needsAndOffers: '',
  city: null,
  subdivision: null,
  dimensionIds: [],
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

const addDimention = (dimension) => {
  // you can add up to 2 dimensions.
  // if the dimension is already in the list, remove it
  if(initiativeState.dimensionIds.includes(dimension.id)) {
    initiativeState.dimensionIds = initiativeState.dimensionIds.filter(d => d !== dimension.id)
  } else {
    if(initiativeState.dimensionIds.length < 2) {
      initiativeState.dimensionIds.push(dimension.id)
    } else {
      // show a toast
      toast.add({
        title: 'Solo puedes seleccionar hasta dos ejes temáticos',
        description: 'Por favor, deselecciona uno de los ejes temáticos seleccionados',
        color: 'red',
      })
    }
  }
}

const subdivisionsOptions = computed(() => {
  if(!initiativeState.city) return []
  // filtered subdivisions
  return initiativeState.city.subdivisions
})

// const selectedLabelSubdivisions = computed(() => {
//   if(initiativeState.cityId === 1) return "Cali: Selecciona el corregimiento de la iniciativa"
//   if(initiativeState.cityId === 2) return "Bogotá: Selecciona la comuna de la iniciativa"
//   return '-'
// })

const handleSubmitContactForm = async () => {
  try {
    showContactForm.value = true
    showInitiativeForm.value = true
    contactFormIsValid.value = true
  } catch (error) {
    console.error(error)
  }
}

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
      name: initiativeState.name,
      description: initiativeState.description,
      needsAndOffers: initiativeState.needsAndOffers,
      subdivisionId: initiativeState.subdivision.id,
      dimensionIds: initiativeState.dimensionIds,
      latitude: undefined,
      longitude: undefined,
      contact: contactState
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

    await $api('/initiatives', {
      method: 'POST',
      body: JSON.stringify(payload)
    })
    
    gtag('event', 'form_submission', {
      event_category: 'engagement',
      event_label: 'initiative_form',
      value: 1
    });

    submitSuccess.value = true
    submitError.value = false
    // scroll to the success message, make it to the center of the screen
    setTimeout(() => {
      successMessageDiv.value.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  } catch (error) {
    console.error(error)
    submitError.value = true
    toast.add({
      title: 'Error',
      description: 'Hubo un error al enviar el formulario',
      color: 'red'
    })
  } finally {
    submitLoading.value = false
  }
}

watch(() => initiativeState.city, () => {
  initiativeState.subdivision = null
  selectedCoordinates.value = null
})

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
      <UDivider size="lg" class="mb-4" label="Paso 1. Datos del referente de la iniciativa" />
      <UForm v-if="showContactForm" :state="contactState" :schema="contactSchema" class="space-y-6" @submit="handleSubmitContactForm">
        <p>Ingrese sus datos de contacto como <b>referente de la iniciativa</b>.</p>
        <div class="flex space-x-3">
          <UFormGroup name="fullname" label="Nombre completo" required class="w-full">
            <UInput v-model="contactState.fullname" size="lg" icon="i-heroicons-user" :disabled="contactFormIsValid" placeholder="Escriba aquí..." />
          </UFormGroup>
          <UFormGroup name="email" label="Email de contacto" required class="w-full">
            <UInput v-model="contactState.email" size="lg" icon="i-heroicons-envelope" :disabled="contactFormIsValid"  placeholder="Escriba aquí..." />
          </UFormGroup>
          <UFormGroup name="phone" label="Teléfono de contacto" required class="w-full">
            <UInput v-model="contactState.phone" size="lg" icon="i-heroicons-phone" :disabled="contactFormIsValid"  placeholder="Escriba aquí..." />
          </UFormGroup>
        </div>
        <UFormGroup label="Privacidad de tus datos" help="Selecciona si deseas que tus datos de contacto sean visibles al público" class="w-full">
            <div class="flex space-x-3">
            <UFormGroup name="keepEmailPrivate" class="w-full border border-gray-800 rounded-xl p-4" >
              <UCheckbox v-model="contactState.keepEmailPrivate" :disabled="contactFormIsValid">
                <template #label>
                  <p>Ocultar el email al publico</p>
                </template>
                <template #help>
                  <p v-if="contactState.keepEmailPrivate"> El email solo será visible por el equipo de Movilizatorio</p>
                  <p v-else>El email será visible al público</p>
                </template>
              </UCheckbox>
            </UFormGroup>
            <UFormGroup name="keepPhonePrivate" class="w-full border border-gray-800 rounded-xl p-4" >
              <UCheckbox v-model="contactState.keepPhonePrivate" :disabled="contactFormIsValid">
                <template #label>
                  <p>Ocultar el teléfono al publico</p>
                </template>
                <template #help>
                  <p v-if="contactState.keepPhonePrivate"> El telefono solo será visible por el equipo de Movilizatorio</p>
                  <p v-else>El telefono será visible al público</p>
                </template>
              </UCheckbox>
            </UFormGroup>
          </div>
          </UFormGroup>
        <UButton v-if="!showInitiativeForm" class="text-xl font-medium" type="submit" variant="outline" color="pumpkin" block :ui="{ rounded: 'rounded-full' }" >Siguiente</UButton>
      </UForm>
      <div v-if="showInitiativeForm">
        <UDivider size="lg" class="my-8" label="Paso 2. Datos de la iniciativa" />
        <UForm :state="initiativeState" :schema="initiativeSchema" class="space-y-4" @submit="startRecaptchaChallenge">
          <UFormGroup name="dimensionIds" label="Ejes tematicos de la iniciativa" description="Sabemos que algunas iniciativas trabajan diferentes temáticas, para este mapeo selecciona máximo 2." required>
            <div class="flex flex-wrap gap-2 pt-1">
              <UBadge 
              v-for="dimension in dimensions"
              :key="`dimension-${dimension.id}`"
              :color="initiativeState.dimensionIds.includes(dimension.id) ? 'mindaro' : 'white'"
              :variant="initiativeState.dimensionIds.includes(dimension.id) ? 'solid' : 'outline'"
              class="cursor-pointer px-3"
              size="lg"
              :ui="{ rounded: 'rounded-full' }"
              @click="addDimention(dimension)">
                {{ dimension.name }}
              </UBadge>
            </div>
          </UFormGroup>
          <UFormGroup name="name" label="Nombre de la iniciativa" required>
            <template #description>
              ¿Cómo se llama tu iniciativa / parche o movimiento?
            </template>
            <UInput v-model="initiativeState.name" size="lg" placeholder="Escriba aquí..." />
          </UFormGroup>
          <UFormGroup label="Seleccione la ciudad de la iniciativa" name="city" required>
            <USelectMenu v-model="initiativeState.city" :options="cities" option-attribute="name" placeholder="Seleccione una ciudad" size="lg" :ui-menu="{ container: 'z-[1500] group' }"/>
          </UFormGroup>
          <UFormGroup v-if="initiativeState.city" class="" label="Seleccione la ubicación de la iniciativa" name="subdivision" required>
            <USelectMenu v-model="initiativeState.subdivision" :options="subdivisionsOptions" placeholder="Seleccione la ubicación" size="lg" :ui-menu="{ container: 'z-[1500] group' }">
              <template #option="{ option }">
                <span>{{ option.type }} {{ option.name }}</span>
              </template>
              <template #label>
                <span v-if="initiativeState.subdivision">{{ initiativeState.subdivision.type }} {{ initiativeState.subdivision.name }}</span>
                <span v-else>Seleccione la ubicación</span>
              </template>
            </USelectMenu>
          </UFormGroup>
          <UFormGroup label="Ubicación de la iniciativa en el mapa" class="w-full">
            <template #description>
              <p><b class="text-pumpkin">Opcional</b>. Haga clic para marcar la ubicación de la iniciativa en el mapa. Si la iniciativa no tiene una ubicación específica, puede dejar el mapa sin marcar.</p>
            </template>
           <MapSelectPosition v-if="initiativeState.subdivision" :key="`map-city-${initiativeState.city.id}-subdivision-${initiativeState.subdivision.id}`" v-model="selectedCoordinates" :selected-subdivision="initiativeState.subdivision" />
          </UFormGroup>
          <UFormGroup name="description" label="Descripción" required>
            <template #description>
              Describe de forma breve tu iniciativa. <i class="text-pumpkin">(Máximo 500 caracteres)</i>
            </template>
            <UTextarea v-model="initiativeState.description" placeholder="Escriba aquí..." />
          </UFormGroup>
          <UFormGroup name="needsAndOffers" label="Necesidades y ofertas" required>
            <template #description>
              ¿Qué podría ofrecer o compartir la red a mi iniciativa? <i class="text-pumpkin">(Máximo 500 caracteres)</i>
            </template>
            <UTextarea v-model="initiativeState.needsAndOffers" placeholder="Escriba aquí..." />
          </UFormGroup>
          <UDivider size="lg" class="py-5" label="Paso 3. Enviar formulario" />
          <UButton type="submit" class="text-xl font-medium" block color="pumpkin" :ui="{ rounded: 'rounded-full' }" :loading="submitLoading">Enviar</UButton>
        </UForm>
      </div>
    </div>
    <div v-else ref="success-message" class="text-center">
      <UIcon name="i-heroicons-check-circle" class="text-6xl text-green-500" />
      <p class="text-green-500 font-oswald uppercase text-3xl mb-3">¡GRACIAS POR SUMAR TU INICIATIVA!</p>
      <p>Tu iniciativa ha sido guardado en nuestra base de datos</p>
    </div>

  </UCard>
</template>