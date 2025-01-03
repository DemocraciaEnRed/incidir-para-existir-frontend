<script setup>
import {
  object as YupObject,
  string as YupString,
  boolean as YupBoolean,
  number as YupNumber,
  array as YupArray
} from 'yup'

const { $api } = useNuxtApp()
const { data: sessionData } = useAuth()


const isLoading = ref(false)
const dimensions = ref([])
const subdivisions = ref([])
const submitSuccess = ref(false)
const submitError = ref(false)
const submitLoading = ref(false)
const showContactForm = ref(true)
const showInitiativeForm = ref(false)
const contactFormIsValid = ref(false)

const contactSchema = YupObject({
  fullname: YupString().required('Este campo es requerido'),
  email: YupString().email('Por favor, ingresa un email válido').required('Este campo es requerido'),
  phone: YupString().required('Este campo es requerido'),
  keepPrivate: YupBoolean().required('Este campo es requerido')
})

const contactState = reactive({
  fullname: 'Mauricio Quines Lorea',
  email: 'afakemail@yahoo.com',
  phone: '6512316543',
  keepPrivate: true // privacy by default
})

const initiativeSchema = YupObject({
  name: YupString().required('Este campo es requerido'),
  description: YupString().max(500).required('Este campo es requerido'),
  needsAndOffers: YupString().max(500).required('Este campo es requerido'),
  subdivisionId: YupNumber().required('Este campo es requerido'),
  // dimensionsIds must be an array and there must be one or two dimension IDs 
  dimensionIds: YupArray().min(1, 'Debes seleccionar uno o dos ejes temáticos').max(2, 'Solo puedes seleccionar hasta dos ejes tematicos').required('Este campo es requerido')
})

