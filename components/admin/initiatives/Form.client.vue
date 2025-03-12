<script setup>
import {
  object as YupObject,
  string as YupString,
  array as YupArray,
  boolean as YupBoolean,
} from 'yup'


const { $api } = useNuxtApp()
const toast = useToast()
const props = defineProps({
  existingInitiative: {
    type: [Object, null, undefined],
    default: () => null,
  }
})

const initiativeSchema = YupObject({
  fullname: YupString().required('Este campo es requerido'),
  email: YupString().email('Por favor, ingresa un email válido').required('Este campo es requerido'),
  phone: YupString().required('Este campo es requerido'),
  keepEmailPrivate: YupBoolean().required('Este campo es requerido'),
  keepPhonePrivate: YupBoolean().required('Este campo es requerido'),
  name: YupString().required('Este campo es requerido'),
  source: YupString().oneOf(['web', 'whatsapp' ], 'Por favor, seleccione un equipo').required('Este campo es requerido'),
  description: YupString().max(500).required('Este campo es requerido'),
  needsAndOffers: YupString().max(500).required('Este campo es requerido'),
  city: YupObject().required('Este campo es requerido'),
  subdivision: YupObject().required('Este campo es requerido'),
  // dimensionsIds must be an array and there must be one or two dimension IDs 
  dimensions: YupArray().min(1, 'Debes seleccionar uno o dos ejes temáticos').max(2, 'Solo puedes seleccionar hasta dos ejes temáticos').required('Este campo es requerido')
})

const editMode = ref(false)
const submitLoading = ref(false)

const initiativeState = reactive({
  fullname: '',
  email: '',
  phone: '',
  keepEmailPrivate: true,
  keepPhonePrivate: true,
  name: '',
  source: 'web',
  description: '',
  needsAndOffers: '',
  city: null,
  subdivision: null,
  dimensions: []
})

const selectedCoordinates = ref(null)

if(props.existingInitiative){
  console.log('Editing')
  editMode.value = true
  initiativeState.fullname = props.existingInitiative.contact.fullname || ''
  initiativeState.email = props.existingInitiative.contact.email || ''
  initiativeState.phone = props.existingInitiative.contact.phone || ''
  initiativeState.keepEmailPrivate = props.existingInitiative.contact.keepEmailPrivate ?? true
  initiativeState.keepPhonePrivate = props.existingInitiative.contact.keepPhonePrivate ?? true
  initiativeState.name = props.existingInitiative.name
  initiativeState.source = props.existingInitiative.source || 'web'
  initiativeState.description = props.existingInitiative.description
  initiativeState.needsAndOffers = props.existingInitiative.needsAndOffers
  initiativeState.city = props.existingInitiative.city
  initiativeState.subdivision = props.existingInitiative.subdivision
  initiativeState.dimensions = props.existingInitiative.dimensions
  if(props.existingInitiative.latitude && props.existingInitiative.longitude){
    selectedCoordinates.value = [props.existingInitiative.latitude, props.existingInitiative.longitude]
  }
}

const handleSubmit = async () => {
  try {
    submitLoading.value = true
    const contactPayload = {
      fullname: initiativeState.fullname,
      email: initiativeState.email,
      phone: initiativeState.phone,
      keepEmailPrivate: initiativeState.keepEmailPrivate,
      keepPhonePrivate: initiativeState.keepPhonePrivate
    }
    const payload = {
      name: initiativeState.name,
      source: initiativeState.source,
      description: initiativeState.description,
      needsAndOffers: initiativeState.needsAndOffers,
      dimensionIds: initiativeState.dimensions.map(d => d.id),
      cityId: initiativeState.city.id,
      subdivisionId: initiativeState.subdivision && initiativeState.subdivision.id != null ? initiativeState.subdivision.id : undefined,
      recaptchaResponse: '-',
      latitude: undefined,
      longitude: undefined,
      contact: contactPayload,
    }
    if(selectedCoordinates.value && initiativeState.subdivision && initiativeState.subdivision.id != null){
      payload.latitude = selectedCoordinates.value[0]
      payload.longitude = selectedCoordinates.value[1]
    }
    if(editMode.value){
      await $api(`/initiatives/${props.existingInitiative.id}`, {
        method: 'PUT',
        body: payload
      })
    } else {
      await $api('/initiatives', {
        method: 'POST',
        body: payload
      })
      toast.add({ title: 'Exito', description: 'La iniciativa ha sido creada exitosamente', color: 'green'}) 
    }
    navigateTo('/admin/iniciativas')
  } catch (error) {
    console.log('Error', error)
    toast.add({ title: 'Error', description: `Ha ocurrido un error al intentar crear el desafío`, color: 'red'})
  } finally {
    submitLoading.value = false
  }
}

