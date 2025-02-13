<script setup>
import {
  object as YupObject,
  string as YupString,
} from 'yup'


const { $api } = useNuxtApp()
const toast = useToast()
const props = defineProps({
  existingChallenge: {
    type: [Object, null, undefined],
    default: () => null,
  }
})

const challengeSchema = YupObject({
  source: YupString().oneOf(['web', 'whatsapp' ], 'Por favor, seleccione un equipo').required('Este campo es requerido'),
  needsAndChallenges: YupString().max(500, 'El máximo es hasta 500 caracteres').required('Este campo es requerido'),
  proposal: YupString().max(500, 'El máximo es hasta 500 caracteres').required('Este campo es requerido'),
  inWords: YupString().matches(/^\w+(\s\w+)?$/, { excludeEmptyString: true, message: 'Solo se permite una o dos palabras' }).required('Este campo es requerido'),
  dimension: YupObject().required('Este campo es requerido'),
  subdivision: YupObject().required('Este campo es requerido'),
})

const editMode = ref(false)
const submitLoading = ref(false)

const challengeState = reactive({
  source: 'web',
  needsAndChallenges: '',
  proposal: '',
  inWords: '',
  dimension: null,
  subdivision: null,
})

const selectedCoordinates = ref(null)

if(props.existingChallenge){
  console.log('Editing')
  editMode.value = true
  for(const key in challengeState){
    challengeState[key] = props.existingChallenge[key] || ''
  }
  if(props.existingChallenge.latitude && props.existingChallenge.longitude){
    selectedCoordinates.value = [props.existingChallenge.latitude, props.existingChallenge.longitude]
  }
}

const handleSubmit = async () => {
  try {
    submitLoading.value = true
  
    const payload = {
      source: challengeState.source,
      needsAndChallenges: challengeState.needsAndChallenges,
      proposal: challengeState.proposal,
      inWords: challengeState.inWords,
      dimensionId: challengeState.dimension.id,
      subdivisionId: challengeState.subdivision.id,
      recaptchaResponse: '-',
      latitude: undefined,
      longitude: undefined
    }
    if(selectedCoordinates.value){
      payload.latitude = selectedCoordinates.value[0]
      payload.longitude = selectedCoordinates.value[1]
    }
    if(editMode.value){
      await $api(`/challenges/${props.existingChallenge.id}`, {
        method: 'PUT',
        body: payload
      })
    } else {
      await $api('/challenges', {
        method: 'POST',
        body: payload
      })
      toast.add({ title: 'Desafio creado', description: 'El desafio ha sido creado exitosamente', color: 'green'}) 
    }
    navigateTo('/admin/desafios')
  } catch (error) {
    console.log('Error', error)
    toast.add({ title: 'Error', description: `Ha ocurrido un error al intentar crear el desafio`, color: 'red'})
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
  <UForm :state="challengeState" :schema="challengeSchema" class="space-y-4" @submit="handleSubmit" @error="onError">
    <UFormGroup name="source" label="Fuente de la iniciativa" required>
      <template #description>
        ¿Cómo llegó el reporte de desafio a Incidir para Existir?
      </template>
      <USelect v-model="challengeState.source" :options="[{ label: 'Web', value: 'web' }, { label: 'Whatsapp', value: 'whatsapp' }]" />
    </UFormGroup>
    <UFormGroup class="" label="Necesidades y desafíos" name="needsAndChallenges" required>
      <template #description>
        Comparte el desafio de la juventud en tu territorio <i class="text-pumpkin">(Máximo 500 caracteres)</i>
      </template>
      <template #help>
        <span v-if="challengeState.needsAndChallenges" class="text-xs">Caracteres: {{ challengeState.needsAndChallenges.length }}</span>
      </template>
      <UTextarea v-model="challengeState.needsAndChallenges"  :disabled="submitLoading" placeholder="Escribe aquí..." autoresize/>
    </UFormGroup>
    <UFormGroup class="" label="Propuesta" name="proposal" required>
      <template #description>
        ¿Tienes alguna propuesta frente a esta situación? <i class="text-pumpkin">(Máximo 500 caracteres)</i>
      </template>
      <template #help>
        <span v-if="challengeState.proposal" class="text-xs">Caracteres: {{ challengeState.proposal.length }}</span>
      </template>
      <UTextarea v-model="challengeState.proposal" placeholder="Escribe aquí..."  :disabled="submitLoading" autoresize/>
    </UFormGroup>
    <UFormGroup class="" label="En máximo dos palabras ¿Cómo resumirias el desafio que enfrenta la juventud?" name="inWords" required>
      <UInput v-model="challengeState.inWords" :disabled="submitLoading" placeholder="Escriba aquí..." />
    </UFormGroup>
    <UFormGroup label="Eje temático">
      <AdminDimensionSelector v-model="challengeState.dimension" />
    </UFormGroup>
    <UFormGroup label="Ubicación">
      <AdminSubdivisionSelector v-model="challengeState.subdivision" />
    </UFormGroup>
    <UFormGroup v-if="challengeState.subdivision" label="Ubicación del desafio en el mapa" class="w-full">
      <template #description>
        <p><b class="text-pumpkin">Opcional</b>. Haga clic para marcar la ubicación del desafio en el mapa. Si el desafio no tiene una ubicación específica, puede dejar el mapa sin marcar.</p>
      </template>
      <MapSelectPosition :key="`map-subdivision-${challengeState.subdivision.id}`" v-model="selectedCoordinates" :selected-subdivision="challengeState.subdivision" />
    </UFormGroup>
    <UButton type="submit" block class="text-xl font-semibold" color="pumpkin" :ui="{ rounded: 'rounded-full' }" :loading="submitLoading">Guardar</UButton>
    <div v-if="editMode" class="space-y-4">
      <UDivider label="Datos extra - Whatsapp Bot" />
      <!-- Add any additional fields or notes related to extra data here -->
       <div class="border py-4 px-6 bg-gray-900 border-gray-700 rounded-lg space-y-4">

         <div class="flex space-x-3">
           <UFormGroup label="Bot: Campo Ciudad" class="w-full">
             <p class="text-xs font-mono ">{{ props.existingChallenge.customCity || '- Sin completar -' }}</p>
          </UFormGroup>
          <UFormGroup label="Bot: Campo Localidad" class="w-full">
            <p class="text-xs font-mono ">{{ props.existingChallenge.customSubdivision || '- Sin completar -' }}</p>
          </UFormGroup>
        </div>
        <UFormGroup label="Bot: Otros datos" class="w-full">
          <p class="text-xs font-mono ">{{ props.existingChallenge.extra || '- Sin completar -' }}</p>
        </UFormGroup>
      </div>
    </div>
  </UForm>
</template>