const initiativeState = reactive({
  name: 'Estaban los pájaros cantando',
  description: 'En la rama de un árbol',
  needsAndOffers: 'Cuando llegó el cazador',
  subdivisionId: null,
  dimensionIds: []
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

const addDimention = (dimension) => {
  // you can add up to 2 dimensions.
  // if the dimension is already in the list, remove it
  if(initiativeState.dimensionIds.includes(dimension.id)) {
    initiativeState.dimensionIds = initiativeState.dimensionIds.filter(d => d !== dimension.id)
  } else {
    if(initiativeState.dimensionIds.length < 2) {
      initiativeState.dimensionIds.push(dimension.id)
    }
  }
}

const subdivisionsOptions = computed(() => {
  if(!sessionData.value.user.subdivision) return []
  if(!sessionData.value.user.subdivision.city) return []
  if(!sessionData.value.user.subdivision.city.id) return []
  // filtered subdivisions
  const filteredSubdivisions = subdivisions.value.filter(subdivision => {
    return subdivision.city.id === sessionData.value.user.subdivision.city.id
  })
  return filteredSubdivisions
})

const selectedLabelSubdivisions = computed(() => {
  if(sessionData.value.user.subdivision.city.id === 1) return "Cali: Selecciona el corregimiento de la iniciativa"
  if(sessionData.value.user.subdivision.city.id === 2) return "Bogota: Selecciona la comuna de la iniciativa"
  return '-'
})

const handleSubmitContactForm = async () => {
  try {
    console.log(sessionData.value.user)
    showContactForm.value = true
    showInitiativeForm.value = true
    contactFormIsValid.value = true
  } catch (error) {
    console.error(error)
  }
}

const handleSubmitInitiativeForm = async () => {
  try {
    submitLoading.value = true
    const payload = {
      ...initiativeState,
      contact: contactState
    }
    await $api('/initiatives', {
      method: 'POST',
      body: JSON.stringify(payload)
    })
    submitSuccess.value = true
    submitError.value = false
  } catch (error) {
    console.error(error)
    submitError.value = true
  } finally {
    submitLoading.value = false
  }
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
      <p class="text-2xl text-pumpkin-500 font-bold mb-5 text-center">SUMÁ TU INICIATIVA</p>
      <UDivider size="lg" class="my-8" label="Paso 1. Datos de contacto" />
      <UForm v-if="showContactForm" :state="contactState" :schema="contactSchema" class="space-y-4" @submit="handleSubmitContactForm">
        <UFormGroup name="fullname" label="Nombre completo" required>
          <UInput v-model="contactState.fullname" size="lg" icon="i-heroicons-user" :disabled="contactFormIsValid" />
        </UFormGroup>
        <UFormGroup name="email" label="Email" required>
          <UInput v-model="contactState.email" size="lg" icon="i-heroicons-envelope" :disabled="contactFormIsValid" />
        </UFormGroup>
        <UFormGroup name="phone" label="Teléfono" required>
          <UInput v-model="contactState.phone" size="lg" icon="i-heroicons-phone" :disabled="contactFormIsValid" />
        </UFormGroup>
        <UFormGroup name="keepPrivate" label="Privacidad" required>
          <template #description>
            ¿Deseas que los datos de contacto de la iniciativa no sean publicos?
          </template>
          <UCheckbox v-model="contactState.keepPrivate" :disabled="contactFormIsValid">
            <template #label>
              <p>Si, Deseo que el email y teléfono sean privados</p>
            </template>
          </UCheckbox>
        </UFormGroup>
        <UButton v-if="!showInitiativeForm" type="submit" color="pumpkin" block size="lg" >Siguiente</UButton>
      </UForm>
      <div v-if="showInitiativeForm">
        <UDivider size="lg" class="my-8" label="Paso 2. Datos de la iniciativa" />
        <UForm :state="initiativeState" :schema="initiativeSchema" class="space-y-4" @submit="handleSubmitInitiativeForm">
          <UFormGroup name="dimensionIds" label="Ejes tematicos de la iniciativa" description="Sabemos que algunas iniciativas trabajan diferentes temáticas, para este mapeo selecciona máximo 2." required>
            <div class="flex flex-wrap gap-2 pt-1">
              <UBadge 
              v-for="dimension in dimensions"
              :key="`dimension-${dimension.id}`"
              :color="initiativeState.dimensionIds.includes(dimension.id) ? 'mindaro' : 'white'"
              :variant="initiativeState.dimensionIds.includes(dimension.id) ? 'solid' : 'outline'"
              class="cursor-pointer px-3"
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
            <UInput v-model="initiativeState.name" size="lg" />
          </UFormGroup>
          <UFormGroup class="" :label="selectedLabelSubdivisions" name="subdivisionId" required>
            <USelect v-model.number="initiativeState.subdivisionId" :options="subdivisionsOptions" value-attribute="id" option-attribute="name" />
          </UFormGroup>
          <UFormGroup name="description" label="Descripción" required>
            <template #description>
              Describe de forma breve tu iniciativa. <i class="text-pumpkin">(Máximo 500 caracteres)</i>
            </template>
            <UTextarea v-model="initiativeState.description" />
          </UFormGroup>
          <UFormGroup name="needsAndOffers" label="Necesidades y ofertas" required>
            <template #description>
              ¿Qué podría ofrecer o compartir la red a mi iniciativa? <i class="text-pumpkin">(Máximo 500 caracteres)</i>
            </template>
            <UTextarea v-model="initiativeState.needsAndOffers" />
          </UFormGroup>
          <UDivider size="lg" class="py-5" label="Paso 3. Enviar formulario" />
          <UButton type="submit" class="text-xl font-semibold" block color="pumpkin" :ui="{ rounded: 'rounded-full' }" :loading="submitLoading">Enviar</UButton>
        </UForm>
      </div>
    </div>
    <div v-else class="text-center">
      <UIcon name="i-heroicons-check-circle" class="text-6xl text-green-500" />
      <p class="text-green-500 font-oswald uppercase text-3xl mb-3">¡GRACIAS POR SUMAR TU INICIATIVA!</p>
      <p>Tu iniciativa ha sido guardado en nuestra base de datos</p>
    </div>

  </UCard>
</template>