const onError = (event) => {
  toast.add({ title: 'Error', description: event.errors[0].message, color: 'red'})
  const element = document.getElementById(event.errors[0].id)
  element?.focus()
  element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

</script>

<template>
  <UForm :state="initiativeState" :schema="initiativeSchema" class="space-y-4" @submit="handleSubmit" @error="onError">
    <div class="flex space-x-3">
      <UFormGroup name="fullname" label="Nombre completo" required class="w-full">
        <UInput v-model="initiativeState.fullname" size="lg" icon="i-heroicons-user" :disabled="contactFormIsValid" placeholder="Escriba aquí..." />
      </UFormGroup>
      <UFormGroup name="email" label="Email de contacto" required class="w-full">
        <UInput v-model="initiativeState.email" size="lg" icon="i-heroicons-envelope" :disabled="contactFormIsValid"  placeholder="Escriba aquí..." />
      </UFormGroup>
      <UFormGroup name="phone" label="Teléfono de contacto" required class="w-full">
        <UInput v-model="initiativeState.phone" size="lg" icon="i-heroicons-phone" :disabled="contactFormIsValid"  placeholder="Escriba aquí..." />
      </UFormGroup>
    </div>
    <UFormGroup label="Privacidad de los datos de contacto" help="Seleccione si desea que los datos de contacto sean visibles al público" class="w-full">
      <div class="flex space-x-3">
      <UFormGroup name="keepEmailPrivate" class="w-full border border-gray-800 rounded-xl p-4" >
        <UCheckbox v-model="initiativeState.keepEmailPrivate" :disabled="contactFormIsValid">
          <template #label>
            <p>Ocultar el email al publico</p>
          </template>
          <template #help>
            <p v-if="initiativeState.keepEmailPrivate"> El email solo será visible por el equipo de Movilizatorio</p>
            <p v-else>El email será visible al público</p>
          </template>
        </UCheckbox>
      </UFormGroup>
      <UFormGroup name="keepPhonePrivate" class="w-full border border-gray-800 rounded-xl p-4" >
        <UCheckbox v-model="initiativeState.keepPhonePrivate" :disabled="contactFormIsValid">
          <template #label>
            <p>Ocultar el teléfono al publico</p>
          </template>
          <template #help>
            <p v-if="initiativeState.keepPhonePrivate"> El telefono solo será visible por el equipo de Movilizatorio</p>
            <p v-else>El telefono será visible al público</p>
          </template>
        </UCheckbox>
      </UFormGroup>
    </div>
    </UFormGroup>
    <UFormGroup name="name" label="Nombre de la iniciativa" required>
      <template #description>
        ¿Cómo se llama la iniciativa, parche, movimiento y/o proyecto?
      </template>
      <UInput v-model="initiativeState.name" size="lg" placeholder="Escriba aquí..." />
    </UFormGroup>
    <UFormGroup name="source" label="Fuente de la iniciativa" required>
      <template #description>
        ¿Cómo llegó la iniciativa a Incidir para Existir?
      </template>
      <USelect v-model="initiativeState.source" :options="[{ label: 'Web', value: 'web' }, { label: 'Whatsapp', value: 'whatsapp' }]" />
    </UFormGroup>
    <UFormGroup name="dimensions" label="Dimensiones de la iniciativa">
      <template #description>
        Selecciona los ejes temáticos de la iniciativa. <i class="text-pumpkin">(Hasta 2)</i>
      </template>
      <AdminMultipleDimensionSelector v-model="initiativeState.dimensions" :show-badges="true" />
    </UFormGroup>
    <UFormGroup name="subdivision" label="Ubicación">
      <AdminLocalizationSelector v-model:selected-city="initiativeState.city" v-model:selected-subdivision="initiativeState.subdivision" />
    </UFormGroup>
    <UFormGroup v-if="initiativeState.subdivision && initiativeState.subdivision.id && initiativeState.subdivision.id != null"  label="Ubicación de la iniciativa en el mapa" class="w-full">
      <template #description>
        <p><b class="text-pumpkin">Opcional</b>. Haga clic para marcar la ubicación en el mapa. Si no tiene una ubicación específica, puede dejar el mapa sin marcar.</p>
      </template>
      <MapSelectPosition :key="`map-subdivision-${initiativeState.subdivision.id}`" v-model="selectedCoordinates" :selected-subdivision="initiativeState.subdivision" />
    </UFormGroup>
    <UFormGroup name="description" label="Descripción" required>
      <template #description>
        Describe de forma breve la iniciativa. <i class="text-pumpkin">(Máximo 500 caracteres)</i>
      </template>
      <UTextarea v-model="initiativeState.description" placeholder="Escriba aquí..." />
    </UFormGroup>
    <UFormGroup name="needsAndOffers" label="Necesidades y ofertas" required>
      <template #description>
        ¿Qué podría ofrecer o compartir a la red de jóvenes mi iniciativa? <i class="text-pumpkin">(Máximo 500 caracteres)</i>
      </template>
      <UTextarea v-model="initiativeState.needsAndOffers" placeholder="Escriba aquí..." />
    </UFormGroup>
    <UButton type="submit" block class="text-xl font-semibold" color="pumpkin" :ui="{ rounded: 'rounded-full' }" :loading="submitLoading">Guardar</UButton>
    <div v-if="editMode" class="space-y-4">
      <UDivider label="Datos extra - Whatsapp Bot" />
      <!-- Add any additional fields or notes related to extra data here -->
       <div class="border py-4 px-6 bg-gray-900 border-gray-700 rounded-lg space-y-4">

         <div class="flex space-x-3">
           <UFormGroup label="Bot: Campo Ciudad" class="w-full">
             <p class="text-xs font-mono ">{{ props.existingInitiative.customCity || '- Sin completar -' }}</p>
          </UFormGroup>
          <UFormGroup label="Bot: Campo Localidad" class="w-full">
            <p class="text-xs font-mono ">{{ props.existingInitiative.customSubdivision || '- Sin completar -' }}</p>
          </UFormGroup>
        </div>
        <UFormGroup label="Bot: Otros datos" class="w-full">
          <p class="text-xs font-mono ">{{ props.existingInitiative.extra || '- Sin completar -' }}</p>
        </UFormGroup>
      </div>
    </div>
  </UForm>
</template>
